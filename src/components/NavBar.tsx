"use client"
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import Notification from "./Notification";

export default function NavBar(){
    const {logoutUser, user} = useUser();

    const path = usePathname();

    // Check if the path is under /admin/departments
    const isDepartmentsPath = path.startsWith('/admin/departments');

    return(
        <nav className="navbar z-10">
            <ul className="flex justify-end gap-4 [&]:mx-14 relative">
                {user ? 
                <>
                    <li className={ path === '/' ? 'navLinkActive' : 'navLinkInactive'}>
                        <Link href={'/'}> Counter</Link>
                    </li>
 
                    <li className={ isDepartmentsPath ? 'navLinkActive' : 'navLinkInactive'}>
                        <Link href={'/admin/departments'}> Departments</Link>
                    </li>

                    <li className="navLinkInactive cursor-pointer" onClick={logoutUser}>
                        Logout
                    </li>
                </>:
                <>
                    <li className={ path === '/' ? 'navLinkActive' : 'navLinkInactive'}>
                        <Link href={'/'}> Counter</Link>
                    </li>
                    <li className={ path === '/login' ? 'navLinkActive' : 'navLinkInactive'}>
                        <Link href={'/login'}>Login</Link>
                    </li>
                </>
                }
                <Notification/>
            </ul>
        </nav>
    )
}
