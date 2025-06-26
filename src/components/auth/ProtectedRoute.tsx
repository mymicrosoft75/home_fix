import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  isAllowed: boolean;
  children: React.ReactNode;
  redirectPath?: string;
  isLoading?: boolean;
  requiredRole?: UserRole;
  userRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  children,
  redirectPath = '/login',
  isLoading = false,
  requiredRole,
  userRole,
}) => {
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    const roleDashboard = {
      admin: '/admin',
      provider: '/provider',
      client: '/',
    }[userRole || 'client'];
    
    return <Navigate to={roleDashboard} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;