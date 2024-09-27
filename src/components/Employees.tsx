'use client'
import { useEffect, useState } from "react"
import { getEmployees, deleteEmployeer, addEmployee } from "@/firebase/actions"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"

interface EmployeeTypeCheck{
    name: string,
    lastName: string,
    photoUrl:string,
    description:string,
    photoURL: string,
    id: string
    
}

export default function Employees({ departmentID }) {
    const [employeesList, setEmployeesList] = useState<[] | null>(null)

    // Fetch the employees on mount or when departmentID changes
 const fetchEmployees = async () => {
    try {
        const employees = await getEmployees(departmentID) as any;
        console.log("Fetched employees:", employees); // Log fetched data
        setEmployeesList(employees);
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID);
        await updateDoc(docRef, {
            employees: employees.length,
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        
    }
};


    useEffect(() => {
        fetchEmployees()
    }, []) 

    const handleDelete = async (id: string) => {
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
            <img src='../../public/general/profile.png'/>

            <form onSubmit={addEmployeerHandle}>
                <label>Add new Employeer</label>
                <input name="name" placeholder="Name" />
                <input name="lastName" placeholder="Last Name" />
                <button className="mainButton">Add employee</button>
            </form>
            {!employeesList ? <p>Loading...</p> : employeesList.map((item: EmployeeTypeCheck) => (
                <div className="flex gap-2" key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.lastName}</p>
                    <img src='https://static.vecteezy.com/system/resources/previews/001/840/612/large_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'/>
                    <p>{item.photoURL}</p>
                    <div>
                        <button>EDIT</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </main>
    )
}
