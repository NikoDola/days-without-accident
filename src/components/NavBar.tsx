"use client"
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

export default function NavBar(){
    const {logoutUser, user} = useUser()
    const router = useRouter()
    return(
        <nav className="navbar">
            <ul >
                {user ? <li className="cursor-pointer" onClick={logoutUser}>Logout</li>: <li>No one is logged in</li>}
            </ul>
        </nav>
    )
}