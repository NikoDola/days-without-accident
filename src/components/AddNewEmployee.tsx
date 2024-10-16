"use client"
import { addNewEmployee } from "@/firebase/actions";
import { useState } from "react";

export default function AddNewEmployee({ departmentID }) {
    const [error, setError] = useState<string | null>(null);
    const addEmployeeHandle = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const lastName = e.target.elements.lastName.value;
        const employeeID = e.target.elements.employeeID.value

        if (!departmentID) {
            console.error("Invalid departmentID");
            return; 
        }

       

        // Add the new employee
        await addNewEmployee(departmentID, name, lastName,  0, employeeID); // Use an actual timestamp value
        e.target.reset();
    }

    return (
        <section>
            <form className="sectionForm" onSubmit={addEmployeeHandle}>
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Add New Employee</h6>
                <hr className="line"/>
            </div>
                <input name="name" placeholder="Name" />
                <input name="lastName" placeholder="Last Name" />
                <input name="employeeID" placeholder="employee ID"/>
                <button className="mainButton">Add Employee</button>
                {error && <p className="text-red-500">Error: {error}</p>}
        </form>
        </section>
    );
}
