const mongoose = require('mongoose');

const QnaSchema = mongoose.Schema({
    question: {
        type: String,
        require: true,
    },
    options: [{ type: String, require: true }],
    correct: { type: String, require: true },
});

const Qna = mongoose.model('Qna', QnaSchema);

module.exports = { Qna, QnaSchema };
