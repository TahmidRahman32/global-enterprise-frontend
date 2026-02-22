import Threads from "@/components/Threads";
import Image from "next/image";
import HeroImage from "../../../assets/Hero-image.jpg";
import Button from "@/components/Button/Button";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
   return (
      <div className="w-full">
         <div className="bg-black relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] overflow-hidden">
            {/* Text content - Different alignment for mobile, centered on lg+ */}
            <div
               className="absolute z-20 w-full px-4 py-6 md:px-6 md:py-4 rounded-lg md:rounded-l-lg shadow-lg 
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2
                    md:top-[35%] md:left-auto md:right-[-4%] md:transform-none md:translate-x-0 md:translate-y-0
                    text-center lg:text-center"
            >
               <div className="w-full flex flex-col items-center gap-3 md:gap-4">
                  <p className="font-primary-BB text-[#bb931c] text-sm">Global Enterprise.9896</p>
                  <h2 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center md:text-left lg:text-center ">
                     <span className="bg-white py-1 px-4 md:py-2 md:px-6 lg:py-1 lg:px-10 opacity-80 text-black inline-block mb-2 md:mb-0 font-primary-BB uppercase font-bold"> Barcode Label Printing </span>
                     <br className="block md:hidden lg:hidden" />
                     <span className="text-teal-400 block pt-2 md:pt-3 lg:pt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:text-left lg:text-center"> & Trims Solutions</span>
                  </h2>
                  <p className="w-full md:w-3/4 lg:w-3/5 xl:w-1/2 text-amber-50 opacity-60 text-sm sm:text-base md:text-lg md:text-left lg:text-center lg:mx-auto">
                     Your trusted partner for industrial printing solutions. We supply high-quality stickers, thermal ribbons, and enterprise-grade printers for manufacturing and logistics.
                  </p>
                  {/* <button className="mt-4 md:mt-6 bg-[#E5C158] text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-amber-500 transition-colors text-sm md:text-base">Explore Products</button> */}
                  <Button>
                     <div className="flex items-center gap-2 uppercase ">
                        <ShoppingBag size={22}/> Products
                     </div>
                  </Button>
               </div>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <Image src={HeroImage} alt="Background" fill className="object-cover opacity-20" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" />
            </div>

            {/* Threads component */}
            <div className="relative z-10 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
               <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
            </div>
         </div>
      </div>
   );
};

export default Hero;
