const ProductCard = ({img, title, price, onClick, onClickAdd}) => {
    return (
        <div  className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform">
            <div onClick={onClick}>
                <img className="w-full h-48 object-contain" src={img} alt={title}  />
                <h3 className="text-center">{title}</h3>
                <p className="text-center" >${price}</p>
            </div>
            <button className="mt-4 w-full z-10 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700  transition-all cursor-pointer" onClick={onClickAdd}>Agregar al Carrito</button>
        </div>
    )
}

export default ProductCard;