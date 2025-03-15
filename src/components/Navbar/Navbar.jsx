const Navbar = () => {
    return (
        <div className={"top-0 left-0 flex justify-between items-center w-full h-[60px] bg-[#f8f8f8] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-wrap box-border px-5 py-2.5 fixed"}>
            <h2 className= {"text-[#333] text-2xl font-bold m-0"}>Products Store</h2>
            <div className={"flex justify-center items-center font-bold"}>
            </div>
            <div>
                <a id="cart-btn" href="#" className={"no-underline text-[#333] text-2xl relative hover:text-[#007bff]"}>
                    <span className= {"material-symbols-outlined"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    );
}

export default Navbar