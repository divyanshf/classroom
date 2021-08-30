const router = require('express').Router();
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

// Update an existing post
router.patch('/:id', authController.isUser, postsController.updatePost);

module.exports = router;
