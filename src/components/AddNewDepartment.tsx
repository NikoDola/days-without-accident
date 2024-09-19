"use client"
import { useEffect, useState } from "react";
import { addDepartment, getAllDepartments, deleteDepartment } from "@/firebase/actions";

export default function AddNewDepartment() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newDepartmentName, setNewDepartmentName] = useState<string>("");
    const [fullName, setFullName] = useState<string>()

    useEffect(() => {
        async function fetchData() {
            try {
                const depData = await getAllDepartments();
                if (Array.isArray(depData)) {
                    setDepartments(depData);
                } else {
                    throw new Error("Fetched data is not an array");
                }
            } catch (error: any) {
                console.error("Error fetching departments:", error);
                setError(error.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleAddDepartment = async () => {
        try {
            await addDepartment(newDepartmentName, fullName);
            const depData = await getAllDepartments();
            setDepartments(depData);
            setNewDepartmentName(""); 
        } catch (error: any) {
            setError(error.message || "Error adding department");
        }
    };

    const handleDeleteDepartment = async (id: string) => {
        try {
            await deleteDepartment(id);
            const depData = await getAllDepartments();
            setDepartments(depData);
        } catch (error: any) {
            setError(error.message || "Error deleting department");
        }
    };

    return (
        <div>
             {!loading && !error && (
                <div className="adminShowcase ">
                        {departments.map((department) => (
                            <div className="dpBox" key={department.id}>
                                <h3 className="dpText ">{department.shortName}</h3>
                                <p className="dpText">{department.fullName}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => handleDeleteDepartment(department.id)} className="mainButton"> Delete Department </button>

                              
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <form
                className="formWrapper"
                onSubmit={(e) => {e.preventDefault(); handleAddDepartment();}}>
                <input value={newDepartmentName} onChange={(e) => setNewDepartmentName(e.target.value)} placeholder="Enter department short name"/>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter department full name"/>
                <button type="submit" className="mainButton">Enter</button>
            </form>

            {error && <p className="text-red-500">Error: {error}</p>}
            {loading && <p>Loading...</p>}

           
        </div>
    );
}
