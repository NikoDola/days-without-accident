"use client";

import { useEffect, useState } from 'react';
import { addNewAccident, listDepartmentEmployees } from "@/firebase/actions";
import { updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '@/firebase';
import { EmployeeType } from '@/firebase/types';


export default function ReportAccident({ departmentID }: { departmentID: string }) {
    const [employees, setEmployees] = useState<EmployeeType[] | null>(null);
    const [title, setTitle] = useState<string>("");  
    const [description, setDescription] = useState<string>("");    
    const [envolvedEmployees, setEnvolvedEmployees] = useState<EmployeeType[]>([]);
    const [envolvedNumber, setEnvolvedNumber] = useState<number>(0);
    const [timeNow, setTimeNow] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        const time = new Date();
        const year = time.getFullYear();
        const month = (time.getMonth() + 1).toString().padStart(2, '0');
        const date = time.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${date}`;
        setTimeNow(formattedDate); // Set the formatted date

        async function fetchData() {
            const employeesList: EmployeeType[] = await listDepartmentEmployees(departmentID) as EmployeeType[];
            setEmployees(employeesList);
        }
        fetchData();
    }, [departmentID]);

    function handleReport(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null)
        setLoading(true)
        if (Array.isArray(employees) && employees.length > 0) {
            const timestamp = new Date(timeNow); 
            
            if (isNaN(timestamp.getTime())) {
                console.error("Invalid timestamp:", timeNow);
                return; // Exit if the timestamp is not valid
            }
    
            addNewAccident(departmentID, title, description, envolvedEmployees, timestamp); 
            console.log("Accident reported with involved employees:", envolvedEmployees);
    
            // envolvedEmployees.forEach(async (employee) => {
            //     if (employee && employee.id) {
            //         try {
            //             const docRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'employees', employee.id);
            //             await updateDoc(docRef, {
            //                 accidents: increment(1)
            //             });
    
            //             console.log(`Accident count updated for employee ${employee.name} ${employee.lastName}`);
            //         } catch (error) {
            //             setError(error)
            //             console.error(`Error updating accident count for employee ${employee.name} ${employee.lastName}:`, error);
            //         }
            //     }
            // });
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

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeNow(e.target.value); // Update timeNow with the selected date
    };

    const handleEnvolvedNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(e.target.value, 10);
        // Ensure num is a valid non-negative integer
        if (!isNaN(num) && num >= 0) {
            setEnvolvedNumber(num);
            setEnvolvedEmployees(Array(num).fill(null)); // Adjust the size of the envolvedEmployees array
        }
    };

    return (
        <section>
            <form className='sectionForm' onSubmit={handleReport}>
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Add New Accident</h6>
                <hr className="line" />
            </div>
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
                    value={envolvedNumber || ""} // Ensure value is always defined
                    onChange={handleEnvolvedNumberChange} // Use the new function
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
            
                <input 
                    type="date" 
                    name="timestamp" 
                    value={timeNow} // Use timeNow state for the value
                    onChange={handleDateChange} // Add an onChange handler
                    min="2022-05-15" 
                    max={timeNow} // Use timeNow for max date
                />
                      <button type="submit" className={!loading ? "mainButton mb-8": "loadingButton mb-8"}>Submit</button>
               
               {error && <p className="text-red-500">Error: {error}</p>}
            </form>
        </section>
    );
}
