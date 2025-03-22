const FAQ = require('../models/faq.model');

// Get all FAQs (public) - with optional category filter and sorting
exports.getAllFaqs = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const faqs = await FAQ.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-createdBy');
      
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get FAQ by ID (public)
exports.getFaqById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new FAQ (admin only)
exports.createFaq = async (req, res) => {
  try {
    const { question, answer, category, displayOrder } = req.body;
    
    const newFaq = new FAQ({
      question,
      answer,
      category: category || 'General',
      displayOrder: displayOrder || 0,
      createdBy: req.admin.id
    });
    
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update FAQ (admin only)
exports.updateFaq = async (req, res) => {
  try {
    const { question, answer, category, isActive, displayOrder } = req.body;
    
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    // Update fields if provided
    if (question) faq.question = question;
    if (answer) faq.answer = answer;
    if (category) faq.category = category;
    if (isActive !== undefined) faq.isActive = isActive;
    if (displayOrder !== undefined) faq.displayOrder = displayOrder;
    
    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete FAQ (admin only)
exports.deleteFaq = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all categories (public)
exports.getCategories = async (req, res) => {
  try {
    const categories = await FAQ.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};