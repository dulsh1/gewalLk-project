const Finance = require('../models/financeAssistance.model');

// @desc    Create a new finance application
// @route   POST /api/finance
// @access  Public
exports.createFinance = async (req, res) => {
  try {
    const {
      property,
      user,
      loanAmount,
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxes,
      homeInsurance,
      valuationFees,
      legalFees,
      loanType,
      paymentFrequency
    } = req.body;

    const finance = new Finance({
      property,
      user,
      loanAmount,
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxes: propertyTaxes || 0,
      homeInsurance: homeInsurance || 0,
      valuationFees: valuationFees || 0,
      legalFees: legalFees || 0,
      loanType: loanType || 'fixed',
      paymentFrequency: paymentFrequency || 'monthly'
    });

    const createdFinance = await finance.save();
    res.status(201).json(createdFinance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all finance applications
// @route   GET /api/finance
// @access  Public
exports.getAllFinance = async (req, res) => {
  try {
    const finances = await Finance.find({});
    res.status(200).json(finances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single finance application by ID
// @route   GET /api/finance/:id
// @access  Public
exports.getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);

    if (!finance) {
      return res.status(404).json({ message: 'Finance application not found' });
    }

    res.status(200).json(finance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a finance application
// @route   PUT /api/finance/:id
// @access  Public
exports.updateFinance = async (req, res) => {
  try {
    const {
      property,
      user,
      loanAmount,
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxes,
      homeInsurance,
      valuationFees,
      legalFees,
      loanType,
      paymentFrequency
    } = req.body;

    const finance = await Finance.findById(req.params.id);

    if (!finance) {
      return res.status(404).json({ message: 'Finance application not found' });
    }

    // Update fields
    finance.property = property || finance.property;
    finance.user = user || finance.user;
    finance.loanAmount = loanAmount || finance.loanAmount;
    finance.downPayment = downPayment || finance.downPayment;
    finance.interestRate = interestRate || finance.interestRate;
    finance.loanTerm = loanTerm || finance.loanTerm;
    finance.propertyTaxes = propertyTaxes || finance.propertyTaxes;
    finance.homeInsurance = homeInsurance || finance.homeInsurance;
    finance.valuationFees = valuationFees || finance.valuationFees;
    finance.legalFees = legalFees || finance.legalFees;
    finance.loanType = loanType || finance.loanType;
    finance.paymentFrequency = paymentFrequency || finance.paymentFrequency;

    const updatedFinance = await finance.save();
    res.status(200).json(updatedFinance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a finance application
// @route   DELETE /api/finance/:id
// @access  Public
exports.deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);

    if (!finance) {
      return res.status(404).json({ message: 'Finance application not found' });
    }

    await Finance.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Finance application removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};