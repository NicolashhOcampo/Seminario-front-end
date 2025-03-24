'use client';

import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"
import config from "@/config/app.config";
import { useSearchParams } from "next/navigation";
import io from "socket.io-client";

const socket = io(config.urlHost)

export default function Page() {
  const router = useRouter();
  const { fetchUser } = useUser();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "asc";
  const query = searchParams.get("category") || "";
  const value = searchParams.get("value") || "";

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const url = new URL(`${config.urlHost}/api/products`);
          url.searchParams.append("limit", limit);
          url.searchParams.append("page", page);
          url.searchParams.append("sort", sort);
          if (query) url.searchParams.append("query", query);
          if (value) url.searchParams.append("value", value);
  
          const productsRes = await fetch(url, {
            method: "GET",
            credentials: "include",
          });
  
          if (!productsRes.ok) {
            if(productsRes.status === 401) {
              router.push("/login");
            } else {
              throw new Error("Error al cargar los productos");
            }
          }
  
          const productsData = await productsRes.json();
          setProducts(productsData.payload);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

  
      fetchProducts();
      fetchUser()

      socket.on("updateProducts", (updatedProducts) => {
        setProducts(updatedProducts);
      })

      return () => {
        socket.off("updateProducts");
      }
  }, [router, searchParams]);

  if (loading) return <Spinner />;

  // Función para actualizar el product
  /* const updateFilters = (newFilters) => {
    const currentParams = new URLSearchParams(window.location.search);
    Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
            currentParams.set(key, value);
        } else {
            currentParams.delete(key);
        }
    });

    router.push(`/products?${currentParams.toString()}`, { scroll: false });
  }; */
  const handleClickProduct = (id) => {
    console.log("ID: ", id)
    router.push(`/products/${id}`)
  }


  return (
    <>
      <div className="w-full pt-8 flex justify-center">
        <ProductContainer products={products} onClickProduct={handleClickProduct} />
      </div>
    </>
  );
}
