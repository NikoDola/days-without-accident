"use client"
import { useEffect, useState } from "react";
import { addDepartment, getAllDepartments, deleteDepartment } from "@/firebase/actions";

export default function AddNewDepartment() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newDepartmentName, setNewDepartmentName] = useState<string>("");

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
        if (!newDepartmentName.trim()) {
            setError("Department name cannot be empty");
            return;
        }

        try {
            await addDepartment(newDepartmentName);
            const depData = await getAllDepartments();
            setDepartments(depData);
            setNewDepartmentName(""); // Clear the input field after adding
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
            <div className="dpBox">
                <p className="dpText">+</p>
                <p className="text-center mt-2">Add New</p>
            </div>
            <form
                className="formWrapper"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddDepartment();
                }}
            >
                <input
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                    placeholder="Enter department name"
                />
                <button type="submit" className="mainButton">Enter</button>
            </form>

            {error && <p className="text-red-500">Error: {error}</p>}
            {loading && <p>Loading...</p>}

            {!loading && !error && (
                <div>
                    <h2>Departments:</h2>
                    <ul>
                        {departments.map((department) => (
                            <li key={department.id}>
                                {department.name}
                                <button
                                    onClick={() => handleDeleteDepartment(department.id)}
                                    className="deleteButton"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
