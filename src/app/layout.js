'use client';

import { CartProvider } from "@/context/cartContext";
import "./globals.css";
import { UserProvider, useUser } from "@/context/UserContext";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

const validPaths = ["/cart", "/products", "/chat", "/createProduct", "/deleteProduct", "/profile"];

export default function RootLayout({ children }) {

  const pathname = usePathname()
  
  const isvalidPath = validPaths.some((path) => pathname.startsWith(path))
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
          {isvalidPath&& (
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
