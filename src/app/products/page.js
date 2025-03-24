'use client';

import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"
import config from "@/config/app.config";
import { useSearchParams } from "next/navigation";
import io from "socket.io-client";
import Pagination from "@/components/Pagination/Pagination";

const socket = io(config.urlHost)

export default function Page() {
  const router = useRouter();
  const { fetchUser } = useUser();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "asc";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const buildPageLink = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    return `/products?${params.toString()}`;
  };

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const url = new URL(`${config.urlHost}/api/products`);
          url.searchParams.append("limit", limit);
          url.searchParams.append("page", page);
          url.searchParams.append("sort", sort);
          if (category) url.searchParams.append("category", category);
          if (search) url.searchParams.append("search", search);
  
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
          setPagination({
            totalPages: productsData.totalPages,
            prevPage: productsData.prevPage,
            nextPage: productsData.nextPage,
            hasPrevPage: productsData.hasPrevPage,
            hasNextPage: productsData.hasNextPage,
            totalDocs: productsData.totalDocs,
            prevLink: productsData.hasPrevPage ? buildPageLink(productsData.prevPage) : null,
            nextLink: productsData.hasNextPage ? buildPageLink(productsData.nextPage) : null,
            page: productsData.page,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

  
      fetchProducts();
      fetchUser()

      socket.on("updateProducts", (updatedProducts) => {
        fetchProducts();
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
    console.log(searchParams.toString())
    router.push(`/products/${id}?${searchParams.toString()}`)
  }


  return (
    <>
      <div className="w-full pt-8 flex flex-col items-center mb-20">
        <ProductContainer products={products} onClickProduct={handleClickProduct} />
        <Pagination page={pagination.page} prevLink={pagination.prevLink} nextLink={pagination.nextLink} />
      </div>
    </>
  );
}
