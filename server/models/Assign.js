const mongoose = require('mongoose');

const AssignSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        points: {
            type: Number,
            require: true,
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Qna',
            },
        ],
        due: {
            type: Date,
            require: true,
        },
    },
    { timestamps: true }
);

const Assign = mongoose.model('Assign', AssignSchema);

module.exports = { Assign, AssignSchema };
