'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard ({children}){
    const pathname= usePathname();
    const router = useRouter();
useEffect(() => {
    if (pathname === "/login" || pathname === "/signup" || pathname === "/forgotPassword" || pathname === "/resetPassword") {
        return;
    }

    const user = localStorage.getItem("restaurantUser")
    if (!user) {
        router.replace("/login")
    }


}, [pathname, router])

return children;

}