"use client";

import Navbar from "@/components/Navbar/Navbar";
import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import { useEffect, useState } from "react";

export default function Page() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
      
              // ✅ Construir la URL con los parámetros (personaliza si necesitas)
              const url = new URL("http://localhost:8080/api/products");
              url.searchParams.append("limit", 10);
              url.searchParams.append("page", 1);
              url.searchParams.append("sort", "asc"); // 'asc' o 'desc'
              //url.searchParams.append("query", "category");
              //url.searchParams.append("value", "electronics");
      
              // ✅ Hacer la solicitud con el token
              const response = await fetch(url, {
                method: "GET",
                credentials: "include"
              });
      
              if (!response.ok) {
                throw new Error("Error al cargar los productos");
              }
      
              const data = await response.json();
              setProducts(data.payload);
            } catch (err) {
              setError(err.message);
            }
          };

          fetchProducts()
          console.log(products)
    }, [])

    return (
        <>
            <Navbar/>
            <ProductContainer products={products}/>
            {error && (<p>{error}</p>)}
            <div></div>
        </>
    )
}