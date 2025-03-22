import api from './api';

const authService = {
  // Admin auth
  adminLogin: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
    }
    return response.data;
  },
  
  adminRegister: async (userData) => {
    const response = await api.post('/admin/register', userData);
    return response.data;
  },
  
  adminLogout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
  },
  
  // User auth
  userLogin: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  userRegister: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  userLogout: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('userToken') !== null || localStorage.getItem('adminToken') !== null;
  },
  
  // Check auth type
  getAuthType: () => {
    if (localStorage.getItem('adminToken')) return 'admin';
    if (localStorage.getItem('userToken')) return 'user';
    return null;
  },
  
  // Get current user/admin info
  getCurrentUser: () => {
    const userInfo = localStorage.getItem('userInfo');
    const adminInfo = localStorage.getItem('adminInfo');
    
    if (userInfo) return JSON.parse(userInfo);
    if (adminInfo) return JSON.parse(adminInfo);
    
    return null;
  }
};

export default authService;