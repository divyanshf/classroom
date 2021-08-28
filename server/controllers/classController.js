const { Class } = require('../models/Class');
const { Role } = require('../models/Role');

// Get all classes with the respective user and role
exports.getAllClasses = async (req, res) => {
    const user = req.user;
    const role = await Role.findById(user.role);
    let classes = [];
    if (role.name === 'Student') {
        classes = await Class.find({ students: user.email });
    } else {
        classes = await Class.find({ admin: user._id });
    }
    res.json({ role: role.name, classes: classes });
};

// Add a new class
exports.addClass = async (req, res) => {
    try {
        const user = req.user;
        const newClass = new Class({
            title: req.body.title,
            books: req.body.books,
            link: req.body.link,
            admin: user._id,
            students: req.body.students,
            assign: [],
        });
        await newClass.save();
        res.json({ success: 'Added class successfully' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

// Update and existing class
exports.updateClass = async (req, res) => {
    try {
        const cls = await Class.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            books: req.body.books,
            link: req.body.link,
            students: req.body.students,
            assign: req.body.assign,
        });
        res.json({ success: 'Added class successfully' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};
