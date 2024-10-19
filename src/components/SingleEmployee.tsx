// src/components/SingleEmployee.tsx

"use client";

import { deleteEmployeer, editEmployee } from "@/firebase/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmployeeType } from "@/firebase/types";
import AddOrUpdate from "./AddOrUpdate";
import "./css-components/SingleEmployee.css"

interface SingleEmployeeProps {
    employeeID: string;
    departmentID: string;
    selected: EmployeeType; // Imported type for selected employee data
}



export default function SingleEmployee({ employeeID, departmentID, selected }: SingleEmployeeProps) {
    const [newData, setNewData] = useState(selected);
    const [file, setFile] = useState<File | null>(null); // State for the selected file
    const router = useRouter()

    useEffect(() => {
        setNewData(selected);
    }, [selected]);

const handleNewData = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "photoURL") {
        const selectedFile = (e.target as HTMLInputElement).files?.[0]; // Cast to HTMLInputElement
        if (selectedFile) {
            setFile(selectedFile);
            // Optionally show the file name temporarily for preview
            setNewData(prevData => ({
                ...prevData,
                photoURL: selectedFile.name // This is just for preview; the actual URL will be fetched later
            }));
        }
    } else {
        setNewData(prevData => ({
            ...prevData,
            [name]: value // For other inputs, just set the value
        }));
    }
};


    const handleDelete = async(e) =>{
        try {
            await deleteEmployeer(departmentID, employeeID)
            router.push(`/admin/departments/${departmentID}/employees`)
        } catch (error) {
            console.error(error)
        }
        

    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Call editEmployee with newData and file
        const result = await editEmployee(departmentID, employeeID, newData, file);

        if (result) {
            // Optionally handle success, e.g., redirect or update UI
        }
    };

    return (
        <>
        <div className="image_name">
            <img className="profileImage" src={selected.photoURL || '/default-avatar.png'} alt={`${selected.name} ${selected.lastName}`} />
            <div className="nameLastNameWrapper">
                <p className="nameLastName">{selected.name}</p>
                <p className="nameLastName">{selected.lastName}</p>
            </div>
      
            <p>{selected.timestamp}</p>
        </div>
    
            <AddOrUpdate form={
                <> 
                <form className="sectionForm" onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input onChange={handleNewData} type="text" name="name" value={newData.name} placeholder="First Name" />
                    <label>Last Name</label>
                    <input onChange={handleNewData} type="text" name="lastName" value={newData.lastName} placeholder="Last Name" />
                    <label>Gender</label>
                    <input onChange={handleNewData} type="text" name="gender" value={newData.gender} placeholder="Gender" />
                    <label>Email Address</label>
                    <input onChange={handleNewData} type="email" name="email" value={newData.email} placeholder="Email" />
                    <label>Phone Number</label>
                    <input onChange={handleNewData} type="tel" name="phoneNumber" value={newData.phoneNumber} placeholder="Phone Number" />
                    <label>Emergency Contact</label>
                    <input onChange={handleNewData} type="text" name="emergencyContact" value={newData.emergencyContact} placeholder="Emergency Contact"/>
                    <label>Home Address</label>
                    <input onChange={handleNewData} type="text" name="homeAddress" value={newData.homeAddress} placeholder="Home Address" />
                    <label>Date of Birth</label>
                    <input onChange={handleNewData} type="date" name="dateOfBirth" value={newData.dateOfBirth} placeholder="Date of Birth" />
                    <label>Medical Condition</label>
                    <input onChange={handleNewData} type="text" name="medicalCondition" value={newData.medicalCondition} placeholder="Medical Condition"/>
                    <label>Employee Status</label>
                    <input onChange={handleNewData} type="text" name="employeeStatus" value={newData.employeeStatus} placeholder="Employee Status" />
                    <label>Notes</label>
                    <textarea onChange={handleNewData} name="notes" value={newData.notes} placeholder="Notes" />
                    <label>Salary</label>
                    <input onChange={handleNewData} type="number" name="salary" value={newData.salary} placeholder="Salary" />
                    <label>Hire Date</label>
                    <input onChange={handleNewData} type="date" name="hireDate" value={newData.hireDate} placeholder="Hire Date" />
                    <label>Job Position</label>
                    <input onChange={handleNewData} type="text" name="jobPosition" value={newData.jobPosition} placeholder="Job Position" />
                    <label>Employee Photo</label>
                    <input type="file" onChange={handleNewData} name="photoURL" />
                    <button className="mainButton">Update</button>
                </form>
                <button onClick={handleDelete} className="mainButton">Delete</button> </>
                
            } text={'Edit Employee' } />

            
        </>
    );
}
