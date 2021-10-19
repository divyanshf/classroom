const mongoose = require('mongoose');
const { Assign } = require('../models/Assign');
const { Class } = require('../models/Class');
const { Post } = require('../models/Post');
const { Role } = require('../models/Role');

// Get all classes with the respective user and role
exports.getAllClasses = async (req, res) => {
    const user = req.user;
    try {
        const role = await Role.findById(user.role);
        let classes = [];
        if (role.name === 'Student') {
            classes = await Class.find({
                students: { $elemMatch: { user: user.email } },
            });
        } else if (role.name === 'Teacher') {
            classes = await Class.find({ 'admin.user': user._id });
        } else {
            throw 'Unauthorized User';
        }
        res.json({ classes });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};
exports.getClassById = async (req, res) => {
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) throw 'Class unavailable';
        res.json({ class: cls });
        return;
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

// Add a new class
exports.addClass = async (req, res) => {
    const user = req.user;
    //creating the meet link
    function makeid() {
        var secret_text="";
        var possible_text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i=0;i<10;i++)
        {
            secret_text+=possible_text.charAt(Math.floor(Math.random()*possible_text.length));
        }

        return secret_text;
    }
    //actual meet link
    const meet = `meet.google.com/lookup/${makeid()}`;

    try {
        const newClass = new Class({
            title: req.body.title,
            subjectCode: req.body.subjectCode,
            books: req.body.books,
            link: meet,
            admin: {
                user: user._id,
                name: user.username,
            },
            students: req.body.students,
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
        if (!cls) throw 'Class unavailable';
        await Class.findByIdAndUpdate(req.params.id, {
            title: req.body.title || cls.title,
            subjectCode: req.body.subjectCode || cls.subjectCode,
            books: req.body.books || cls.books,
            link: req.body.link || cls.link,
            students: req.body.students || cls.students,
        });
        res.json({ success: 'Added class successfully' });
        return;
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

// Join a class by class code
exports.joinUser = async (req, res) => {
    const user = req.user;
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) throw 'Class unavailable';
        if (
            cls.students.filter((stud) => stud.user === user.email).length > 0
        ) {
            res.json({ error: 'Already a student of the class' });
            return;
        }
        await Class.updateOne(
            { _id: cls._id },
            { $push: { students: { user: user.email } } }
        );
        res.json({ success: 'Student added to the class' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

// Unenroll from a class by class code
exports.unenroll = async (req, res) => {
    const user = req.user;
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) throw 'Class unavailable';
        await Class.updateOne(
            { _id: cls._id },
            { $pull: { students: { user: user.email } } }
        );
        res.json({ success: 'Student unenrolled from the class' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};

// Delete a class
exports.removeClass = async (req, res) => {
    try {
        await Assign.deleteMany({
            classID: mongoose.Types.ObjectId(req.params.id),
        });
        await Post.deleteMany({
            classID: mongoose.Types.ObjectId(req.params.id),
        });
        await Class.findByIdAndDelete(req.params.id);
        res.json({ success: 'Removed the class successfully' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong!' });
    }
};
