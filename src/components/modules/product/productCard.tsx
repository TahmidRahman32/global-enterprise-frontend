import React from "react";
import { Printer, Check, Zap, Star, Download, Settings } from "lucide-react";

interface ProductCardProps {
   title: string;
   description: string;
   price: number;
   period?: "month" | "year";
   features: string[];
   badge?: "Popular" | "New" | "Best Value";
   highlight?: boolean;
   onTry?: () => void;
   onCustomize?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, price, period = "month", features, badge, highlight = false, onTry, onCustomize }) => {
   return (
      <div className={`relative group ${highlight ? "col-span-1 md:col-span-2 lg:col-span-1" : ""}`}>
         {/* Badge */}
         {badge && (
            <div
               className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg z-10 ${
                  badge === "Popular" ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white" : badge === "Best Value" ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white" : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
               }`}
            >
               {badge}
            </div>
         )}

         {/* Card Container */}
         <div
            className={`
        h-full p-6 rounded-2xl border-2 transition-all duration-300
        ${highlight ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl shadow-blue-100/50" : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50/50"}
        hover:-translate-y-1
      `}
         >
            {/* Icon & Title */}
            <div className="flex items-start justify-between mb-4">
               <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${highlight ? "bg-blue-600" : "bg-gray-100"}`}>
                     <Printer className={`w-6 h-6 ${highlight ? "text-white" : "text-gray-700"}`} />
                  </div>
                  <div>
                     <h3 className={`text-xl font-bold ${highlight ? "text-gray-900" : "text-gray-800"}`}>{title}</h3>
                     <p className="text-sm text-gray-600 mt-1">{description}</p>
                  </div>
               </div>

               {highlight && (
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                     <Star className="w-4 h-4 text-yellow-500 fill-current" />
                     <span className="ml-1 text-sm font-medium text-yellow-700">4.8</span>
                  </div>
               )}
            </div>

            {/* Price */}
            <div className="mb-6">
               <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${price}</span>
                  <span className="text-gray-500 ml-2">/{period}</span>
                  {period === "year" && <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 30%</span>}
               </div>
               {period === "month" && <p className="text-sm text-gray-500 mt-1">${price * 12 - price * 12 * 0.3}/year with annual plan</p>}
            </div>

            {/* Features */}
            <div className="mb-6 space-y-3">
               {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                     <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                     <span className="text-gray-700">{feature}</span>
                  </div>
               ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-8">
               <button
                  onClick={onTry}
                  className={`
              w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center
              ${highlight ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25" : "bg-gray-900 text-white hover:bg-gray-800"}
            `}
               >
                  <Download className="w-5 h-5 mr-2" />
                  Try Free Demo
               </button>

               <button
                  onClick={onCustomize}
                  className={`
              w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center
              ${highlight ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50" : "border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600"}
            `}
               >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
