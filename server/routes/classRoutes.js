const router = require('express').Router();
const authController = require('../controllers/authController');
const classController = require('../controllers/classController');
const postsController = require('../controllers/postsController');

// Get classes route
router.get('/', authController.isUser, classController.getAllClasses);
router.get('/:id', authController.isUser, classController.getClassById);

// Create a new class
router.post('/', authController.isTeacher, classController.addClass);

// Update an existing class
router.patch('/:id', authController.isTeacher, classController.updateClass);

// Get all the posts of a class
router.get(
    '/:id/posts',
    authController.isUser,
    postsController.getPostFromClass
);

// Create a post in a class
router.post(
    '/:id/posts',
    authController.isUser,
    postsController.addPostToClass
);

// Update an existing post
router.patch('/posts/:id', authController.isUser, postsController.updatePost);

// Join a classroom
router.post('/join/:id', authController.isStudent, classController.joinUser);

module.exports = router;
