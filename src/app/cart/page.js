"use client";

import { ItemCart } from "@/components/ItemCart/ItemCart.jsx";
import { useCart } from "../hooks/useCart";
import { CartContainer } from "@/components/CartContainer/CartContainer";
import { DivideIcon } from "@heroicons/react/24/outline";


export default function Page() {
  const { cart } = useCart();


 

  return (
      
      <CartContainer cart={cart}/>

  );
}
