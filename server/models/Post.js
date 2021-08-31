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
            user: {
                //  Author of the post
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            name: {
                type: String,
                require: true,
            },
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
