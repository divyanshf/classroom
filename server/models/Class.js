const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        link: {
            type: String,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        assign: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assign' }],
    },
    {
        timestamps: true,
    }
);

const Class = mongoose.model('Class', ClassSchema);

module.exports = { Class, ClassSchema };
