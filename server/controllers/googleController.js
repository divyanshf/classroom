const keys = require('../google.json');
const JWT = require('./jwtController');
const { google } = require('googleapis');
const { User } = require('../models/User');
const { Role } = require('../models/Role');

// Client secrets
const authInfo = {
    CLIENT_ID: keys.web.client_id,
    CLIENT_SECRET: keys.web.client_secret,
    REDIRECT_URIS: keys.web.redirect_uris,
};

// Create connection to google api
const createConnection = () => {
    return new google.auth.OAuth2(
        authInfo.CLIENT_ID,
        authInfo.CLIENT_SECRET,
        authInfo.REDIRECT_URIS
    );
};

// Get url that sends the user to login page
const getConnectionURL = (auth) => {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
        state: 'GOOGLE_LOGIN',
    });
};

// Google login
exports.login = (req, res) => {
    const auth = createConnection();
    const url = getConnectionURL(auth);
    res.json({ url });
};

// Google callback
exports.callback = async (req, res) => {
    try {
        const auth = createConnection();
        const code = req.query.code;
        const { tokens } = await auth.getToken(code);
        auth.setCredentials(tokens);
        const oauth2 = google.oauth2({
            auth: auth,
            version: 'v2',
        });
        const user = await oauth2.userinfo.get();
        const isUser = await User.findOne({ email: user.data.email });
        if (isUser) {
            // Sign in stuff
            const err = JWT.setCookies(res, isUser);
            if (err) throw err;
            const role = await Role.findById(isUser.role);
            res.json({
                status: 1,
                user: {
                    email: isUser.email,
                    username: isUser.username,
                    role: role.name,
                },
            });
        } else {
            // Sign up stuff
            res.json({
                status: 0,
                user: {
                    username: user.data.name,
                    email: user.data.email,
                    picture: user.data.picture,
                },
                redirect: '/auth/google/signup',
            });
        }
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Google signup
exports.signup = async (req, res) => {
    try {
        const user = req.body.user;
        const isUser = await User.findOne({ email: user.email });
        if (isUser) {
            throw 'User already exists.';
        }
        const role = await Role.findOne({ name: user.role });
        const newUser = new User({
            username: user.username,
            email: user.email,
            role: role._id,
        });
        await newUser.save();
        const err = JWT.setCookies(res, newUser);
        if (err) throw err;
        res.json({
            user: {
                email: newUser.email,
                username: newUser.username,
                role: role.name,
            },
        });
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};
