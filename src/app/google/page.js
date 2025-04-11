"use client";

import config from "@/config/app.config";
import { useEffect } from "react";

export default function Page() {
    const fetchGoogle = async () => {
      const loginWithGoogle = () => {
          window.location.href = `${config.urlHost}`;
      };
        loginWithGoogle()
      }

      fetchGoogle() 

  return (
    <>
      <div className="flex justify-center items-center min-h-screen"></div>
    </>
  );
}