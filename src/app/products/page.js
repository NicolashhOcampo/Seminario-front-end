'use client';

import Navbar from "@/components/Navbar/Navbar";
import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"

export default function Page() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const url = new URL("http://localhost:8080/api/products");
          url.searchParams.append("limit", 10);
          url.searchParams.append("page", 1);
          url.searchParams.append("sort", "asc");
  
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

      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/auth/current", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
          });
    
          if (!response.ok) throw new Error("Error al cargar usuario");
          const user = await response.json()
          console.log("User:", user)
          setUser(user.user)
          
        } catch (err) {
          setError(err.message);
        }
      }
  
      fetchProducts();
      //fetchUser()
  }, [router]);

  if (loading) return <Spinner />;

  console.log("user:", user.email)

  return (
    <>
      <Navbar />
      <Sidebar user={{ nickName: user?.nickName || "Usuario", role: user?.role || "Invitado" }} />
      <div className="w-full pt-8 flex justify-center">
        <ProductContainer products={products} />
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
