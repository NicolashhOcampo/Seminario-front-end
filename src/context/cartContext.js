"use client";

import { createContext, useContext, useState } from "react";


export const CartContext = createContext()

export function CartProvider ({children}){
    const [cart, setCart] = useState([])

    const addToCart = (product) => {

      const elementInCart = cart.find(item => item._id === product._id)

      if(elementInCart){
          elementInCart.quantity += 1
          return
      }

      setCart([...cart, { ...product, quantity : 1 }]);
      console.log("producto agregado:", cart)
    };

    const reduceFromCart = (product) => {
      const elementInCart = cart.find(item => item._id === product._id)

      if (!elementInCart) return

      if(elementInCart.quantity === 1){
        const newCart = [...cart];
        newCart.pop(elementInCart)
        setCart(newCart)
      }else{
        elementInCart.quantity -= 1
      }
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, reduceFromCart }}>
          {children}
        </CartContext.Provider>
      );
}

