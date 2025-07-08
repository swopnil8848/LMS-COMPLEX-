import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword, clearErrors } from '../../features/auth/authSlice';
import type { RootState, AppDispatch } from '../../app/store'; // Adjust import path as needed

interface PasswordValidation {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
  hasMinLength: boolean;
}

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { resetToken } = useParams<{ resetToken: string }>();
  const { loading, message, errors, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Redirect if user is authenticated (password reset successful)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Adjust redirect path as needed
    }
  }, [isAuthenticated, navigate]);

  // Validate password requirements
  useEffect(() => {
    const validatePassword = () => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasMinLength = password.length >= 8;

      setPasswordValidation({
        hasUpperCase,
        hasLowerCase,
        hasSpecialChar,
        hasMinLength,
      });
    };

    validatePassword();
  }, [password]);

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const canSubmit = isPasswordValid && passwordsMatch && password && confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit || !resetToken) {
      return;
    }

    try {
      await dispatch(resetPassword({
        resetToken: resetToken,
        password
      }));
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className={`flex items-center text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
      <span className="mr-2">{isValid ? '✓' : '✗'}</span>
      {text}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border ${
                  errors.password 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Password Requirements */}
          {password && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
              <div className="space-y-1">
                <ValidationItem isValid={passwordValidation.hasMinLength} text="At least 8 characters" />
                <ValidationItem isValid={passwordValidation.hasUpperCase} text="At least one uppercase letter" />
                <ValidationItem isValid={passwordValidation.hasLowerCase} text="At least one lowercase letter" />
                <ValidationItem isValid={passwordValidation.hasSpecialChar} text="At least one special character" />
              </div>
            </div>
          )}

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border ${
                  (!passwordsMatch && confirmPassword) || errors.confirmPassword
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                )}
              </button>
            </div>
            {!passwordsMatch && confirmPassword && (
              <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
            )}
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Display general error message */}
          {message && !isAuthenticated && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !canSubmit}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || !canSubmit
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Resetting Password...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;