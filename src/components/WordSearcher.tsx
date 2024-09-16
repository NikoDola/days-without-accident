
"use client"
import { getUser } from "@/firebase/actions"
import { useEffect, useState} from "react"

interface UserType {
    email?: string;
    name?: string;
    year?: number;
    dataPublished?: number;
    // Add other properties if necessary
}

export default function WordSearcher({value}){
    const [user, setUser] = useState<UserType>({})

    useEffect(()=>{
       async function fetchData(){
            const data = await getUser()
            try {
                if(data){
                    setUser(data)
                }
                
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    },[])

    return(
        <div>
            <input placeholder="Language*" required/>
            <ul>
                {value.length > 0 ? value.map((element) => (
                    <li key={element.id}>{element.name}</li> 
                )) : <p>0 e listata</p>}
            </ul>
            <p>Email: {user.email || 'No email available'}</p>
            <div className="textBubble">Add</div>
        </div>
    )
}