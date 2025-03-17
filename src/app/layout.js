'use client'

import { CartProvider } from "@/context/cartContext";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shop-icon.jpg" type="image/jpg" />
      </head>
      <body>
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
