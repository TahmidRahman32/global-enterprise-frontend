
import Footer from "@/components/shared/PublicFooter";
import Navbar from "@/components/shared/PublicNavbar";
import React from "react";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <nav>
            <Navbar></Navbar>
         </nav>
         <div className="min-h-[70vh] ">{children}</div>
         <div className="">
            <Footer></Footer>
         </div>
      </div>
   );
};

export default commonLayout;
