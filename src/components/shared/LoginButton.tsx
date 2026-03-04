"use client"
import { MailIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/ThemeToggle";
import { motion } from "framer-motion";
import { buttonVariants, itemVariants } from "@/Types/Login";
import Link from "next/link";

const LoginButton = () => {
   return (
      <div className="flex items-center gap-2">
         {/* Messages */}
         <Button
            size="icon"
            variant="ghost"
            className="relative size-8 rounded-full text-muted-foreground shadow-none
                           bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60
                           backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
            aria-label="Open notifications "
         >
            <MailIcon size={16} aria-hidden="true" />
            <div aria-hidden="true" className="absolute top-0.5 right-0.5 size-1 rounded-full bg-primary" />
         </Button>
         {/* Notification menu */}

         <ModeToggle />
         <Link href="/login">
            {/* Login Button */}
            <motion.div variants={itemVariants}>
               <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#c4840d] to-[text-black py-1 font-primary-bebas rounded-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed px-5 transform-gpu hover:scale-[1.04] active:scale-[0.98]  duration-500 text-xl"
               >
                  Login
               </motion.button>
            </motion.div>
         </Link>
      </div>
   );
};

export default LoginButton;
