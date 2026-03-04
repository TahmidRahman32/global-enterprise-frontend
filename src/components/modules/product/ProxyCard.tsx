// inside CardSection.tsx, after imports
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CardItem {
   id: number;
   image: string;
   title: string;
   subtitle: string;
   handle: string;
   location?: string;
   borderColor?: string;
   gradient?: string;
   url?: string;
   link: string;
}

export const SpotlightCard = ({ card }: { card: CardItem }) => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const cardRef = useRef<HTMLElement>(null);

   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
   };

   const handleCardClick = (url?: string) => {
      if (url) window.open(url, "_blank");
   };

   return (
      <article
         ref={cardRef}
         onMouseMove={handleMouseMove}
         onClick={() => handleCardClick(card.url)}
         className="group relative flex flex-col w-[450px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer container mx-auto"
         style={
            {
               "--card-border": card.borderColor || "transparent",
               background: card.gradient,
               "--spotlight-color": "rgba(255,255,255,0.3)",
            } as React.CSSProperties
         }
      >
         {/* Spotlight overlay */}
         <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
               background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--spotlight-color), transparent 70%)`,
            }}
         />

         {/* Image container - FIXED HEIGHT */}
         <div className="relative z-10 p-[10px] box-border h-[300px] ">
            <div className="relative w-full h-full overflow-hidden">
               <Image src={card.image} alt={card.title} fill sizes="" className="object-cover " loading="lazy" />
            </div>
         </div>

         {/* Footer */}
         <footer className="relative z-10 p-2 text-white text-right font-sans flex justify-between items-center">
            <div className="text-right">
               <h3 className="m-0 text-xl font-semibold">{card.title}</h3>
               {card.handle && <span className="text-[0.95rem] opacity-80 ">{card.handle}</span>}
               <p className="m-0 text-[0.25rem] opacity-85">{card.subtitle}</p>
               {card.location && <span className="text-[0.15rem] opacity-85 text-right">{card.location}</span>}
            </div>
            <div>
               <Button className="py-2 px-4 text-xl font-bold font-primary-bebas">Details</Button>
            </div>
         </footer>
      </article>
   );
};
