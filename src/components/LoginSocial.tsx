"use client";
import { useEffect } from "react";
import { useUser } from "@/contexts/userContext"
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function LoginSocial({social}) {
    const { googleSign, gitHubSign, user} = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push(`${user.uid}/profile`);
        }
    }, [user, router]);

    return (
        <>
            {social === 'google' ?      
                <div onClick={googleSign} className="buttonSignUp">
                    <Image src={"/branding/icons/google.svg"} width={16} height={16}  alt="google icon"/>
                    <p>Continue with Google</p>
                </div>
                : 
                <div onClick={gitHubSign} className="buttonSignUp">
                    <Image src={"/branding/icons/github.svg"} width={16} height={16} alt="git hub"/>
                    <p>Continue with Github</p>
                </div>
            }
        </>
        
    );
}
