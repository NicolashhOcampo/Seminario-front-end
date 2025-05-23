import config from '@/config/app.config'
import { TrashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast';

export const ProductItem = ({ product, onDelete }) => {

    const handleDelete = async (id) => {
        const result = await onDelete(id);
        if (result.success) {
            toast.success("Producto eliminado correctamente")
        } else {
            toast.error("Error al eliminar producto")
            console.log(result.error)
        }
    };

    return (
        <li className="grid grid-cols-[80px_1fr_auto_auto_40px] items-center gap-4 px-4 py-2">
            <img
                src={`${config.urlHost}/public/images/products/${product.thumbnails[0]}`}
                alt={product.title}
                className="w-20 h-20 object-contain rounded"
            />
            <span className="font-medium text-gray-800">{product.title}</span>
            <span className="text-gray-600">{product.stock} u.</span>
            <span className="text-green-600 font-bold">${product.price}</span>
            <div className='w-full flex items-center justify-center'><TrashIcon onClick={() => handleDelete(product._id)} className='size-8 p-1 rounded-full hover:bg-red-500' /></div>
        </li>
    )
}
