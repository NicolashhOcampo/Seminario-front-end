'use client';

import { AdminGuard } from "@/components/AdminGuard/AdminGuard";
import { ProductsList } from "@/components/ProductsContainer/ProductsList";
import { useProducts } from "@/hooks/useProducts";

export default function Page() {
    const {products, deleteProduct} = useProducts()

  return (
    <div className="py-5">
      <AdminGuard>
        <ProductsList products={products} onDelete ={deleteProduct}/>
      </AdminGuard>
    </div>
  );
}