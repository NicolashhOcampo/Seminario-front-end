"use client";

import Navbar from "@/components/Navbar/Navbar";
import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const userRes = await fetch("http://localhost:8080/api/auth/current", {
          credentials: "include",
        });

        if (!userRes.ok) {
          router.push("/login");
          return;
        }

        const userData = await userRes.json();
        setUser(userData);

        const url = new URL("http://localhost:8080/api/products");
        url.searchParams.append("limit", 10);
        url.searchParams.append("page", 1);
        url.searchParams.append("sort", "asc");

        const productsRes = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!productsRes.ok) throw new Error("Error al cargar los productos");

        const productsData = await productsRes.json();
        setProducts(productsData.payload);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [router]);

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />
      <Sidebar user={{ name: user.nickName, role: user.role }} />
      <div className="w-full pt-8 flex justify-center">
        <ProductContainer products={products} />
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
