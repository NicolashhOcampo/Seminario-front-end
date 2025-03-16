"use client";

import Navbar from "@/components/Navbar/Navbar";
import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter()

  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login"); // Redirige si no está autenticado
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error verificando autenticación:", err);
        router.push("/login");
      }
    };

  checkAuth();

  }, [router])

  useEffect(() => {
    if(!loading) {
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
            throw new Error("Error al cargar los productos");
          }
  
          const data = await response.json();
          setProducts(data.payload);
        } catch (err) {
          setError(err.message);
        }
      }
    
    fetchProducts()
    console.log(products)
    }
  }, [loading])

  if (loading) {
    return (
      <Spinner />
    );
  }

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