const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');
const adminAuth = require('../middleware/admin.middleware');

// Public routes
router.get('/', faqController.getAllFaqs);
router.get('/categories', faqController.getCategories);
router.get('/:id', faqController.getFaqById);

// Admin routes
router.post('/', adminAuth, faqController.createFaq);
router.put('/:id', adminAuth, faqController.updateFaq);
router.delete('/:id', adminAuth, faqController.deleteFaq);

module.exports = router;