
"use client";
import Image from "next/image";
import HeroImage from "../../../assets/Hero-image.jpg";
import { useState, useActionState } from "react";
import { motion } from "framer-motion";
import * as z from "zod";
import { ActionState, buttonVariants, containerVariants, itemVariants } from "@/Types/Login";
import { submitAction } from "@/services/auth/register.service";

// Define the form schema with Zod for registration
export const registerSchema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
      email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
      password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
      confirmPassword: z.string().min(6, "Please confirm your password"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

// Type for form data
type RegisterFormData = z.infer<typeof registerSchema>;

// Type for action state
// type ActionState = {
//    errors?: Record<string, string>;
//    success?: boolean;
//    message?: string;
// };

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   // Local state for form fields (for live validation and UI)
   const [formData, setFormData] = useState<RegisterFormData>({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   // Action function for form submission
  

   // useActionState hook
   const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitAction, {
      errors: {},
      success: false,
   });

   // Handle input changes
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   // Password validation criteria (for live feedback)
   const validatePassword = (password: string) => {
      const checks = {
         length: password.length >= 6,
         uppercase: /[A-Z]/.test(password),
         lowercase: /[a-z]/.test(password),
         number: /[0-9]/.test(password),
         special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      };
      const passed = Object.values(checks).filter(Boolean).length;
      return { checks, passed, total: Object.keys(checks).length };
   };

   const passwordValidation = formData.password ? validatePassword(formData.password) : null;

   return (
      <div className="min-h-screen relative">
         {/* Background Image - Fixed positioning */}
         <div className="fixed inset-0 -z-10">
            <Image src={HeroImage} alt="Background" fill className="object-cover" priority sizes="100vw" quality={100} style={{ opacity: 0.2 }} />
            <div className="absolute inset-0 bg-black/50"></div>
         </div>

         {/* Form Container */}
         <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
               <motion.form variants={containerVariants} initial="hidden" animate="visible" action={formAction} className="text-white bg-white/2 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
                  <motion.div variants={itemVariants} className="text-center">
                     <h2 className="text-4xl font-bold font-primary-inter">Create Account</h2>
                     <p className="font-primary-inter mt-2">Join our community today</p>
                  </motion.div>

                  {/* Name Input */}
                  <motion.div variants={itemVariants} className="space-y-2">
                     <label htmlFor="name" className="block text-sm font-medium">
                        Full Name
                     </label>
                     <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white"
                        placeholder="Full name"
                        disabled={isPending}
                     />
                     {state.errors?.name && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                           {state.errors.name}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Email Input */}
                  <motion.div variants={itemVariants} className="space-y-2">
                     <label htmlFor="email" className="block text-sm font-medium">
                        Email Address
                     </label>
                     <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white"
                        placeholder="you@example.com"
                        disabled={isPending}
                     />
                     {state.errors?.email && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                           {state.errors.email}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Password Input */}
                  <motion.div variants={itemVariants} className="space-y-2">
                     <label htmlFor="password" className="block text-sm font-medium">
                        Password
                     </label>

                     <div className="relative">
                        <input
                           id="password"
                           name="password"
                           type={showPassword ? "text" : "password"}
                           value={formData.password}
                           onChange={handleChange}
                           className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white pr-10"
                           placeholder="Password"
                           disabled={isPending}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none" disabled={isPending}>
                           {showPassword ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                           ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                 />
                              </svg>
                           )}
                        </button>
                     </div>

                     {/* Password Strength Indicator */}
                     {formData.password && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-2">
                           <div className="text-sm text-gray-300">Password strength:</div>
                           <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((index) => (
                                 <div
                                    key={index}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                       passwordValidation && index <= passwordValidation.passed ? (index <= 2 ? "bg-red-500" : index <= 4 ? "bg-yellow-500" : "bg-green-500") : "bg-gray-600"
                                    }`}
                                 />
                              ))}
                           </div>

                           {/* Password Requirements */}
                           <div className="text-xs text-gray-400 space-y-1 mt-2">
                              <div className={`flex items-center ${passwordValidation?.checks.length ? "text-green-400" : ""}`}>
                                 <svg className={`w-3 h-3 mr-2 ${passwordValidation?.checks.length ? "text-green-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
                                    {passwordValidation?.checks.length ? (
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    ) : (
                                       <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                       />
                                    )}
                                 </svg>
                                 At least 6 characters
                              </div>
                              <div className={`flex items-center ${passwordValidation?.checks.uppercase ? "text-green-400" : ""}`}>
                                 <svg className={`w-3 h-3 mr-2 ${passwordValidation?.checks.uppercase ? "text-green-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
                                    {passwordValidation?.checks.uppercase ? (
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    ) : (
                                       <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                       />
                                    )}
                                 </svg>
                                 At least one uppercase letter
                              </div>
                              <div className={`flex items-center ${passwordValidation?.checks.number ? "text-green-400" : ""}`}>
                                 <svg className={`w-3 h-3 mr-2 ${passwordValidation?.checks.number ? "text-green-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
                                    {passwordValidation?.checks.number ? (
                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    ) : (
                                       <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                       />
                                    )}
                                 </svg>
                                 At least one number
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {state.errors?.password && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                           {state.errors.password}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Confirm Password Input */}
                  <motion.div variants={itemVariants} className="space-y-2">
                     <label htmlFor="confirmPassword" className="block text-sm font-medium">
                        Confirm Password
                     </label>

                     <div className="relative">
                        <input
                           id="confirmPassword"
                           name="confirmPassword"
                           type={showConfirmPassword ? "text" : "password"}
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white pr-10 ${
                              formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-400/50" : "border-gray-400/30"
                           }`}
                           placeholder="Confirm password"
                           disabled={isPending}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none" disabled={isPending}>
                           {showConfirmPassword ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                           ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                 />
                              </svg>
                           )}
                        </button>
                     </div>

                     {/* Password match indicator */}
                     {formData.confirmPassword && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1">
                           {formData.password === formData.confirmPassword ? (
                              <p className="text-green-400 text-sm flex items-center">
                                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                 </svg>
                                 Passwords match
                              </p>
                           ) : (
                              <p className="text-red-400 text-sm flex items-center">
                                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                       fillRule="evenodd"
                                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                                 Passwords don't match
                              </p>
                           )}
                        </motion.div>
                     )}

                     {state.errors?.confirmPassword && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                           {state.errors.confirmPassword}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Terms and Conditions */}
                  <motion.div variants={itemVariants} className="flex items-start space-x-2">
                     <input id="terms" name="terms" type="checkbox" className="mt-1 bg-white/10 border border-gray-400/30 rounded focus:ring-2 focus:ring-blue-500" />
                     <label htmlFor="terms" className="text-sm text-gray-300">
                        I agree to the{" "}
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                           Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                           Privacy Policy
                        </a>
                     </label>
                  </motion.div>

                  {/* Register Button */}
                  <motion.div variants={itemVariants}>
                     <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        whileHover={!isPending ? "hover" : undefined}
                        whileTap={!isPending ? "tap" : undefined}
                        animate={isPending ? "loading" : "initial"}
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {isPending ? (
                           <>
                              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block mr-2">
                                 🔄
                              </motion.span>
                              Creating Account...
                           </>
                        ) : (
                           "Create Account"
                        )}
                     </motion.button>
                  </motion.div>

                  {/* Success/Error Message from action */}
                  {state.message && (
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm text-center ${state.success ? "text-green-400" : "text-red-400"}`}>
                        {state.message}
                     </motion.p>
                  )}

                  {/* Login Link */}
                  <motion.div variants={itemVariants} className="text-center text-sm">
                     <p>
                        Already have an account?{" "}
                        <motion.a href="/login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                           Sign in
                        </motion.a>
                     </p>
                  </motion.div>
               </motion.form>
            </motion.div>
         </div>
      </div>
   );
};

export default Register;
