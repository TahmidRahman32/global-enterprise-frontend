"use server";

import { serverFetch } from "@/lib/server-fetch";
import { ActionState } from "@/Types/Login";
import { loginSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const submitActionLogin = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
   let accessTokenObject: null | any = null;
   let refreshTokenObject: null | any = null;

   const redirectToLogin = formData.get("redirect") as string | null;
   const email = formData.get("email") as string;
   const password = formData.get("password") as string;

   // Validate with Zod
   const result = loginSchema.safeParse({ email, password });

   if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
         if (err.path[0]) {
            errors[String(err.path[0])] = err.message;
         }
      });
      return { errors, success: false };
   }

   try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //  const res = await fetch(`http://localhost:5000/api/v1/user/create`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ name, email, password }),
      //  });
      console.log({email, password})

      // const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
      //    method: "POST",
      //    headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify({ email, password }),
      // });
      const res = await serverFetch.post(`/auth/login`, {
         // method: "POST",
         body: JSON.stringify({ email, password }),
         headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
         const errorData = await res.json();
         return { success: false, message: errorData.message || "Login failed" };
      }

      const result = await res.json();

      const setCookieHeader = res.headers.getSetCookie();
      if (setCookieHeader && setCookieHeader.length > 0) {
         setCookieHeader.forEach((cookieString: string) => {
            console.log(cookieString, "cookie parser log for each");
            const cookiesParse = parse(cookieString);

            console.log("Parsed cookies:", cookieString, cookiesParse);
            if (cookiesParse["accessToken"]) {
               accessTokenObject = cookiesParse["accessToken"];
            }
            if (cookiesParse["refreshToken"]) {
               refreshTokenObject = cookiesParse["refreshToken"];
            }
         });
      } else {
         throw new Error("No Set-Cookie header found in the response");
      }

      if (!accessTokenObject && !refreshTokenObject) {
         throw new Error("Tokens not found in cookies");
      }

      console.log({
         accessTokenObject,
         refreshTokenObject,
      });

      const cookieStore = await cookies();
      cookieStore.set("accessToken", accessTokenObject!, {
         httpOnly: true,
         secure: true,
         maxAge: parseInt(accessTokenObject["Max-Age"]) || 60 * 60, // 1 hour in seconds
         path: accessTokenObject.Path || "/",
         sameSite: accessTokenObject["SameSite"] || "none",
      });
      cookieStore.set("refreshToken", refreshTokenObject!, {
         httpOnly: true,
         secure: true,
         maxAge: parseInt(refreshTokenObject["Max-Age"]) || 60 * 60 * 24 * 90, // 90 days in seconds
         path: refreshTokenObject.Path || "/",
         sameSite: refreshTokenObject["SameSite"] || "none",
      });
   } catch (err: any) {
      console.error("Login error:", err);
      return { success: false, message: "Login failed. Please try again." };
   }

   // Redirect after successful login (outside the try-catch)
   redirect(redirectToLogin ? redirectToLogin : "/");
};

// "use server";

// import { ActionState } from "@/Types/Login";
// import { loginSchema } from "@/zod/auth.validation";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export const submitActionLogin = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
//    // Get form fields
//    const redirectTo = formData.get("redirect")?.toString();
//    const email = formData.get("email")?.toString();
//    const password = formData.get("password")?.toString();

//    // Validate with Zod
//    const validation = loginSchema.safeParse({ email, password });
//    if (!validation.success) {
//       const errors: Record<string, string> = {};
//       validation.error.issues.forEach((err) => {
//          if (err.path[0]) errors[String(err.path[0])] = err.message;
//       });
//       return { errors, success: false };
//    }

//    try {
//       // Call your backend API
//       const res = await fetch(`${process.env.backend_url}/auth/login`, {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//          const errorData = await res.json();
//          return {
//             success: false,
//             message: errorData.message || "Login failed",
//          };
//       }

//       // Extract tokens from Set-Cookie headers
//       const setCookieHeader = res.headers.getSetCookie();
//       if (!setCookieHeader || setCookieHeader.length === 0) {
//          return {
//             success: false,
//             message: "No authentication cookies received",
//          };
//       }

//       let accessToken: string | undefined;
//       let refreshToken: string | undefined;

//       // Simple cookie parser – only extracts the value (ignore attributes)
//       for (const cookieStr of setCookieHeader) {
//          const [nameValue] = cookieStr.split(";"); // get the "name=value" part
//          const [name, value] = nameValue.split("=");
//          if (name === "accessToken") accessToken = value;
//          if (name === "refreshToken") refreshToken = value;
//       }

//       if (!accessToken || !refreshToken) {
//          return {
//             success: false,
//             message: "Tokens missing in response cookies",
//          };
//       }

//       // Set secure HTTP‑only cookies on the client
//       const cookieStore = await cookies();
//       cookieStore.set("accessToken", accessToken, {
//          httpOnly: true,
//          secure: true,
//          maxAge: 60 * 60 * 24 * 7, // 7 day
//          path: "/",
//          sameSite: "lax",
//       });
//       cookieStore.set("refreshToken", refreshToken, {
//          httpOnly: true,
//          secure: true,
//          maxAge: 60 * 60 * 24 * 90, // 90 days
//          path: "/",
//          sameSite: "lax",
//       });

//       // IMPORTANT FIX: Return success state instead of redirecting directly
//       // The redirect will be handled on the client side

//       return {
//          success: true,
//          message: "Login successful! Redirecting...",
//          errors: {},
//          redirectTo: redirectTo || "/admin/dashboard"
//  // Add redirect URL to state
//       };
//    } catch (error) {
//       console.error("Login error:", error);
//       return {
//          success: false,
//          message: "An unexpected error occurred. Please try again.",
//       };
//    }
// };
