import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";
// import { IAdmin } from "./admin.interface";
// import { IDoctor } from "./doctor.interface";
// import { IPatient } from "./patient.interface";

export interface UserInfo {
   id: string;
   name: string;
   email: string;
   role: UserRole;
   needPasswordChange: boolean;
   status: "ACTIVE" | "BLOCKED" | "DELETED";
   admin?: IAdmin;
   user?: UserInfo
 
   createdAt: string;
   updatedAt: string;
}
