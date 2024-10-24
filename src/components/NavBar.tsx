"use client"
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import Notification from "./Notification";
import { useState } from "react";

export default function NavBar(){
    const {logoutUser, user} = useUser();
    const [burger, setBurger] = useState(false)

    const path = usePathname();

    // Check if the path is under /admin/departments
    const isDepartmentsPath = path.startsWith('/admin/departments');

    const handleBurger = () =>{
        !burger ? setBurger(true): setBurger(false)
    }
    return (
        <nav className="navbar">
          {user ? (
            <div className="loginNav">
                
              <ul className={burger? "navUls" :"navUrls"}>
                <li className={path === '/' ? '' : ''}>
                  <Link href="/">Counter</Link>
                </li>
      
                <li className={isDepartmentsPath ? 'navLinkActive' : 'navLinkInactive'}>
                  <Link href="/admin/departments">Departments</Link>
                </li>
      
                <li className="navLinkInactive cursor-pointer" onClick={logoutUser}>
                  Logout
                </li>
              </ul>
              <div className="mobileMenu">
                <Notification />
                <div onClick={handleBurger} className="burger"></div>
              </div>
          
            </div>
          ) : (
            <>
              <ul className="navUls">
                <li className={path === '/' ? 'navLinkActive' : 'navLinkInactive'}>
                  <Link href="/">Counter</Link>
                </li>
                <li className={path === '/login' ? 'navLinkActive' : 'navLinkInactive'}>
                  <Link href="/login">Login</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      );
      
}
