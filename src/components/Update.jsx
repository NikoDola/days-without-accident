
"use client"
import "./css-components/Update.css"
import { useState } from "react";

export default function Update({viewInfo, editForm, text}){
    const [visibility, setVisibility] = useState(true)
    
    const handleVisibility = () =>{
        !visibility ? setVisibility(true): setVisibility(false)
    }
    console.log(visibility)
    return(
        <>
        {visibility ? 
        <>
            <div onClick={handleVisibility} className="buttonAdd">
                <img src="/general/edit-black.svg"></img>
                <p>Edit {text}</p>
            </div>
            {viewInfo}
         
        </>
            :
            <>
            <div onClick={handleVisibility} className="buttonAdd">
                <img src="/general/eye-fill.svg"></img>
                <p>View {text}</p>
            </div>
            {editForm}
            </>
            }
        </>
    )
}