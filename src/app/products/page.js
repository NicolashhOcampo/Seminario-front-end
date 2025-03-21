'use client';

import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"
import config from "@/config/app.config";

export default function Page() {
  const router = useRouter();
  const { fetchUser } = useUser();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const url = new URL(`${config.urlHost}/api/products`);
          /* url.searchParams.append("limit", 10);
          url.searchParams.append("page", 1);
          url.searchParams.append("sort", "asc"); */
  
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
  }, [router]);

  if (loading) return <Spinner />;

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
