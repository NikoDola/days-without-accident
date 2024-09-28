"use client";
import { useEffect, useState } from "react";
import { getAllDepartments } from "@/firebase/actions";
import { useRouter } from "next/navigation";
import AddNewDepartment from "@/components/AddNewDepartment";

export default function ListDepartments() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        const fetchDataDepartments = async () => {
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
        };
        fetchDataDepartments();

        async function fetchDataDepartmentsAccidents(){
            try {
                
            } catch (error) {
                
            }
        }
        fetchDataDepartments()
    }, []);

    const handleNewDepartmentAdded = () => {
      
        const fetchData = async () => {
            const depData = await getAllDepartments();
            setDepartments(depData);
        };
        fetchData();
    };

    return (
        <div>
            <AddNewDepartment onDepartmentAdded={handleNewDepartmentAdded} />
            <h4 className="mb-4">All departments</h4>
            {!loading && !error ? (
                <div className="adminShowcase">
                    {departments.map((department) => (
                        <div className="dpBox" key={department.id}>
                            <h3 className="dpText">{department.shortName}</h3>
                            <p className="dpText">{department.fullName}</p>
                            <p className="dpText">{department.employee}</p>
                            <button className="mainButton" onClick={() => router.push(`admin/${department.id}`)}>View</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>{loading ? "Loading..." : error}</p>
            )}
        </div>
    );
}
