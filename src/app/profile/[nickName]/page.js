'use client';

import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useUser } from "@/context/UserContext";

export default function Page() {
    const { user } = useUser();

    return (
        <>
            <Navbar />
            <Sidebar user={{ nickName: user?.nickName, role: user?.role }}/>
            <Profile user={user} />
        </>
    )
}