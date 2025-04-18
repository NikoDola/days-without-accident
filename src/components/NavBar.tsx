"use client"
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import Notification from "./Notification";
import "./NavBar.css"
import { useState, useEffect } from "react";


export default function NavBar(){
    const {logoutUser, user} = useUser();
    const [burger, setBurger] = useState(false)
    const [profile, setProfile] = useState(false)
    const [windowInnerWith , setWindowInnerWith] = useState<number>()
 
    useEffect(()=>{
      setWindowInnerWith(innerWidth)
      if(innerWidth < 1000){
        setBurger(false)
        setProfile(false)
      }else{
        setBurger(true)
      }
    },[])
    console.log(burger)
    const path = usePathname();
   

    // Check if the path is under /admin/departments
    const isDepartmentsPath = path.startsWith('/admin/departments');

    const handleBurger = () =>{
      burger ? setBurger(false): setBurger(true)
    }

    const handleProfile = () =>{
      profile ? setProfile(false): setProfile(true)
     
    }
    
    return (
         <nav className={path === '/' && windowInnerWith >= 1000 ? 'navBarCounter': 'navbar'}>
          {user ? (

            <div className="loggedIn">
              <div onClick={handleBurger} className="burger">
                <div className={!burger ? "top": "topClicked"}></div>
                <div className={!burger ? "bottom": "bottomClicked"}></div>
              </div>
   

                <ul className={burger ? "navUrls": "navUrlsHidden"}>       
                  <li onClick={() => innerWidth < 1000 && setBurger(false)}  className={path === '/' ? "urlSelected": 'navUrl'}><Link href={"/"}>Counter</Link></li>
                  <hr className="hrDecoration"/>
                  <li  onClick={() => innerWidth < 1000 && setBurger(false)} className={path === '/admin/departments' ? "urlSelected": 'navUrl'}><Link href="/admin/departments">Departments</Link></li>
                </ul>

                <div className="notificationAndBurger">
                  <Notification />
                  <img onClick={handleProfile} className="profile" src="/general/images/admin.jpg"/>
                  <ul className={profile ? "profileMenuActive": "profileMenuInactive"}>
                    <li  className="cursor-pointer" onClick={logoutUser}>Logout</li>
                  </ul>
                </div>
   
           
            </div>
          ) : (
            (
              <div className="loggedIn">
                  <div onClick={handleBurger} className="burger">
                    <div className={!burger ? "top": "topClicked"}></div>
                    <div className={!burger ? "bottom": "bottomClicked"}></div>
                  </div>

                  <ul className={burger ? "navUrls": "navUrlsHidden"}>
                  <li onClick={() => innerWidth < 1000 && setBurger(false)}  className={path === '/' ? "urlSelected": 'navUrl'}><Link href={"/"}>Counter</Link></li>
                  <hr className="hrDecoration"/>
                  <li onClick={() => innerWidth < 1000 && setBurger(false)} className={path === '/login' ? "urlSelected": 'navUrl'}><Link href="/login">Login</Link></li>
                  </ul>
    
              </div>
            )
          )}
        </nav>
      );
      
}
