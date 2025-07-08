// components/auth/Login.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { loginUser, clearErrors, clearFieldError, resetPassword } from "../../features/auth/authSlice";
import type { LoginRequest } from "../../types/auth.types";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, errors, message } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      dispatch(clearFieldError(name));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      // Error is handled by the rejected case in the slice
      console.error("Login failed:", error);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return touched[fieldName] ? errors[fieldName] : undefined;
  };

  const hasFieldError = (fieldName: string): boolean => {
    return Boolean(touched[fieldName] && errors[fieldName]);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Hero/Image Section - Better responsive widths */}
      <div className="
        hidden md:block 
        w-full lg:w-2/5 xl:w-1/2
        relative overflow-hidden 
        min-h-[40vh] md:min-h-[50vh] lg:min-h-screen
        bg-[url('src/assets/login_page_photo.jpg')] bg-center bg-cover
      ">
        <div className="absolute inset-0 bg-[#1D5698]/90 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4">
                Welcome
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Fixed responsive widths for full tablet coverage */}
      <div className="
        w-full lg:w-3/5 xl:w-1/2
        flex flex-col justify-center
        p-4 sm:p-6 md:p-12 lg:p-12 xl:p-16
        min-h-screen lg:min-h-auto
        bg-white lg:bg-gray-50
      ">
        {/* Form Container with better max widths */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto">
          <div className="bg-white rounded-none lg:rounded-xl lg:shadow-lg lg:border lg:border-gray-200 p-0 md:p-6 lg:p-8 xl:p-10">
            <h2 className="text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl font-bold mb-4 md:mb-6 lg:mb-6 text-center text-gray-800">
              SignIn
            </h2>
               <p className="text-sm md:text-base lg:text-base opacity-90 max-w-md mx-auto mb-4 md:mb-6 lg:mb-6 ">
                SignIn to continue to your dashboard & manage your account.
              </p>
            
            {message && !Object.keys(errors).length && (
              <div className="mb-4 md:mb-6 lg:mb-6 p-3 md:p-4 lg:p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm md:text-base lg:text-base">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 lg:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm md:text-base lg:text-base font-medium text-gray-700 mb-1 md:mb-2 lg:mb-2">
                  Email 
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`
                    w-full px-3 md:px-4 lg:px-4 py-2 md:py-3 lg:py-3
                    border rounded-md shadow-sm
                    text-sm md:text-base lg:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-colors duration-200
                    ${hasFieldError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500"
                    }
                  `}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  disabled={loading}
                />
                {getFieldError("email") && (
                  <p className="mt-1 md:mt-2 lg:mt-2 text-sm md:text-base lg:text-base text-red-600">
                    {getFieldError("email")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm md:text-base lg:text-base font-medium text-gray-700 mb-1 md:mb-2 lg:mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`
                    w-full px-3 md:px-4 lg:px-4 py-2 md:py-3 lg:py-3
                    border rounded-md shadow-sm
                    text-sm md:text-base lg:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-colors duration-200
                    ${hasFieldError("password")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500"
                    }
                  `}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  disabled={loading}
                />
                {getFieldError("password") && (
                  <p className="mt-1 md:mt-2 lg:mt-2 text-sm md:text-base lg:text-base text-red-600">
                    {getFieldError("password")}
                  </p>
                )}
                <div className=" w-full mt-4 md:mt-6 lg:mt-6 flex justify-end ">
                  <p onClick={() => navigate("/forgot-password")} className="text-slate-600 hover:text-blue-500 font-medium  hover:no-underline transition-all duration-200 cursor-pointer w-fit ">Forgot password?</p></div>
               
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full bg-blue-600 text-white 
                  py-2 md:py-3 lg:py-3 px-4 md:px-6 lg:px-6
                  text-sm md:text-base lg:text-base font-medium
                  rounded-md hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                  transition duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  mt-2 md:mt-4 lg:mt-4
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-4 md:mt-6 lg:mt-6 text-center">
              <p className="text-sm md:text-base lg:text-base text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:text-blue-500 font-medium hover:no-underline transition-all duration-200 cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;