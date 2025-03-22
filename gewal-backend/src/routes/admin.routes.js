const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/admin.middleware');

// Register admin
router.post('/register', adminController.register);

// Login admin
router.post('/login', adminController.login);

// Get current admin
router.get('/me', adminAuth, adminController.getCurrentAdmin);

module.exports = router;