const mongoose = require('mongoose');
const { Class } = require('../models/Class');
const { Post } = require('../models/Post');

// Get all posts from a class
exports.getPostFromClass = async (req, res) => {
    const user = req.user;
    try {
        const cls = await Class.findById(req.params.id);
        if (cls.admin === user._id || user.email in cls.students) {
            const posts = await Post.find({
                _id: {
                    $in: cls.posts.map((id) => mongoose.Types.ObjectId(id)),
                },
            });
            res.json({ posts });
            return;
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Add a new post to the class
exports.addPostToClass = async (req, res) => {
    const user = req.user;
    try {
        const cls = await Class.findById(req.params.id);
        if (cls.admin === user._id || user.email in cls.students) {
            const newPost = new Post({
                title: req.body.title,
                content: req.body.content,
                author: user._id,
            });
            const newId = await newPost.save();
            await Class.updateOne(
                { _id: cls._id },
                { $push: { posts: newId } }
            );
            res.json({ success: 'Post created successfully' });
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Update an existing post
exports.updatePost = async (req, res) => {
    const user = req.user;
    try {
        const post = await Post.findById(req.params.id);
        if (post.author === user._id) {
            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title || post.title,
                content: req.body.content || post.content,
            });
            res.json({ success: 'Updated successfully' });
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};
