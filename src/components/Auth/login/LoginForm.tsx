"use client";
import Image from "next/image";
import HeroImage from "../../../assets/Hero-image.jpg";
import { useState, useActionState } from "react";
import { motion } from "framer-motion";
import * as z from "zod";
import { ActionState, buttonVariants, containerVariants, itemVariants } from "@/Types/Login";
import { submitActionLogin } from "@/services/auth/login.service";
import { loginSchema } from "@/zod/auth.validation";

// Define the form schema with Zod


// Type for form data
type LoginFormData = z.infer<typeof loginSchema>;

// // Type for action state
// type ActionState = {
//    errors?: Record<string, string>;
//    success?: boolean;
//    message?: string;
// };

const LoginForm = ({ redirect }: { redirect?: string }) => {
   const [showPassword, setShowPassword] = useState(false);

   // Local state for form fields (for live validation and UI)
   const [formData, setFormData] = useState<LoginFormData>({
      email: "",
      password: "",
   });

   // Action function for form submission
 

   // useActionState hook
   const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitActionLogin, {
      errors: {},
      success: false,
   });

   // Handle input changes
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   // Social login handlers (remain unchanged)
   const handleGoogleLogin = async () => {
      // Simulate loading (could use isPending but separate for social)
      try {
         console.log("Google login clicked");
         await new Promise((resolve) => setTimeout(resolve, 2000));
         alert("Google login would be implemented here");
      } catch (error) {
         console.error("Google login error:", error);
      }
   };

   const handleGithubLogin = async () => {
      try {
         console.log("GitHub login clicked");
         await new Promise((resolve) => setTimeout(resolve, 2000));
         alert("GitHub login would be implemented here");
      } catch (error) {
         console.error("GitHub login error:", error);
      }
   };

   // Password validation criteria
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
                     <h2 className="text-4xl font-bold font-primary-inter">Welcome Back</h2>
                     <p className="font-primary-inter mt-2">Sign in to your account</p>
                  </motion.div>

                  {/* Redirect logic (if any) can be handled in the action function or via useEffect based on state changes. For now, we just pass it to the action. */}
                 { redirect && <input type="hidden" name="redirect" value={redirect} />}

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
                     <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-medium">
                           Password
                        </label>
                        <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                           Forgot password?
                        </motion.a>
                     </div>

                     {/* Password Input with Toggle */}
                     <div className="relative">
                        <input
                           id="password"
                           name="password"
                           type={showPassword ? "text" : "password"}
                           value={formData.password}
                           onChange={handleChange}
                           className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white pr-10"
                           placeholder="Enter your password"
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

                  {/* Login Button */}
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
                              Signing in...
                           </>
                        ) : (
                           "Sign In"
                        )}
                     </motion.button>
                  </motion.div>

                  {/* Success/Error Message from action */}
                  {state.message && (
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm text-center ${state.success ? "text-green-400" : "text-red-400"}`}>
                        {state.message}
                     </motion.p>
                  )}

                  {/* Divider */}
                  <motion.div variants={itemVariants} className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-400/30"></div>
                     </div>
                     <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-gray-300">Or continue with</span>
                     </div>
                  </motion.div>

                  {/* Social Login Buttons */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                     {/* Google Login Button */}
                     <motion.button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isPending}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-white/10 border border-gray-400/30 rounded-lg py-3 text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                     </motion.button>

                     {/* GitHub Login Button */}
                     <motion.button
                        type="button"
                        onClick={handleGithubLogin}
                        disabled={isPending}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-white/10 border border-gray-400/30 rounded-lg py-3 text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                           <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                           />
                        </svg>
                        GitHub
                     </motion.button>
                  </motion.div>

                  {/* Sign Up Link */}
                  <motion.div variants={itemVariants} className="text-center text-sm">
                     <p>
                        Don't have an account?{" "}
                        <motion.a href="/register" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                           Sign up
                        </motion.a>
                     </p>
                  </motion.div>
               </motion.form>
            </motion.div>
         </div>
      </div>
   );
};

export default LoginForm;
