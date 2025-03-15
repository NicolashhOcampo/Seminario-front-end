const ProductCard = ({img, title, price}) => {
    return (
        <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform">
            <img className="w-full h-48 object-contain" src={img} alt={title}  />
            <h3 className="text-center">{title}</h3>
            <p className="text-center" >${price}</p>
        </div>
    )
}

export default ProductCard;