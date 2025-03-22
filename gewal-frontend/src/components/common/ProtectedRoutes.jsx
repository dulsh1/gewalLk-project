import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Protected route for users
export const UserProtectedRoute = () => {
  const { isAuthenticated, loading, userType } = useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || userType !== 'user') {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Protected route for admins
export const AdminProtectedRoute = () => {
  const { isAuthenticated, loading, userType } = useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || userType !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
};