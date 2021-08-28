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
    res.json({ classes });
};
exports.getClassById = async (req, res) => {
    const user = req.user;
    const cls = await Class.findById(req.params.id);
    if (cls.admin === user._id || user.email in cls.students) {
        res.json({ class: cls });
        return;
    }
    res.json({ error: 'Unauthorized user.' });
};

// Add a new class
exports.addClass = async (req, res) => {
    const user = req.user;
    try {
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
        const cls = await Class.findById(req.params.id);
        if (cls.admin === user._id) {
            await Class.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                books: req.body.books,
                link: req.body.link,
                students: req.body.students,
                assign: req.body.assign,
            });
            res.json({ success: 'Added class successfully' });
            return;
        }
        throw 'Unauthorized User.';
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};
