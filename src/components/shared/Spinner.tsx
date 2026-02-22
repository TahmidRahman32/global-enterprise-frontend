// export default function FullPageLoader() {
//    return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//          <div className="bg-white p-8 rounded-2xl shadow-2xl">
//             <div className="relative">
//                <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
//                <div className="w-20 h-20 border-4 border-yellow-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
//                <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full animate-pulse"></div>
//                </div>
//             </div>
//             <p className="text-center mt-4 text-gray-600 font-medium">Loading...</p>
//          </div>
//       </div>
//    );
// }

export default function Spinner() {
   return (
      <div className="h-screen flex flex-col items-center justify-center">
         <div className="inline-flex items-center gap-4">
            <svg className="size-12 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="url(#gradient)" strokeWidth="4"></circle>
               <path className="opacity-75" fill="url(#gradient)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#4F46E5" />
                     <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
               </defs>
            </svg>
            <p className="font-bold text-2xl bg-gradient-to-r from-teal-400 to-yellow-400 bg-clip-text text-transparent">Loading...</p>
         </div>
      </div>
   );
}