const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// Time in seconds
exports.accessExpiry = 60 * 15; //  15 minutes
exports.refreshExpiry = 60 * 60 * 24 * 30; //  30 days

exports.setCookies = (res, user, role) => {
    try {
        const token = this.createJWT(user);
        const refreshToken = this.createRefreshToken(user);
        res.cookie('access', token, {
            httpOnly: true,
            maxAge: this.accessExpiry * 1000,
            // secure: true,
        });
        res.cookie(
            'user',
            JSON.stringify({
                _id: user._id,
                email: user.email,
                role: role,
                username: user.username,
            }),
            {
                httpOnly: false,
                maxAge: this.accessExpiry * 1000,
                // secure: true,
            }
        );
        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            maxAge: this.refreshExpiry * 1000,
            // secure: true,
        });

        return null;
    } catch (e) {
        return e;
    }
};

// Create a new jwt with user
exports.createJWT = (user) => {
    try {
        return jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: this.accessExpiry,
            }
        );
    } catch (e) {
        return e;
    }
};

// Create a new refresh token
exports.createRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: this.refreshExpiry,
    });
};

// Generate access token using refresh token
exports.regenerateAccessToken = async (refreshToken) => {
    if (!refreshToken) return null;
    const dec = this.verifyToken(refreshToken);
    if (!dec) return null;
    const user = await User.findById(dec.id);
    if (!user) return null;
    return this.createJWT(user);
};

// Verify a token
exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
};
