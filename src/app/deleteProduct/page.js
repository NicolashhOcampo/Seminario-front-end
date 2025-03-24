'use client';

import { AdminGuard } from "@/components/AdminGuard/AdminGuard";
import DeleteProductForm from "@/components/DeleteProductForm/DeleteProductForm";
import Spinner from "@/components/Spinner/Spinner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  return (
    <>
      <AdminGuard>
        <DeleteProductForm />
      </AdminGuard>
    </>
  );
}
