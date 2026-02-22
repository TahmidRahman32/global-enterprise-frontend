"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LucideIcon, TrendingUp, Search, X, Sparkles, Zap, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import HeroImage from "../../../assets/Hero-image.jpg";

// NOTE: Placeholder for your custom Input component
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

// --- Core Data Interface ---
export interface ChainItem {
   id: string | number;
   name: string;
   icon: LucideIcon;
   details?: string;
   logo?: string;
   gradient?: string; // Optional gradient for background
}

// --- Internal Animated Type ---
type AnimatedChainItem = ChainItem & {
   distanceFromCenter: number;
   originalIndex: number;
};

// --- Component Props Interfaces ---
interface CarouselItemProps {
   chain: AnimatedChainItem;
   isActive: boolean;
}

interface ChainCarouselProps {
   items: ChainItem[];
   scrollSpeedMs?: number;
   visibleItemCount?: number;
   className?: string;
   onChainSelect?: (chainId: ChainItem["id"], chainName: string) => void;
}

// --- Modern Carousel Item Component (Updated for center view) ---
const ModernCarouselItem: React.FC<CarouselItemProps> = ({ chain, isActive }) => {
   const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } = chain;
   const distance = Math.abs(distanceFromCenter);

   // Visual effects for centered carousel
   const opacity = 1 - distance * 0.5;
   const scale = 1 - distance * 0.25;
   const yOffset = 0;
   const xOffset = distanceFromCenter * 120; // Spread items horizontally
   const blur = distance * 3;
   const zIndex = 100 - distance;

   return (
      <motion.div
         className={`absolute flex flex-col items-center justify-center backdrop-blur-sm border
            ${isActive ? "bg-gradient-to-b  border-blue-400/40 shadow-2xl shadow-blue-500/20" : "bg-white/5 border-white/10"}
            rounded-3xl p-6 transition-all duration-300
            w-full h-full`}
         animate={{
            opacity,
            scale,
            y: yOffset,
            x: xOffset,
            filter: `blur(${blur}px)`,
         }}
         style={{ zIndex }}
         transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
         }}
         whileHover={{
            scale: scale * 1.08,
            y: -5,
            transition: { duration: 0.5 },
         }}
      >
         {/* Icon/Logo Container */}
         <div className={`relative ${isActive ? "scale-110" : "scale-100"} transition-transform duration-300 mb-4`}>
            <div className={`rounded-2xl p-4 ${isActive ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/30" : "bg-gray-800/60 border border-white/10"}`}>
               {logo ? <img src={logo} alt={`${name} logo`} className="size-12 rounded-xl object-cover" /> : <FallbackIcon className={`size-12 ${isActive ? "text-white" : "text-gray-300"}`} />}
            </div>

            {/* Active indicator */}
            {isActive && (
               <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -top-2 -right-2">
                  <Sparkles className="size-6 text-yellow-400 fill-yellow-400" />
               </motion.div>
            )}
         </div>

         {/* Text Content */}
         <div className="flex flex-col items-center text-center">
            <span className={`text-lg font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-200"} whitespace-nowrap mb-2`}>{name}</span>
            <span className={`text-sm transition-colors duration-300 ${isActive ? "text-blue-200" : "text-gray-400"} line-clamp-2`}>{details}</span>
         </div>

         {/* Active arrow indicator */}
         {isActive && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-6">
               <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-blue-400" />
            </motion.div>
         )}
      </motion.div>
   );
};

// --- Main Modernized Component ---
const ModernChainCarousel: React.FC<ChainCarouselProps> = ({ items, scrollSpeedMs = 2000, visibleItemCount = 5, className = "", onChainSelect }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [showDropdown, setShowDropdown] = useState(false);
   const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

   const containerRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(containerRef, { margin: "-100px 0px -100px 0px" });
   const totalItems = items.length;

   // Enhanced auto-scroll with direction tracking
   useEffect(() => {
      if (isPaused || totalItems === 0) return;

      const interval = setInterval(() => {
         setDirection(1);
         setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, scrollSpeedMs);

      return () => clearInterval(interval);
   }, [isPaused, totalItems, scrollSpeedMs]);

   // Scroll listener with enhanced pause duration
   useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      const handleScroll = () => {
         setIsPaused(true);
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
            setIsPaused(false);
         }, 600);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
         window.removeEventListener("scroll", handleScroll);
         clearTimeout(timeoutId);
      };
   }, []);

   // Manual navigation
   const navigate = (dir: -1 | 1) => {
      setDirection(dir);
      setCurrentIndex((prev) => {
         if (dir === 1) return (prev + 1) % totalItems;
         return prev === 0 ? totalItems - 1 : prev - 1;
      });
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
   };

   // Memoized function for carousel items
   const getVisibleItems = useCallback((): AnimatedChainItem[] => {
      const visibleItems: AnimatedChainItem[] = [];
      if (totalItems === 0) return [];

      const itemsToShow = visibleItemCount;
      const half = Math.floor(itemsToShow / 2);

      for (let i = -half; i <= half; i++) {
         let index = currentIndex + i;
         if (index < 0) index += totalItems;
         if (index >= totalItems) index -= totalItems;

         visibleItems.push({
            ...items[index],
            originalIndex: index,
            distanceFromCenter: i,
         });
      }
      return visibleItems;
   }, [currentIndex, items, totalItems, visibleItemCount]);

   // Filtered list for search dropdown
   const filteredItems = useMemo(() => {
      return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
   }, [items, searchTerm]);

   // Handler for selecting an item from the dropdown
   const handleSelectChain = (id: ChainItem["id"], name: string) => {
      const index = items.findIndex((c) => c.id === id);
      if (index !== -1) {
         setDirection(index > currentIndex ? 1 : -1);
         setCurrentIndex(index);
         setIsPaused(true);
         if (onChainSelect) {
            onChainSelect(id, name);
         }
      }
      setSearchTerm(name);
      setShowDropdown(false);
   };

   const currentItem = items[currentIndex];

   return (
      <div id="explore-section" className={`relative overflow-hidden ${className}`}>
         {/* Animated Background */}
         <div className="absolute inset-0 my-4 container mx-auto rounded-2xl ">
            {/* Animated particles/background elements */}
            <div className="absolute inset-0 ">
               <motion.div
                  animate={{
                     scale: [1, 1.2, 1],
                     opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                     duration: 8,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
               />
               <motion.div
                  animate={{
                     scale: [1.2, 1, 1.2],
                     opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                     duration: 6,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: 2,
                  }}
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
               />
               <motion.div
                  animate={{
                     scale: [1, 1.1, 1],
                     opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                     duration: 7,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: 4,
                  }}
                  className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
               />
            </div>
         </div>

         <div ref={containerRef} className="relative z-10 py-16">
            <div className="container mx-auto px-4 md:px-8 pt-16 ">
               {/* Header Section */}
               <motion.div initial={{ y: 50, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.7 }} className="flex flex-col text-center items-center gap-6 mb-12 ">
                  <motion.h2 initial={{ scale: 0.9, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent dark:text-white z-10">
                     Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 ">Our Products</span>
                  </motion.h2>
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.6 }} className="text-lg text-gray-300 max-w-2xl z-10">
                     Discover and connect with various blockchain networks and platforms
                  </motion.p>
               </motion.div>
               <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 to-gray-900/90 rounded-3xl shadow-2xl  mb-12">
                  <Image src={HeroImage} alt="Background" fill className="object-cover opacity-20" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" />
               </div>
               {/* Main Carousel Container - Full Width */}
               <div className="relative w-full flex flex-col items-center gap-12">
                  {/* Current Item Display */}
                  <AnimatePresence mode="wait">
                     {currentItem && (
                        <motion.div key={currentItem.id} initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="">
                           <div className="flex flex-col items-center gap-4">{/* Navigation Controls */}</div>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* Main Carousel */}
                  <div className="relative w-full h-[400px]  flex items-center justify-center">
                     {getVisibleItems().map((chain) => (
                        <ModernCarouselItem key={chain.id} chain={chain} isActive={chain.distanceFromCenter === 0} />
                     ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                     <motion.button whileHover={{ scale: 2.05 }} whileTap={{ scale: 1.95 }} onClick={() => navigate(-1)} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200">
                        <ArrowLeft className="size-5 text-white" />
                     </motion.button>

                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(1)} className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200">
                        <ArrowRight className="size-5 text-white" />
                     </motion.button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModernChainCarousel;
