"use client"
import { deleteAccident, editAccidents, listDepartmentAccidents, listAllEmployees } from "@/firebase/actions"
import { useEffect, useState } from "react"
import { AccidentType } from "@/firebase/types"
import { useRouter } from "next/navigation"
import Update from "./Update"

export default function SingleAccident({departmentID, accidentID, selected}){
    const [newData, setNewData] = useState<AccidentType>(selected);
    const [involvedEmployees, setInvolvedEmployees] = useState(selected.involvedEmployees)
  
    const router = useRouter();

    useEffect(()=>{
        setNewData(selected)
    }, [selected])

    const handleDelete = () =>{
        deleteAccident(departmentID, accidentID)
    }
    
    const handleNewData = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        
        setNewData((prevData) =>({
            ...prevData,
            [e.target.name]: e.target.value
        }))
        
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        await editAccidents(departmentID, accidentID, newData)
    }

    return(
        <>
         <Update text={'Accident'} editForm={
            <>
             <form onSubmit={handleSubmit}>
             <div className="gridCol">

                <div className="gridItems">
                    <label>Accident Title</label>
                    <input onChange={handleNewData} name="title" value={newData.title}/>
                </div>

                <div className="gridItems">
                    <label> Status</label>
                    <select name="status" onChange={handleNewData} value={newData.status}>
                        <option value={'Solved'}>Solved</option>
                        <option value={'Unsolved'}>Unsolved</option>
                    </select>
                </div>

                <div className="gridItems">
                    <label>Description</label>
                    <textarea onChange={handleNewData} name="description" value={newData.description}/>
                </div>

                <div className="gridItems">
                    <label>Description</label>
                    <textarea onChange={handleNewData} name="description" value={newData.description}/>
                </div>

            </div>
            <div className="deleteUpdate">
                <button onClick={handleDelete} className="deleteButton">Delete Accident</button>
                <button className="mainButton">Update Accident</button>
            </div>
            </form>
        
            </>
           
         } viewInfo={
         <div>
            <div className="flex items-center gap-4 whitespace-nowrap my-4">
                <h6 className="altHeadline">Accident Information</h6>
                <hr className="line" />
            </div>
            <div className="gridCol">

                <div className="gridItems">
                    <label className="keyInput">Accident Tittle</label>
                    <p className="valueInput">{selected.title}</p>
                    <hr className="line" />
                </div>

                <div className="gridItems">
                    <label className="keyInput">Accident Status</label>
                    <p className="valueInput">{selected.status}</p>
                    <hr className="line" />
                </div>
                
                <div className="gridItems">
                    
                    <label className="keyInput"> Envolved {involvedEmployees.length > 1 ? "Employees": "Employee"}</label>
                    <p className="valueInput"></p>
                    {involvedEmployees.map((item, index) =>(
                        <div key={index}>
                         <p>{item.name} {item.lastName}, ID: {item.id}</p>
                        </div>
                       
                    ))}
                    <hr className="line" />
                </div>

                <div className="gridItems">
                    <label className="keyInput">Accident Date</label>
                    <p className="valueInput">{selected.dataReported}</p>
                    <hr className="line" />
                </div>

                <div className="gridItems">
                    <label className="keyInput">Accident Description</label>
                    <p className="valueInput">{selected.description}</p>
                    <hr className="line" />
                </div>
                
            </div>
           

        </div>} />
        </>
        
    )
}