const mongoose = require('mongoose');

const AssignSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        questions: [
            {
                question: { type: String, require: true },
                options: [{ type: String, require: true }],
                correct: { type: String, require: true },
                points: { type: Number, default: 1, require: true },
            },
        ],
        submissions: [
            {
                user: { type: String, ref: 'User' },
                points: { type: Number, default: 0 },
                time: { type: Date, default: Date.now },
            },
        ],
        classID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        },
        due: {
            type: Date,
            require: true,
            validate: (input) => {
                return new Date(input) > new Date();
            },
            message: 'Due date must be greater than current date',
        },
    },
    { timestamps: true }
);

const Assign = mongoose.model('Assign', AssignSchema);

module.exports = { Assign, AssignSchema };
