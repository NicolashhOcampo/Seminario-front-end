'use client';

import { AdminGuard } from "@/components/AdminGuard/AdminGuard";
import ProductManagement from "@/components/CreateProductForm/CreateProductForm";

export default function Page() {

  return (
    <>
      <AdminGuard>
        <ProductManagement />
      </AdminGuard>
    </>
  );
}
