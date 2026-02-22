"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";


export default function CheckPassword({ field, fieldState }: { field: any; fieldState: any }) {
   const id = useId();
   const [isVisible, setIsVisible] = useState<boolean>(false);

   const toggleVisibility = () => setIsVisible((prevState) => !prevState);

   return (
      <div className="*:not-first:mt-2">
         <div className="relative">
            {/* <Input id={id} className="pe-9" placeholder="Password" type={isVisible ? "text" : "password"} /> */}
            <input
               id={id}
               type={isVisible ? "text" : "password"}
               {...field}
               autoComplete="current-password"
               className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-600 bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm ${
                  fieldState.invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
               }`}
               placeholder="password"
            />
            <button
               className="absolute  inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-slate-800 transition-[color,box-shadow] outline-none   hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
               type="button"
               onClick={toggleVisibility}
               aria-label={isVisible ? "Hide password" : "Show password"}
               aria-pressed={isVisible}
               aria-controls="password"
            >
               {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
            </button>
         </div>
      </div>
   );
}
