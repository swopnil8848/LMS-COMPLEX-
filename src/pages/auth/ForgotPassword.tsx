import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword, clearErrors } from '../../features/auth/authSlice';
import type { RootState, AppDispatch } from '../../app/store'; // Adjust import path as needed

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, message, errors } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear errors when user starts typing
    if (emailError) {
      setEmailError('');
    }
    if (errors.email) {
      dispatch(clearErrors());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Clear any previous errors
    setEmailError('');

    try {
      const result = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(result)) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  // Show success message if email was sent successfully
  if (isSubmitted && message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Check Your Email
            </h2>
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-700 font-medium">Email sent successfully!</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                We've sent a password reset link to:
              </p>
              <p className="text-sm font-medium text-gray-900 mt-1">{email}</p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {message}
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-center text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                  dispatch(clearErrors());
                }}
                className="w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  emailError || errors.email
                    ? 'border-red-300 placeholder-red-500 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                } focus:z-10 sm:text-sm`}
                placeholder="Enter your email address"
              />
            </div>
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Display general error message */}
          {message && !isSubmitted && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{message}</p>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || !email.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Email...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;