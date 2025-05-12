'use client';

import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { useConsult } from "@/hooks/useConsult";


export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const {products, loading, pagination} = useProducts()
  const { id } = searchParams;

  const { consultsLogs } = useConsult(id);

  const handleClickProduct = (id) => {
    console.log("ID: ", id)
    console.log(searchParams.toString())
    router.push(`/products/${id}?${searchParams.toString()}`)
  }

  if (loading || !products) return <Spinner />;


  return (
    <>
      <div className="w-full pt-15 flex flex-col items-center mb-20">
        <ProductContainer products={products} onClickProduct={handleClickProduct} />
        <Pagination page={pagination.page} prevLink={pagination.prevLink} nextLink={pagination.nextLink} />
      </div>
    </>
  );
}
