const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userAuth = require('../middleware/user.middleware');

// Register user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get current user
router.get('/me', userAuth, userController.getCurrentUser);

module.exports = router;