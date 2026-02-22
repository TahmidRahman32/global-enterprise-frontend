"use client";
import React, { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Camera, Loader2, Upload, X, DollarSign, Tag, Package, FileText, StickyNote, Layers, Briefcase, Hash, Backpack, SkipBack, ArrowUpLeftFromSquareIcon } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Alert, AlertDescription } from "@radix-ui/react-alert";y
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import HeroImage from "../../../../assets/Hero-image.jpg";
import Link from "next/link";

// Define the form schema with zod
const productSchema = z.object({
   title: z.string().min(3, "Title must be at least 3 characters"),
   price: z.number().positive("Price must be positive"),
   description: z.string().min(10, "Description must be at least 10 characters"),
   note: z.string().optional(),
   category: z.string().min(1, "Please select a category"),
   brand: z.string().min(1, "Brand is required"),
   stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
   picture: z.instanceof(File).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

// Categories for select
const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Toys", "Books", "Other"];

// Mock action that simulates API call
async function submitProductAction(prevState: Awaited<ReturnType<typeof validateAndSubmit>> | null, formData: FormData) {
   // Simulate network delay
   await new Promise((resolve) => setTimeout(resolve, 1500));

   return validateAndSubmit(formData);
}

async function validateAndSubmit(formData: FormData) {
   // Extract form data
   const title = formData.get("title") as string;
   const price = parseFloat(formData.get("price") as string);
   const description = formData.get("description") as string;
   const note = (formData.get("note") as string) || undefined;
   const category = formData.get("category") as string;
   const brand = formData.get("brand") as string;
   const stock = parseInt(formData.get("stock") as string, 10);
   const picture = formData.get("picture") as File;

   // Validate with zod
   const result = productSchema.safeParse({
      title,
      price,
      description,
      note,
      category,
      brand,
      stock,
   });

   if (!result.success) {
      // Convert Zod errors to a simple object
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
         const key = issue.path?.[0];
         if (typeof key === "string") {
            errors[key] = issue.message;
         }
      });
      // Ensure all error keys are present for consistent error object shape
      const normalizedErrors: Record<string, string[]> = {
         title: errors.title ? [errors.title] : [],
         price: errors.price ? [errors.price] : [],
         description: errors.description ? [errors.description] : [],
         note: errors.note ? [errors.note] : [],
         category: errors.category ? [errors.category] : [],
         brand: errors.brand ? [errors.brand] : [],
         stock: errors.stock ? [errors.stock] : [],
         picture: errors.picture ? [errors.picture] : [],
      };
      return { errors: normalizedErrors, success: false };
   }

   // Simulate image upload (would be a separate API call)
   if (picture && picture.size > 0) {
      // Mock validation: only images under 5MB
      if (picture.size > 5 * 1024 * 1024) {
         // Return normalized error object with picture error and empty arrays for other fields
         return {
            success: false,
            errors: {
               title: [],
               price: [],
               description: [],
               note: [],
               category: [],
               brand: [],
               stock: [],
               picture: ["Image must be less than 5MB"],
            },
            data: null,
         };
      }
      // In real app, upload to server and get URL
   }

   // Success - in real app, save to database
   return {
      success: true,
      errors: null,
      data: result.data,
   };
}

const ProductForm: React.FC = () => {
   const [state, formAction, isPending] = useActionState(submitProductAction, null);
   const [imagePreview, setImagePreview] = useState<string | null>(null);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      } else {
         setImagePreview(null);
      }
   };
  

   const clearImage = () => {
      setImagePreview(null);
      // Reset file input
      const fileInput = document.getElementById("picture") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
   };

   return (
      <div>
         <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-4">
            <Button variant="outline" className="mr-4">
               {" "}
               <ArrowUpLeftFromSquareIcon className="w-4 h-4 mr-2" />
               Back
            </Button>
         </Link>
         <div className=" p-6 flex items-center justify-center">
            <div className="fixed inset-0 -z-10">
               <Image src={HeroImage} alt="Background" fill className="object-cover" priority sizes="100vw" quality={100} style={{ opacity: 0.2 }} />
               <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl">
               <Card className="border-0 shadow-xl   dark:bg-gray-800/10 backdrop-blur-sm">
                  <CardHeader className="space-y-1">
                     <div className="flex items-center space-x-2">
                        <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                     </div>
                     <CardDescription>Fill in the product details below. All fields marked with * are required.</CardDescription>
                  </CardHeader>

                  <CardContent>
                     <form action={formAction} className="space-y-6">
                        {/* Image Upload - Custom styled */}
                        <div className="space-y-2">
                           <Label htmlFor="picture" className="text-sm font-medium">
                              Product Image
                           </Label>
                           <div className="flex items-start gap-4">
                              <div className="relative">
                                 {imagePreview ? (
                                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
                                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                       <button type="button" onClick={clearImage} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition">
                                          <X className="w-3 h-3" />
                                       </button>
                                    </div>
                                 ) : (
                                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                                       <Camera className="w-8 h-8 text-gray-400" />
                                    </div>
                                 )}
                              </div>
                              <div className="flex-1">
                                 <Input id="picture" name="picture" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended: Square image, max 5MB. PNG or JPG.</p>
                                 {state?.errors?.picture && <p className="text-sm text-red-600 mt-1">{state.errors.picture[0]}</p>}
                              </div>
                           </div>
                        </div>

                        <Separator />

                        {/* Two-column grid for better layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Title */}
                           <div className="space-y-2">
                              <Label htmlFor="title" className="text-sm font-medium flex items-center gap-1">
                                 <Tag className="w-4 h-4" /> Title <span className="text-red-500">*</span>
                              </Label>
                              <Input id="title" name="title" placeholder="e.g. Wireless Headphones" defaultValue="" className="focus-visible:ring-indigo-500" />
                              {state?.errors?.title && <p className="text-sm text-red-600">{typeof state.errors.title === "string" ? state.errors.title : state.errors.title[0]}</p>}
                           </div>

                           {/* Brand */}
                           <div className="space-y-2">
                              <Label htmlFor="brand" className="text-sm font-medium flex items-center gap-1">
                                 <Briefcase className="w-4 h-4" /> Brand <span className="text-red-500">*</span>
                              </Label>
                              <Input id="brand" name="brand" placeholder="e.g. Sony" defaultValue="" className="focus-visible:ring-indigo-500" />
                              {state?.errors?.brand && <p className="text-sm text-red-600">{typeof state.errors.brand === "string" ? state.errors.brand : state.errors.brand[0]}</p>}
                           </div>

                           {/* Price */}
                           <div className="space-y-2">
                              <Label htmlFor="price" className="text-sm font-medium flex items-center gap-1">
                                 <DollarSign className="w-4 h-4" /> Price <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                 <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                 <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="0.00" className="pl-9 focus-visible:ring-indigo-500" />
                              </div>
                              {state?.errors?.price && <p className="text-sm text-red-600">{typeof state.errors.price === "string" ? state.errors.price : state.errors.price[0]}</p>}
                           </div>

                           {/* Stock */}
                           <div className="space-y-2">
                              <Label htmlFor="stock" className="text-sm font-medium flex items-center gap-1">
                                 <Hash className="w-4 h-4" /> Stock <span className="text-red-500">*</span>
                              </Label>
                              <Input id="stock" name="stock" type="number" min="0" step="1" placeholder="0" className="focus-visible:ring-indigo-500" />
                              {state?.errors?.stock && <p className="text-sm text-red-600">{typeof state.errors.stock === "string" ? state.errors.stock : state.errors.stock[0]}</p>}
                           </div>

                           {/* Category */}
                           <div className="space-y-2">
                              <Label htmlFor="category" className="text-sm font-medium flex items-center gap-1">
                                 <Layers className="w-4 h-4" /> Category <span className="text-red-500">*</span>
                              </Label>
                              <Select name="category" defaultValue="">
                                 <SelectTrigger id="category" className="focus:ring-indigo-500">
                                    <SelectValue placeholder="Select a category" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {categories.map((cat) => (
                                       <SelectItem key={cat} value={cat}>
                                          {cat}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              {state?.errors && "category" in state.errors && state.errors.category && (
                                 <p className="text-sm text-red-600">{typeof state.errors.category === "string" ? state.errors.category : Array.isArray(state.errors.category) ? state.errors.category[0] : ""}</p>
                              )}
                           </div>

                           {/* Note (optional) */}
                           <div className="space-y-2">
                              <Label htmlFor="note" className="text-sm font-medium flex items-center gap-1">
                                 <StickyNote className="w-4 h-4" /> Note (optional)
                              </Label>
                              <Input id="note" name="note" placeholder="Any additional notes" defaultValue="" className="focus-visible:ring-indigo-500" />
                           </div>
                        </div>

                        {/* Description (full width) */}
                        <div className="space-y-2">
                           <Label htmlFor="description" className="text-sm font-medium flex items-center gap-1">
                              <FileText className="w-4 h-4" /> Description <span className="text-red-500">*</span>
                           </Label>
                           <Textarea id="description" name="description" placeholder="Detailed product description..." rows={4} className="focus-visible:ring-indigo-500 resize-none" />
                           {state?.errors && "description" in state.errors && state.errors.description && (
                              <p className="text-sm text-red-600">{typeof state.errors.description === "string" ? state.errors.description : Array.isArray(state.errors.description) ? state.errors.description[0] : ""}</p>
                           )}
                        </div>

                        {/* Success/Error message */}
                        {state?.success && (
                           <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                              <AlertDescription className="text-green-800 dark:text-green-300">Product added successfully!</AlertDescription>
                           </Alert>
                        )}

                        {state?.success === false && state.errors && !state.errors.picture && (
                           <Alert variant="destructive">
                              <AlertDescription>Please fix the errors above and try again.</AlertDescription>
                           </Alert>
                        )}

                        <Separator />

                        <div className="flex justify-end space-x-4">
                           <Button type="button" variant="outline">
                              Cancel
                           </Button>
                           <Button type="submit" disabled={isPending} className="min-w-[120px]">
                              {isPending ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                 </>
                              ) : (
                                 "Save Product"
                              )}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </div>
   );
};

export default ProductForm;

// "use client";
// import Image from "next/image";
// // import HeroImage from "../../../assets/Hero-image.jpg";
// import { useState, useActionState } from "react";
// import { motion } from "framer-motion";
// import * as z from "zod";
// import { buttonVariants, containerVariants, itemVariants } from "@/Types/Login";

// // Define the form schema with Zod for registration
// const registerSchema = z
//    .object({
//       name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
//       email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
//       password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
//       confirmPassword: z.string().min(6, "Please confirm your password"),
//    })
//    .refine((data) => data.password === data.confirmPassword, {
//       message: "Passwords don't match",
//       path: ["confirmPassword"],
//    });

// // Type for form data
// type RegisterFormData = z.infer<typeof registerSchema>;

// // Type for action state
// type ActionState = {
//    errors?: Record<string, string>;
//    success?: boolean;
//    message?: string;
// };

// const Register = () => {
//    const [showPassword, setShowPassword] = useState(false);
//    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//    // Local state for form fields (for live validation and UI)
//    const [formData, setFormData] = useState<RegisterFormData>({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//    });

//    // Action function for form submission
//    const submitAction = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
//       // Extract values from FormData
//       const name = formData.get("name") as string;
//       const email = formData.get("email") as string;
//       const password = formData.get("password") as string;
//       const confirmPassword = formData.get("confirmPassword") as string;

//       // Validate with Zod
//       const result = registerSchema.safeParse({ name, email, password, confirmPassword });

//       if (!result.success) {
//          // Convert Zod errors to a simple object
//          const errors: Record<string, string> = {};
//          result.error.issues.forEach((issue) => {
//             const key = issue.path?.[0];
//             if (typeof key === "string") {
//                errors[key] = issue.message;
//             }
//          });
//          return { errors, success: false };
//       }

//       // Simulate API call
//       try {
//          await new Promise((resolve) => setTimeout(resolve, 2000));

//          // Replace with actual registration logic
//          console.log("Registration attempt with:", { name, email });

//          // Success – optionally clear form
//          setFormData({ name: "", email: "", password: "", confirmPassword: "" });

//          return { success: true, message: "Registration successful! Please check your email to verify your account." };
//       } catch (err) {
//          console.error("Registration error:", err);
//          return { success: false, message: "Registration failed. Please try again." };
//       }
//    };

//    // useActionState hook
//    const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitAction, {
//       errors: {},
//       success: false,
//    });

//    // Handle input changes
//    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//    };

//    // Password validation criteria (for live feedback)
//    const validatePassword = (password: string) => {
//       const checks = {
//          length: password.length >= 6,
//          uppercase: /[A-Z]/.test(password),
//          lowercase: /[a-z]/.test(password),
//          number: /[0-9]/.test(password),
//          special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
//       };
//       const passed = Object.values(checks).filter(Boolean).length;
//       return { checks, passed, total: Object.keys(checks).length };
//    };

//    const passwordValidation = formData.password ? validatePassword(formData.password) : null;

//    return (
//       <div className="min-h-screen relative">
//          {/* Background Image - Fixed positioning */}
//          <div className="fixed inset-0 -z-10">
//             {/* <Image src={HeroImage} alt="Background" fill className="object-cover" priority sizes="100vw" quality={100} style={{ opacity: 0.2 }} /> */}
//             <div className="absolute inset-0 bg-black/50"></div>
//          </div>

//          {/* Form Container */}
//          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
//                <motion.form variants={containerVariants} initial="hidden" animate="visible" action={formAction} className="text-white bg-white/2 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
//                   <motion.div variants={itemVariants} className="text-center">
//                      <h2 className="text-4xl font-bold font-primary-inter">Create Account</h2>
//                      <p className="font-primary-inter mt-2">Join our community today</p>
//                   </motion.div>

//                   {/* Name Input */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                      <label htmlFor="name" className="block text-sm font-medium">
//                         Full Name
//                      </label>
//                      <input
//                         id="name"
//                         name="name"
//                         type="text"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white"
//                         placeholder="Full name"
//                         disabled={isPending}
//                      />
//                      {state.errors?.name && (
//                         <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
//                            {state.errors.name}
//                         </motion.p>
//                      )}
//                   </motion.div>

//                   {/* Email Input */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                      <label htmlFor="email" className="block text-sm font-medium">
//                         Email Address
//                      </label>
//                      <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white"
//                         placeholder="you@example.com"
//                         disabled={isPending}
//                      />
//                      {state.errors?.email && (
//                         <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
//                            {state.errors.email}
//                         </motion.p>
//                      )}
//                   </motion.div>

//                   {/* Password Input */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                      <label htmlFor="password" className="block text-sm font-medium">
//                         Password
//                      </label>

//                      <div className="relative">
//                         <input
//                            id="password"
//                            name="password"
//                            type={showPassword ? "text" : "password"}
//                            value={formData.password}
//                            onChange={handleChange}
//                            className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white pr-10"
//                            placeholder="Password"
//                            disabled={isPending}
//                         />
//                         <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none" disabled={isPending}>
//                            {showPassword ? (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                               </svg>
//                            ) : (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                  <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                                  />
//                               </svg>
//                            )}
//                         </button>
//                      </div>

//                      {/* Password Strength Indicator */}
//                      {formData.password && (
//                         <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-2">
//                            <div className="text-sm text-gray-300">Password strength:</div>
//                            <div className="flex space-x-1">
//                               {[1, 2, 3, 4, 5].map((index) => (
//                                  <div
//                                     key={index}
//                                     className={`h-1 flex-1 rounded-full transition-all duration-300 ${
//                                        passwordValidation && index <= passwordValidation.passed ? (index <= 2 ? "bg-red-500" : index <= 4 ? "bg-yellow-500" : "bg-green-500") : "bg-gray-600"
//                                     }`}
//                                  />
//                               ))}
//                            </div>

//                            {/* Password Requirements */}
//                            <div className="text-xs text-gray-400 space-y-1 mt-2">
//                               <div className={`flex items-center ${passwordValidation?.checks.length ? "text-green-400" : ""}`}>
//                                  <svg className={`w-3 h-3 mr-2 ${passwordValidation?.checks.length ? "text-green-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
//                                     {passwordValidation?.checks.length ? (
//                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                     ) : (
//                                        <path
//                                           fillRule="evenodd"
//                                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                           clipRule="evenodd"
//                                        />
//                                     )}
//                                  </svg>
//                                  At least 6 characters
//                               </div>
//                               <div className={`flex items-center ${passwordValidation?.checks.uppercase ? "text-green-400" : ""}`}>
//                                  <svg className={`w-3 h-3 mr-2 ${passwordValidation?.checks.uppercase ? "text-green-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
//                                     {passwordValidation?.checks.uppercase ? (
//                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                     ) : (
//                                        <path
//                                           fillRule="evenodd"
//                                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                           clipRule="evenodd"
//                                        />
//                                     )}
//                                  </svg>
//                                  At least one uppercase letter
//                               </div>
//                               <div className={`flex items-center ${passwordValidation?.checks.number ? "text-green-400" : ""}`}>
//                                  <svg className={`w-3 h-3 mr-2 ${passwordValidation?.checks.number ? "text-green-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
//                                     {passwordValidation?.checks.number ? (
//                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                     ) : (
//                                        <path
//                                           fillRule="evenodd"
//                                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                           clipRule="evenodd"
//                                        />
//                                     )}
//                                  </svg>
//                                  At least one number
//                               </div>
//                            </div>
//                         </motion.div>
//                      )}

//                      {state.errors?.password && (
//                         <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
//                            {state.errors.password}
//                         </motion.p>
//                      )}
//                   </motion.div>

//                   {/* Confirm Password Input */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                      <label htmlFor="confirmPassword" className="block text-sm font-medium">
//                         Confirm Password
//                      </label>

//                      <div className="relative">
//                         <input
//                            id="confirmPassword"
//                            name="confirmPassword"
//                            type={showConfirmPassword ? "text" : "password"}
//                            value={formData.confirmPassword}
//                            onChange={handleChange}
//                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-300 text-white pr-10 ${
//                               formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-400/50" : "border-gray-400/30"
//                            }`}
//                            placeholder="Confirm password"
//                            disabled={isPending}
//                         />
//                         <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none" disabled={isPending}>
//                            {showConfirmPassword ? (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                               </svg>
//                            ) : (
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                  <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                                  />
//                               </svg>
//                            )}
//                         </button>
//                      </div>

//                      {/* Password match indicator */}
//                      {formData.confirmPassword && (
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1">
//                            {formData.password === formData.confirmPassword ? (
//                               <p className="text-green-400 text-sm flex items-center">
//                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                  </svg>
//                                  Passwords match
//                               </p>
//                            ) : (
//                               <p className="text-red-400 text-sm flex items-center">
//                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path
//                                        fillRule="evenodd"
//                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                        clipRule="evenodd"
//                                     />
//                                  </svg>
//                                  Passwords don't match
//                               </p>
//                            )}
//                         </motion.div>
//                      )}

//                      {state.errors?.confirmPassword && (
//                         <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
//                            {state.errors.confirmPassword}
//                         </motion.p>
//                      )}
//                   </motion.div>

//                   {/* Terms and Conditions */}
//                   <motion.div variants={itemVariants} className="flex items-start space-x-2">
//                      <input id="terms" name="terms" type="checkbox" className="mt-1 bg-white/10 border border-gray-400/30 rounded focus:ring-2 focus:ring-blue-500" />
//                      <label htmlFor="terms" className="text-sm text-gray-300">
//                         I agree to the{" "}
//                         <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
//                            Terms of Service
//                         </a>{" "}
//                         and{" "}
//                         <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
//                            Privacy Policy
//                         </a>
//                      </label>
//                   </motion.div>

//                   {/* Register Button */}
//                   <motion.div variants={itemVariants}>
//                      <motion.button
//                         variants={buttonVariants}
//                         initial="initial"
//                         whileHover={!isPending ? "hover" : undefined}
//                         whileTap={!isPending ? "tap" : undefined}
//                         animate={isPending ? "loading" : "initial"}
//                         type="submit"
//                         disabled={isPending}
//                         className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
//                      >
//                         {isPending ? (
//                            <>
//                               <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block mr-2">
//                                  🔄
//                               </motion.span>
//                               Creating Account...
//                            </>
//                         ) : (
//                            "Create Account"
//                         )}
//                      </motion.button>
//                   </motion.div>

//                   {/* Success/Error Message from action */}
//                   {state.message && (
//                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm text-center ${state.success ? "text-green-400" : "text-red-400"}`}>
//                         {state.message}
//                      </motion.p>
//                   )}

//                   {/* Login Link */}
//                   <motion.div variants={itemVariants} className="text-center text-sm">
//                      <p>
//                         Already have an account?{" "}
//                         <motion.a href="/login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
//                            Sign in
//                         </motion.a>
//                      </p>
//                   </motion.div>
//                </motion.form>
//             </motion.div>
//          </div>
//       </div>
//    );
// };

// export default Register;
