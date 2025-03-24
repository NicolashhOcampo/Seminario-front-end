"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Pagination = ({ page, prevLink, nextLink }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Botón para página anterior */}
      {prevLink ? (
        <button
          onClick={() => router.push(prevLink, { scroll: false })}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      ) : (
        <button className="p-2 bg-gray-300 rounded cursor-not-allowed opacity-50" disabled>
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {/* Número de página actual */}
      <span className="font-bold text-lg">{page}</span>

      {/* Botón para página siguiente */}
      {nextLink ? (
        <button
          onClick={() => router.push(nextLink, { scroll: false })}
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      ) : (
        <button className="p-2 bg-gray-300 rounded cursor-not-allowed opacity-50" disabled>
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
