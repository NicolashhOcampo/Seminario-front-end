import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user } = useUser()
    const handleClick = () => {
        router.push(`/cart?${searchParams.toString()}`)
    }

    return (
        <div className="top-0 left-0 flex z-100 justify-between items-center w-full h-15 bg-[#f8f8f8] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-wrap box-border px-5 py-2.5 fixed">
            <Link href={`/profile/${user?.nickName}`}>
                <img
                    className="size-10 rounded-full object-cover"
                    src={`${config.urlHost}/public/images/users/${user?.avatar}`}
                    alt="Profile"
                />
            </Link>

            <h2 className="text-[#333] text-2xl font-bold m-0 pl-20">
                <Link href={"/products"}>Products Store</Link>
            </h2>


            <div onClick={handleClick} className={"no-underline text-[#333] text-2xl relative hover:text-[#007bff]"}>
                <ShoppingBagIcon className="size-6 cursor-pointer" />
            </div>
        </div>
    );
};


export default Navbar