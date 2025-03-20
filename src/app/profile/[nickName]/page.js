'use client';

import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { user, fetchUser } = useUser();


    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <Profile user={user} />
        </>
    )
}