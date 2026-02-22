// components/ViewReview.tsx
"use client";

import { useState, useEffect } from "react";
import { easeOut, motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

interface Review {
   _id: string;
   reviewName: string;
   review: string;
   image: string;
   rating: number;
   position: string;
}

// Fake data for demonstration
const fakeReviews: Review[] = [
   {
      _id: "1",
      reviewName: "Sarah Johnson",
      review: "Absolutely amazing service! The team went above and beyond to deliver exceptional results. Highly recommended! The attention to detail and professionalism was outstanding.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Marketing Director",
   },
   {
      _id: "2",
      reviewName: "Michael Chen",
      review: "Outstanding quality and professionalism. The attention to detail and customer service is unmatched in the industry. Will definitely work with them again!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Product Manager",
   },
   {
      _id: "3",
      reviewName: "Emily Rodriguez",
      review: "Transformative experience working with this team. They truly understand client needs and deliver beyond expectations. Exceptional work!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      position: "Creative Director",
   },
   {
      _id: "4",
      reviewName: "David Kim",
      review: "Professional, efficient, and delivered exactly what we needed. The communication was excellent throughout the entire process. Highly satisfied!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Tech Lead",
   },
   {
      _id: "5",
      reviewName: "Jessica Williams",
      review: "Outstanding results! The team understood our vision perfectly and delivered beyond our expectations. The quality of work is exceptional.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      position: "Brand Manager",
   },
   {
      _id: "6",
      reviewName: "Alex Thompson",
      review: "Incredible experience from start to finish. The team is professional, creative, and delivers high-quality work on time. Highly recommended!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      position: "Startup Founder",
   },
];

const ViewReview = () => {
   const [reviews, setReviews] = useState<Review[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // Simulate API call
      const timer = setTimeout(() => {
         setReviews(fakeReviews);
         setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
   }, []);

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: easeOut,
         },
      },
   };

   const renderStars = (rating: number) => {
      return Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />);
   };

   // Loading State
   if (isLoading) {
      return (
         <div className="min-h-screen bg-[#0f0c02] dark:bg-[#161101] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
               <div className="w-16 h-16 border-4 border-[#bd9520] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
               <p className="text-white text-xl font-light">Loading amazing reviews...</p>
            </motion.div>
         </div>
      );
   }

   return (
      <div className=" mb-1 bg-[#0f0c02] dark:bg-[#161101] relative overflow-hidden">
         {/* Animated Background Elements */}
         <div className="absolute inset-0">
            <motion.div
               animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
               }}
               transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
               className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
               animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.15, 0.1, 0.15],
               }}
               transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
               }}
               className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
               animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.15, 0.1],
               }}
               transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
               }}
               className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
            />
         </div>

         <div className="relative z-10 py-20 px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
               <h2 className="font-primary-inter font-bold text-4xl md:text-5xl pb-16 relative inline-block text-white">
                  What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd9520] to-[#bd9520]">Clients Say</span>
                  {/* Underline animation */}
                  <motion.div
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#bd9520] to-transparent"
                  />
               </h2>

               <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-sm text-gray-300 max-w-2xl mx-auto">
                  Discover why thousands of clients trust us with their projects and vision
               </motion.p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto">
               {reviews.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white text-xl">
                     No reviews yet. Be the first to leave a review!
                  </motion.div>
               ) : (
                  <Swiper
                     effect={"coverflow"}
                     grabCursor={true}
                     centeredSlides={true}
                     slidesPerView={"auto"}
                     coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                     }}
                     speed={1500}
                     pagination={{
                        clickable: true,
                        dynamicBullets: true,
                     }}
                     autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                     }}
                     modules={[EffectCoverflow, Pagination, Autoplay]}
                     className="modern-review-swiper"
                     breakpoints={{
                        320: {
                           slidesPerView: 1,
                           spaceBetween: 20,
                        },
                        768: {
                           slidesPerView: 2,
                           spaceBetween: 30,
                        },
                        1024: {
                           slidesPerView: 3,
                           spaceBetween: 40,
                        },
                     }}
                  >
                     {reviews.map((review) => (
                        <SwiperSlide key={review._id}>
                           <motion.div
                              variants={itemVariants}
                              whileHover={{
                                 scale: 1.05,
                                 y: -10,
                                 transition: { duration: 0.3 },
                              }}
                              className="relative group h-full"
                           >
                              {/* Card */}
                              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                                 {/* Quote Icon */}
                                 <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#bd9520] to-[#634d0b] rounded-2xl flex items-center justify-center shadow-lg"
                                 >
                                    <Quote className="w-6 h-6 text-white" />
                                 </motion.div>

                                 {/* Rating */}
                                 <div className="flex justify-center mb-6">
                                    <div className="flex gap-1">{renderStars(review.rating)}</div>
                                 </div>

                                 {/* Review Text */}
                                 <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-200 text-lg leading-relaxed mb-8 text-center italic flex-grow">
                                    "{review.review}"
                                 </motion.p>

                                 {/* Reviewer Info */}
                                 <div className="flex flex-col items-center mt-auto">
                                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} className="relative mb-4">
                                       <div className="absolute inset-0 bg-gradient-to-r from-[#bd9520] to-[#634d0b] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                                       <img src={review.image} alt={review.reviewName} className="relative w-20 h-20 rounded-full border-4 border-white/20 object-cover" />
                                    </motion.div>

                                    <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl font-semibold text-white mb-2 text-center">
                                       {review.reviewName}
                                    </motion.h3>

                                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-yellow-400 text-sm text-center">
                                       {review.position}
                                    </motion.p>
                                 </div>
                              </div>
                           </motion.div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               )}
            </motion.div>

            {/* Stats Section */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
               {[
                  { number: "2K+", label: "Happy Clients" },
                  { number: "4.9/5", label: "Avg Rating" },
                  { number: "50+", label: "Countries" },
                  { number: "24/7", label: "Support" },
               ].map((stat, index) => (
                  <motion.div
                     key={stat.label}
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                     whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 },
                     }}
                     className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                  >
                     <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                           type: "spring",
                           stiffness: 200,
                           delay: index * 0.1,
                        }}
                        className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bd9520] to-[#8b6c0e] mb-2"
                     >
                        {stat.number}
                     </motion.div>
                     <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
               ))}
            </motion.div>
         </div>

         <style jsx global>{`
            .modern-review-swiper {
               padding: 50px 20px 100px !important;
            }

            .modern-review-swiper .swiper-pagination-bullet {
               width: 12px;
               height: 12px;
               background: rgba(225, 255, 255, 0.5);
               opacity: 0.7;
               transition: all 0.3s ease;
            }

            .modern-review-swiper .swiper-pagination-bullet-active {
               background: linear-gradient(45deg, #bd9520, #bd9520);
               opacity: 1;
               transform: scale(1.2);
            }

            .swiper-slide {
               transition: all 0.3s ease;
            }

            .swiper-slide-active {
               transform: scale(1.05);
            }
         `}</style>
      </div>
   );
};

export default ViewReview;
