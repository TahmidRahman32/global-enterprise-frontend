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
         <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Left Column */}
               <div>
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full mb-6">
                     <Zap className="w-4 h-4" />
                     <span className="text-sm font-semibold">LIMITED TIME OFFER</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                     Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Barcode Label</span> Printing
                  </h1>

                  <p className="text-xl text-gray-300 mb-8">Print high-quality labels, manage inventory, and streamline operations with our enterprise-grade solution.</p>

                  <div className="flex flex-wrap gap-4">
                     <button
                        onClick={onGetStarted}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                     >
                        Start Free Trial
                     </button>

                     <button onClick={onTryDemo} className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                        <div className="flex items-center">
                           <Download className="mr-2" />
                           View Demo
                        </div>
                     </button>
                  </div>

                  <div className="mt-8 flex items-center space-x-6">
                     <div className="flex items-center">
                        <div className="flex">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                           ))}
                        </div>
                        <span className="ml-2 text-gray-300">4.9/5</span>
                     </div>
                     <div className="text-gray-400">|</div>
                     <div className="text-gray-300">
                        <span className="font-bold">10,000+</span> labels printed daily
                     </div>
                     <div className="text-gray-400">|</div>
                     <div className="text-gray-300">
                        <span className="font-bold">24/7</span> support
                     </div>
                  </div>
               </div>

               {/* Right Column - Preview */}
               <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                  <div className="text-center mb-6">
                     <h3 className="text-xl font-bold text-white mb-2">Live Preview</h3>
                     <p className="text-gray-400">Customizable label templates</p>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <Barcode className="w-6 h-6 text-white" />
                           </div>
                           <div>
                              <div className="text-white font-semibold">Product Label</div>
                              <div className="text-sm text-gray-400">SKU: PRD-2024-001</div>
                           </div>
                        </div>
                        <div className="text-green-400 font-bold">$49.99</div>
                     </div>

                     <div className="bg-gray-800 rounded-lg p-4 mb-6">
                        <div className="flex justify-center items-center h-16">
                           <div className="h-2 w-full bg-white/80 rounded"></div>
                           <div className="h-2 w-full bg-white/80 rounded mx-2"></div>
                           <div className="h-2 w-full bg-white/80 rounded mx-2"></div>
                           <div className="h-2 w-full bg-white/80 rounded"></div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-3 rounded-lg">
                           <div className="text-gray-400 text-sm">Location</div>
                           <div className="text-white font-medium">A-12</div>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                           <div className="text-gray-400 text-sm">Quantity</div>
                           <div className="text-white font-medium">150 units</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Features Grid */}
         <div className="mb-12">
            <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
               <p className="text-gray-600 max-w-2xl mx-auto">From small businesses to large enterprises, we have the tools you need</p>
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
