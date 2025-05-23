import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"
import config from "@/config/app.config";
import { useSearchParams } from "next/navigation";
import socket from "@/utils/socket";

export function useProducts() {

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
                    console.log("productsRes.status: ", productsRes.status)
                    if (productsRes.status === 401) {
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

        socket.on("updateProducts", () => {
            fetchProducts();
        })

        return () => {
            socket.off("updateProducts");
        }
    }, [router, searchParams]);



    const fetchProductById = async (id) => {
        const url = new URL(`${config.urlHost}/api/products/${id}`);
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include"
            })

            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error("Producto no encontrado")
                }

                throw new Error("Error al conctar con el servidor")
            }

            const data = await response.json()

            return data.payload

        }
        catch (err) {
            console.log(err.message)
            router.push("/products")
        }
    }

    const fetchCategories = async () => {

        try {

            const response = await fetch(`${config.urlHost}/api/category/`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Error al buscar categorias")

            const res = await response.json()
            const categories = res.payload
            console.log("categories: ", categories)

            return categories
        } catch (e) {
            console.log(e)
        }
    }

    const deleteProduct = async (id) => {
        const url = new URL(`${config.urlHost}/api/products/${id}`);
        try {
            const response = await fetch(url, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                if (response.status === 500) {
                    throw new Error("Error al eliminar el producto");
                }

                throw new Error("Error en el servidor");
            }

            socket.emit("updateProducts")
            return { success: true };
        } catch (err) {
            console.error(err.message);
            return { success: false, error: err.message };
        }
    };


    const createCategory = async (category) => {
        try {

            const response = await fetch(`${config.urlHost}/api/category/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category }),
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Error al crear categorias")

            return fetchCategories()
        } catch (e) {
            console.log(e)
            throw new Error("Error al crear categorias")
        }

    }

    return { products, pagination, loading, fetchProductById, deleteProduct, createCategory, fetchCategories }
}

