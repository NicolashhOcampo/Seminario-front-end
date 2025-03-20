"use client";

import { useCart } from "@/hooks/useCart";
import ProductCard from "../ProductCard/ProductCard";
import toast, { Toaster } from "react-hot-toast";

const ProductContainer = ({products}) => {
    const {addToCart} = useCart()


    return (
        <div className="mt-40 w-80/100 grid grid-cols-2 lg:grid-cols-4 gap-10">
            <Toaster position="bottom-right" reverseOrder={false}></Toaster>
            {products.map(product =>{
                return (
                        <ProductCard key={product._id} className="w-50 border-black" img={`http://localhost:8080/public/images/${product.thumbnails[0]}`} 
                        title={product.title}
                        price={product.price}
                        onClick={() => {
                            addToCart(product)
                            toast.success("Product added successfully")
                        }}/>
                
                )
            })}
        </div>
    )
}

export default ProductContainer;