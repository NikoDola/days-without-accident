"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import Notification from "./Notification";

export default function NavBar(){
    const {logoutUser, user} = useUser()
    const router = useRouter()
  
    return(
        <nav className="navbar z-10">
            <ul className="flex justify-end gap-4 [&]:mx-14 relative">
                {user ? 
                <>
                    <li><Link href={'/admin'}> Admin</Link></li>
                    <li><Link href={'/admin/departments'}> Departments</Link></li>
                    <li className="cursor-pointer" onClick={logoutUser}>Logout</li>
                </>:
                <>
                    <li><Link href={'/'}> Counter</Link></li>
                    <li className="cursor-pointer"><Link href={'/login'}>login</Link></li>
                </>
                }
                <Notification/>
            </ul>
        </nav>
    )
}