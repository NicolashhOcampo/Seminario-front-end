'use client';

import Profile from "@/components/Profile/Profile";
import Spinner from "@/components/Spinner/Spinner";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function Page() {
    const { user, fetchUser } = useUser();
    useEffect(() => {
        fetchUser()
    }, [])

    if(!user) return <Spinner />

    return (
        <>
            <Profile user={user} fetchUser={fetchUser} />
        </>
    )
}