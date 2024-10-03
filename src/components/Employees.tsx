'use client'
import { useEffect, useState } from "react"
import { getEmployees, deleteEmployeer, addEmployee } from "@/firebase/actions"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"
import Image from "next/image"
import Link from "next/link"

interface EmployeeTypeCheck {
    name: string,
    lastName: string,
    photoUrl: string,
    description: string,
    photoURL: string,
    id: string
}

export default function Employees({ departmentID }) {
    const [employeesList, setEmployeesList] = useState<[] | null>(null)
    const [deletedEmployeeId, setDeletedEmployeeId] = useState<string | null>(null);
    const [accidentsList, setAccidentsList] = useState<[] | null> (null)

    // Fetch the employees on mount or when departmentID changes
    const fetchEmployees = async () => {
        try {
            const employees = await getEmployees(departmentID) as any;
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
        setDeletedEmployeeId(id);
        // Wait for the fade-out effect to complete before actually deleting
        setTimeout(async () => {
            await deleteEmployeer(departmentID, id);
            await fetchEmployees();
            setDeletedEmployeeId(null); // Reset deletedEmployeeId
        }, 1000); // 300ms delay to match the CSS transition duration
    }

    const addEmployeerHandle = async (e) => {
        e.preventDefault()
        const name = e.target.elements.name.value;
        const lastName = e.target.elements.lastName.value;

        // Add the new employee
        await addEmployee(departmentID, name, lastName, 'denes', 0);
        await fetchEmployees();
        e.target.reset()
    }

    return (
        <main className="flex flex-row justify-between gap-14 w-full mt-12 " >

            <form className="w-1/3" onSubmit={addEmployeerHandle}>

                <input name="name" placeholder="Name" />
                <input name="lastName" placeholder="Last Name" />
                <button className="mainButton">Add employee</button>
            </form>

            <div className="flex w-full flex-col flex-nowrap w-3/5 gap-2 items-center">
                {!employeesList ? <p>Loading...</p> : employeesList.map((item: EmployeeTypeCheck) => (
                    <div
                        key={item.id}
                        className={`flex gap-8 justify-between w-full border-solid border-black border-2 p-4 transition-opacity duration-1000 ${deletedEmployeeId === item.id ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <div className="flex items-center gap-2">
                            <img className="profileImageList" src={item.photoURL} alt="profile" />
                            <p>{item.name}</p>
                            <p>{item.lastName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="mainButton">EDIT</button>
                            <button className="mainButton" onClick={() => handleDelete(item.id)}>Delete</button>
                            <p className="mainButton"><Link href={`${departmentID}/employee/${item.id}`}>View</Link></p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
