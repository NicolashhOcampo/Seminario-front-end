'use client';

import { createContext, useEffect, useState } from "react";


export const CartContext = createContext()

export function CartProvider ({children}){
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

      // Guardar el carrito en localStorage
    useEffect(() => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      setLoading(false)
    }, []);

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
      totalAmount(); 
    }, [cart]);

    const addToCart = (product) => {

      const elementInCart = cart.findIndex(item => item._id === product._id)

      if(elementInCart >= 0){
        if (cart[elementInCart].stock <= cart[elementInCart].quantity) return

        const newCart = [...cart]
        newCart[elementInCart].quantity += 1
        setCart(newCart)
        return
      }

      setCart([...cart, { ...product, quantity : 1 }]);
      console.log("producto agregado:", cart)
    };

    const reduceFromCart = (product) => {
      const elementInCart = cart.findIndex(item => item._id === product._id)

      //console.log(elementInCart)

      if (elementInCart < 0) return

      //console.log("Quantity: ", cart[elementInCart].quantity)

      if(cart[elementInCart].quantity === 1){
        const newCart = [...cart].filter((_, index) => (index !== elementInCart))
        setCart(newCart)
      }else{
        const newCart = [...cart]
        newCart[elementInCart].quantity -= 1
        setCart(newCart)
      }
    }

    const removeFromCart = (product) => {
      const elementInCart = cart.find(item => item._id === product._id)

      if (!elementInCart) return 

      const newCart = [...cart].filter(item => (item !== elementInCart))
      setCart(newCart)
    }

    const totalAmount = () => {
      const total = cart.reduce((accumulator, current) => accumulator + (current.quantity * current.price), 0);
      setTotal(total)
    }

    // useEffect(() => {
    //   totalAmount()
    // }, [cart])

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, reduceFromCart, removeFromCart, total, loading }}>
          {children}
        </CartContext.Provider>
      );
}

