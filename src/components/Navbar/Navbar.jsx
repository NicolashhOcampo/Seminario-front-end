import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter()
    const handleClick = ()=>{
        router.push("/cart")
    }

    return (
        <div className={"flex justify-between items-center w-full h-[60px] bg-[#f8f8f8] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-wrap box-border px-5 py-2.5"}>
            <div className={"text-[#333] hover:text-[#007bff]"}>
                <span className={"material-symbols-outlined"} id="menu-toggle">menu</span>
            </div>
            <div className={"flex justify-center items-center font-bold"}>
                <h2 className= {"text-[#333] text-2xl font-bold m-0"}>Products Store</h2>
            </div>
            <div>
                <div id="cart-btn"  onClick={handleClick} className={"no-underline text-[#333] text-2xl relative hover:text-[#007bff]"}>
                    <span className= {"material-symbols-outlined"}>shopping_cart</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar