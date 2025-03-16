"use client";

import { ItemCart } from "@/components/ItemCart/ItemCart.jsx";
import { useCart } from "../hooks/useCart";
import { CartContainer } from "@/components/CartContainer/CartContainer";


export default function Page() {
  const { cart, reduceFromCart } = useCart();

  console.log(cart)

 

  return (
    <div>
      <CartContainer cart={cart}/>
    </div>
    
  );
}
