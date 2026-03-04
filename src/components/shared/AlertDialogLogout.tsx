"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { logoutUser } from "@/services/auth/logoutUser";
import { motion } from "framer-motion";
import { buttonVariants, itemVariants } from "@/Types/Login";

export function LogoutDialog() {

    const handleLogout = async () => {
       await logoutUser();
    };
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <motion.div variants={itemVariants}>
               <motion.button
                  // onClick={handleLogout}
                  variants={buttonVariants}
                  initial="initial"
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#c4840d] to-[text-black py-1 font-primary-bebas rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed px-5 transform-gpu hover:scale-[1.04] active:scale-[0.98]  duration-500 text-xl"
               >
                  Logout
               </motion.button>
            </motion.div>
         </AlertDialogTrigger>
         <AlertDialogContent className="bg-white dark:bg-gray-950 border shadow-2xl rounded-lg">
            <AlertDialogHeader>
               <AlertDialogTitle className="text-black dark:text-white">Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription className="text-gray-900 dark:text-gray-300">This action will log you out of your account.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="bg-gray-100 dark:bg-gray-900">Cancel</AlertDialogCancel>
               <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white p-1">Confirm Logout</Button>
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
