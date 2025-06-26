import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Briefcase, Phone } from 'lucide-react';
import { UserRole } from '../types';
import { supabase } from '../lib/supabase';

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: defaultRole,
      serviceCategories: [],
    },
  });

  const password = watch('password');

  const toggleRole = (newRole: UserRole) => {
    setRole(newRole);
    setValue('role', newRole, { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Send OTP for email verification.
      const { error: otpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
            phone: data.phone,
            address: data.address,
            serviceCategories: data.serviceCategories,
            bio: data.bio,
          },
        },
      });

      if (otpError) {
        throw otpError;
      }

      // Step 2: Navigate to the verification page, passing all registration data.
      navigate('/verify-otp', {
        state: {
          email: data.email,
          password: data.password,
          userData: {
            full_name: data.name,
            role: data.role,
            phone: data.phone,
            address: data.address,
            service_categories: data.serviceCategories,
            bio: data.bio,
          },
        },
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
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
              disabled={isLoading}
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

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    disabled={isLoading}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
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
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    disabled={isLoading}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                    className={`form-input pl-10 ${
                      errors.confirmPassword ? 'border-error' : ''
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">
                    {errors.confirmPassword.message}
                  </p>
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
                  disabled={isLoading}
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="flex items-center">
                      <input
                        id="category-plumbing"
                        type="checkbox"
                        value="plumbing"
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                    disabled={isLoading}
                    {...register('bio')}
                    className="form-input"
                    placeholder="Tell us about your experience, skills, and expertise..."
                  ></textarea>
                </div>
              </>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                disabled={isLoading}
                {...register('agreeTerms', {
                  required: 'You must agree to the terms and conditions',
                })}
                className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
                  errors.agreeTerms ? 'border-error' : ''
                }`}
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="mt-1 text-sm text-error">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
              {isLoading ? 'Sending Verification Code...' : 'Create Account'}
            </button>
          </div>
        </form>

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