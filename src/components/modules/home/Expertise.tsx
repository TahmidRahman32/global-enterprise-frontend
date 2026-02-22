"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Aperture, Church, Quote } from "lucide-react";

const Expertise = () => {
   // Container animation
  

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

  // Icon animation
   const iconVariants: Variants = {
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

   // Expertise cards data
   const expertiseCards = [
      {
         id: 1,
         icon: <Aperture color="#bd9520" size={35} />,
         title: "Global Strategy",
         description: ["Navigating complex international markets with", "precision and foresight. We build bridges across continents."],
         link: "/expertise/global-strategy",
      },
      {
         id: 2,
         icon: <Church color="#bd9520" size={35} />,
         title: "Wealth Management",
         description: ["Tailored financial solutions for preserving and", "growing your wealth across generations."],
         link: "/expertise/wealth-management",
      },
      {
         id: 3,
         icon: <Quote color="#bd9520" size={35} />,
         title: "Risk Assurance",
         description: ["Comprehensive risk assessment and mitigation", "strategies to protect your business interests."],
         link: "/expertise/risk-assurance",
      },
   ];

   return (
      <section className="my-20 text-center relative overflow-hidden">
         {/* Background decorative elements */}
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#bd9520]/5 rounded-full blur-xl" />
            <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#bd9520]/5 rounded-full blur-xl" />
         </motion.div>

         {/* Section Title */}
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={titleVariants} className="relative">
            <h2 className="font-primary-inter font-bold text-4xl md:text-5xl pb-16 relative inline-block">
               Our Expertise
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
         <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10 px-4 md:px-20 lg:px-40">
            {expertiseCards.map((card, index) => (
               <motion.div
                  key={card.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                  custom={index}
                  className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-[#bd9520]/20 transition-all duration-300 relative overflow-hidden group"
               >
                  {/* Hover background effect */}
                  <motion.div initial={{ opacity: 0, scale: 0 }} whileHover={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-gradient-to-br from-[#bd9520]/5 to-transparent -z-10" />

                  {/* Icon Container */}
                  <motion.div
                     variants={iconVariants}
                     whileHover="hover"
                     className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#bd9520]/10 to-[#bd9520]/5 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#bd9520]/20 group-hover:to-[#bd9520]/10 transition-colors duration-300"
                  >
                     {card.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h3 variants={textVariants} className="text-xl md:text-2xl font-primary-inter font-semibold text-gray-800 group-hover:text-[#bd9520] transition-colors duration-300">
                     {card.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.div variants={textVariants} transition={{ delay: 0.1 }} className="space-y-1">
                     {card.description.map((line, idx) => (
                        <p key={idx} className="text-sm md:text-base opacity-80 text-gray-600 leading-relaxed">
                           {line}
                        </p>
                     ))}
                  </motion.div>

                  {/* Learn More Link */}
                  <motion.div variants={textVariants} transition={{ delay: 0.2 }} className="mt-6">
                     <Link href={card.link} className="inline-flex items-center text-[#bd9520] font-medium group/link">
                        <span className="relative">
                           Learn More
                           {/* Animated underline */}
                           <motion.span initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} className="absolute left-0 bottom-0 w-full h-px bg-[#bd9520] origin-left" />
                        </span>
                        <motion.svg initial={{ x: 0 }} whileHover={{ x: 5 }} className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                     </Link>
                  </motion.div>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-[#bd9520]/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:bg-[#bd9520]/20 transition-colors duration-300" />
                  </div>
               </motion.div>
            ))}
         </motion.div>

         {/* View All Button */}
         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="mt-16">
            <Link href="/expertise" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#bd9520] to-amber-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
               View All Expertise
               <motion.svg animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </motion.svg>
            </Link>
         </motion.div>
      </section>
   );
};

export default Expertise;
