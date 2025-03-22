import api from './api';

const faqService = {
  // Public endpoints
  getAllFaqs: async (category = null) => {
    try {
      const url = category ? `/faqs?category=${category}` : '/faqs';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
  },
  
  getFaqById: async (id) => {
    const response = await api.get(`/faqs/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    try {
      const response = await api.get('/faqs/categories');
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  
  // Admin endpoints
  createFaq: async (faqData) => {
    const response = await api.post('/faqs', faqData, { adminAuth: true });
    return response.data;
  },
  
  updateFaq: async (id, faqData) => {
    const response = await api.put(`/faqs/${id}`, faqData, { adminAuth: true });
    return response.data;
  },
  
  deleteFaq: async (id) => {
    const response = await api.delete(`/faqs/${id}`, { adminAuth: true });
    return response.data;
  }
};

export default faqService;