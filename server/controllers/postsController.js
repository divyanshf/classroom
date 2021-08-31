const { Post } = require('../models/Post');

// Get all posts from a class
exports.getPostFromClass = async (req, res) => {
    try {
        const posts = await Post.find({
            classID: req.params.id,
        }).sort({ updatedAt: -1 });
        res.json({ posts });
        return;
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Add a new post to the class
exports.addPostToClass = async (req, res) => {
    const user = req.user;
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: {
                user: user._id,
                name: user.username,
            },
            classID: req.params.id,
        });
        await newPost.save();
        res.json({ success: 'Post created successfully' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Update an existing post
exports.updatePost = async (req, res) => {
    const user = req.user;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) throw "Post doesn't exists";
        if (post.author.user.toString() === user._id) {
            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title || post.title,
                content: req.body.content || post.content,
            });
            res.json({ success: 'Updated successfully' });
            return;
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};
