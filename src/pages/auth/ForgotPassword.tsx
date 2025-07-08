// import React, {useState} from 'react';
// import { useNavigate} from 'react-router-dom'

// const navigate = useNavigate;

// const [email, setEmail] = useState('');
// const [isLoading, setIsLoading] = useState(false);
// const [errors, setErrors] = useState({});

// const validateEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// const handleEmailChange = (e) => {
//   const value = e.target.value;
//   setEmail(value);

//   // Clear errors when user starts typing
//   if (errors.email) {
//     setErrors({ ...errors, email: '' });
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Validation
//   const newErrors = {};
//   if (!email) {
//     newErrors.email = 'Email is required';
//   } else if (!validateEmail(email)) {
//     newErrors.email = 'Please enter a valid email address';
//   }

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }

//   setIsLoading(true);

//   try {
//     // API call
    

//     // Success handling
//     alert('Reset link sent successfully!');
//     setEmail('');
//   } catch (error) {
//     console.error('Error sending reset link:', error);
//     alert('Failed to send reset link. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };

// const ForgotPassword = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-lg p-8">


//           {/* Heading */}
//           <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
//             Forgotten Your Password?
//           </h1>

//           {/* Description */}
//           <p className="text-gray-500 text-center mb-8 leading-relaxed">
//             There is nothing to worry about, we'll send you a message to help you reset your password
//           </p>

//           {/* Form */}
//           <div className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 8l7.89 4.26c.3.16.67.16.96 0L19 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                   placeholder="Enter email address"
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.email
//                       ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
//                       : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   disabled={isLoading}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                   Sending...
//                 </div>
//               ) : (
//                 'Send Reset Link'
//               )}
//             </button>
//           </div>

//           {/* Login Link */}
//           <div className="text-center mt-8">
//             <span className="text-gray-500">Remember your password? </span>
//             <button
//               onClick={() => navigate("/login")}
//               className="text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none focus:underline"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword