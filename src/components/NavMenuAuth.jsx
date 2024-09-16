"use client"
import { useUser } from "@/contexts/userContext"
import Link from 'next/link'
import '@/components/CSS/burger.css'
import { usePathname } from "next/navigation"
import { getUser } from "@/firebase/actions"



export default function NavMenuAuth(){

    const {user, logout} = useUser()
    const pathNasme = usePathname()
   
    return(
        <nav className="">
           <Link href={'/'}> 
          <img className="logo" src="/branding/logo/snipsnap_horizontal-logo.svg" alt="Logo" />
           </Link>
       

            <ul className="flex gap-5 justify-center">
                { user && (
                    <>
                    <image src={user.profilePicture}/>
                    <li className="underLine"><Link href={'/profile'}>My Account </Link></li>
                    </>
                )}
                
                {!user && (
                <Link className={pathNasme === '/signup' ? 'underLine' : undefined} href="/signup">

                    Signup
                </Link>
                )}
                {pathNasme === '/login' ? <li className="underLine" onClick={user && logout}><Link href={user ? '#' : '/login'}>{user ? 'Logout': 'Login'}</Link></li>:
                 <li onClick={user && logout}><Link href={user ? '#' : '/login'}>{user ? 'Logout': 'Login'}</Link></li>}
            </ul>
        </nav>
    )
}