"use client"
import { useEffect, useState } from "react";

export default function Counter(){
    
  const [timeNow, setTimeNow] = useState<number>()
  const [followUp, setFollowUp] = useState<number>(0)
  useEffect(()=>{
    
    const intervalID = setInterval(() => {
    const seconds = new Date().getSeconds()

   setTimeNow(seconds)
    setFollowUp((x) => x += 1)
   }, 1000);


   return () => clearInterval(intervalID)

  },[])
  return(
    <main>
        <p>{`Time Now ${timeNow}`}</p>
        <p>{`Follow Up ${followUp}`}</p>
    </main>
  )
}
