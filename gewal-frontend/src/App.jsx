import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Provider
import { AuthProvider } from './context/AuthContext';

// Common components
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// User components
import UserLogin from './components/user/auth/UserLogin';
import UserRegister from './components/user/auth/UserRegister';
import UserDashboard from './components/user/layouts/UserDashboard';
import UserProfile from './components/user/profile/UserProfile';

// Admin components
import AdminLogin from './components/admin/auth/AdminLogin';
import AdminRegister from './components/admin/auth/AdminRegister';
import AdminDashboard from './components/admin/layouts/AdminDashboard';
import FAQManagement from './components/admin/faq/FAQManagement';
import AdminOverview from './components/admin/dashboard/AdminOverview';

// Protected routes
import { UserProtectedRoute, AdminProtectedRoute } from './components/common/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* User Auth Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          
          {/* Protected User Routes */}
          <Route element={<UserProtectedRoute />}>
            <Route path="/dashboard" element={<UserDashboard />}>
              <Route index element={<UserProfile />} />
              {/* Add more user routes here */}
            </Route>
          </Route>
          
          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          
          {/* Protected Admin Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="faqs" element={<FAQManagement />} />
              {/* Add more admin routes here */}
            </Route>
          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;