import ProductCard from "../ProductCard/ProductCard";

const ProductContainer = ({products}) => {

    return (
        <div className="mt-40 w-80/100 grid grid-cols-4 gap-10">
            {products.map(product =>{
                return (
                        <ProductCard key={product._id} className="w-50 border-black" img={`http://localhost:8080/public/images/${product.thumbnails[0]}`} 
                        title={product.title}
                        price={product.price}/>
                
                )
            })}
        </div>
    )
}

export default ProductContainer;