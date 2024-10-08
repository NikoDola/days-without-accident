"use client"
import { deleteDepartment } from "@/firebase/actions"
import { useRouter } from "next/navigation"
import { editDepartment } from "@/firebase/actions"
import { useState } from "react"

export default function EditDepartment({departmentID}){
    const [newData, setNewData] = useState({})
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await editDepartment(departmentID, newData);
        if (success) {
          router.refresh(); // Refresh the page after update
        }
      };
    
    const handleUpdate = (e) =>{
        e.preventDefault()
        setNewData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleDelete = async() => {
        await deleteDepartment(departmentID)
        router.push('/admin/departments')
    }
    return(
        <section>
            <form onSubmit={handleSubmit}>
                <input onChange={handleUpdate} name="shortName" placeholder="short name"/>
                <input onChange={handleUpdate} name="fullName" placeholder="full name"/>
                <button  className="mainButton">update department</button>
                <button onClick={handleDelete} className="mainButton">Delete Department</button>
            </form>
        </section>
    )
}