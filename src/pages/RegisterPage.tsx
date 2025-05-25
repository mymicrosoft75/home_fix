import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone, Home, Briefcase } from 'lucide-react';
import { UserRole } from '../types';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
  role: UserRole;
  serviceCategories?: string[];
  bio?: string;
  agreeTerms: boolean;
}

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') || 'client') as UserRole;
  const [role, setRole] = useState<UserRole>(defaultRole);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    defaultValues: {
      role: defaultRole,
      serviceCategories: [],
    },
  });
  
  const password = watch('password');
  
  const onSubmit = (data: RegisterFormData) => {
    // Here we'd handle registration
    console.log('Register attempt:', data);
  };

  const toggleRole = (newRole: UserRole) => {
    setRole(newRole);
  };
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-muted-foreground">
            Join HomeFix and get access to professional home services
          </p>
        </div>
        
        {/* Account Type Toggle */}
        <div className="mt-6">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => toggleRole('client')}
              className={`relative w-1/2 py-2 text-sm font-medium rounded-l-md ${
                role === 'client'
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted-foreground hover:bg-gray-50 border border-border'
              }`}
            >
              <User className="h-4 w-4 inline-block mr-1" />
              I need a service
            </button>
            <button
              type="button"
              onClick={() => toggleRole('provider')}
              className={`relative w-1/2 py-2 text-sm font-medium rounded-r-md ${
                role === 'provider'
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted-foreground hover:bg-gray-50 border border-border'
              }`}
            >
              <Briefcase className="h-4 w-4 inline-block mr-1" />
              I provide services
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <input type="hidden" {...register('role')} value={role} />
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Full name is required' })}
                  className={`form-input pl-10 ${errors.name ? 'border-error' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`form-input pl-10 ${errors.email ? 'border-error' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                    className={`form-input pl-10 ${errors.password ? 'border-error' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className={`form-input pl-10 ${errors.confirmPassword ? 'border-error' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="form-input pl-10"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            
            {/* Provider-specific fields */}
            {role === 'provider' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Service Categories
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input
                        id="category-plumbing"
                        type="checkbox"
                        value="plumbing"
                        {...register('serviceCategories')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="category-plumbing" className="ml-2 text-sm">
                        Plumbing
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="category-electrical"
                        type="checkbox"
                        value="electrical"
                        {...register('serviceCategories')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="category-electrical" className="ml-2 text-sm">
                        Electrical
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="category-cleaning"
                        type="checkbox"
                        value="cleaning"
                        {...register('serviceCategories')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="category-cleaning" className="ml-2 text-sm">
                        Cleaning
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="category-carpentry"
                        type="checkbox"
                        value="carpentry"
                        {...register('serviceCategories')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="category-carpentry" className="ml-2 text-sm">
                        Carpentry
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="category-painting"
                        type="checkbox"
                        value="painting"
                        {...register('serviceCategories')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="category-painting" className="ml-2 text-sm">
                        Painting
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="category-gardening"
                        type="checkbox"
                        value="gardening"
                        {...register('serviceCategories')}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="category-gardening" className="ml-2 text-sm">
                        Gardening
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-1">
                    Professional Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    {...register('bio')}
                    className="form-input"
                    placeholder="Tell us about your experience, skills, and expertise..."
                  ></textarea>
                </div>
              </>
            )}
            
            <div className="flex items-center">
              <input
                id="agreeTerms"
                type="checkbox"
                {...register('agreeTerms', { 
                  required: 'You must agree to the terms and conditions' 
                })}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="agreeTerms" className="ml-2 text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-sm text-error">{errors.agreeTerms.message}</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Create Account
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="btn btn-outline flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                  fill="#4285F4"
                />
                <path
                  d="M12.956 16.455c-1.293 0-2.395-.437-3.195-1.187l-2.6 2.6c1.584 1.381 3.615 2.233 5.795 2.233 3.249 0 6.051-1.836 7.439-4.739h-4.689c-.865.815-2.039 1.093-2.75 1.093z"
                  fill="#34A853"
                />
                <path
                  d="M4.022 12.956a5.24 5.24 0 0 1-.306-1.777c0-.619.11-1.216.306-1.777l-2.857-2.193C.561 8.605 0 10.289 0 12s.561 3.394 1.165 4.79l2.857-2.193z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.956 5.401c1.622 0 3.081.555 4.242 1.645l2.302-2.302C17.551 2.935 15.42 2 12.956 2 9.076 2 5.766 4.13 3.667 7.332l2.857 2.193c.681-2.037 2.591-4.124 6.432-4.124z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="btn btn-outline flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;