import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleClick = ()=>{
        router.push(`/cart?${searchParams.toString()}`)
    }

    return (
        <div className="top-0 left-0 flex z-100 justify-between items-center w-full h-[60px] bg-[#f8f8f8] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-wrap box-border px-5 py-2.5 fixed">

            <h2 className="text-[#333] text-2xl font-bold m-0 pl-20">
                Products Store
            </h2>

            
            <div onClick={handleClick} className={"no-underline text-[#333] text-2xl relative hover:text-[#007bff]"}>
                <ShoppingBagIcon className="size-6 cursor-pointer" />    
            </div>
        </div>
    );
};


export default Navbar