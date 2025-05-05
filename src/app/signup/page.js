import { Signup } from "@/components/Signup/Signup";

export default function Page() {

    return (
        <div className="h-screen w-screen bg-[linear-gradient(130deg,rgb(2,0,36)_0%,rgb(110,32,255)_35%,rgb(0,212,255)_100%)] flex flex-col items-center justify-center">
            <Signup />
        </div>
    )
}