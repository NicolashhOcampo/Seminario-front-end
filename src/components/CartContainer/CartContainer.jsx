import { useCart } from "@/app/hooks/useCart";
import { ItemCart } from "../ItemCart/ItemCart";

export const CartContainer = ({cart}) => {
    const {addToCart, reduceFromCart} = useCart()

    
  return (
    <div className="flex flex-col">
          <h1 className="text-center">Carrito</h1>
          <div className="w-180 mt-20 flex flex-col items-center border border-gray-300">
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              cart.map((item) => (
                <ItemCart key={item._id}  item={item} onClickReduce={() => reduceFromCart(item)} onClickAdd={() => addToCart(item)} />
              ))
            )}
          </div>
        </div>
  )
}
