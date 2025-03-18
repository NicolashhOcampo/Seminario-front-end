'use client';

import { CartProvider } from "@/context/cartContext";
import "./globals.css";
import { UserProvider, useUser } from "@/context/UserContext";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function RootLayout({ children }) {
  const isLoginPage = ["/login", "/"].includes(usePathname())
  // const { user } = useUser() 

  // useEffect(()=>{
  //   console.log("layout cargado")
  // }, [user]);



  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shop-icon.jpg" type="image/jpg" />
      </head>
      <body>
        <UserProvider>
          <CartProvider>
          {!isLoginPage && (
            <>
              <Navbar />
              <Sidebar  />
            </>
            
          )}

            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
