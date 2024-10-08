'use client'
import { useEffect, useState } from "react"
import { listDepartmentEmployees } from "@/firebase/actions"
import Link from "next/link"

interface EmployeeTypeCheck {
    name: string,
    lastName: string,
    photoUrl: string,
    description: string,
    photoURL: string,
    id: string
}

export default function ListDepartmentEmployees({ departmentID }) {
    const [employeesList, setEmployeesList] = useState<[] | null>(null)

    const fetchEmployees = async () => {
        try {
            const employees = await listDepartmentEmployees(departmentID) as any;
            setEmployeesList(employees);

            

        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees()
    }, [])


    return (
        <main className="flex flex-row justify-between gap-14 w-full mt-12 " >

            <div className="flex w-full flex-col flex-nowrap w-3/5 gap-2 items-center">
                {!employeesList ? <p>Loading...</p> : employeesList.map((item: EmployeeTypeCheck) => (
                    <div
                        key={item.id}
                        className={`flex gap-8 justify-between w-full border-solid border-black border-2 p-4 transition-opacity duration-1000`}
                    >
                        <div className="flex items-center gap-2">
                            <img className="profileImageList" src={item.photoURL} alt="profile" />
                            <p>{item.name}</p>
                            <p>{item.lastName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link className="mainButton" href={`/admin/departments/${departmentID}/employees/${item.id}`}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
