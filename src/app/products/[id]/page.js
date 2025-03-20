'use client';

import { useCart } from "@/app/hooks/useCart";
import { ProductDetail } from "@/components/ProductDetails/ProductDetail";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter()
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const {addToCart} = useCart()


    useEffect(() => {
        const fetchProduct = async () => {
            const url = new URL(`http://localhost:8080/api/products/${id}`);
            try{
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include"
                })

                if(!response.ok){
                    if (response.status === 500){
                        throw new Error("Producto no encontrado")
                    }

                    throw new Error("Error al conctar con el servidor")
                }

                const data = await response.json()

                setProduct(data.payload)
                
            }
            catch (err){
                console.log(err.message)
                router.push("/products")
            }
            
            
        }
        
        fetchProduct()

    }, [])
    
   console.log(product)

    return (
        <ProductDetail product={product} addProduct={() => addToCart(product)} />
    )
}