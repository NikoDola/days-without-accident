'use client'
import { useEffect, useState } from "react"
import { getEmployees, deleteEmployeer, addEmployee } from "@/firebase/actions"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"

export default function Employees({ departmentID }) {
    const [employeesList, setEmployeesList] = useState<[] | null>(null)

    // Fetch the employees on mount or when departmentID changes
    const fetchEmployees = async () => {
        const lista = await getEmployees(departmentID)
        setEmployeesList(lista)
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID)
        await updateDoc(docRef, {
            employees: lista.length
        })
    }

    useEffect(() => {
        fetchEmployees()
    }, []) 

    const handleDelete = async (id) => {
        await deleteEmployeer(departmentID, id);
        await fetchEmployees(); 
    }

    const addEmployeerHandle = async (e) => {
        e.preventDefault()
        const name = e.target.elements.name.value;
        const lastName = e.target.elements.lastName.value;

        // Add the new employee
        await addEmployee(departmentID, name, lastName, 'denes', 0);
        await fetchEmployees(); 
    }

    return (
        <main>
            <form onSubmit={addEmployeerHandle}>
                <label>Add new Employeer</label>
                <input name="name" placeholder="Name" />
                <input name="lastName" placeholder="Last Name" />
                <button className="mainButton">Add employee</button>
            </form>
            {!employeesList ? <p>Loading...</p> : employeesList.map((item) => (
                <div className="flex gap-2" key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.lastName}</p>
                    <div>
                        <button>EDIT</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </main>
    )
}
