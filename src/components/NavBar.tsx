"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";

export default function NavBar(){
    const {logoutUser, user} = useUser()
    const router = useRouter()
    return(
        <nav className="navbar z-10">
            <ul className="flex justify-end gap-4 [&]:mx-14 relative">
                <li><Link href={'/'}> Counter</Link></li>
                <li><Link href={'/admin'}> Admin</Link></li>
                <li><Link href={'/admin/departments'}> Departments</Link></li>
                {user ? <li className="cursor-pointer" onClick={logoutUser}>Logout</li>: <li>No one is logged in</li>}
            </ul>
        </nav>
    )
}