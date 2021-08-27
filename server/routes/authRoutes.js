const router = require('express').Router();
const authController = require('../controllers/authController');

// Signup route
router.post('/signup', authController.signup);

// Signin route
router.post('/signin', authController.signin);

module.exports = router;
