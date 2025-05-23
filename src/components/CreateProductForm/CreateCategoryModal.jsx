import { useProducts } from "@/hooks/useProducts"
import { useState } from "react"
import toast from "react-hot-toast"

export const CreateCategoryModal = ({ setCategories, closeModal }) => {
    const [categoryName, setCategoryName] = useState("")
    const { createCategory } = useProducts()

    const handleCreateCategory = () => {
        const category = categoryName.trim()
        if (category.length === 0) return

        createCategory(category)
            .then(data => {
                setCategories(data)
                toast.success("Categoria creada")
            })
            .catch(e => {
                console.log(e)
                toast.error("Error al crear categoria")
            })
    }

    return (
        <div className="absolute flex flex-col items-center gap-2 p-4 pt-1 bottom-10 w-1/2 right-0 border bg-white">
            <button
                type="button"
                onClick={closeModal}
                className="ml-auto text-gray-500 h-fit w-fit flex justify-center items-center hover:text-gray-800 text-2xl font-bold"
                aria-label="Cerrar modal"
            >
                &times;
            </button>
            <h2 className="text-lg -mt-2 font-semibold">Ingrese el nombre de la categoria</h2>
            <input type="text" placeholder="Electrodomesticos" className="w-full p-2 border rounded" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            <button type="button" onClick={handleCreateCategory} className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Crear</button>
        </div>
    )
}
