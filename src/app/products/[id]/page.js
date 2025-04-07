'use client';

import { ProductDetail } from "@/components/ProductDetails/ProductDetail";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useConsult } from "@/hooks/useConsult";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConsultContainer from "@/components/ConsultContainer/ConsultContainer";
import config from "@/config/app.config";

export default function Page() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const {addToCart} = useCart()
    const {fetchProductById} = useProducts()
    const { consultsLogs, setConsults } = useConsult(id)

    const fetchConsultatios = async() =>{
        const response = await fetch(`${config.urlHost}/api/consults/firstConsults/${id}`,{
            method: 'GET',
            credentials: 'include'
        })

        const data = await response.json()
        console.log("Data: ", data)
        setConsults(data.payload)
    }
    

    useEffect(() => {
        if (!id) return;    
        fetchProductById(id).then(product => setProduct(product))
        fetchConsultatios()
    }, [id])
    
   console.log(product)
   console.log(consultsLogs)

    return (
        <>
            <ProductDetail product={product} addProduct={() => addToCart(product)} />
            <div className="flex justify-center w-full min-h-[40vh]">
                <ConsultContainer consultations={consultsLogs} productId={id} />
                <button onClick={fetchConsultatios}>Obtener mensajes</button>
            </div>
        </>
        

    )
}