"use client"
import { listAllTime } from "@/firebase/actions"
import { useState, useEffect } from "react"

export default function Time() {
    const [seconds, setSeconds] = useState([])

    const fetchData = async() =>{
        const getSeconds = await listAllTime()
        setSeconds(getSeconds)
    }
    useEffect(()=>{
        fetchData()
    },[])

return(
    <>
        {seconds.length > 0 ? seconds.map((item, index)=>(
            <p key={index}>{item}</p>
        )) :<p>nope</p>}
    </>
)
}
