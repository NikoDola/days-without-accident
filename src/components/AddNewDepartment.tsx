"use client";
import { useEffect, useState } from "react";
import { addNewDepartment } from "@/firebase/actions";


export default function AddNewDepartment() {
    const [newDepartmentName, setNewDepartmentName] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        setError(null)
        setLoading(true)
        try {
            await addNewDepartment(newDepartmentName, fullName);
            setNewDepartmentName("");
            setFullName("");
        } catch (error: any) {
            setError(error.message || "Error adding department");
        }finally{
            setLoading(false)
        }
    };

    return (
        <section>
            <form className="sectionForm"  onSubmit={handleAddDepartment}>
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Add New Department</h6>
                <hr className="line"/>
            </div>
                <input value={newDepartmentName} onChange={(e) => setNewDepartmentName(e.target.value)} placeholder="e.g. HR*" required />
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Human Resources *" required />
               
                 <button type="submit" className={!loading ? "mainButton mb-8": "loadingButton mb-8"}>Submit</button>
               
                {error && <p className="text-red-500">Error: {error}</p>}
            </form>
        </section>
    );
}
