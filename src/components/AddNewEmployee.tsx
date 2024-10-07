"use client"
import { addNewEmployee } from "@/firebase/actions";

export default function AddNewEmployee({ departmentID }) {
    const addEmployeeHandle = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const lastName = e.target.elements.lastName.value;

        // Validate departmentID before calling addNewEmployee
        if (!departmentID) {
            console.error("Invalid departmentID");
            return; // Early return if departmentID is invalid
        }

        // Add the new employee
        await addNewEmployee(departmentID, name, lastName, 'timestamp_value_here', 0); // Use an actual timestamp value
        e.target.reset();
    }

    return (
        <form className="w-1/3" onSubmit={addEmployeeHandle}>
            <input name="name" placeholder="Name" />
            <input name="lastName" placeholder="Last Name" />
            <button className="mainButton">Add Employee</button>
        </form>
    );
}
