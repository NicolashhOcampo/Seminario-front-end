'use client';

import { ProductDetail } from "@/components/ProductDetails/ProductDetail";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useConsult } from "@/hooks/useConsult";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConsultContainer from "@/components/ConsultContainer/ConsultContainer";
import config from "@/config/app.config";
import Spinner from "@/components/Spinner/Spinner";

export default function Page() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const {addToCart} = useCart()
    const {fetchProductById} = useProducts()
    const { consultsLogs, setConsults } = useConsult(id)


    useEffect(() => {
        if (!id) return;    
        fetchProductById(id).then(product => setProduct(product))
        //fetchConsultatios()
    }, [id])

    if (!product) return (<Spinner />)

    return (
        <>
            <ProductDetail product={product} addProduct={() => addToCart(product)} />
            <div className="flex justify-center w-full min-h-[40vh] mb-20">
                <ConsultContainer consultations={consultsLogs} productId={id} />
            </div>
        </>
    )
}