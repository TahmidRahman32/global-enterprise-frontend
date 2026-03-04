// import ChromaGrid from "./ChromaGrid";
"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { SpotlightCard } from "./ProxyCard";

// Define proper type for card items
interface CardItem {
   id: number;
   image: string;
   title: string;
   subtitle: string;
   handle: string;
   borderColor?: string;
   gradient?: string;
   url?: string;
   link: string;
}

const items: CardItem[] = [
   {
      id: 1,
      image: "https://i.pravatar.cc/300?img=1",
      title: "Sarah Johnson",
      subtitle: "Frontend Developer",
      handle: "@sarahjohnson",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/sarahjohnson",
      link: "/expertise/global-strategy",
   },
   {
      id: 2,
      image: "https://i.pravatar.cc/300?img=2",
      title: "Mike Chen",
      subtitle: "Backend Engineer",
      handle: "@mikechen",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://linkedin.com/in/mikechen",
      link: "/expertise/global-strategy",
   },
   {
      id: 3,
      image: "https://i.pravatar.cc/300?img=3",
      title: "Emily Rodriguez",
      subtitle: "UX Designer",
      handle: "@emilydesign",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(145deg, #8B5CF6, #000)",
      url: "https://dribbble.com/emilyr",
      link: "/expertise/global-strategy",
   },
   {
      id: 4,
      image: "https://i.pravatar.cc/300?img=4",
      title: "David Kim",
      subtitle: "DevOps Engineer",
      handle: "@davidkim",
      borderColor: "#EC4899",
      gradient: "linear-gradient(180deg, #EC4899, #000)",
      url: "https://github.com/davidkim",
      link: "/expertise/global-strategy",
   },
   {
      id: 5,
      image: "https://i.pravatar.cc/300?img=5",
      title: "Lisa Wang",
      subtitle: "Product Manager",
      handle: "@lisawang",
      borderColor: "#14B8A6",
      gradient: "linear-gradient(145deg, #14B8A6, #000)",
      url: "https://linkedin.com/in/lisawang",
      link: "/expertise/global-strategy",
   },
   {
      id: 6,
      image: "https://i.pravatar.cc/300?img=6",
      title: "James Wilson",
      subtitle: "Data Scientist",
      handle: "@jameswilson",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(180deg, #F59E0B, #000)",
      url: "https://kaggle.com/jameswilson",
      link: "/expertise/global-strategy",
   },
];

const CardSection = () => {
   // Container animation
   const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
         },
      },
   };

   // Card item animation
   const cardVariants: Variants = {
      hidden: {
         opacity: 0,
         y: 50,
         scale: 0.9,
      },
      visible: {
         opacity: 1,
         y: 0,
         scale: 1,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
            duration: 0.5,
         },
      },
      hover: {
         y: -10,
         scale: 1.02,
         boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
         transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
         },
      },
   };

   // Avatar animation
   const avatarVariants: Variants = {
      hidden: { scale: 0, rotate: -180 },
      visible: {
         scale: 1,
         rotate: 0,
         transition: {
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2,
         },
      },
      hover: {
         rotate: 360,
         scale: 1.1,
         transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.8,
         },
      },
   };

   // Text animation
   const textVariants: Variants = {
      hidden: { opacity: 0, x: -20 },
      visible: {
         opacity: 1,
         x: 0,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
         },
      },
   };

   // Title animation
   const titleVariants: Variants = {
      hidden: { opacity: 0, y: -30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
         },
      },
   };

   return (
      <div>
         <section className="my-20 text-center relative overflow-hidden ">
            {/* Background decorative elements */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute top-0 left-0 w-full h-full -z-10">
               <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#bd9520]/5 rounded-full blur-xl" />
               <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#bd9520]/5 rounded-full blur-xl" />
            </motion.div>

            {/* Section Title */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={titleVariants} className="relative">
               <h2 className="font-primary-inter font-bold text-4xl md:text-5xl pb-16 relative inline-block">
                  Our Products
                  {/* Underline animation */}
                  <motion.div
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#bd9520] to-transparent"
                  />
               </h2>
            </motion.div>

            {/* Expertise Cards Grid */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 px-4 md:px-20 lg:px-40">
               {items.map((card) => (
                  <motion.div
                     key={card.id}
                     variants={cardVariants} // if you want entrance animations
                     whileHover="hover" // if you want additional motion hover effects
                  >
                     <SpotlightCard card={card} />
                  </motion.div>
               ))}
            </motion.div>

         
         </section>
      </div>
   );
};

export default CardSection;
