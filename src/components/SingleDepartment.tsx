"use client";
import { listAllDepartments, deleteDepartment } from "@/firebase/actions";
import { useState, useEffect } from "react";
import { Department } from "@/firebase/types";
import Update from "@/components/Update";

export default function SingleDepartment({ departmentID }) {
    const [selected, setSelected] = useState<Department | null>(null); // Expecting an object
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // Start loading
            const response = await listAllDepartments();
            const getDepartment = response.find((item) => item.id === departmentID);
            setSelected(getDepartment);
            setLoading(false); // End loading
            console.log(getDepartment); // Log the fetched department
        }
        fetchData();
    }, [departmentID]); // Add departmentID as a dependency

    // Format timestamp
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "N/A"; // Return "N/A" if timestamp is not available
        const date = timestamp.toDate(); // Convert to Date object
        return date.toLocaleString("en-US", { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            hour12: true 
        });
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p> // Improved loading state
            ) : (
                selected ? (
                    <Update text={`Department`} editForm={
                        <form onSubmit={() => deleteDepartment(selected.id)}>
                            
                            <button className="deleteButton">Delete Department</button>
                        </form>
                    } viewInfo={
                        <div>
                            <div className="flex items-center gap-4 whitespace-nowrap my-4">
                                <h6 className="altHeadline">Department Information</h6>
                                <hr className="line" />
                            </div>
                            <div className="gridCol">
                                <div className="gridItems">
                                    <label className="keyInput">Short Name</label>
                                    <p className="valueInput">{selected.shortName}</p>
                                    <hr className="line" />
                                </div>

                                <div className="gridItems">
                                    <label className="keyInput">Full Name</label>
                                    <p className="valueInput">{selected.fullName}</p>
                                    <hr className="line" />
                                </div>

                                <div className="gridItems">
                                    <label className="keyInput">Accidents</label>
                                    <p className="valueInput">{selected.accidents}</p>
                                    <hr className="line" />
                                </div>

                                <div className="gridItems">
                                    <label className="keyInput">Numbers of employees</label>
                                    <p className="valueInput">{selected.employees}</p>
                                    <hr className="line" />
                                </div>

                                <div className="gridItems">
                                    <label className="keyInput">Created at</label>
                                    <p className="valueInput">{formatTimestamp(selected.createdAt)}</p>
                                    <hr className="line" />
                                </div>
                            </div>
                        </div>
                    }/>
                ) : (
                    <p>No department found.</p> // Handle case where no department is found
                )
            )}
        </div>
    );
}
