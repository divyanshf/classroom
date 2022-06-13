require('dotenv').config();
const bcrypt = require('bcrypt');
const JWT = require('./jwtController');
const { User } = require('../models/User');
const { Role } = require('../models/Role');
const { Class } = require('../models/Class');
const saltRounds = 10;

// Middlewares for authorization and authentication checks
exports.isUser = async (req, res, next) => {
    const token = req.cookies.access;
    const refreshToken = req.cookies.refresh;
    if (!token && !refreshToken) {
        res.json({ error: 'Unverified user.' });
        return;
    }
    let user = JWT.verifyToken(token);
    if (!user) {
        const access = await JWT.regenerateAccessToken(refreshToken);
        if (!access) {
            res.json({ error: 'Invalid Token' });
            return;
        }
        user = JWT.verifyToken(access);
        res.cookie('access', access, {
            httpOnly: true,
            maxAge: JWT.accessExpiry * 1000,
            // secure: true,
        });
        res.cookie('user', JSON.stringify(user), {
            httpOnly: false,
            maxAge: JWT.accessExpiry * 1000,
            // secure: true,
        });
    }

    req.user = user;
    next();
};
exports.isTeacher = async (req, res, next) => {
    const token = req.cookies.access;
    const refreshToken = req.cookies.refresh;
    if (!token && !refreshToken) {
        res.json({ error: 'Unverified user.' });
        return;
    }
    let user = JWT.verifyToken(token);
    if (!user) {
        const access = await JWT.regenerateAccessToken(refreshToken);
        if (!access) {
            res.json({ error: 'Invalid Token' });
            return;
        }
        user = JWT.verifyToken(access);
        res.cookie('access', access, {
            httpOnly: true,
            maxAge: JWT.accessExpiry * 1000,
            // secure: true,
        });
        res.cookie('user', JSON.stringify(user), {
            httpOnly: false,
            maxAge: JWT.accessExpiry * 1000,
            // secure: true,
        });
    }
    req.user = user;
    const role = await Role.findById(user.role);
    if (role.name !== 'Teacher') {
        res.json({ error: 'Unauthorized user.' });
        return;
    }
    next();
};
exports.isStudent = async (req, res, next) => {
    const token = req.cookies.access;
    const refreshToken = req.cookies.refresh;
    if (!token && !refreshToken) {
        res.json({ error: 'Unverified user.' });
        return;
    }
    let user = JWT.verifyToken(token);
    if (!user) {
        const access = await JWT.regenerateAccessToken(refreshToken);
        if (!access) {
            res.json({ error: 'Invalid Token' });
            return;
        }
        user = JWT.verifyToken(access);
        res.cookie('access', access, {
            httpOnly: true,
            maxAge: JWT.accessExpiry * 1000,
            // secure: true,
        });
        res.cookie('user', JSON.stringify(user), {
            httpOnly: false,
            maxAge: JWT.accessExpiry * 1000,
            // secure: true,
        });
    }
    req.user = user;
    const role = await Role.findById(user.role);
    if (role.name !== 'Student') {
        res.json({ error: 'Unauthorized user.' });
        return;
    }
    next();
};
exports.isMember = async (req, res, next) => {
    const user = req.user;
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) throw 'Class unavailable';
        if (
            cls.admin.user.toString() === user._id ||
            cls.students.filter((stud) => stud.user === user.email).length > 0
        ) {
            next();
            return;
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
        return;
    }
};

// Helper functions
const userExists = async (email) => {
    const isUser = await User.findOne({ email });
    return isUser;
};
const encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};
const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

// Controllers for authentication
exports.signup = async (req, res) => {
    try {
        if (!req.body.password) throw 'Invalid Password';
        const isUser = await userExists(req.body.email);
        if (isUser) throw 'User already exists.';
        const role = await Role.findOne({ name: req.body.role });
        const newUser = new User({
            username: req.body.username,
            password: await encryptPassword(req.body.password),
            email: req.body.email,
            role: role._id,
        });
        await newUser.save();
        const err = JWT.setCookies(res, newUser, role.name);
        if (err) throw err;
        res.json({
            user: {
                email: newUser.email,
                username: newUser.username,
                role: role.name,
            },
        });
    } catch (e) {
        console.log(e);
        res.json({ error: e || 'Something went wrong!' });
    }
};

exports.signin = async (req, res) => {
    try {
        const isUser = await userExists(req.body.email);
        if (!isUser) throw 'User does not exist.';
        const checkPassword = await comparePassword(
            req.body.password,
            isUser.password
        );
        if (!checkPassword) throw 'Invalid credentials.';
        const role = await Role.findById(isUser.role);
        const err = JWT.setCookies(res, isUser, role.name);
        if (err) throw err;
        res.json({
            user: {
                email: isUser.email,
                role: role.name,
            },
        });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

exports.logout = (req, res) => {
    res.cookie('access', '', {
        httpOnly: true,
        // maxAge: JWT.accessExpiry * 1000,
        // secure: true,
    });
    res.cookie('refresh', '', {
        httpOnly: true,
        // maxAge: JWT.refreshExpiry * 1000,
        // secure: true,
    });
    res.cookie('user', '', {
        httpOnly: false,
        // maxAge: JWT.accessExpiry * 1000,
        // secure: true,
    });
    res.json({ success: 'Logged out successfully.' });
};
