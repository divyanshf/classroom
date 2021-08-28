const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema(
    {
        title: {
            //  Title of the class
            type: String,
            require: true,
        },
        books: [{ type: String }], //  Recommended books by admin
        link: {
            //  link to the video room
            type: String,
        },
        admin: {
            //  Admin of the class or teacher
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // All the posts of the class
        students: [{ type: String, ref: 'User' }], //  Students in the class // referencing emails here
        assign: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assign' }], //  Assignments in the claass
    },
    {
        timestamps: true,
    }
);

const Class = mongoose.model('Class', ClassSchema);

module.exports = { Class, ClassSchema };
