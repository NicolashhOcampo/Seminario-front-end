'use client';

import ProductContainer from "@/components/ProductsContainer/ProductsContainer";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { useConsult } from "@/hooks/useConsult";
import Link from "next/link";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";


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
      <div className="w-full pt-5 flex flex-col items-center pb-10">
        <ProductContainer products={products} onClickProduct={handleClickProduct} />
        <Pagination page={pagination.page} prevLink={pagination.prevLink} nextLink={pagination.nextLink} />
        <Link href={"/chat"} className=" bg-blue-600 hover:bg-blue-700 text-white rounded-3xl size-12 p-2 fixed flex items-center justify-center right-4 bottom-4"><ChatBubbleLeftEllipsisIcon /></Link>
      </div>
    </>
  );
}
