import React, { ReactNode } from "react";

interface ButtonProps {
   children: ReactNode;
   onClick?: () => void;
   className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
   return (
      <button
         onClick={onClick}
         className={`
        cursor-pointer 
        px-6 py-3 
        rounded-[30px] 
        
        border-[#E5C158]
        inline-block 
        overflow-hidden 
        bg-[#ffffffa9]
        shadow-[inset_6px_6px_10px_rgba(255,255,255,0.6),inset_-6px_-6px_10px_rgba(0,0,0,0.3),2px_2px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(255,255,255,0.5)]
        hover:shadow-[inset_2px_2px_1px_rgba(0,0,0,0.3),inset_-2px_-2px_1px_rgba(255,255,255,0.5)]
        active:scale-95
        transition-all 
        duration-300 
        ease-linear
        active:transition-transform
        active:duration-100
        active:ease-in
        group
        font-primary-inter
        ${className}
      `}
      >
         {typeof children === "string" ? (
            <div className="flex">
               {children.split("").map((char, index) => (
                  <span
                     key={index}
                     className={`
                font-black 
                text-2xl 
                text-[#2e280acb]
                relative 
                inline-block 
                transition-transform 
                duration-300 
                ease-out 
                z-10 
                px-1
                group-hover:text-teal-400
                group-active:text-teal-400
                hover:translate-y-[-7px]
                group-hover:[text-shadow:1px_1px_1px_rgba(255,255,255,0.4),-1px_-1px_1px_rgba(0,0,0,0.4)]
                group-active:[text-shadow:1px_1px_1px_rgba(255,255,255,0.5),-1px_-1px_2px_rgba(0,0,0,0.5)]
                font-primary-inter
              `}
                     style={{ transitionDelay: `${index * 100}ms` }}
                  >
                     {char}
                  </span>
               ))}
            </div>
         ) : (
            <span className="font-black text-2xl text-black group-hover:text-teal-900 group-active:text-[#363503b7]">{children}</span>
         )}
      </button>
   );
};

// Alternative version with simpler text styling (if you don't want letter-by-letter animation)
export const SimpleButton: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => {
   return (
      <button
         onClick={onClick}
         className={`
        cursor-pointer 
        px-6 py-3 
        rounded-[30px] 
        border-[5px] 
        border-[#E5C158]
        inline-block 
        overflow-hidden 
        bg-black
        shadow-[inset_6px_6px_10px_rgba(255,255,255,0.6),inset_-6px_-6px_10px_rgba(0,0,0,0.3),2px_2px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(255,255,255,0.5)]
        hover:shadow-[inset_2px_2px_1px_rgba(0,0,0,0.3),inset_-2px_-2px_1px_rgba(255,255,255,0.5)]
        active:scale-95
        transition-all 
        duration-300 
        ease-linear
        active:transition-transform
        active:duration-100
        active:ease-in
        group
        font-primary-inter
        ${className}
      `}
      >
         <span
            className={`
        font-black 
        font-primary-inter
        text-2xl 
        text-[#131203b7]
        [text-shadow:1px_1px_1px_rgba(255,255,255,0.4),-1px_-1px_1px_rgba(0,0,0,0.4)]
        group-hover:text-teal-400
        group-active:text-teal-400
        group-active:[text-shadow:1px_1px_1px_rgba(255,255,255,0.5),-1px_-1px_2px_rgba(0,0,0,0.5)]
        transition-colors
        duration-300
      `}
         >
            {children}
         </span>
      </button>
   );
};

export default Button;
