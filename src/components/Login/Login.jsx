import Link from "next/link";

const Login = ({ email, setEmail, password, setPassword, handleSubmit, error }) => {
    return (
        <>
            <h2 className="text-[2rem] text-white mb-6 text-shadow text-lg font-bold">Login</h2>
            <form id="loginForm"
                onSubmit={handleSubmit}
                className="bg-[rgb(31,29,29)] w-9/10 md:w-2/5 max-w-120 p-8 flex flex-col items-center text-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            >
                <label htmlFor="email" className="self-start text-base font-bold mb-[0.3rem]">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#2c2c2c] text-white mb-4 p-[0.7rem] rounded-[0.3rem] border border-transparent hover:border hover:border-solid hover:border-[rgba(0,212,255,0.8)] text-[1rem]"
                />

                <label htmlFor="password" className="self-start text-base font-bold mb-[0.3rem]">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#2c2c2c] text-white mb-4 p-[0.7rem] rounded-[0.3rem] border border-transparent hover:border hover:border-solid hover:border-[rgba(0,212,255,0.8)] text-[1rem]"
                />

                <div className={`${error ? "block" : "hidden"} text-[red] text-sm mx-auto my-2`}>
                    {error}
                </div>

                <button
                    type="submit"
                    className="w-full text-base font-bold text-white bg-[#007acc] cursor-pointer transition-[background] duration-[0.3s] ease-[ease-in-out] p-[0.8rem] rounded-[0.3rem] border-none hover:bg-[#005f99]"
                >
                    Iniciar Sesión
                </button>

                <a href="/signup" className="no-underline text-white text-[0.8rem] text-center transition-[color] duration-[0.2s] ease-[ease-in-out] cursor-pointer mt-4 hover:text-[#007acc]">
                    Regístrate
                </a>

                <div className="flex flex-col justify-center w-full mt-6">

                <div className="w-full flex gap-2 justify-center items-center">     
                    <div className="h-[1px] flex-1 bg-white" />           
                    <p className="">O</p>
                    <div className="h-[1px] flex-1 bg-white" />
                </div>

                <Link href="/google"
                    className="w-full mt-6 flex items-center justify-between h-10 p-1 px-4 rounded-3xl border border-white text-base font-bold text-white  cursor-pointer transition-all duration-[0.3s] ease-[ease-in-out] hover:border-[rgba(0,212,255,0.8)] "
                >
                    Iniciar con Google <img src="/google.png" className=" h-full cursor-pointer transition-transform duration-[0.3s] ease-[ease-in-out] hover:scale-110" alt="github" />
                </Link>
                   
                </div>
            </form>
        </>
    )
}

export default Login;
