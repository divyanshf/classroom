const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            trim: true,
            require: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: 'Role',
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };
