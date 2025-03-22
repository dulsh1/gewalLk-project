import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    // For admin endpoints
    if (config.url.includes('/admin') || config.adminAuth) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        config.headers['x-auth-token'] = adminToken;
      }
    } 
    // For user endpoints
    else if (config.userAuth) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        config.headers['x-auth-token'] = userToken;
      }
    }
    
    // Remove custom property before sending
    delete config.adminAuth;
    delete config.userAuth;
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;