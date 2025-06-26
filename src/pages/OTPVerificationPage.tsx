import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LocationState {
  email: string;
  password: string;
  userData: {
    full_name: string;
    role: string;
    phone?: string;
    address?: string;
    service_categories?: string[];
    bio?: string;
  };
}

const OTPVerificationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Redirect if no state
    if (!state?.email || !state?.password || !state?.userData) {
      navigate('/register', { replace: true });
      return;
    }
    
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    startCountdown();
  }, [navigate, state]);

  const startCountdown = () => {
    setCanResend(false);
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyAndCreateAccount = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Verify the OTP
      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        email: state.email,
        token: otpString,
        type: 'signup'
      });

      if (verifyError) throw verifyError;

      // Step 2: Create profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: verifyData.user?.id,
            email: state.email,
            name: state.userData.full_name,
            role: state.userData.role,
            phone: state.userData.phone,
            address: state.userData.address,
            service_categories: state.userData.service_categories,
            bio: state.userData.bio
          }
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new Error('Failed to create user profile');
      }

      // Step 3: Sign out the user so they can log in with their credentials
      await supabase.auth.signOut();

      // Step 4: Redirect to login with success message
      navigate('/login', {
        replace: true,
        state: {
          message: 'Account verified successfully! Please sign in with your credentials.',
          email: state.email
        }
      });

    } catch (err: any) {
      console.error('Error during verification:', err);
      setError(err.message || 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
        options: {
          data: {
            full_name: state.userData.full_name,
            role: state.userData.role
          }
        }
      });

      if (error) throw error;
      startCountdown();
      setError('New verification code sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We've sent a verification code to <strong>{state?.email}</strong>
          </p>
          
          <div className="flex justify-center gap-2" onKeyDown={(e) => e.key === "Enter" && verifyAndCreateAccount()}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                disabled={isLoading}
                aria-label={`Digit ${index + 1} of verification code`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>
          
          {error && (
            <p className={`text-sm ${error.includes('sent') ? 'text-green-600' : 'text-error'}`}>
              {error}
            </p>
          )}
          
          <button
            onClick={verifyAndCreateAccount}
            disabled={isLoading || otp.join('').length !== 6}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify & Create Account'}
          </button>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{' '}
            <button 
              onClick={resendOTP}
              disabled={!canResend || isLoading}
              className={`font-medium ${canResend ? 'text-primary hover:underline' : 'text-gray-400'}`}
            >
              {canResend ? 'Resend code' : `Resend in ${countdown}s`}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;