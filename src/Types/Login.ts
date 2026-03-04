import { Variants } from "framer-motion";

// Define proper Variants type for Framer Motion
export const containerVariants: Variants = {
   hidden: { opacity: 0, y: -20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.6,
         staggerChildren: 0.1,
         ease: "easeOut",
      },
   },
};

export const itemVariants: Variants = {
   hidden: { opacity: 0, y: 10 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: "easeOut",
      },
   },
};

export const buttonVariants: Variants = {
   initial: { scale: 1 },
   tap: { scale: 0.95 },
   hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
   },
   loading: {
      scale: [1, 1.1, 1],
      transition: {
         repeat: Infinity,
         duration: 1.5,
      },
   },
};

export type ActionState = {
   success?: boolean;
   message?: string;
   errors?: Record<string, string>;
   // …other fields…

   // added so the server action can tell the client where to navigate next
   redirectTo?: string;
};
