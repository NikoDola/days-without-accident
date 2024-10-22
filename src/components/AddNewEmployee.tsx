"use client";
import { addNewEmployee } from "@/firebase/actions";
import { useState } from "react";
import "@/components/css-components/SingleEmployee.css";

interface AddNewEmployeeProps {
    departmentID: string;
}

export default function AddNewEmployee({ departmentID }: AddNewEmployeeProps) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [employee, setEmployee] = useState({
        name: '',
        lastName: '',
        employeeID: '',
        email: '',
        phoneNumber: '',
        emergencyContact: '',
        homeAddress: '',
        dateOfBirth: '',
        medicalCondition: '',
        employeeStatus: '',
        notes: '',
        promotions: {},
        salary: 24000,
        hireDate: '',
        jobPosition: '',
        gender: 'male' // Default gender selection
    });

    const getData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors

        try {
            await addNewEmployee(
                departmentID,
                employee.name || 'undefined',
                employee.lastName || 'undefined',
                0, // accidents
                employee.employeeID || 'undefined',
                employee.gender || 'male', // Use the selected gender
                employee.email || 'undefined',
                employee.phoneNumber ? Number(0) : 0,
                employee.emergencyContact || 'undefined',
                employee.homeAddress || 'undefined',
                employee.dateOfBirth || 'undefined',
                employee.medicalCondition || 'Healthy',
                employee.employeeStatus || 'active',
                employee.notes || 'undefined',
                employee.promotions,
                employee.salary,
                employee.hireDate || 'undefined',
                employee.jobPosition || 'undefined'
            );
            setLoading(false);
        } catch (err) {
            setError("Failed to add new employee.");
            setLoading(false);
        }
    };

    return (
   <section>
    <div>
        <div className="flex items-center gap-4 whitespace-nowrap my-4">
            <h6 className="altHeadline">Add New Employee Form</h6>
            <hr className="line" />
        </div>
        <form onSubmit={handleSubmit}>
            <div className="gridCol">
                <div className="gridItems ">
                    <label className="keyInput">First Name</label>
                    <input className="valueInput" onChange={getData} type="text" name="name" value={employee.name} placeholder=".e.g. Jane" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Last Name</label>
                    <input className="valueInput" onChange={getData} type="text" name="lastName" value={employee.lastName} placeholder=".e.g. Doe" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Employee ID</label>
                    <input className="valueInput" onChange={getData} type="text" name="employeeID" value={employee.employeeID} placeholder=".e.g. 12345" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Gender</label>
                    <select className="valueInput" onChange={getData} name="gender" value={employee.gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="gridItems">
                    <label className="keyInput">Date of Birth</label>
                    <input className="valueInput" onChange={getData} type="text" name="dateOfBirth" value={employee.dateOfBirth} placeholder=".e.g. 01/01/2000" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Home Address</label>
                    <input className="valueInput" onChange={getData} type="text" name="homeAddress" value={employee.homeAddress} placeholder=".e.g. 123 Main St" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Email</label>
                    <input className="valueInput" onChange={getData} type="email" name="email" value={employee.email} placeholder=".e.g. example@email.com" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Phone Number</label>
                    <input className="valueInput" onChange={getData} type="tel" name="phoneNumber" value={employee.phoneNumber} placeholder=".e.g. (123) 456-7890" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Emergency Contact</label>
                    <input className="valueInput" onChange={getData} type="text" name="emergencyContact" value={employee.emergencyContact} placeholder=".e.g. John Doe" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Employee Status</label>
                    <select className="valueInput" onChange={getData} name="employeeStatus" value={employee.employeeStatus}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="onLeave">On Leave</option>
                        <option value="terminated">Terminated</option>
                        <option value="probationary">Probationary</option>
                        <option value="contractor">Contractor</option>
                        <option value="retired">Retired</option>
                        <option value="suspended">Suspended</option>
                        <option value="temp">Temporary</option>
                        <option value="fullTime">Full-Time</option>
                        <option value="partTime">Part-Time</option>
                        <option value="intern">Intern</option>
                    </select>
                </div>
                <div className="gridItems">
                    <label className="keyInput">Job Position</label>
                    <input className="valueInput" onChange={getData} type="text" name="jobPosition" value={employee.jobPosition} placeholder=".e.g. Software Engineer" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Medical Condition</label>
                    <input className="valueInput" onChange={getData} type="text" name="medicalCondition" value={employee.medicalCondition} placeholder=".e.g. None" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Salary</label>
                    <input className="valueInput" onChange={getData} type="number" name="salary" value={employee.salary} placeholder=".e.g. 50000" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Hire Date</label>
                    <input className="valueInput" onChange={getData} type="text" name="hireDate" value={employee.hireDate} placeholder=".e.g. 01/01/2023" />
                </div>
                <div className="gridItems">
                    <label className="keyInput">Notes</label>
                    <textarea className="valueInput" onChange={getData} name="notes" value={employee.notes} placeholder=".e.g. Additional details..."></textarea>
                </div>
            </div>
            {error && <p>{error}</p>}
            <button className="mainButton my-8" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Add Employee"}
            </button>
        </form>
    </div>
</section>

    );
}
