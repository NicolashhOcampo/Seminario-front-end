'use client';

import { createContext, useState } from "react";


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
        const newCart = [...cart].filter(item => (item !== elementInCart))
        setCart(newCart)
      }else{
        elementInCart.quantity -= 1
      }
    }

    const removeFromCart = (product) => {
      const elementInCart = cart.find(item => item._id === product._id)

      if (!elementInCart) return 

      const newCart = [...cart].filter(item => (item !== elementInCart))
      //newCart.remove(elementInCart)
      setCart(newCart)
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, reduceFromCart, removeFromCart }}>
          {children}
        </CartContext.Provider>
      );
}

