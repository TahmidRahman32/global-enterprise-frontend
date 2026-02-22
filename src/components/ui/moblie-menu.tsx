"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
   const [isClient, setIsClient] = useState(false);
   const [isSheetOpen, setIsSheetOpen] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      setIsClient(true);
   }, []);

   const closeSheet = () => {
      setIsSheetOpen(false);
   };

   const isActive = (path: any) => {
      return pathname === path;
   };

   const navItems = [
      { path: "/", label: "Home" },
      { path: "/products", label: "Products" },
      { path: "/services", label: "Services" },
      { path: "/contact", label: "Contact" },
      { path: "/admin/dashboard", label: "Dashboard" },
   ];

   return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
         <SheetTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-md" aria-label="Open menu">
               <Menu className="h-6 w-6" />
            </button>
         </SheetTrigger>
         <SheetContent side="left" className="w-[900px] sm:w-[400px]">
            <SheetHeader>
               <SheetTitle>
                  <Link href="/" onClick={closeSheet} className="text-xl font-bold block py-4">
                     Logo
                  </Link>
               </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col mt-8 space-y-2">
               {navItems.map((item) => (
                  <Link key={item.path} href={item.path} onClick={closeSheet} className={`px-4 py-3 text-lg rounded-md transition-colors ${isActive(item.path) ? "bg-yellow-500 text-gray-900 font-medium" : "hover:bg-gray-100"}`}>
                     {item.label}
                  </Link>
               ))}
            </div>

         </SheetContent>
      </Sheet>
   );
}
