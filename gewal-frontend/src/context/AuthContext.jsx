import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: false,
    user: null,
    userType: null, // 'user' or 'admin'
    loading: true
  });

  // Check for tokens on initial load
  useEffect(() => {
    const checkAuth = () => {
      // Check for user auth
      const userToken = localStorage.getItem('userToken');
      const userInfo = localStorage.getItem('userInfo');
      
      // Check for admin auth
      const adminToken = localStorage.getItem('adminToken');
      const adminInfo = localStorage.getItem('adminInfo');
      
      if (userToken && userInfo) {
        setUserAuth({
          isAuthenticated: true,
          user: JSON.parse(userInfo),
          userType: 'user',
          loading: false
        });
      } else if (adminToken && adminInfo) {
        setUserAuth({
          isAuthenticated: true,
          user: JSON.parse(adminInfo),
          userType: 'admin',
          loading: false
        });
      } else {
        setUserAuth({
          isAuthenticated: false,
          user: null,
          userType: null,
          loading: false
        });
      }
    };
    
    checkAuth();
  }, []);

  // Login user
  const loginUser = (userData, token) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    
    setUserAuth({
      isAuthenticated: true,
      user: userData,
      userType: 'user',
      loading: false
    });
  };

  // Login admin
  const loginAdmin = (adminData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminInfo', JSON.stringify(adminData));
    
    setUserAuth({
      isAuthenticated: true,
      user: adminData,
      userType: 'admin',
      loading: false
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    
    setUserAuth({
      isAuthenticated: false,
      user: null,
      userType: null,
      loading: false
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...userAuth, 
        loginUser, 
        loginAdmin, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};