"use client";

import { useState, useRef } from "react";
import { easeOut, motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, Clock } from "lucide-react";
import HeroImage from "../../../assets/Hero-image.jpg";
import Image from "next/image";

const ContactPage = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const headerRef = useRef(null);
   const formRef = useRef(null);
   const infoRef = useRef(null);

   const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
   const formInView = useInView(formRef, { once: true, margin: "-50px" });
   const infoInView = useInView(infoRef, { once: true, margin: "-50px" });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
         setIsSubmitted(false);
         setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
   };

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
      hidden: { opacity: 0, y: 30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: easeOut,
         },
      },
   };

   const socialLinks = [
      { icon: Github, href: "https://github.com/TahmidRahman32", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
      { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
   ];

   const contactInfo = [
      { icon: Mail, text: "gaziur.tahmid@gmail.com", href: "mailto:gaziur.tahmid@gmail.com" },
      { icon: Phone, text: "+8801725371032", href: "tel:+8801725371032" },
      { icon: MapPin, text: "Dhaka, Bangladesh", href: "#" },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-500 dark:from-slate-900 dark:to-[#020e11]">
         <div className="absolute inset-0 z-0">
            <Image src={HeroImage} alt="Background" fill className="object-cover opacity-20" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" />
         </div>
         {/* Animated Background Elements */}
         <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
               animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
               }}
               transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
               }}
               className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"
            />
            <motion.div
               animate={{
                  x: [0, -80, 0],
                  y: [0, 60, 0],
               }}
               transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
               }}
               className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-400/10 rounded-full blur-3xl"
            />
         </div>

         <div className="relative z-10 container mx-auto px-4 py-20">
            {/* Header Section */}
            <motion.div ref={headerRef} initial={{ opacity: 0, y: 50 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
               <motion.h1 initial={{ scale: 0.9 }} animate={headerInView ? { scale: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
                  Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Connect</span>
               </motion.h1>
               <motion.p initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Have a project in mind? Let's discuss how we can bring your ideas to life. I'm always open to new opportunities and interesting challenges.
               </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
               {/* Contact Form */}
               <motion.div ref={formRef} variants={containerVariants} initial="hidden" animate={formInView ? "visible" : "hidden"} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                     Send me a message
                  </motion.h2>

                  {isSubmitted ? (
                     <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Message Sent!</h3>
                        <p className="text-slate-600 dark:text-slate-300">Thank you for reaching out. I'll get back to you soon.</p>
                     </motion.div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div variants={itemVariants}>
                           <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Full Name
                           </label>
                           <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                              placeholder="Your full name"
                           />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                           <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Email Address
                           </label>
                           <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                              placeholder="your.email@example.com"
                           />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                           <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Subject
                           </label>
                           <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                              placeholder="What's this about?"
                           />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                           <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Message
                           </label>
                           <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={5}
                              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                              placeholder="Tell me about your project..."
                           />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                           <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                              className="w-full bg-gradient-to-r from-blue-700 to-yellow-200 text-black py-4 px-6 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-primary-bebas"
                           >
                              {isSubmitting ? (
                                 <>
                                    <Clock className="w-5 h-5 animate-spin" />
                                    Sending...
                                 </>
                              ) : (
                                 <>
                                    <Send className="w-5 h-5 text-blue-600" />
                                    Send Message
                                 </>
                              )}
                           </motion.button>
                        </motion.div>
                     </form>
                  )}
               </motion.div>

               {/* Contact Information */}
               <motion.div ref={infoRef} variants={containerVariants} initial="hidden" animate={infoInView ? "visible" : "hidden"} className="space-y-8">
                  {/* Contact Info Cards */}
                  <motion.div variants={itemVariants} className="space-y-4">
                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Get in touch</h3>

                     {contactInfo.map((item, index) => (
                        <motion.a
                           key={index}
                           href={item.href}
                           variants={itemVariants}
                           whileHover={{ scale: 1.02, x: 10 }}
                           className="flex items-center gap-4 p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
                        >
                           <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                              <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                           </div>
                           <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium">{item.text}</span>
                        </motion.a>
                     ))}
                  </motion.div>

                  {/* Social Links */}
                  <motion.div variants={itemVariants} className="pt-8">
                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Follow me on</h3>
                     <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                           <motion.a
                              key={index}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              variants={itemVariants}
                              whileHover={{
                                 scale: 1.1,
                                 y: -5,
                                 transition: { duration: 0.2 },
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
                           >
                              <social.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                           </motion.a>
                        ))}
                     </div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-8">
                     {[
                        { number: "24h", label: "Response Time" },
                        { number: "50+", label: "Projects Completed" },
                        { number: "5★", label: "Client Rating" },
                        { number: "100%", label: "Satisfaction" },
                     ].map((stat, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/20">
                           <div className="text-xl font-bold text-slate-800 dark:text-white">{stat.number}</div>
                           <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                        </motion.div>
                     ))}
                  </motion.div>
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default ContactPage;
