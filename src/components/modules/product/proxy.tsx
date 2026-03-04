"use client";
import React, { useState } from "react";
import { Printer, Barcode, Zap, CheckCircle, Download, Cloud, Lock, Smartphone } from "lucide-react";

interface FeaturedProductProps {
   onGetStarted?: () => void;
   onTryDemo?: () => void;
}

const FeaturedProductCard: React.FC<FeaturedProductProps> = ({ onGetStarted, onTryDemo }) => {
   const [activeTab, setActiveTab] = useState<"overview" | "features" | "specs">("overview");

   const features = [
      { icon: Printer, title: "Batch Printing", desc: "Print up to 10,000 labels/hour" },
      { icon: Barcode, title: "30+ Barcode Types", desc: "QR, UPC, EAN, Code 128, and more" },
      { icon: Cloud, title: "Cloud Sync", desc: "Access labels from any device" },
      { icon: Smartphone, title: "Mobile App", desc: "Print directly from phone" },
      { icon: Lock, title: "Secure", desc: "Enterprise-grade security" },
      { icon: Zap, title: "Fast Setup", desc: "Get started in 5 minutes" },
   ];

   return (
      <div className="max-w-6xl mx-auto">
         {/* Hero Section */}
       

         {/* Features Grid */}
         <div className="mb-12">
            <div className="text-center mb-8">
               <h2 className="text-4xl font-bold mb-4 ">Everything You Need</h2>
               <p className=" max-w-2xl mx-auto">From small businesses to large enterprises, we have the tools you need</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                           <feature.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900">{feature.title}</h4>
                           <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

// Helper component for star rating
const Star: React.FC<{ className?: string }> = ({ className }) => (
   <svg className={className} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
   </svg>
);

export default FeaturedProductCard;
