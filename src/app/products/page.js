"use client";

import Navbar from "@/components/Navbar/Navbar";
import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter()

    const [products, setProducts] = useState([])
    const [error, setError] = useState("")

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
      

              const url = new URL("http://localhost:8080/api/products");
              url.searchParams.append("limit", 10);
              url.searchParams.append("page", 1);
              url.searchParams.append("sort", "asc"); // 'asc' o 'desc'
              //url.searchParams.append("query", "category");
              //url.searchParams.append("value", "electronics");
      

              const response = await fetch(url, {
                method: "GET",
                credentials: "include"
              });
      
              if (!response.ok) {
                router.push("/login")
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
            <Sidebar user={{name: 'Pacho', role: 'Admin'}}/>
            <div className="w-full pt-8 flex justify-center">
              <ProductContainer products={products}/>
            </div>
            {error && (<p>{error}</p>)}
        </>
    )
}