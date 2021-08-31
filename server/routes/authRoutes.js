const router = require('express').Router();
const authController = require('../controllers/authController');
// const googleController = require('../controllers/googleController');

// Signup route
router.post('/signup', authController.signup);

// Signin route
router.post('/signin', authController.signin);

// Logout route
router.get('/logout', authController.logout);

// Google stuff
// router.get('/google/login', googleController.login);
// router.get('/google/callback', googleController.callback);
// router.post('/google/signup', googleController.signup);

module.exports = router;
