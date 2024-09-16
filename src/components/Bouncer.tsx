"use client";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'

export default function Bouncer() {
const { user } = useUser();
    const pathname = usePathname()
    const router = useRouter();


  useEffect(() => {
    if (!user) {
      router.push('/login');
    }else{
        router.push(pathname)
    }

  }, [user, router]);

  return (
    <>
      {user ? console.log('welcome') : <p>Loading...</p>}
    </>
  );
}
