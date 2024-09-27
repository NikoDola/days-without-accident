"use client"

interface EmployeeType {
    id: string;
    name: string;
    lastName: string;
    // Add other properties as needed
}

// ReportAccident.tsx
import { useEffect, useState } from 'react';
import { addAccident, getEmployees } from "@/firebase/actions";


export default function ReportAccident({ departmentID }: { departmentID: string }) {
    const [employees, setEmployees] = useState<EmployeeType[] | null>(null); // Define your EmployeeType accordingly

    useEffect(() => {
        async function fetchData() {
            const employeesList: EmployeeType[] = await getEmployees(departmentID) as EmployeeType[];
            setEmployees(employeesList);
            console.log(employeesList);
        }
        fetchData();
    }, [departmentID]); // Add departmentID to the dependency array

    function handleReport(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (Array.isArray(employees) && employees.length > 0) {
            const involvedEmployeeID = employees[0].id; // You may want to choose the appropriate employee ID
            addAccident(departmentID, involvedEmployeeID);
        }
    }

    return (
        <form onSubmit={handleReport}>
            <label>Report Accident at {departmentID}</label>
            <input type='number' placeholder='number of employees involved in the accident' />
            <input placeholder='name'/>
            <input placeholder='last name'/>
            <select>
                <option>Select Employee involved</option>
                {
                    !employees ? (<option>No data</option>): employees.map((item)=>(
                        <option key={item.id}>{`${item.name}  ${item.lastName} ${item.id}`}</option>
                    ))
                }
            </select>
            <button className='mainButton'>Submit</button>
        </form>
    );
}
