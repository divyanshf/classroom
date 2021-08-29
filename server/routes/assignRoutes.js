const router = require('express').Router();
const authController = require('../controllers/authController');
const assignController = require('../controllers/assignController');

// Get assignment by id
router.get('/:id', authController.isUser, assignController.getAssignmentById);

// Update assignment by id
router.patch(
    '/:id',
    authController.isTeacher,
    assignController.updateAssignment
);

// Submit assignment by id
router.patch(
    '/:id/submit',
    authController.isStudent,
    assignController.submitSol
);

module.exports = router;
