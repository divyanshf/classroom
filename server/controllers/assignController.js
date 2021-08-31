const { Assign } = require('../models/Assign');
const { Class } = require('../models/Class');
const { User } = require('../models/User');

// Get assignments
exports.getAssignments = async (req, res) => {
    try {
        const assigns = await Assign.find({ classID: req.params.id }).sort({
            due: -1,
        });
        res.json({ assigns });
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Get assign by assign id
exports.getAssignmentById = async (req, res) => {
    const user = req.user;
    try {
        const assign = await Assign.findById(req.params.id);
        if (!assign) throw "Assignment doesn't exist";
        const cls = await Class.findById(assign.classID);
        if (
            cls.admin.user.toString() === user._id ||
            cls.students.filter((stud) => stud.user === user.email).length > 0
        ) {
            res.json({ assign });
            return;
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Add assignment by class id
exports.addAssignment = async (req, res) => {
    try {
        const cls = await Class.findById(req.params.id);
        if (!cls) throw 'Class unavailable';
        const assign = new Assign({
            title: req.body.title,
            questions: req.body.questions,
            submissions: [],
            classID: req.params.id,
            due: new Date(req.body.due),
        });
        await assign.save();
        res.json({ success: 'Created assignment successfully' });
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Patch assignment by assignment id
exports.updateAssignment = async (req, res) => {
    const user = req.user;
    try {
        const assign = await Assign.findById(req.params.id);
        if (!assign) throw "Assignment doesn't exist";
        const cls = await Class.findById(assign.classID);
        if (cls.admin.user.toString() === user._id) {
            await Assign.findByIdAndUpdate(req.params.id, {
                $set: {
                    title: req.body.title || assign.title,
                    questions: req.body.questions || assign.questions,
                    due: new Date(req.body.due) || assign.due,
                },
            });
            res.json({ success: 'Successfully updated assignment' });
            return;
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};

// Submit solution for assignment by id
exports.submitSol = async (req, res) => {
    const user = req.user;
    try {
        const assign = await Assign.findById(req.params.id);
        if (!assign) throw "Assignment doesn't exist";
        if (
            assign.submissions.filter((sub) => sub.user === user.email).length >
            0
        ) {
            throw 'You have already submitted the assignment.';
        }
        const cls = await Class.findById(assign.classID);
        if (
            cls.students.filter((stud) => stud.user === user.email).length > 0
        ) {
            const subs = req.body;
            console.log(subs)
            let points = 0;
   
            assign.questions.forEach((question, index)=>{
                if(subs.hasOwnProperty(question._id) && subs[question._id] === question.correct){
                    points += question.points
                }
            })

            await Assign.findByIdAndUpdate(req.params.id, {
                $push: {
                    submissions: {
                        user: user.email,
                        points: points,
                    },
                },
            });
            res.json({ success: 'Successfully submitted solution' });
            return;
        }
        throw 'Unauthorized User';
    } catch (e) {
        res.json({ error: e || 'Something went wrong' });
    }
};
