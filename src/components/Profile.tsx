"use client"
import { useUser } from "@/contexts/userContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Profile() {
    const { user } = useUser()
    const router = useRouter()
    
    useEffect(() => {
        if (!user) {
            router.push('/login')  
        }
    }, [user, router])

    return (
        <p>Hello</p>
    )
}
