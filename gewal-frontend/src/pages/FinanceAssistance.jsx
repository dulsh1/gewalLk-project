import React, { useState } from 'react';
import { createFinance } from '../services/finance';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const banks = [
  { id: 'BOC', name: 'Bank of Ceylon', info: 'Interest rate around 8.5% with low processing fee' },
  { id: 'CommBank', name: 'Commercial Bank', info: 'Interest rate around 9% with fast approval process' },
  { id: 'Sampath', name: 'Sampath Bank', info: 'Interest rate around 8.8% with flexible repayment options' },
];

const FinancesPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    propertyPrice: 0,
    // Step 2: Loan Details
    downPaymentPercent: 0,  // slider value (0 to 50)
    loanTerm: 5,            // dropdown options: 5,10,15,20,25,30
    interestRate: 8,        // slider value (8 to 20)
    loanType: 'fixed',      // fixed or floating
    paymentFrequency: 'monthly', // monthly or quarterly
    // Step 3: Bank Selection
    bank: '',
    // Step 4: Additional Costs
    propertyTaxes: 0,
    homeInsurance: 0,
    valuationFees: 0,
    legalFees: 0,
  });

  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Loan Details' },
    { id: 3, name: 'Bank Selection' },
    { id: 4, name: 'Additional Costs' },
    { id: 5, name: 'Review & Submit' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    // Calculate derived values:
    const downPaymentAmount = formData.propertyPrice * (formData.downPaymentPercent / 100);
    const loanAmount = formData.propertyPrice - downPaymentAmount;
    const monthlyRate = formData.interestRate / 100 / 12;
    const payments = formData.loanTerm * 12;
    const monthlyPayment = (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -payments));
    const totalInterest = (monthlyPayment * payments) - loanAmount;
    const totalAdditionalCosts = Number(formData.propertyTaxes) + Number(formData.homeInsurance) + Number(formData.valuationFees) + Number(formData.legalFees);
    const totalCost = loanAmount + totalInterest + totalAdditionalCosts;
    
    // Prepare payload for API. Note that property and user can later be replaced with real ids.
    const payload = {
      property: "", // Replace with property id related to propertyPrice if needed.
      user: "",     // Replace with user id collected from authentication if needed.
      loanAmount,
      downPayment: downPaymentAmount,
      interestRate: formData.interestRate,
      loanTerm: formData.loanTerm,
      propertyTaxes: formData.propertyTaxes,
      homeInsurance: formData.homeInsurance,
      valuationFees: formData.valuationFees,
      legalFees: formData.legalFees,
      loanType: formData.loanType,
      paymentFrequency: formData.paymentFrequency
    };

    try {
      const response = await createFinance(payload);
      // Simulate sending an email to bank with the selected bank info.
      alert(`Application submitted successfully! An email has been sent to your selected bank (${formData.bank}).`);
      // Optionally, reset the form here or redirect.
    } catch (error) {
      alert("There was an error submitting the form.");
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Price (LKR)
                </label>
                <input 
                  type="number" 
                  name="propertyPrice" 
                  value={formData.propertyPrice} 
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Loan Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment (% of property price)
                </label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range" 
                    name="downPaymentPercent" 
                    min="0" 
                    max="50"
                    value={formData.downPaymentPercent}
                    onChange={handleNumberChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                  />
                  <span className="text-sm font-medium text-gray-700 min-w-[50px]">
                    {formData.downPaymentPercent}%
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (Years)
                </label>
                <select 
                  name="loanTerm" 
                  value={formData.loanTerm} 
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                >
                  {[5, 10, 15, 20, 25, 30].map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range" 
                    name="interestRate" 
                    min="8" 
                    max="20"
                    value={formData.interestRate}
                    onChange={handleNumberChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                  />
                  <span className="text-sm font-medium text-gray-700 min-w-[50px]">
                    {formData.interestRate}%
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type
                </label>
                <select 
                  name="loanType" 
                  value={formData.loanType} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                >
                  <option value="fixed">Fixed</option>
                  <option value="floating">Floating</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Frequency
                </label>
                <select 
                  name="paymentFrequency" 
                  value={formData.paymentFrequency} 
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Bank Selection</h2>
            
            <div className="space-y-4">
              {banks.map(bank => (
                <div key={bank.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input 
                    type="radio" 
                    id={bank.id}
                    name="bank" 
                    value={bank.name}
                    checked={formData.bank === bank.name}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                  />
                  <label htmlFor={bank.id} className="ml-3 cursor-pointer block">
                    <span className="block text-sm font-medium text-gray-900">{bank.name}</span>
                    <span className="block text-sm text-gray-500">{bank.info}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Additional Costs</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Taxes (LKR)
                </label>
                <input 
                  type="number" 
                  name="propertyTaxes" 
                  value={formData.propertyTaxes} 
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Home Insurance (LKR)
                </label>
                <input 
                  type="number" 
                  name="homeInsurance" 
                  value={formData.homeInsurance} 
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valuation Fees (LKR)
                </label>
                <input 
                  type="number" 
                  name="valuationFees" 
                  value={formData.valuationFees} 
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Legal Fees (LKR)
                </label>
                <input 
                  type="number" 
                  name="legalFees" 
                  value={formData.legalFees} 
                  onChange={handleNumberChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>
        );
      case 5:
        {
          const downPaymentAmount = formData.propertyPrice * (formData.downPaymentPercent / 100);
          const loanAmount = formData.propertyPrice - downPaymentAmount;
          const monthlyRate = formData.interestRate / 100 / 12;
          const payments = formData.loanTerm * 12;
          const monthlyPayment = (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -payments));
          const totalInterest = (monthlyPayment * payments) - loanAmount;
          const totalAdditionalCosts = Number(formData.propertyTaxes) + Number(formData.homeInsurance) + Number(formData.valuationFees) + Number(formData.legalFees);
          const totalCost = loanAmount + totalInterest + totalAdditionalCosts;
          
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Review and Submit</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Loan Summary</h3>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Property Price:</span>
                      <span className="text-sm font-medium">LKR {formData.propertyPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Down Payment:</span>
                      <span className="text-sm font-medium">LKR {downPaymentAmount.toFixed(2)} ({formData.downPaymentPercent}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Loan Amount:</span>
                      <span className="text-sm font-medium">LKR {loanAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Loan Term:</span>
                      <span className="text-sm font-medium">{formData.loanTerm} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Interest Rate:</span>
                      <span className="text-sm font-medium">{formData.interestRate}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Loan Type:</span>
                      <span className="text-sm font-medium capitalize">{formData.loanType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Payment Frequency:</span>
                      <span className="text-sm font-medium capitalize">{formData.paymentFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Monthly Payment:</span>
                      <span className="text-sm font-medium">LKR {monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Interest:</span>
                      <span className="text-sm font-medium">LKR {totalInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Cost:</span>
                      <span className="text-sm font-medium">LKR {totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    By submitting this application, you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          );
        }
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Finance Application</h1>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="relative flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step > stepItem.id ? 'bg-blue-600 border-blue-600' : 
                step === stepItem.id ? 'border-blue-600 text-blue-600' : 
                'border-gray-300 text-gray-300'
              }`}>
                {step > stepItem.id ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <span className="text-sm font-medium">{stepItem.id}</span>
                )}
              </div>
              <div className="mt-2 text-xs text-center">{stepItem.name}</div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-10 w-full h-[2px] ${
                  step > stepItem.id ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        {renderStep()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button 
            type="button" 
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </button>
        )}
        
        {step < 5 ? (
          <button 
            type="button" 
            onClick={nextStep}
            className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button 
            type="button" 
            onClick={handleSubmit}
            className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
};

export default FinancesPage;