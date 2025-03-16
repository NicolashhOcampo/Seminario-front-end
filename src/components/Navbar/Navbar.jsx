import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter()
    const handleClick = ()=>{
        router.push("/cart")
    }

    return (
        <div className="top-0 left-0 flex z-100 justify-between items-center w-full h-[60px] bg-[#f8f8f8] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-wrap box-border px-5 py-2.5 fixed">
            {/* Título con padding en la izquierda */}
            <h2 className="text-[#333] text-2xl font-bold m-0 pl-20">
                Products Store
            </h2>

            {/* Contenedor vacío para ocupar espacio */}
            <div className="flex-grow"></div>

            {/* Carrito alineado a la derecha */}
            <div>
                <div id="cart-btn" onClick={handleClick} className={"no-underline text-[#333] text-2xl relative hover:text-[#007bff]"}>
                    <span className= {"material-symbols-outlined"}>shopping_cart</span>
                </div>
            </div>
        </div>
    );
};


export default Navbar