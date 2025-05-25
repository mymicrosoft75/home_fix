import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { UserRole } from './types';

// Create a client
const queryClient = new QueryClient();

function App() {
  // This would be replaced with actual authentication state
  const isAuthenticated = false;
  const userRole: UserRole = 'client';

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="login" element={
              isAuthenticated ? <Navigate to="/" /> : <LoginPage />
            } />
            <Route path="register" element={
              isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
            } />

            {/* Protected client routes */}
            <Route path="booking/:serviceId" element={
              <ProtectedRoute isAllowed={isAuthenticated && userRole === 'client'}>
                <BookingPage />
              </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="admin/*" element={
              <ProtectedRoute isAllowed={isAuthenticated && userRole === 'admin'}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Provider routes */}
            <Route path="provider/*" element={
              <ProtectedRoute isAllowed={isAuthenticated && userRole === 'provider'}>
                <ProviderDashboard />
              </ProtectedRoute>
            } />

            {/* 404 - Not found */}
            <Route path="*" element={<div className="container py-20 text-center">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="mb-8">The page you are looking for does not exist.</p>
              <a href="/" className="btn btn-primary">Go Home</a>
            </div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;