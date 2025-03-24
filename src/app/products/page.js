'use client';

import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import { useProducts } from "@/hooks/useProducts";



export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const {products, loading, pagination} = useProducts()

  const handleClickProduct = (id) => {
    console.log("ID: ", id)
    console.log(searchParams.toString())
    router.push(`/products/${id}?${searchParams.toString()}`)
  }

  if (loading) return <Spinner />;


  return (
    <>
      <div className="w-full pt-8 flex flex-col items-center mb-20">
        <ProductContainer products={products} onClickProduct={handleClickProduct} />
        <Pagination page={pagination.page} prevLink={pagination.prevLink} nextLink={pagination.nextLink} />
      </div>
    </>
  );
}
