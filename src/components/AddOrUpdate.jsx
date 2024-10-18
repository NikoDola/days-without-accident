"use client"

import { useState, useRef } from "react"
import "./css-components/AddOrUpdate.css"

export default function AddOrUpdate({form}){
    const [visibility, setVisibility] = useState(false)


    const handleVisibility = () =>{
        visibility ? setVisibility(false): setVisibility(true)
        
   
    }

    return(
        <div className="addOrUpdateWrapper">
            {visibility ? 
            <>
                <div>
                    <button onClick={handleVisibility} className="buttonActive">Add New Department X</button>
                </div>
                <div className="formPopUpActive">
                    {form}
                </div>
            </>
            :
            <>
                <div>
                    <button onClick={handleVisibility}  className="buttonInactive">Add new Department +</button>
                </div>
                <div className="formPopUpInactive">
                    {form}
                </div>
            </>
            
        }
           
        </div>
    )
}