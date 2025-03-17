"use client";

import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Page() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Profile />
        </>
    )
}