import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, Home, Wrench, Calendar, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { signOut } from '../../lib/supabase';

const Header: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const isActive = (path: string) => location.pathname === path;

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'provider':
        return '/provider';
      default:
        return '/';
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <Home className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold">HomeFix</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              isActive('/') && "text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            to="/services" 
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              isActive('/services') && "text-primary"
            )}
          >
            Services
          </Link>
        </nav>

        {/* Desktop Auth/Profile Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
                <span>My Account</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeMenu}
                    >
                      {userRole === 'admin' ? 'Admin Dashboard' : 
                       userRole === 'provider' ? 'Provider Dashboard' : 
                       'My Dashboard'}
                    </Link>
                    {userRole === 'client' && (
                      <>
                        <Link
                          to="/bookings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMenu}
                        >
                          My Bookings
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMenu}
                        >
                          Profile Settings
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg">
          <nav className="container py-4">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className={cn(
                  "px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md",
                  isActive('/') && "text-primary"
                )}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={cn(
                  "px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md",
                  isActive('/services') && "text-primary"
                )}
                onClick={closeMenu}
              >
                Services
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md"
                    onClick={closeMenu}
                  >
                    {userRole === 'admin' ? 'Admin Dashboard' : 
                     userRole === 'provider' ? 'Provider Dashboard' : 
                     'My Dashboard'}
                  </Link>
                  {userRole === 'client' && (
                    <>
                      <Link
                        to="/bookings"
                        className="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md"
                        onClick={closeMenu}
                      >
                        My Bookings
                      </Link>
                      <Link
                        to="/profile"
                        className="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md"
                        onClick={closeMenu}
                      >
                        Profile Settings
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md text-left text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-md"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;