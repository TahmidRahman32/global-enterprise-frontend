"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Search, Pencil, Trash2, UserPlus, Filter, Download, Mail, Phone, Calendar, MapPin, Shield, Globe, Clock, CheckCircle2, XCircle, AlertCircle, ArrowUpLeftFromSquareIcon } from "lucide-react";
import fakeUsers, { User, userStats } from "./fakeData";
import Link from "next/link";
// import { fakeUsers, userStats, type User } from "./fakeUsers";

// Status color mapping
const statusColors = {
   Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800",
   Inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
   Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
   Suspended: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800",
   Blocked: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800",
};

// Role color mapping
const roleColors = {
   Admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800",
   Editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800",
   Moderator: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
   User: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
   Contributor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
   Viewer: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
};

export default function UsersList() {
   const [users, setUsers] = useState<User[]>(fakeUsers);
   const [searchQuery, setSearchQuery] = useState("");
   const [roleFilter, setRoleFilter] = useState<string>("all");
   const [statusFilter, setStatusFilter] = useState<string>("all");

   const handleDelete = (id: string) => {
      if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
         setUsers(users.filter((user) => user.id !== id));
      }
   };

   const handleEdit = (user: User) => {
      console.log("Edit user:", user);
      // Implement edit functionality
   };

   const handleResendVerification = (email: string) => {
      console.log("Resend verification to:", email);
      // Implement resend verification
   };

   const handleSuspendUser = (id: string) => {
      setUsers(users.map((user) => (user.id === id ? { ...user, status: "Suspended" as const } : user)));
   };

   // Apply filters
   const filteredUsers = users.filter((user) => {
      const matchesSearch =
         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (user.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
         (user.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
   });

   const getInitials = (name: string) => {
      return name
         .split(" ")
         .map((part) => part[0])
         .join("")
         .toUpperCase()
         .slice(0, 2);
   };

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
      });
   };

   const getTimeAgo = (dateString: string) => {
      const now = new Date();
      const past = new Date(dateString);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMs / 3600000);
      const diffDays = Math.round(diffMs / 86400000);

      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      return `${diffDays} days ago`;
   };

   return (
      <div>
         <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-4">
            <Button variant="outline" className="mr-4">
               {" "}
               <ArrowUpLeftFromSquareIcon className="w-4 h-4 mr-2" />
               Back
            </Button>
         </Link>
         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
               {/* Header Section */}
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div className="flex flex-col items-center">
                     <h1 className="text-4xl font-bold font-primary-bebas">Users Management</h1>
                     <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-2">
                        <span>Manage your users, their roles and permissions</span>
                        <Badge variant="outline" className="rounded-full">
                           {users.length} total
                        </Badge>
                     </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     <Button variant="outline" size="sm" className="h-9 gap-2">
                        <Download className="h-4 w-4" />
                        Export CSV
                     </Button>
                     {/* <Link href={"/admin/dashboard/addProduct"}>
                        <Button size="sm" className="h-9 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                           <UserPlus className="h-4 w-4" />
                           Add User
                        </Button>
                     </Link> */}
                  </div>
               </div>

               {/* Stats Cards */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Users</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{userStats.byStatus.Active}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 flex items-center gap-1">
                           <CheckCircle2 className="h-3 w-3" />
                           {userStats.activeToday} active today
                        </p>
                     </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{userStats.byStatus.Pending}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 flex items-center gap-1">
                           <Clock className="h-3 w-3" />
                           Awaiting verification
                        </p>
                     </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Verified</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{userStats.emailVerified}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{Math.round((userStats.emailVerified / users.length) * 100)}% of users</p>
                     </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">2FA Enabled</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{userStats.twoFactorEnabled}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Enhanced security</p>
                     </CardContent>
                  </Card>
               </div>

               {/* Search and Filters */}
               <Card className="mb-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                     <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                           <Input
                              placeholder="Search by name, email, location, company..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10 pr-4 h-10 w-full px-3 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
                           />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                           <Select value={roleFilter} onValueChange={setRoleFilter}>
                              <SelectTrigger className="w-full sm:w-[140px] h-10  dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                                 <SelectValue placeholder="All Roles" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="all">All Roles</SelectItem>
                                 <SelectItem value="Admin">Admin</SelectItem>
                                 <SelectItem value="Editor">Editor</SelectItem>
                                 <SelectItem value="Moderator">Moderator</SelectItem>
                                 <SelectItem value="Contributor">Contributor</SelectItem>
                                 <SelectItem value="User">User</SelectItem>
                                 <SelectItem value="Viewer">Viewer</SelectItem>
                              </SelectContent>
                           </Select>

                           <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="w-full sm:w-[140px] h-10  dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                                 <SelectValue placeholder="All Status" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="all">All Status</SelectItem>
                                 <SelectItem value="Active">Active</SelectItem>
                                 <SelectItem value="Inactive">Inactive</SelectItem>
                                 <SelectItem value="Pending">Pending</SelectItem>
                                 <SelectItem value="Suspended">Suspended</SelectItem>
                                 <SelectItem value="Blocked">Blocked</SelectItem>
                              </SelectContent>
                           </Select>

                           <Button variant="outline" className="h-10 gap-2">
                              <Filter className="h-4 w-4" />
                              More Filters
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Users Table - Desktop */}
               <div className="hidden xl:block">
                  <Card className=" dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                     <CardContent className="p-0">
                        <Table>
                           <TableHeader>
                              <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                                 <TableHead className="w-[350px]">User</TableHead>
                                 <TableHead>Role</TableHead>
                                 <TableHead>Status</TableHead>
                                 <TableHead>Location</TableHead>
                                 <TableHead>Department</TableHead>
                                 <TableHead>Last Active</TableHead>
                                 <TableHead>2FA</TableHead>
                                 <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody className="">
                              {filteredUsers.map((user) => (
                                 <TableRow key={user.id} className="group hover:bg-slate-100/50 dark:hover:bg-slate-800/50 ">
                                    <TableCell className="font-medium">
                                       <div className="flex items-center gap-3">
                                          <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-slate-700">
                                             <AvatarImage src={user.avatar} alt={user.name} />
                                             <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm">{getInitials(user.name)}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                             <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                {user.name}
                                                {!user.emailVerified && (
                                                   <Badge variant="outline" className="text-xs border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                                                      Unverified
                                                   </Badge>
                                                )}
                                             </div>
                                             <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                                <span>{user.email}</span>
                                                {user.company && (
                                                   <>
                                                      <span>•</span>
                                                      <span className="text-xs">{user.company}</span>
                                                   </>
                                                )}
                                             </div>
                                          </div>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <Badge variant="outline" className={`${roleColors[user.role]} font-medium `}>
                                          {user.role}
                                       </Badge>
                                    </TableCell>
                                    <TableCell>
                                       <Badge variant="outline" className={`${statusColors[user.status]} font-medium`}>
                                          {user.status}
                                       </Badge>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                          <MapPin className="h-3.5 w-3.5" />
                                          <span className="text-sm">{user.location.split(",")[0]}</span>
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <span className="text-sm text-slate-600 dark:text-slate-400">{user.department || "—"}</span>
                                    </TableCell>
                                    <TableCell>
                                       <div className="flex flex-col">
                                          <span className="text-sm text-slate-600 dark:text-slate-400">{formatDate(user.lastActive)}</span>
                                          <span className="text-xs text-slate-500 dark:text-slate-500">{getTimeAgo(user.lastActive)}</span>
                                       </div>
                                    </TableCell>
                                    <TableCell>{user.twoFactorEnabled ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-slate-300 dark:text-slate-600" />}</TableCell>
                                    <TableCell className="text-right">
                                       <div className="flex items-center justify-end gap-1">
                                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50" onClick={() => handleEdit(user)}>
                                             <Pencil className="h-4 w-4" />
                                          </Button>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/50" onClick={() => handleDelete(user.id)}>
                                             <Trash2 className="h-4 w-4" />
                                          </Button>
                                          <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                   <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent align="end" className="w-56">
                                                <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="gap-2">
                                                   <Mail className="h-4 w-4" />
                                                   Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2">
                                                   <Phone className="h-4 w-4" />
                                                   Call User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2">
                                                   <Globe className="h-4 w-4" />
                                                   Visit Website
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {!user.emailVerified && (
                                                   <DropdownMenuItem className="gap-2" onClick={() => handleResendVerification(user.email)}>
                                                      <Mail className="h-4 w-4" />
                                                      Resend Verification
                                                   </DropdownMenuItem>
                                                )}
                                                {user.status !== "Suspended" && user.status !== "Blocked" && (
                                                   <DropdownMenuItem className="gap-2 text-orange-600" onClick={() => handleSuspendUser(user.id)}>
                                                      <AlertCircle className="h-4 w-4" />
                                                      Suspend User
                                                   </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="gap-2 text-red-600">
                                                   <Trash2 className="h-4 w-4" />
                                                   Delete Permanently
                                                </DropdownMenuItem>
                                             </DropdownMenuContent>
                                          </DropdownMenu>
                                       </div>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </CardContent>
                  </Card>
               </div>

               {/* Users Cards - Tablet & Mobile */}
               <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {filteredUsers.map((user) => (
                     <Card key={user.id} className=" border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                        <CardContent className="">
                           <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                 <Avatar className="h-14 w-14 border-2 border-slate-200 dark:border-slate-700">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">{getInitials(user.name)}</AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                       {user.name}
                                       {!user.emailVerified && (
                                          <Badge variant="outline" className="text-xs border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                                             !
                                          </Badge>
                                       )}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                                 </div>
                              </div>
                              <div className="flex gap-1">
                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50" onClick={() => handleEdit(user)}>
                                    <Pencil className="h-4 w-4" />
                                 </Button>
                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/50" onClick={() => handleDelete(user.id)}>
                                    <Trash2 className="h-4 w-4" />
                                 </Button>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-3 mb-4 ">
                              <div>
                                 <p className="text-xs  mb-1">Role</p>
                                 <Badge variant="outline" className={`${roleColors[user.role]} font-medium bg-black `}>
                                    {user.role}
                                 </Badge>
                              </div>
                              <div>
                                 <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Status</p>
                                 <Badge variant="outline" className={`${statusColors[user.status]} font-medium bg-black`}>
                                    {user.status}
                                 </Badge>
                              </div>
                           </div>

                           <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                 <MapPin className="h-4 w-4 text-slate-500" />
                                 <span>{user.location}</span>
                              </div>

                              {user.company && (
                                 <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Globe className="h-4 w-4 text-slate-500" />
                                    <span>{user.company}</span>
                                 </div>
                              )}

                              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                 <Calendar className="h-4 w-4 text-slate-500" />
                                 <span>Joined {formatDate(user.joinDate)}</span>
                              </div>

                              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                 <Clock className="h-4 w-4 text-slate-500" />
                                 <span>Last active {getTimeAgo(user.lastActive)}</span>
                              </div>

                              {user.phone && (
                                 <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Phone className="h-4 w-4 text-slate-500" />
                                    <span>{user.phone}</span>
                                 </div>
                              )}
                           </div>

                           {user.bio && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                 <p className="text-xs text-slate-500 dark:text-slate-500 italic">"{user.bio}"</p>
                              </div>
                           )}

                           <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 {user.social?.twitter && (
                                    <Badge variant="outline" className="text-xs">
                                       @{user.social.twitter}
                                    </Badge>
                                 )}
                                 {user.twoFactorEnabled && <Shield className="h-4 w-4 text-green-500" />}
                              </div>
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                                       More
                                       <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>

               {/* Empty State */}
               {filteredUsers.length === 0 && (
                  <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800">
                     <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-4">
                           <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No users found</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-sm">No users match your current filters. Try adjusting your search or filter criteria.</p>
                        <Button
                           variant="outline"
                           className="mt-4"
                           onClick={() => {
                              setSearchQuery("");
                              setRoleFilter("all");
                              setStatusFilter("all");
                           }}
                        >
                           Clear all filters
                        </Button>
                     </CardContent>
                  </Card>
               )}

               {/* Pagination */}
               {filteredUsers.length > 0 && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
                     </p>
                     <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled className="h-8">
                           Previous
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-blue-600 text-white hover:bg-blue-700">
                           1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                           2
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                           3
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                           Next
                        </Button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
