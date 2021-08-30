const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        title: {
            //  Title of the post
            type: String,
            require: true,
        },
        content: {
            //  Content of the post
            type: String,
            require: true,
        },
        author: {
            //  Author of the post
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        classID: {
            // Referenced class
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post, PostSchema };
