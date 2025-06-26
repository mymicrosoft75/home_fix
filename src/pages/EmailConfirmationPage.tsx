import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const EmailConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { email, message } = location.state || {
    email: '',
    message: 'Please check your email to confirm your account before logging in.'
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-primary mb-4">
            <Mail size={48} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
          {email && (
            <p className="mt-2 text-sm text-gray-600">
              We sent a confirmation link to<br />
              <strong className="text-gray-900">{email}</strong>
            </p>
          )}
          <p className="mt-4 text-gray-600">{message}</p>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Click the link in your email to confirm your account. If you don't see it, check your spam folder.
          </p>
          
          <div className="text-center">
            <Link
              to="/login"
              className="text-primary hover:text-primary-dark font-medium"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationPage; 