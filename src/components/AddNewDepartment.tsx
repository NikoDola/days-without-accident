"use client";
import { useEffect, useState } from "react";
import { addNewDepartment } from "@/firebase/actions";


export default function AddNewDepartment() {
    const [newDepartmentName, setNewDepartmentName] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        try {
            await addNewDepartment(newDepartmentName, fullName);
            setNewDepartmentName("");
            setFullName("");
  
        } catch (error: any) {
            setError(error.message || "Error adding department");
        }
    };

    return (
        <section>
            <form className="sectionForm"  onSubmit={handleAddDepartment}>
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Add Departments</h6>
                <hr className="line"/>
            </div>
                <input value={newDepartmentName} onChange={(e) => setNewDepartmentName(e.target.value)} placeholder="Enter department short name*" required />
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter department full name *" required />
                <button type="submit" className="mainButton mb-8">Enter New Department</button>
                {error && <p className="text-red-500">Error: {error}</p>}
            </form>
        </section>
    );
}
