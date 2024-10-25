"use client"
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import Notification from "./Notification";
import "@/components/css-components/NavBar.css"
import { useState, useEffect } from "react";


export default function NavBar(){
    const {logoutUser, user} = useUser();
    const [burger, setBurger] = useState(true)

    useEffect(()=>{
     const checkingInnerWith = innerWidth
     checkingInnerWith < 1000 && setBurger(false)
    },[])

    const path = usePathname();

    // Check if the path is under /admin/departments
    const isDepartmentsPath = path.startsWith('/admin/departments');

    const handleBurger = () =>{
      burger ? setBurger(false): setBurger(true)
    }
    return (
        <nav className="navbar">
          {user ? (
            <div className="loggedIn">
              <ul className={burger ? "navUrls": "navUrlsHidden"}>
                <li className="navLinks"><Link href={"/"}>Counter</Link></li>
                <hr className="hrDecoration"/>
                <li className="navLinks"><Link href="/admin/departments">Departments</Link></li>
                <hr className="hrDecoration"/>
                <li className="navLinks">Accidents</li>
                <hr className="hrDecoration"/>
                <li className="navLinks">Employees</li>
              </ul>
              <div className="notificationAndBurger">
                <Notification />
                <li className="navLinkInactive cursor-pointer" onClick={logoutUser}>Logout</li>
                <div onClick={handleBurger} className="burger">
                  <div className="top"></div>
                  <div className="middle"></div>
                  <div className="bottom"></div>
                </div>
              </div>
          
            </div>
          ) : (
            <div className="loggedOut">
              <ul className="navUls">
                <li ><Link href="/">Counter</Link></li>
                <li><Link href="/login">Login</Link></li>
              </ul>
            </div>
          )}
        </nav>
      );
      
}
