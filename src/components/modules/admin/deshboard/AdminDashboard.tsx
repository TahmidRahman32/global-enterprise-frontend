"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Menu, X, Home, Printer, FileText, Settings, Users, Package, Bell, Search, ChevronDown, TrendingUp, CheckCircle, Clock, PlusCircle } from "lucide-react";

// shadcn/ui components (assuming you have them installed)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { navItems } from "./Nav/Navbar";
import Link from "next/link";
import { LogoutDialog } from "@/components/shared/AlertDialogLogout";

// Mock data
const chartData = [
   { day: "Mon", prints: 1240 },
   { day: "Tue", prints: 1560 },
   { day: "Wed", prints: 1890 },
   { day: "Thu", prints: 2100 },
   { day: "Fri", prints: 1780 },
   { day: "Sat", prints: 890 },
   { day: "Sun", prints: 430 },
];

const recentJobs = [
   { id: "#12345", label: "Product A", printer: "Zebra ZT410", status: "completed", time: "2 min ago" },
   { id: "#12346", label: "Product B", printer: "Zebra GK420", status: "printing", time: "just now" },
   { id: "#12347", label: "Product C", printer: "Zebra ZT410", status: "pending", time: "5 min ago" },
   { id: "#12348", label: "Product D", printer: "Brother QL-800", status: "failed", time: "10 min ago" },
   { id: "#12349", label: "Product E", printer: "Zebra ZT410", status: "completed", time: "15 min ago" },
];

type Status = 'completed' | 'printing' | 'pending' | 'failed';

const statusColorMap: Record<Status, string> = {
  completed: 'green',
  printing: 'blue',
  pending: 'orange',
  failed: 'red',
};

function isStatus(s: string): s is Status {
  return (['completed','printing','pending','failed'] as const).includes(s as Status);
}

function getColor(status: string) {
  if (isStatus(status)) return statusColorMap[status];
  return 'gray';
}


// Animation variants
const sidebarVariants = {
   open: { width: "16rem" },
   closed: { width: "5rem" },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
      },
   },
};

const BarcodePrintDashboard: React.FC = () => {
   const [sidebarOpen, setSidebarOpen] = useState(true);

   return (
      <div className="flex h-screen bg-blue-600 dark:bg-gray-900">
         {/* Sidebar */}
         <motion.aside
            initial={sidebarOpen ? "open" : "closed"}
            animate={sidebarOpen ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-  dark:bg-gray-800 shadow-lg flex flex-col h-full overflow-hidden border-r border-gray-200 dark:border-gray-700"
         >
            {/* Logo area */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 ">
               <Link href={"/"}>
                  <AnimatePresence mode="wait">
                     {sidebarOpen ? (
                        <motion.span key="logo-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                           Admin Dashboard
                        </motion.span>
                     ) : (
                        <motion.span key="logo-short" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mx-auto">
                           AD
                        </motion.span>
                     )}
                  </AnimatePresence>
               </Link>
               <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
               </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto ">
               {navItems.map((item) => (
                  <NavItem key={item.label} icon={<item.icon size={20} />} label={item.label} sidebarOpen={sidebarOpen} href={item.href} />
               ))}
            </nav>

            {/* User info */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
               <div className="flex items-center space-x-3">
                  <Avatar>
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  {sidebarOpen && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">gaziur.tahmid@gmail.com</p>
                     </motion.div>
                  )}
               </div>
            </div>
         </motion.aside>

         {/* Main Content */}
         <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className=" dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
               <div className="flex items-center flex-1 max-w-md ">
                  <div className="relative w-full">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                     <Input type="text" placeholder="Search jobs, labels..." className="pl-10 pr-4 py-2 w-full" />
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="relative">
                     <Bell size={20} />
                     <span className="absolute top-1 right-1 w-2 h-2  rounded-full"></span>
                  </Button>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2">
                           <span className="text-sm font-medium">Admin</span>
                           <ChevronDown size={16} />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </header>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto p-6 ">
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  {/* Stats Cards */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                     <StatCard title="Total Labels Today" value="12,430" change="+8.2%" icon={<Printer className="text-white" size={24} />} />
                     <StatCard title="Active Printers" value="8/12" change="+2.5%" icon={<CheckCircle className="text-green-600 dark:text-green-400 " size={24} />} />
                     <StatCard title="Pending Jobs" value="23" change="+5" icon={<Clock className="text-yellow-600 dark:text-yellow-400" size={24} />} />
                     <StatCard title="Success Rate" value="98.5%" change="+1.2%" icon={<TrendingUp className="text-blue-600 dark:text-white" size={24} />} />
                  </motion.div>

                  {/* Chart and Recent Jobs */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     {/* Bar Chart */}
                     <motion.div variants={itemVariants} className="lg:col-span-2">
                        <Card>
                           <CardHeader>
                              <CardTitle>Daily Print Volume</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <ResponsiveContainer width="100%" height={300}>
                                 <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="prints" fill="#4f46e5" />
                                 </BarChart>
                              </ResponsiveContainer>
                           </CardContent>
                        </Card>
                     </motion.div>

                     {/* Recent Print Jobs */}
                     <motion.div variants={itemVariants}>
                        <Card>
                           <CardHeader>
                              <CardTitle>Recent Jobs</CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className="space-y-4">
                                 {recentJobs.map((job) => (
                                    <div key={job.id} className="flex items-center justify-between">
                                       <div>
                                          <p className="text-sm font-medium  dark:text-gray-100">
                                             {job.id} - {job.label}
                                          </p>
                                          <p className="text-xs text-gray-500 dark:text-gray-400">
                                             {job.printer} • {job.time}
                                          </p>
                                       </div>
                                       <Badge className={getColor(job.status)} variant="secondary">
                                          {job.status}
                                       </Badge>
                                    </div>
                                 ))}
                              </div>
                              <Button variant="link" className="mt-4 px-0 text-indigo-600">
                                 View all jobs →
                              </Button>
                           </CardContent>
                        </Card>
                     </motion.div>
                  </div>

                  {/* Quick Action */}
                  <motion.div variants={itemVariants}>
                     <Card className="bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800">
                        <CardContent className="p-6 flex items-center justify-between">
                           <div>
                              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 text-lg">Need to print a new label?</h3>
                              <p className="text-sm text-indigo-600 dark:text-indigo-400">Quickly create and print barcode labels in just a few clicks.</p>
                           </div>
                           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              New Print Job
                           </Button>
                        </CardContent>
                     </Card>
                  </motion.div>
               </motion.div>
            </main>
         </div>
      </div>
   );
};

// Sidebar Navigation Item Component
interface NavItemProps {
   icon: React.ReactNode;
   label: string;
   href: string;
   sidebarOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, sidebarOpen }) => {
   return (
      <a href={href} className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
         <span className="mr-3">{icon}</span>
         <AnimatePresence mode="wait">
            {sidebarOpen && (
               <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}>
                  {label}
               </motion.span>
            )}
         </AnimatePresence>
      </a>
   );
};

// Stat Card Component with hover animation
interface StatCardProps {
   title: string;
   value: string;
   change?: string;
   icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
   return (
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
         <Card className="border-gray-200 dark:border-gray-700 shadow-sm ">
            <CardContent className="p-6">
               <div className="flex items-center justify-between ">
                  <div>
                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                     <p className="text-2xl font-bold mt-1 dark:text-gray-100">{value}</p>
                     {change && <p className={`text-sm mt-1 ${change.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{change} from yesterday</p>}
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-full">{icon}</div>
               </div>
            </CardContent>
         </Card>
      </motion.div>
   );
};

export default BarcodePrintDashboard;
