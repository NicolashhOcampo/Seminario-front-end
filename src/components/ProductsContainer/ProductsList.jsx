import { ProductItem } from "../ProductDetails/ProductItem"

export const ProductsList = ({ products }) => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Products
      </h2>
      <ul className="flex flex-col divide-y divide-gray-200 border rounded-md shadow-sm bg-white">
        <li className="grid grid-cols-[80px_1fr_auto_auto] rounded-t-md items-center gap-4 px-4 py-2 bg-gray-200">
          <span className="col-span-1">Image</span>
          <span className="col-span-1">Product</span>
          <span className="text-right">Stock</span>
          <span className="text-right">Price</span>
        </li>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </ul>
    </section>
  )
}
