'use client';

import { ProductDetail } from "@/components/ProductDetails/ProductDetail";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useConsult } from "@/hooks/useConsult";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const {addToCart} = useCart()
    const {fetchProductById} = useProducts()
    const { consultsLogs } = useConsult(id)
    

    useEffect(() => {
        if (!id) return;
 
        fetchProductById(id).then(product => setProduct(product))
    }, [id])
    
   console.log(product)
   console.log(consultsLogs)

    return (
        <ProductDetail product={product} addProduct={() => addToCart(product)} consultations={consultsLogs} productId={id}/>
    )
}