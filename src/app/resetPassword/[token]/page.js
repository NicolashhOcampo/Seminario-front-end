"use client";

import { ResetPassword } from "@/components/ResetPassword/ResetPassword";
import { useParams } from "next/navigation";

export default function Page() {
    const { token } = useParams();


    return (
        <div className="h-screen w-screen bg-[linear-gradient(130deg,rgb(2,0,36)_0%,rgb(110,32,255)_35%,rgb(0,212,255)_100%)] flex flex-col items-center justify-center">   
            <ResetPassword token={token} />
        </div>     

    )
}