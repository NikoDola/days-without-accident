"use client"
import { useUser } from "@/contexts/userContext"
import { db } from '@/firebase'


export default function ListAllSnippets(){
    const { user } = useUser()

    if(!user){
        return(
            <p><p>It&apos;s loading</p></p>
        )
    }else{
        return(
            <p>{user.uid}</p>
        )
    }
}