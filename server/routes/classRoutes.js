const router = require('express').Router();
const authController = require('../controllers/authController');
const classController = require('../controllers/classController');

// Get classes route
router.get('/', authController.isUser, classController.getAllClasses);

// Create a new class
router.post('/', authController.isTeacher, classController.addClass);

// Update an existing class
router.patch('/:id', authController.isTeacher, classController.updateClass);

module.exports = router;
