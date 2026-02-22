// export type UserRole = "ADMIN" | "SUPER_ADMIN" | "USER";

// export type RouteConfig = {
//    exact: string[];
//    patterns: RegExp[];
// };

// // Public routes that don't require authentication
// export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// // Public routes that don't require authentication (like landing pages, about, etc.)
// export const publicRoutes = ["/", "/about", "/contact", "/terms", "/privacy"];

// // Protected routes that require authentication (common for all roles)
// export const commonProtectedRoutes: RouteConfig = {
//    exact: ["/my-profile", "/settings", "/change-password"],
//    patterns: [],
// };

// // // Role-specific protected routes
// // export const doctorProtectedRoutes: RouteConfig = {
// //    patterns: [/^\/SUPER_ADMIN/],
// //    exact: [],
// // };

// export const adminProtectedRoutes: RouteConfig = {
//    patterns: [/^\/admin/],
//    exact: [],
// };

// export const userProtectedRoutes: RouteConfig = {
//    patterns: [/^\/user/],
//    exact: [],
// };

// // Check if route is an auth route (login, register, etc.)
// export const isAuthRoute = (pathname: string): boolean => {
//    return authRoutes.some((route: string) => route === pathname);
// };

// // Check if route is a public route (no authentication required)
// export const isPublicRoute = (pathname: string): boolean => {
//    return publicRoutes.some((route: string) => route === pathname);
// };

// // Check if route matches any protected route configuration
// export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
//    if (routes.exact.includes(pathname)) {
//       return true;
//    }
//    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
// };

// // Get the owner/role required for a protected route
// export const getRouteOwner = (pathname: string): "ADMIN" | "SUPER_ADMIN" | "USER" | "COMMON" | null => {
//    // First check if it's an auth or public route - these don't require authentication
//    if (isAuthRoute(pathname) || isPublicRoute(pathname)) {
//       return null;
//    }

//    // Check role-specific routes
//    if (isRouteMatches(pathname, adminProtectedRoutes)) {
//       return "ADMIN";
//    }
//    // if (isRouteMatches(pathname, doctorProtectedRoutes)) {
//    //    return "SUPER_ADMIN";
//    // }
//    if (isRouteMatches(pathname, userProtectedRoutes)) {
//       return "USER";
//    }

//    // Check common protected routes (require authentication but any role)
//    if (isRouteMatches(pathname, commonProtectedRoutes)) {
//       return "COMMON";
//    }

//    return null;
// };

// // Get default dashboard based on role
// export const getDefaultDashboardRoute = (role: UserRole): string => {
//    if (role === "ADMIN") {
//       return "/admin/dashboard";
//    }
//    if (role === "SUPER_ADMIN") {
//       return "/super-admin/dashboard";
//    }
//    if (role === "USER") {
//       return "/dashboard";
//    }
//    return "/";
// };

// // Check if a redirect path is valid for a given role
// export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
//    const routeOwner = getRouteOwner(redirectPath);

//    // If route doesn't require authentication or is common protected, it's valid
//    if (routeOwner === null || routeOwner === "COMMON") {
//       return true;
//    }

//    // If route requires specific role, check if user has that role
//    if (routeOwner === role) {
//       return true;
//    }

//    return false;
// };

// // New utility function to check if a route requires authentication
// export const requiresAuth = (pathname: string): boolean => {
//    // Auth routes and public routes don't require authentication
//    if (isAuthRoute(pathname) || isPublicRoute(pathname)) {
//       return false;
//    }

//    // Check if it's any kind of protected route
//    const owner = getRouteOwner(pathname);
//    return owner !== null;
// };

export type UserRole = "ADMIN" | "SUPER_ADMIN" | "USER";

export type RouteConfig = {
   exact: string[];
   patterns: RegExp[];
};

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
   exact: ["/my-profile", "/settings", "/change-password"],
   patterns: [],
};

export const adminProtectedRoutes: RouteConfig = {
   patterns: [/^\/admin/],
   exact: [],
};

export const userProtectedRoutes: RouteConfig = {
   patterns: [/^\/user/],
   exact: [],
};

export const isAuthRoute = (pathname: string): boolean => {
   return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
   if (routes.exact.includes(pathname)) {
      return true;
   }
   return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "SUPER_ADMIN" | "USER" | "COMMON" | null => {
   if (isAuthRoute(pathname)) {
      return null;
   }

   if (isRouteMatches(pathname, adminProtectedRoutes)) {
      return "ADMIN";
   }
   if (isRouteMatches(pathname, userProtectedRoutes)) {
      return "USER";
   }
   if (isRouteMatches(pathname, commonProtectedRoutes)) {
      return "COMMON";
   }

   return null;
};

export const getDefaultDashboardRoute = (role: UserRole | null): string => {
   if (role === "ADMIN") {
      return "/admin/dashboard";
   }
   if (role === "USER") {
      return "/user/dashboard";
   }
   return "/";
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole | null): boolean => {
   const routeOwner = getRouteOwner(redirectPath);

   if (routeOwner === null || routeOwner === "COMMON") {
      return true;
   }

   if (routeOwner === role) {
      return true;
   }

   return false;
};
