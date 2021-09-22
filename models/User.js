const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        require: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        require: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        require: true,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };
