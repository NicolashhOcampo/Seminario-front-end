import config from '@/config/app.config'

export const ProductItem = ({ product }) => {
    return (
        <li className="grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 px-4 py-2">
            <img
                src={`${config.urlHost}/public/images/products/${product.thumbnails[0]}`}
                alt={product.title}
                className="w-20 h-20 object-contain rounded"
            />
            <span className="font-medium text-gray-800">{product.title}</span>
            <span className="text-gray-600">{product.stock} u.</span>
            <span className="text-green-600 font-bold">${product.price}</span>
        </li>
    )
}
