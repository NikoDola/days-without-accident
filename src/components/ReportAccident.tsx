"use client";

interface EmployeeType {
    id: string;
    name: string;
    lastName: string;
    // Add other properties as needed
}

// ReportAccident.tsx
import { useEffect, useState } from 'react';
import { addAccident, getEmployees } from "@/firebase/actions";
import { updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '@/firebase';

export default function ReportAccident({ departmentID }: { departmentID: string }) {
    const [employees, setEmployees] = useState<EmployeeType[] | null>(null);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [envolvedEmployees, setEnvolvedEmployees] = useState<EmployeeType[]>([]);
    const [envolvedNumber, setEnvolvedNumber] = useState<number>(0);

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
            // Add the accident report to Firebase with the involved employees
            addAccident(departmentID, title, description, status, envolvedEmployees);
            
            console.log("Accident reported with involved employees:", envolvedEmployees);
    
            // Update the accidents count for each involved employee
            envolvedEmployees.forEach(async (employee) => {
                if (employee && employee.id) {
                    try {
                        // Reference to the employee document in the nested Firestore path
                        const employeeRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'employees', employee.id);
                        
                        // Increment the accident count by 1
                        await updateDoc(employeeRef, {
                            accidents: increment(1)
                        });
    
                        console.log(`Accident count updated for employee ${employee.name} ${employee.lastName}`);
                    } catch (error) {
                        console.error(`Error updating accident count for employee ${employee.name} ${employee.lastName}:`, error);
                    }
                }
            });
        }
     
    }

    const handleEmployeeChange = (index: number, employeeId: string) => {
        const selectedEmployee = employees?.find(emp => emp.id === employeeId);
        
        if (selectedEmployee) {
            const updatedEnvolvedEmployees = [...envolvedEmployees];
            updatedEnvolvedEmployees[index] = selectedEmployee;
            setEnvolvedEmployees(updatedEnvolvedEmployees);
        }
    };

    return (
        <form onSubmit={handleReport}>
            <label>Report Accident at {departmentID}</label>
            <input 
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                placeholder='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input 
                type='number' 
                placeholder='number of employees involved in the accident'
                value={envolvedNumber}
                onChange={(e) => {
                    const num = parseInt(e.target.value, 10);
                    setEnvolvedNumber(num);
                    setEnvolvedEmployees(Array(num).fill(null)); // Adjust the size of the envolvedEmployees array
                }}
            />
            
            {[...Array(envolvedNumber)].map((_, index) => (
                <select 
                    key={index} 
                    onChange={(e) => handleEmployeeChange(index, e.target.value)}
                    value={envolvedEmployees[index]?.id || ""}
                >
                    <option value="">Select Employee involved</option>
                    {
                        !employees ? 
                            (<option>No data</option>) : 
                            employees.map((item) => (
                                <option key={item.id} value={item.id}>{`${item.name} ${item.lastName} ${item.id}`}</option>
                            ))
                    }
                </select>
            ))}
            
            <button className='mainButton'>Submit</button>
        </form>
    );
}
