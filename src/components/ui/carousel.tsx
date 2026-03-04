"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// shadcn/ui components
import { Card } from "@/components/ui/card";
import Image from "next/image";

// Fixed slider items with unique IDs
const sliderItems = [
   {
      id: 1,
      title: "New Firmware Update",
      subtitle: "Zebra ZT410 v2.1 – Improved speed & reliability",
      bg: "https://images.unsplash.com/photo-1761839257469-96c78a7c2dd3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: "https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: 2,
      title: "Bulk Label Printing",
      subtitle: "Save 30% time with batch processing",
      bg: "https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: "https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: 3,
      title: "Low Ink Alert",
      subtitle: "3 printers need attention this week",
      bg: "https://images.unsplash.com/photo-1761839257469-96c78a7c2dd3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: "https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
   {
      id: 4,
      title: "Low Ink Alert",
      subtitle: "3 printers need attention this week",
      bg: "https://images.unsplash.com/photo-1761839257469-96c78a7c2dd3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: "https://images.unsplash.com/photo-1761839257469-96c78a7c2dd3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   },
];

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

interface ProductCarouselProps {
   autoPlayInterval?: number; // milliseconds
}

const ProductCarousel = ({ autoPlayInterval = 5000 }: ProductCarouselProps) => {
   return (
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
         <Card className="overflow-hidden h-[500px] md:h-[650px] lg:h-[85vh] relative  bg-foreground dark:bg-black">
            <Swiper
               modules={[Autoplay, Navigation, Pagination]}
               spaceBetween={0}
               slidesPerView={1}
               navigation={{
                  prevEl: ".custom-swiper-button-prev",
                  nextEl: ".custom-swiper-button-next",
               }}
               pagination={{ clickable: true }}
               autoplay={{
                  delay: autoPlayInterval,
                  disableOnInteraction: false,
               }}
               loop={true}
               className="h-full w-full"
            >
               {sliderItems.map((item) => (
                  <SwiperSlide key={item.id}>
                     {/* Slide container with relative positioning for background image */}
                     <div className="relative h-full w-full overflow-hidden">
                        {/* Background image with overlay */}
                        <div className="absolute inset-0 z-0">
                           <Image src={item.bg} alt="" fill className="object-cover opacity-20" priority sizes="100vw" />
                           <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
                        </div>

                        {/* Content container */}
                        <div className="relative z-10 h-full w-full flex items-center justify-center md:gap-24 px-8 md:px-16 lg:px-24 text-white ">
                           {/* Text section */}
                           <div className="max-w-4xl text-center">
                              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">{item.title}</h2>
                              <p className="text-lg sm:text-xl md:text-2xl opacity-90">{item.subtitle}</p>
                           </div>

                           
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <button className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20 transition">
               <ChevronLeft size={24} />
            </button>
            <button className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-20 transition">
               <ChevronRight size={24} />
            </button>

            {/* Style pagination dots to match original design */}
            <style jsx global>{`
               .swiper-pagination-bullet {
                  background: rgba(255, 255, 255, 0.5);
                  opacity: 1;
                  width: 12px;
                  height: 12px;
                  margin: 0 6px;
               }
               .swiper-pagination-bullet-active {
                  background: white;
                  transform: scale(1.25);
               }
            `}</style>
         </Card>
      </motion.div>
   );
};

export default ProductCarousel;
