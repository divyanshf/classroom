const router = require('express').Router();
const authController = require('../controllers/authController');
const classController = require('../controllers/classController');
const postsController = require('../controllers/postsController');
const assignController = require('../controllers/assignController');

/* CLASS STUFF */
// Get classes route
router.get('/', authController.isUser, classController.getAllClasses);
router.get(
    '/:id',
    authController.isUser,
    authController.isMember,
    classController.getClassById
);

// Create a new class
router.post('/', authController.isTeacher, classController.addClass);

// Update an existing class
router.patch(
    '/:id',
    authController.isTeacher,
    authController.isMember,
    classController.updateClass
);

/* POSTS STUFF */
// Get all the posts of a class
router.get(
    '/:id/posts',
    authController.isUser,
    authController.isMember,
    postsController.getPostFromClass
);

// Create a post in a class
router.post(
    '/:id/posts',
    authController.isUser,
    authController.isMember,
    postsController.addPostToClass
);

/* ASSIGNMENT STUFF */
// Get assignments
router.get(
    '/:id/assign',
    authController.isUser,
    authController.isMember,
    assignController.getAssignments
);

// Post a assignment
router.post(
    '/:id/assign',
    authController.isTeacher,
    authController.isMember,
    assignController.addAssignment
);

/* JOIN/LEAVE CLASS */
// Join a classroom
router.patch('/join/:id', authController.isStudent, classController.joinUser);

// Unenroll from a class
router.patch(
    '/unenroll/:id',
    authController.isStudent,
    authController.isMember,
    classController.unenroll
);

// Remove a class
router.delete(
    '/:id',
    authController.isTeacher,
    authController.isMember,
    classController.removeClass
);

module.exports = router;
