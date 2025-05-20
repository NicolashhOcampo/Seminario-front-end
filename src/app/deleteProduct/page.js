'use client';

import { AdminGuard } from "@/components/AdminGuard/AdminGuard";
import DeleteProductForm from "@/components/DeleteProductForm/DeleteProductForm";

export default function Page() {

  return (
    <>
      <AdminGuard>
        <DeleteProductForm />
      </AdminGuard>
    </>
  );
}
