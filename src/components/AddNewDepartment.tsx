"use client"
import { useEffect, useState } from "react";
import { addDepartment, getAllDepartments, deleteDepartment } from "@/firebase/actions";

export default function AddNewDepartment() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newDepartmentName, setNewDepartmentName] = useState<string>("");
    const [fullName, setFullName] = useState<string>()
    const [employees, setEmployees] = useState<number>()

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
            await addDepartment(newDepartmentName, fullName, employees);
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
        <div className="adminWrapper">
            <h4 className="mb-4">All departmetns</h4>
             {!loading && !error ? (
                <div className="adminShowcase ">
                        {departments.map((department) => (
                            <div className="dpBox" key={department.id}>
                                <h3 className="dpText ">{department.shortName}</h3>
                                <p className="dpText">{department.fullName}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => handleDeleteDepartment(department.id)} className="mainButton"> Report </button>
                                </div>
                            </div>
                        ))}
                </div>
            ): 
           <div className="adminShowcase">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div className="dpBox" key={index}>
                    <h3 className="w-1/3 h-12  c-animated-background rounded-lg mb-2"></h3>
                    <div className="w-1/2 h-4 c-animated-background"></div>
                        <div className="flex gap-2">
                            <div className="mainButton h-14 c-animated-background"></div>
                        </div>
                    </div>
                ))}
            </div>
            }

            <form className="formWrapper" onSubmit={(e) => {e.preventDefault(); handleAddDepartment();}}>
                <h4>Add a departmetn</h4>
                <input value={newDepartmentName} onChange={(e) => setNewDepartmentName(e.target.value)} placeholder="Enter department short name*" required/>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter department full name *" required/>
                <input value={employees} onChange={(e) => setEmployees(Number(e.target.value))} placeholder="Numbers of employrs" type="number"/>
                <button type="submit" className="mainButton mb-8">Enter New Department</button>
            </form>

            {error && <p className="text-red-500">Error: {error}</p>}
            {loading && <p>Loading...</p>}

           
        </div>
    );
}
