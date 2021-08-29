require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { Role } = require('../models/Role');
const { Class } = require('../models/Class');
const saltRounds = 10;

// Time in seconds
const accessExpiry = 60 * 15; //  15 minutes
const refreshExpiry = 60 * 60 * 24 * 30; //  30 days

// Middlewares for authorization and authentication checks
exports.isUser = async (req, res, next) => {
    const token = req.cookies.access;
    const refreshToken = req.cookies.refresh;
    if (!token && !refreshToken) {
        res.json({ error: 'Unverified user.' });
        return;
    }
    let user = verifyToken(token);
    if (!user) {
        const access = await regenerateAccessToken(refreshToken);
        if (!access) {
            res.json({ error: 'Invalid Token' });
            return;
        }
        user = verifyToken(access);
        res.cookie('access', access, {
            httpOnly: true,
            maxAge: accessExpiry * 1000,
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
    let user = verifyToken(token);
    if (!user) {
        const access = await regenerateAccessToken(refreshToken);
        if (!access) {
            res.json({ error: 'Invalid Token' });
            return;
        }
        user = verifyToken(access);
        res.cookie('access', access, {
            httpOnly: true,
            maxAge: accessExpiry * 1000,
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
    let user = verifyToken(token);
    if (!user) {
        const access = await regenerateAccessToken(refreshToken);
        if (!access) {
            res.json({ error: 'Invalid Token' });
            return;
        }
        user = verifyToken(access);
        res.cookie('access', access, {
            httpOnly: true,
            maxAge: accessExpiry * 1000,
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
        if (
            cls.admin.toString() === user._id ||
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
const createJWT = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: accessExpiry,
        }
    );
};
const createRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: refreshExpiry,
    });
};
const regenerateAccessToken = async (refreshToken) => {
    if (!refreshToken) return null;
    const dec = verifyToken(refreshToken);
    if (!dec) return null;
    const user = await User.findById(dec.id);
    if (!user) return null;
    return createJWT(user);
};
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
};

// Controllers for authentication
exports.signup = async (req, res) => {
    try {
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
        const token = createJWT(newUser);
        const refreshToken = createRefreshToken(newUser);
        res.cookie('access', token, {
            httpOnly: true,
            maxAge: accessExpiry * 1000,
            // secure: true,
        });
        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            maxAge: refreshExpiry * 1000,
            // secure: true,
        });
        res.json({ email: newUser.email, username: newUser.username });
    } catch (e) {
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
        const token = createJWT(isUser);
        const refreshToken = createRefreshToken(isUser);
        res.cookie('access', token, {
            httpOnly: true,
            maxAge: accessExpiry * 1000,
            // secure: true,
        });
        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            maxAge: refreshExpiry * 1000,
            // secure: true,
        });
        res.json({ email: isUser.email, username: isUser.username });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

exports.logout = (req, res) => {
    res.cookie('access', '', {
        httpOnly: true,
        // maxAge: accessExpiry * 1000,
        // secure: true,
    });
    res.cookie('refresh', '', {
        httpOnly: true,
        // maxAge: refreshExpiry * 1000,
        // secure: true,
    });
    res.json({ success: 'Logged out successfully.' });
};
