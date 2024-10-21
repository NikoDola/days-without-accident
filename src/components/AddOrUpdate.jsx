"use client"

import { useState } from "react"
import "./css-components/AddOrUpdate.css"

export default function AddOrUpdate({form, text}){

    

    const [visibility, setVisibility] = useState(false)
    
    const handleVisibility = () =>{
        visibility ? setVisibility(false): setVisibility(true)        
    }
    return(
        <div className="addOrUpdateWrapper">
                <div onClick={handleVisibility} className="buttonAdd">
                    <img className="w-6" src={text.includes('Edit') ? '/general/edit-black.svg': '/general/add.svg'}/>
                    <p >{text}</p>
                   
                </div>
            {visibility ? 
            <>
  
                <div className="formPopUpActive">
                    {form}
                </div>
            </>
            :
            <>
                <div className="formPopUpInactive">
                    {form}
                </div>
            </>
            
        }
           
        </div>
    )
}