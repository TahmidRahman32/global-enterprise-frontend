// types.ts
export interface User {
   id: string;
   name: string;
   email: string;
   role: "Admin" | "User" | "Editor" | "Moderator" | "Viewer" | "Contributor";
   status: "Active" | "Inactive" | "Pending" | "Suspended" | "Blocked";
   avatar?: string;
   lastActive: string;
   joinDate: string;
   location: string;
   phone?: string;
   department?: string;
   company?: string;
   website?: string;
   bio?: string;
   social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
   };
   permissions?: string[];
   lastLoginIP?: string;
   loginCount?: number;
   twoFactorEnabled?: boolean;
   emailVerified?: boolean;
}

// fakeUsers.ts
export const fakeUsers: User[] = [
   // Admins
   {
      id: "usr_001",
      name: "Dr. Sarah Victoria Chen",
      email: "sarah.chen@techcorp.com",
      role: "Admin",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastActive: "2026-02-22T09:30:00Z",
      joinDate: "2023-02-15",
      location: "San Francisco, CA, USA",
      phone: "+1 (415) 555-0123",
      department: "Engineering",
      company: "TechCorp Inc.",
      website: "https://sarahchen.dev",
      bio: "Full-stack developer with 10+ years experience. Passionate about React and Node.js.",
      social: {
         twitter: "@sarah_chen",
         linkedin: "sarahchen-dev",
         github: "sarahchen",
      },
      permissions: ["all"],
      lastLoginIP: "192.168.1.45",
      loginCount: 1245,
      twoFactorEnabled: true,
      emailVerified: true,
   },
   {
      id: "usr_002",
      name: "Marcus Aurelius Williams",
      email: "marcus.w@startup.io",
      role: "Admin",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastActive: "2026-02-22T08:15:00Z",
      joinDate: "2023-05-20",
      location: "Austin, TX, USA",
      phone: "+1 (512) 555-0789",
      department: "Product",
      company: "Startup.io",
      bio: "Product visionary and tech enthusiast. Building the future of work.",
      social: {
         twitter: "@marcus_w",
         linkedin: "marcuswilliams",
         github: "marcus-dev",
      },
      permissions: ["all"],
      lastLoginIP: "10.0.0.23",
      loginCount: 892,
      twoFactorEnabled: true,
      emailVerified: true,
   },

   // Editors
   {
      id: "usr_003",
      name: "Elena Rodriguez Garcia",
      email: "elena.r@contenthub.com",
      role: "Editor",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      lastActive: "2026-02-22T10:45:00Z",
      joinDate: "2023-08-10",
      location: "Miami, FL, USA",
      phone: "+1 (305) 555-0234",
      department: "Content",
      company: "ContentHub Media",
      bio: "Content strategist and editor. Loves creating engaging stories.",
      social: {
         twitter: "@elena_edits",
         linkedin: "elenarodriguez",
         github: "elena-content",
      },
      permissions: ["create", "edit", "publish"],
      lastLoginIP: "172.16.0.56",
      loginCount: 567,
      twoFactorEnabled: true,
      emailVerified: true,
   },
   {
      id: "usr_004",
      name: "James O'Connor",
      email: "james.o@techwrite.com",
      role: "Editor",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      lastActive: "2026-02-21T16:30:00Z",
      joinDate: "2023-09-05",
      location: "Dublin, Ireland",
      phone: "+353 1 555 0123",
      department: "Technical Writing",
      company: "TechWrite Solutions",
      bio: "Technical writer specializing in API documentation and developer guides.",
      social: {
         twitter: "@james_techwrite",
         linkedin: "jamesoconnor",
         github: "james-docs",
      },
      permissions: ["create", "edit"],
      lastLoginIP: "192.168.2.89",
      loginCount: 345,
      twoFactorEnabled: false,
      emailVerified: true,
   },

   // Moderators
   {
      id: "usr_005",
      name: "Priya Patel",
      email: "priya.p@community.org",
      role: "Moderator",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      lastActive: "2026-02-22T07:20:00Z",
      joinDate: "2023-10-12",
      location: "Toronto, Canada",
      phone: "+1 (416) 555-0456",
      department: "Community Management",
      company: "CommunityFirst",
      bio: "Community builder and moderator. Creating safe spaces for discussions.",
      social: {
         twitter: "@priya_mod",
         linkedin: "priyapatel",
         github: "priya-community",
      },
      permissions: ["moderate", "review", "flag"],
      lastLoginIP: "10.0.1.34",
      loginCount: 234,
      twoFactorEnabled: true,
      emailVerified: true,
   },
   {
      id: "usr_006",
      name: "Alex Thompson",
      email: "alex.t@forumhub.com",
      role: "Moderator",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      lastActive: "2026-02-15T14:20:00Z",
      joinDate: "2023-11-01",
      location: "London, UK",
      phone: "+44 20 5555 0123",
      department: "Forum Moderation",
      company: "ForumHub",
      bio: "Experienced forum moderator. On temporary leave.",
      permissions: ["moderate", "review"],
      lastLoginIP: "192.168.3.67",
      loginCount: 178,
      twoFactorEnabled: false,
      emailVerified: true,
   },

   // Regular Users
   {
      id: "usr_007",
      name: "Wei Zhang",
      email: "wei.zhang@email.com",
      role: "User",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      lastActive: "2026-02-22T11:00:00Z",
      joinDate: "2024-01-15",
      location: "Singapore",
      phone: "+65 5555 0123",
      company: "Freelance Designer",
      bio: "UI/UX designer passionate about creating beautiful interfaces.",
      social: {
         twitter: "@wei_designs",
         linkedin: "weizhang",
         github: "wei-creates",
      },
      permissions: ["read", "comment"],
      lastLoginIP: "203.0.113.45",
      loginCount: 89,
      twoFactorEnabled: false,
      emailVerified: true,
   },
   {
      id: "usr_008",
      name: "Isabella Martinez",
      email: "isabella.m@student.edu",
      role: "User",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      lastActive: "2026-02-22T09:55:00Z",
      joinDate: "2024-02-01",
      location: "Madrid, Spain",
      phone: "+34 91 555 0123",
      department: "Computer Science",
      company: "Technical University of Madrid",
      bio: "Computer science student learning full-stack development.",
      permissions: ["read"],
      lastLoginIP: "192.168.4.23",
      loginCount: 45,
      twoFactorEnabled: false,
      emailVerified: true,
   },
   {
      id: "usr_009",
      name: "Mohammed Al-Rashid",
      email: "mohammed.a@techstartup.ae",
      role: "User",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
      lastActive: "2026-02-21T20:15:00Z",
      joinDate: "2026-02-21",
      location: "Dubai, UAE",
      phone: "+971 4 555 0123",
      company: "TechStartup Dubai",
      bio: "Entrepreneur and tech enthusiast. Just joined the platform.",
      permissions: ["read"],
      lastLoginIP: "5.10.83.21",
      loginCount: 1,
      twoFactorEnabled: false,
      emailVerified: false,
   },
   {
      id: "usr_010",
      name: "Sophie Anderson",
      email: "sophie.a@creative.co",
      role: "User",
      status: "Suspended",
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
      lastActive: "2026-02-10T13:40:00Z",
      joinDate: "2023-12-05",
      location: "Sydney, Australia",
      phone: "+61 2 5555 0123",
      department: "Creative",
      company: "Creative Co.",
      bio: "Creative director. Account temporarily suspended.",
      permissions: [],
      lastLoginIP: "203.59.82.145",
      loginCount: 234,
      twoFactorEnabled: true,
      emailVerified: true,
   },

   // Contributors
   {
      id: "usr_011",
      name: "Lucas Ferreira",
      email: "lucas.f@opensource.org",
      role: "Contributor",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      lastActive: "2026-02-22T08:30:00Z",
      joinDate: "2023-07-18",
      location: "São Paulo, Brazil",
      phone: "+55 11 5555-0123",
      department: "Open Source",
      company: "OpenSource Foundation",
      bio: "Open source contributor passionate about React and TypeScript.",
      social: {
         github: "lucas-dev",
         twitter: "@lucas_os",
      },
      permissions: ["create", "edit"],
      lastLoginIP: "177.45.23.67",
      loginCount: 456,
      twoFactorEnabled: true,
      emailVerified: true,
   },
   {
      id: "usr_012",
      name: "Nina Kovac",
      email: "nina.k@techhub.hr",
      role: "Contributor",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      lastActive: "2026-02-21T22:10:00Z",
      joinDate: "2023-10-30",
      location: "Zagreb, Croatia",
      phone: "+385 1 5555 012",
      department: "Development",
      company: "TechHub Croatia",
      bio: "Frontend developer and UI enthusiast.",
      social: {
         github: "nina-codes",
         linkedin: "ninakovac",
      },
      permissions: ["create"],
      lastLoginIP: "93.136.45.78",
      loginCount: 167,
      twoFactorEnabled: false,
      emailVerified: true,
   },

   // Viewers
   {
      id: "usr_013",
      name: "Robert Johnson",
      email: "robert.j@enterprise.com",
      role: "Viewer",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      lastActive: "2026-02-21T15:45:00Z",
      joinDate: "2024-01-20",
      location: "Chicago, IL, USA",
      phone: "+1 (312) 555-0890",
      department: "Sales",
      company: "Enterprise Solutions",
      bio: "Sales manager exploring the platform.",
      permissions: ["read"],
      lastLoginIP: "10.0.2.156",
      loginCount: 23,
      twoFactorEnabled: false,
      emailVerified: true,
   },
   {
      id: "usr_014",
      name: "Yuki Tanaka",
      email: "yuki.t@design.jp",
      role: "Viewer",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      lastActive: "2026-02-22T05:30:00Z",
      joinDate: "2024-02-10",
      location: "Tokyo, Japan",
      phone: "+81 3-5555-0123",
      department: "Design",
      company: "Design Studio Tokyo",
      bio: "UI designer looking for inspiration.",
      permissions: ["read"],
      lastLoginIP: "126.23.45.67",
      loginCount: 12,
      twoFactorEnabled: false,
      emailVerified: true,
   },

   // Inactive Users
   {
      id: "usr_015",
      name: "Carlos Mendez",
      email: "carlos.m@oldcompany.com",
      role: "User",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      lastActive: "2026-01-05T11:20:00Z",
      joinDate: "2023-03-15",
      location: "Mexico City, Mexico",
      phone: "+52 55 5555 0123",
      company: "Previous Company",
      bio: "Hasn't logged in for over a month.",
      permissions: ["read"],
      lastLoginIP: "189.146.78.23",
      loginCount: 89,
      twoFactorEnabled: false,
      emailVerified: true,
   },
   {
      id: "usr_016",
      name: "Anna Kowalski",
      email: "anna.k@inactive.pl",
      role: "User",
      status: "Inactive",
      avatar: "https://randomuser.me/api/portraits/women/72.jpg",
      lastActive: "2025-12-18T09:15:00Z",
      joinDate: "2023-06-22",
      location: "Warsaw, Poland",
      phone: "+48 22 555 0123",
      department: "Marketing",
      bio: "Marketing specialist on career break.",
      permissions: ["read"],
      lastLoginIP: "83.24.56.89",
      loginCount: 134,
      twoFactorEnabled: false,
      emailVerified: true,
   },

   // Blocked Users
   {
      id: "usr_017",
      name: "Thomas Black",
      email: "thomas.b@spam.com",
      role: "User",
      status: "Blocked",
      avatar: "https://randomuser.me/api/portraits/men/92.jpg",
      lastActive: "2026-01-30T03:15:00Z",
      joinDate: "2023-11-28",
      location: "Unknown",
      bio: "Account blocked for suspicious activity.",
      permissions: [],
      lastLoginIP: "45.123.67.89",
      loginCount: 12,
      twoFactorEnabled: false,
      emailVerified: false,
   },

   // Power Users
   {
      id: "usr_018",
      name: "Dr. Emily Watson",
      email: "emily.w@research.edu",
      role: "Contributor",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg",
      lastActive: "2026-02-21T18:45:00Z",
      joinDate: "2023-04-03",
      location: "Boston, MA, USA",
      phone: "+1 (617) 555-0456",
      department: "Research",
      company: "University Research Lab",
      bio: "Research scientist contributing to academic projects.",
      social: {
         twitter: "@emily_research",
         linkedin: "emilywatson-phd",
      },
      permissions: ["create", "edit", "review"],
      lastLoginIP: "140.247.45.67",
      loginCount: 567,
      twoFactorEnabled: true,
      emailVerified: true,
   },
   {
      id: "usr_019",
      name: "Oliver Schmidt",
      email: "oliver.s@engineering.de",
      role: "Editor",
      status: "Active",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      lastActive: "2026-02-22T07:50:00Z",
      joinDate: "2023-07-07",
      location: "Berlin, Germany",
      phone: "+49 30 5555 0123",
      department: "Engineering",
      company: "Engineering Solutions GmbH",
      bio: "Lead engineer and technical editor.",
      social: {
         github: "oliver-eng",
         linkedin: "oliverschmidt",
      },
      permissions: ["create", "edit", "publish", "review"],
      lastLoginIP: "92.226.78.45",
      loginCount: 789,
      twoFactorEnabled: true,
      emailVerified: true,
   },

   // New Users
   {
      id: "usr_020",
      name: "Zoe Martin",
      email: "zoe.m@freshstart.com",
      role: "User",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/women/95.jpg",
      lastActive: "2026-02-22T12:05:00Z",
      joinDate: "2026-02-22",
      location: "Paris, France",
      phone: "+33 1 55 55 01 23",
      company: "Fresh Start Agency",
      bio: "New user exploring the platform.",
      permissions: ["read"],
      lastLoginIP: "86.74.23.56",
      loginCount: 2,
      twoFactorEnabled: false,
      emailVerified: false,
   },
];

// Helper function to get users by role
export const getUsersByRole = (role: User["role"]) => {
   return fakeUsers.filter((user) => user.role === role);
};

// Helper function to get users by status
export const getUsersByStatus = (status: User["status"]) => {
   return fakeUsers.filter((user) => user.status === status);
};

// Statistics
export const userStats = {
   total: fakeUsers.length,
   byRole: {
      Admin: fakeUsers.filter((u) => u.role === "Admin").length,
      Editor: fakeUsers.filter((u) => u.role === "Editor").length,
      Moderator: fakeUsers.filter((u) => u.role === "Moderator").length,
      User: fakeUsers.filter((u) => u.role === "User").length,
      Contributor: fakeUsers.filter((u) => u.role === "Contributor").length,
      Viewer: fakeUsers.filter((u) => u.role === "Viewer").length,
   },
   byStatus: {
      Active: fakeUsers.filter((u) => u.status === "Active").length,
      Inactive: fakeUsers.filter((u) => u.status === "Inactive").length,
      Pending: fakeUsers.filter((u) => u.status === "Pending").length,
      Suspended: fakeUsers.filter((u) => u.status === "Suspended").length,
      Blocked: fakeUsers.filter((u) => u.status === "Blocked").length,
   },
   activeToday: fakeUsers.filter((u) => {
      const lastActive = new Date(u.lastActive);
      const today = new Date();
      return lastActive.toDateString() === today.toDateString();
   }).length,
   emailVerified: fakeUsers.filter((u) => u.emailVerified).length,
   twoFactorEnabled: fakeUsers.filter((u) => u.twoFactorEnabled).length,
};

// Recent activity
export const recentActivity = fakeUsers
   .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
   .slice(0, 10)
   .map((user) => ({
      userId: user.id,
      name: user.name,
      action: "Logged in",
      timestamp: user.lastActive,
      location: user.location,
   }));

// Export for use in components
export default fakeUsers;
