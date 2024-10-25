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
    const [profile, setProfile] = useState(false)

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

    const handleProfile = () =>{
      !profile ? setProfile(true): setProfile(false)
      console.log(profile)
    }
    return (
        <nav className="navbar">
          {user ? (
            <div className="loggedIn">
                <div onClick={handleBurger} className="burger">
                  <div className={!burger ? "top": "topClicked"}></div>
                  <div className={!burger ? "bottom": "bottomClicked"}></div>
                </div>
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
                <img onClick={handleProfile} className="profile" src="/general/images/admin.jpg"/>
                <ul className={profile ? "profileMenuInactive": "profileMenuActive"}>
                  <li className="logout " onClick={logoutUser}>Logout</li>
                </ul>
                
           
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
