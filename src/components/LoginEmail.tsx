"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/userContext"
import { FormEvent } from 'react';
import  Link  from 'next/link'
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Login() {
    const { login, error, user} = useUser();
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if (user) {
            // Redirect to the profile page if the user is already logged in
            router.push(`${user.uid}/profile`);
        }
    }, [user, router]);

   
    const handleShowPassword = () =>{
        showPassword ? setShowPassword(false)  : setShowPassword(true)
        console.log(showPassword)
    }

    async function Log(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await login(email, password);
            if (result && result.user && result.user.emailVerified) {
                // Redirect to the profile page if the email is verified
                
            } else {
                // Set error if the email is not verified
                console.log(error)
            }
        } catch (e: any) {
            // Handle login errors
            console.error(error)
        }
    }

    return (
        <form onSubmit={Log} className="logInSignInForm">
            <input type="text" name="email" placeholder="email" required />
            <div className="password">
            <div onClick={handleShowPassword} >
                <Image className="icon cursor-pointer" 
                src={showPassword ? '/branding/icons/visual.svg' : '/branding/icons/blind.svg'} 
                height={16} width={16}
                style={{ width: '1rem', height: '1rem' }} // Inline styles
                alt="visual"/>
            </div>
            <input className="w-full" type={showPassword ? 'text': 'password'} name="password" placeholder="password" required />
            </div>
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            <button className="mainButton" type="submit">Login</button>
            <p className="mb-6">Lost your password? <Link className="text-blue-500" href='/login/reset-password'> Reset your password!</Link></p>
        </form>     
    );
}
