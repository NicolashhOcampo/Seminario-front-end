'use client';

import Profile from "@/components/Profile/Profile";
import Spinner from "@/components/Spinner/Spinner";
import config from "@/config/app.config";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { user, fetchUser, setUser } = useUser();
    const {resetCart} = useCart()
    const router = useRouter()

    const handleLogout = () => {
        fetch(`${config.urlHost}/api/auth/logout`, {
            method: "GET",
            credentials: 'include'
        });
        setUser(null)
        resetCart()
        router.push('/login')
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (!user) return <Spinner />

    return (
        <>
            <Profile user={user} fetchUser={fetchUser} onClickLogout={handleLogout}/>
        </>
    )
}