"use client";

import { ItemCart } from "@/components/ItemCart/ItemCart.jsx";
import { useCart } from "../../hooks/useCart";
import { CartContainer } from "@/components/CartContainer/CartContainer";
import { DivideIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";


export default function Page() {
  const { cart, total, loading} = useCart();


  if (loading) return (<Spinner />)

  //console.log("total:" , total)

  return (
    <div className="w-full flex flex-col items-center gap-8 p-8 ">

    <CartContainer cart={cart} />

    <h2 className="text-2xl font-bold text-gray-800 mt-10">
      Total: <span className="text-green-600">${total}</span>
    </h2>
  </div>
  

  );
}
