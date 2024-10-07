"use client"

interface SingleEmployeeProps{
    employeeID: string;
    departmentID:string;

    selected:{
        name: string;
        lastName:string;
        accidents: number;
        departmentName: string;
        description: string;
        photoURL:string;
        timeStam:string;
    }
}

import { deleteEmployeer } from "@/firebase/actions";
export default function SingleEmployee({ employeeID, departmentID, selected}: SingleEmployeeProps){


    return(
        <main>
                <img className="w-12" src={selected.photoURL}></img>
                <p>{selected.name} {selected.lastName}</p>
                <button className="mainButton">Edit</button>
                <button onClick={() => deleteEmployeer(departmentID, employeeID)} className="mainButton">Delete</button>
        </main>
    )
}