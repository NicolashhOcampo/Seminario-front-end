'use client';

import { UserProvider, useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";


export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shop-icon.jpg" type="image/jpg" />
      </head>
      <body>
        <UserProvider>
              <Sidebar  />
              <Link href={"/products"} className="absolute top-3 right-3 w-auto flex gap-1 justify-center items-center"> <span className="flex-1">Página principal</span> <ArrowLongRightIcon className="w-7"/></Link>
              <div className="w-full pl-20">
                {children}
              </div>
              
            
        </UserProvider>
      </body>
    </html>
  );
}
