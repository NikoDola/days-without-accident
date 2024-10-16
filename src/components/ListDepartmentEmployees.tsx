'use client'
import { useEffect, useState } from "react"

import { listDepartmentEmployees } from "@/firebase/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface EmployeeTypeCheck {
    name: string,
    lastName: string,
    photoUrl: string,
    description: string,
    photoURL: string,
    id: string
    employeeID: string;
    accidents: number;
}

export default function ListDepartmentEmployees({ departmentID }) {
    const [employeesList, setEmployeesList] = useState<EmployeeTypeCheck[]>([])
    const [search, setSearch] = useState('')
    const router = useRouter()

    const fetchEmployees = async () => {
        try {
            const employees = await listDepartmentEmployees(departmentID) as EmployeeTypeCheck[];
            setEmployeesList(employees);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees()
    }, [departmentID])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const filteredEmployees = employeesList.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="sectionListing flex-col">
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Department Listing</h6>
                <hr className="line" />
            </div>
            <div className="searchFilterWrapper relative">
                <input 
                    type="search" 
                    placeholder="Search department" 
                    className="searchBar" 
                    value={search} 
                    onChange={handleSearch}
                />
                <img className="searchIcon" src="/general/search.svg" alt="Search"/>
            </div>
            <div className="flex w-full flex-col flex-nowrap w-3/5 gap-2 items-center">
                <div className="cardWrapper">
                    {!employeesList.length ? <p>Loading...</p> : 
                filteredEmployees.map((item: EmployeeTypeCheck) => (
                    <div key={item.id} className="itemCardWrapper">
                        <div>
                            <div className="flex gap-4 items-start">
                                <img className="profileImageList" src={item.photoURL} alt="profile" />
                                <div className="mb-4">
                                    <p><b>{item.name}</b></p>
                                    <p><b>{item.lastName}</b></p>
                                </div>
                            </div>
                            
                          {item.accidents > 0  &&   <p className="text-red-400"><b >{item.accidents}</b> Accidents</p>}
                            <p className="mb-4">Employee ID: <b>{item.employeeID}</b></p>
                        </div>
                     
                        <div className="flex items-center gap-2">
                            <button onClick={() => router.push(`/admin/departments/${departmentID}/employees/${item.id}`)} className="altButton text-black"> <b>View</b></button>
                        </div>
                    </div>
                ))}
                </div>
                
            </div>
        </div>
    )
}
