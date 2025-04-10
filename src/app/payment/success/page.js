"use client";

import PaymentMessage from "@/components/PaymentMessage/PaymentMessage";
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

export default function Page() {
  const {resetCart} = useCart()

  useEffect(()=>{
    resetCart()
  }, [])

  return (
    <PaymentMessage status="success" />
  );
}
