"use client"
import { addNewEmployee } from "@/firebase/actions";
import { updateDoc, doc, increment } from 'firebase/firestore';
import { db } from "@/firebase";

export default function AddNewEmployee({ departmentID }) {
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
        <form className="w-1/3" onSubmit={addEmployeeHandle}>
            <input name="name" placeholder="Name" />
            <input name="lastName" placeholder="Last Name" />
            <input name="employeeID" placeholder="employee ID"/>
            <button className="mainButton">Add Employee</button>
        </form>
    );
}
