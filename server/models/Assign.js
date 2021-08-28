const mongoose = require('mongoose');

const AssignSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    points: {
        type: Number,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
});

const Assign = mongoose.model('Role', AssignSchema);

module.exports = { Assign, AssignSchema };
