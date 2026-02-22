// import { registerSchema } from "@/components/Auth/register/RegisterPage";
// import { ActionState } from "@/Types/Login";
// import { loginUser } from "./loginUser";

import { registerSchema } from "@/components/Auth/register/RegisterPage";
import { ActionState } from "@/Types/Login";
import { loginUser } from "./loginUser";

// export const submitAction = async (_currentState: ActionState, formData: FormData): Promise<ActionState> => {
//    // Extract values from FormData
//    const name = formData.get("name") as string;
//    const email = formData.get("email") as string;
//    const password = formData.get("password") as string;
//    const confirmPassword = formData.get("confirmPassword") as string;

//    // Validate with Zod
//    const result = registerSchema.safeParse({ name, email, password, confirmPassword });

//    if (!result.success) {
//       // Convert Zod errors to a simple object
//       const errors: Record<string, string> = {};
//       result.error.issues.forEach((err) => {
//          const key = typeof err.path[0] === "string" ? err.path[0] : undefined;
//          if (key) {
//             errors[key] = err.message;
//          }
//       });
//       return { errors, success: false };
//    }

//    // Simulate API call
//    try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // Replace with actual registration logic
//       console.log("Registration attempt with:", { name, email });
//       const res = await fetch(`${process.env.backend_url}/user/create`, {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ name, email, password }), // Send only necessary <data value=""> </data>
//       });
//       console.log(res, "set-user-resister");

//       if (!res.ok) {
//          await loginUser(_currentState, formData);

//          // Attempt login if registration fails (e.g., user already exists)
//       }

//       // Success – optionally clear form
//       // setFormData({ name: "", email: "", password: "", confirmPassword: "" });

//       return { success: true, message: "Registration successful! Please check your email to verify your account." };
//    } catch (err) {
//       console.error("Registration error:", err);
//       return { success: false, message: "Registration failed. Please try again." };
//    }
// };

export const submitAction = async (_currentState: ActionState, formData: FormData): Promise<ActionState> => {
   // Extract values from FormData
   const name = formData.get("name") as string;
   const email = formData.get("email") as string;
   const password = formData.get("password") as string;
   const confirmPassword = formData.get("confirmPassword") as string;

   // Validate with Zod
   const result = registerSchema.safeParse({ name, email, password, confirmPassword });

   if (!result.success) {
      // Convert Zod errors to a simple object
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
         const key = typeof err.path[0] === "string" ? err.path[0] : undefined;
         if (key) {
            errors[key] = err.message;
         }
      });
      return { errors, success: false };
   }

   // Simulate API call
   try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // // Get backend URL with fallback
      // const backendUrl = process.env.backend_url || process.env.NEXT_PUBLIC_BACKEND_URL;

      // if (!backendUrl) {
      //    console.error("Backend URL is not defined in environment variables");
      //    return { success: false, message: "Server configuration error. Please try again later." };
      // }

      console.log("Registration attempt with:", { name, email });
      const res = await fetch(`http://localhost:5000/api/v1/user/create`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, email, password }),
      });

      console.log(res, "set-user-resister");
       if (res.ok) {
          await loginUser(_currentState, formData);
          console.log("login set or not");
       }

      if (!res.ok) {
         // Handle error response
         const errorData = await res.json().catch(() => ({}));
         return {
            success: false,
            message: errorData.message || `Registration failed with status: ${res.status}`,
         };
      }

      const data = await res.json();

     
      return {
         success: true,
         message: data.message || "Registration successful! Please check your email to verify your account.",
      };
   } catch (err) {
      console.error("Registration error:", err);
      return { success: false, message: "Registration failed. Please try again." };
   }
};