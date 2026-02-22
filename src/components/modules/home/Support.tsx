"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiHeadphones, FiClock, FiUsers, FiAward, FiCheckCircle, FiMessageSquare, FiPhone, FiMail, FiChevronRight } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// If you're using a local image, make sure the path is correct
// You can either keep the import or use a public folder image
import supportImage from "@/assets/support.jpg"; // Adjust path as needed
import Link from "next/link";

interface SupportComponentProps {
   title?: string;
   subtitle?: string;
   description?: string;
   yearsOfExperience?: number;
   imageUrl?: string;
}

const SupportComponent: React.FC<SupportComponentProps> = ({
   title = "10+ Years of Unmatched Support Excellence",
   subtitle = "Your Trusted Partner Since 2014",
   description = "For over a decade, we've been providing industry-leading support solutions that ensure your business runs smoothly 24/7. Our commitment to customer success has made us the preferred choice for thousands of businesses worldwide.",
   yearsOfExperience = 10,
   imageUrl = "",
}) => {
   const [activeTab, setActiveTab] = useState<"chat" | "phone" | "email">("chat");
   const [isHovered, setIsHovered] = useState(false);

   const stats = [
      { icon: <FiClock />, value: "24/7", label: "Support Available" },
      { icon: <FiUsers />, value: "10K+", label: "Happy Clients" },
      { icon: <FiHeadphones />, value: "98.5%", label: "Satisfaction Rate" },
      { icon: <FiAward />, value: "50+", label: "Awards Won" },
   ];

   const supportChannels = [
      {
         id: "chat",
         icon: <FiMessageSquare />,
         title: "Live Chat",
         description: "Instant response within 2 minutes",
         available: true,
         responseTime: "2 mins",
      },
      {
         id: "phone",
         icon: <FiPhone />,
         title: "Phone Support",
         description: "Direct line to our experts",
         available: true,
         responseTime: "Immediate",
      },
      {
         id: "email",
         icon: <FiMail />,
         title: "Email Ticket",
         description: "Detailed technical support",
         available: true,
         responseTime: "4 hours",
      },
   ];

   // Fixed TypeScript variants
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12,
         },
      },
   };

   const imageVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
         scale: 1,
         opacity: 1,
         transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
         },
      },
      hover: {
         scale: 1.02,
         transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10,
         },
      },
   };

   const titleVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.6 },
      },
   };

   const badgeVariants = {
      hidden: { scale: 0, rotate: -180 },
      visible: {
         scale: 1,
         rotate: 0,
         transition: {
            type: "spring" as const,
            delay: 0.5,
         },
      },
   };

   const floatingCardVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: {
         opacity: 1,
         x: 0,
         transition: {
            type: "spring" as const,
            delay: 0.3,
         },
      },
   };

   const channelVariants = {
      rest: { x: 0 },
      hover: {
         x: 10,
         transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 15,
         },
      },
   };

   const statItemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12,
         },
      },
   };

   return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-accent-foreground">
         {/* Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
         </div>

         <div className="max-w-7xl mx-auto relative">
            {/* Header */}
            <motion.div variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
               <Badge variant="outline" className="mb-4 px-4 py-2 rounded-full bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                  <FiHeadphones className="mr-2 h-4 w-4" />
                  PREMIUM SUPPORT
               </Badge>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={titleVariants} className="relative">
                  <h2 className="font-primary-inter font-bold text-4xl md:text-5xl pb-16 relative inline-block text-accent">
                     Dedicated Support
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
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 ">
               {/* Left Column - Image with Decorative Elements */}
               <motion.div className="relative ">
                  <motion.div variants={imageVariants} initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true }} className="relative rounded-3xl overflow-hidden shadow-2xl">
                     <Card className="relative h-[500px] w-full border-0">
                        <CardContent className="p-0 h-full">
                           {/* Background Image */}
                           <div className="absolute inset-0">
                              {/* OPTION 1: Using imported image */}
                              <Image src={supportImage} alt="Support Team" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                           </div>

                           {/* Overlay Content */}
                           <div className="relative z-10 h-full flex flex-col justify-end pl-2">
                              <div className="text-white">
                                 <div className="text-8xl font-bold mb-2">{yearsOfExperience}+</div>
                                 <div className="text-2xl font-semibold">Years of Excellence</div>
                                 <div className="flex items-center mb-18">
                                    <div className="flex">
                                       {[...Array(5)].map((_, i) => (
                                          <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                          </svg>
                                       ))}
                                    </div>
                                    <span className="ml-2 text-lg">Rated 5.0 by 2,500+ clients</span>
                                 </div>
                              </div>
                           </div>

                           {/* Floating Badge */}
                           <motion.div variants={badgeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="absolute top-4 right-4 z-20">
                              <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-teal-300 px-6 py-3 rounded-full shadow-xl border-0">
                                 <FiCheckCircle className="mr-2 h-4 w-4" />
                                 <span className="font-bold">Trusted Since 2014</span>
                              </Badge>
                           </motion.div>
                        </CardContent>
                     </Card>
                  </motion.div>

                  {/* Floating Stats Cards */}
                  <motion.div variants={floatingCardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="absolute -bottom-4   -left-4 z-10 w-56 ">
                     <Card className="bg-white/90 border-amber-100 shadow-2xl h-24">
                        <CardContent className="p-">
                           <div className="flex items-center justify-center">
                              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                                 <FiUsers className="w-6 h-6 text-teal-600" />
                              </div>
                              <div>
                                 <div className="text-2xl font-bold text-teal-600">10,000+</div>
                                 <div className="text-gray-600 font-primary-BB font-bold">Active Users</div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </motion.div>
               </motion.div>

               {/* Right Column - Content */}
               <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2 md:pt-16">
                  {/* Stats Grid */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 "></motion.div>

                  {/* Support Channels */}
                  <motion.div variants={itemVariants}>
                     <h3 className="text-4xl font-bold text-gray-500 font-primary-BB">Connect with Our Experts</h3>
                     <p className="text-gray-600 mb-2">Our support team is available 24/7 to assist you with any questions or concerns.</p>
                     <p className="text-accent my-8">
                        Connect with our experts to get clear guidance and practical solutions tailored to your needs. Our experienced team is ready to answer your questions, share insights, and help you make confident decisions with ease.
                     </p>
                     {/* <div className="space-y-4">
                        {supportChannels.map((channel) => (
                           <motion.div key={channel.id} variants={channelVariants} initial="rest" whileHover="hover">
                              <Card
                                 className={`cursor-pointer transition-all duration-300 ${activeTab === channel.id ? "border-2 border-amber-600 bg-gradient-to-r from-amber-500/50 to-amber-500/30" : "border border-gray-800 hover:border-amber-500"}`}
                                 onClick={() => setActiveTab(channel.id as "chat" | "phone" | "email")}
                              >
                                 <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center">
                                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${activeTab === channel.id ? "bg-gradient-to-r from-amber-500 to-amber-900 text-white" : "bg-teal-600 text-gray-900"}`}>
                                             {channel.icon}
                                          </div>
                                          <div>
                                             <div className="font-semibold text-yellow-700">{channel.title}</div>
                                             <div className="text-sm text-gray-600">{channel.description}</div>
                                          </div>
                                       </div>
                                       <div className="flex items-center">
                                          <span className="text-sm text-gray-500 mr-3">Response: {channel.responseTime}</span>
                                          <FiChevronRight className={`transition-transform ${activeTab === channel.id ? "transform rotate-90 text-amber-500" : "text-gray-400"}`} />
                                       </div>
                                    </div>
                                 </CardContent>
                              </Card>
                           </motion.div>
                        ))}
                     </div> */}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div variants={itemVariants} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="pt-8">
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/contact">
                           <Button
                              size="lg"
                              className="group relative w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-700 hover:to-amber-600"
                           >
                              {/* Animated background on hover */}
                              <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600" initial={false} animate={isHovered ? { x: "100%" } : { x: "-100%" }} transition={{ duration: 0.5 }} />

                              {/* Button content */}
                              <div className="relative z-10 flex items-center justify-center">
                                 <span>Get Premium Support Now</span>
                                 <motion.div animate={isHovered ? { x: 10 } : { x: 0 }} transition={{ type: "spring" as const, stiffness: 400 }} className="ml-3">
                                    <FiHeadphones className="w-6 h-6" />
                                 </motion.div>
                              </div>

                              {/* Shine effect */}
                              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: "-100%" }} animate={isHovered ? { x: "100%" } : { x: "-100%" }} transition={{ duration: 0.8 }} />
                           </Button>
                        </Link>
                     </motion.div>

                     <p className="text-center text-gray-600 mt-4 text-sm">
                        Average response time: <span className="font-semibold">2 minutes</span> • Available 24/7/365
                     </p>
                  </motion.div>
               </motion.div>
            </div>
         </div>

         {/* Add animation styles to globals.css */}
         <style jsx>{`
            @keyframes blob {
               0% {
                  transform: translate(0px, 0px) scale(1);
               }
               33% {
                  transform: translate(30px, -50px) scale(1.1);
               }
               66% {
                  transform: translate(-20px, 20px) scale(0.9);
               }
               100% {
                  transform: translate(0px, 0px) scale(1);
               }
            }

            .animate-blob {
               animation: blob 7s infinite;
            }

            .animation-delay-2000 {
               animation-delay: 2s;
            }

            .animation-delay-4000 {
               animation-delay: 4s;
            }
         `}</style>
      </section>
   );
};

export default SupportComponent;
