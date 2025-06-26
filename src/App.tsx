import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import EmailConfirmationPage from './pages/EmailConfirmationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import AdminServices from './pages/admin/AdminServices';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ProviderOverview from './pages/provider/ProviderOverview';
import ProviderBookings from './pages/provider/ProviderBookings';
import ProviderSchedule from './pages/provider/ProviderSchedule';
import ProviderProfile from './pages/provider/ProviderProfile';
import { AuthProvider } from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-otp" element={<OTPVerificationPage />} />
        <Route path="email-confirmation" element={<EmailConfirmationPage />} />
        <Route path="booking/:serviceId" element={<BookingPage />} />

        {/* 404 for public routes */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full text-center">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
            </div>
          </div>
        } />
      </Route>

      {/* Admin routes - Unprotected for testing */}
      <Route path="admin" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* Provider routes - Unprotected for testing */}
      <Route path="provider" element={<ProviderDashboard />}>
        <Route index element={<ProviderOverview />} />
        <Route path="bookings" element={<ProviderBookings />} />
        <Route path="schedule" element={<ProviderSchedule />} />
        <Route path="profile" element={<ProviderProfile />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;