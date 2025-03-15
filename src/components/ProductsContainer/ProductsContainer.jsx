const ProductContainer = ({products}) => {
    console.log(products)
    return (
        <ul>
            {products.map(product =>{
                return (
                    <li key={product._id}>
                        <img src={`http://localhost:8080/public/images/${product.thumbnails[0]}`} alt={product.title}/>
                    </li>
                )
            })}
        </ul>
    )
}

export default ProductContainer;