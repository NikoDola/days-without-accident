"use client"
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import Notification from "./Notification";

export default function NavBar(){
    const {logoutUser, user} = useUser()
    const router = useRouter()
    const path = usePathname()
   
    return(
        <nav className="navbar z-10">
            <ul className="flex justify-end gap-4 [&]:mx-14 relative">
                {user ? 
                <>
                    <li className={ path === '/' ? 'navLinkActive': 'navLinkInactive'}><Link href={'/'}> Counter</Link></li>
                    <li className={ path === '/admin' ? 'navLinkActive': 'navLinkInactive'}><Link href={'/admin'}> Admin</Link></li>
                    <li className={ path === '/admin/departments' ? 'navLinkActive': 'navLinkInactive'}><Link href={'/admin/departments'}> Departments</Link></li>
                    <li  className="cursor-pointer" onClick={logoutUser}>Logout</li>
          
                </>:
                <>
                    <li className={ path === '/' ? 'navLinkActive': 'navLinkInactive'}><Link href={'/'}> Counter</Link></li>
                    <li className={ path === '/login' ? 'navLinkActive': 'navLinkInactive'}><Link href={'/login'}>login</Link></li>
                </>
                }
                <Notification/>
            </ul>
        </nav>
    )
}