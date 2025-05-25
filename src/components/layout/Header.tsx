import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, Home, Wrench, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

// This would come from authentication context in a real app
const isAuthenticated = false;
const userRole = 'client';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

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
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-2">
                <Link to="/services?category=plumbing" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Plumbing</Link>
                <Link to="/services?category=electrical" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Electrical</Link>
                <Link to="/services?category=cleaning" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Cleaning</Link>
                <Link to="/services?category=carpentry" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Carpentry</Link>
                <Link to="/services?category=painting" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">Painting</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && (
                <Link to="/admin" className="btn btn-ghost btn-sm">
                  Admin
                </Link>
              )}
              {userRole === 'provider' && (
                <Link to="/provider" className="btn btn-ghost btn-sm">
                  Dashboard
                </Link>
              )}
              <Link to="/profile" className="btn btn-outline btn-sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </>
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
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <Home className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold">HomeFix</span>
          </Link>
          <button onClick={closeMenu} className="text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className={cn(
              "flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-muted transition-colors",
              isActive('/') && "bg-muted text-primary"
            )}
          >
            <Home className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link
            to="/services"
            onClick={closeMenu}
            className={cn(
              "flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-muted transition-colors",
              isActive('/services') && "bg-muted text-primary"
            )}
          >
            <Wrench className="h-5 w-5 mr-3" />
            Services
          </Link>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Admin Dashboard
                </Link>
              )}
              {userRole === 'provider' && (
                <Link
                  to="/provider"
                  onClick={closeMenu}
                  className="flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Provider Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-muted transition-colors"
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full btn btn-outline"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full btn btn-primary"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;