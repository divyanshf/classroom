const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema(
    {
        title: {
            //  Title of the class
            type: String,
            require: true,
        },
        subjectCode: { type: String },
        books: [{ type: String }], //  Recommended books by admin
        link: {
            //  link to the video room
            type: String,
        },
        admin: {
            //  Admin of the class or teacher
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                require: true,
            },
            name: {
                type: String,
                require: true,
            },
        },
        // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // All the posts of the class
        students: [
            {
                user: { type: String, ref: 'User' },
                points: { type: Number, default: 0 },
            },
        ], //  Students in the class // referencing emails here
    },
    {
        timestamps: true,
    }
);

const Class = mongoose.model('Class', ClassSchema);

module.exports = { Class, ClassSchema };
