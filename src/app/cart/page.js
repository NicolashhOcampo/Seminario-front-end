"use client";

import { ItemCart } from "@/components/ItemCart/ItemCart.jsx";
import { useCart } from "../../hooks/useCart";
import { CartContainer } from "@/components/CartContainer/CartContainer";
import { DivideIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner/Spinner";
import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";


export default function Page() {
  const { cart, total, loading} = useCart();
  const { user } = useUser();

  if (loading) return (<Spinner />)

  const handlePay = async () => {
    console.log(cart)
    const response = await fetch(`${config.urlHost}/api/checkout`, {
      method: "POST",
      body: JSON.stringify({ products: cart, uid: user.id}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
    const data = await response.json()
    window.location.href = data.payment.url
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-8 ">

      <CartContainer cart={cart} />

      <h2 className="text-2xl font-bold text-gray-800 mt-10">
        Total: <span className="text-green-600">${total}</span>
      </h2>
      <button onClick={handlePay} className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-700 cursor-pointer">
        Pagar
      </button>
    </div>
  

  );
}
