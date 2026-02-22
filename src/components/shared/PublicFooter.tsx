import {
   FaFacebookF,
   FaInstagram,
   FaTwitter,
   FaGithub,
   FaDribbble,
   FaRocket, // Using a rocket as logo placeholder
} from "react-icons/fa";
import mainLogo from "../../assets/mainLogo.jpg";
import Image from "next/image";

const Footer = () => {
   return (
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
         <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between ">
               
               <Image src={mainLogo} alt="Main Logo" width={70} height={40} className=" p-1 bg-teal-500 rounded-full" />

               <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
                  <li>
                     <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        <span className="sr-only">Facebook</span>
                        <FaFacebookF className="h-6 w-6" />
                     </a>
                  </li>

                  <li>
                     <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        <span className="sr-only">Instagram</span>
                        <FaInstagram className="h-6 w-6" />
                     </a>
                  </li>

                  <li>
                     <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        <span className="sr-only">Twitter</span>
                        <FaTwitter className="h-6 w-6" />
                     </a>
                  </li>

                  <li>
                     <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        <span className="sr-only">GitHub</span>
                        <FaGithub className="h-6 w-6" />
                     </a>
                  </li>

                  <li>
                     <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        <span className="sr-only">Dribbble</span>
                        <FaDribbble className="h-6 w-6" />
                     </a>
                  </li>
               </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800">
               <div>
                  <p className="font-medium text-gray-900 dark:text-white">Services</p>
                  <ul className="mt-6 space-y-4 text-sm">
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           1on1 Coaching
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Company Review
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Accounts Review
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           HR Consulting
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           SEO Optimisation
                        </a>
                     </li>
                  </ul>
               </div>

               <div>
                  <p className="font-medium text-gray-900 dark:text-white">Company</p>
                  <ul className="mt-6 space-y-4 text-sm">
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           About
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Meet the Team
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Accounts Review
                        </a>
                     </li>
                  </ul>
               </div>

               <div>
                  <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>
                  <ul className="mt-6 space-y-4 text-sm">
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Contact
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           FAQs
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Live Chat
                        </a>
                     </li>
                  </ul>
               </div>

               <div>
                  <p className="font-medium text-gray-900 dark:text-white">Legal</p>
                  <ul className="mt-6 space-y-4 text-sm">
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Accessibility
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Returns Policy
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Refund Policy
                        </a>
                     </li>
                     <li>
                        <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                           Hiring-3 Statistics
                        </a>
                     </li>
                  </ul>
               </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()}. Company Name. All rights reserved.</p>
         </div>
      </footer>
   );
};

export default Footer;
