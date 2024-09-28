"use client";
import { useEffect, useState } from "react";
import { addDepartment, getAllDepartments } from "@/firebase/actions";


export default function AddNewDepartment({ onDepartmentAdded }) {
    const [newDepartmentName, setNewDepartmentName] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [employees, setEmployees] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        try {
            await addDepartment(newDepartmentName, fullName, employees);
            setNewDepartmentName("");
            setFullName("");
            setEmployees(0);
            onDepartmentAdded();
        } catch (error: any) {
            setError(error.message || "Error adding department");
        }
    };

    return (
        <form className="formWrapper" onSubmit={handleAddDepartment}>
            <h4>Add a department</h4>
            <input value={newDepartmentName} onChange={(e) => setNewDepartmentName(e.target.value)} placeholder="Enter department short name*" required />
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter department full name *" required />
            <input value={employees} onChange={(e) => setEmployees(Number(e.target.value))} placeholder="Number of employees" type="number" />
            <button type="submit" className="mainButton mb-8">Enter New Department</button>
            {error && <p className="text-red-500">Error: {error}</p>}
        </form>
    );
}
