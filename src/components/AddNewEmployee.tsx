"use client";
import { addNewEmployee } from "@/firebase/actions";
import { useState } from "react";

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
        medicalCondition: 'Healthy',
        employeeStatus: 'active',
        notes: '',
        promotions: {},
        salary: 24000,
        hireDate: '',
        jobPosition: '',
    });

    const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous errors

        try {
            await addNewEmployee(
                departmentID,
                employee.name,
                employee.lastName,
                0, // accidents
                employee.employeeID, // employeeID
                'male', // gender
                employee.email, // email
                Number(employee.phoneNumber), // phoneNumber
                employee.emergencyContact, // emergencyContact
                employee.homeAddress, // homeAddress
                employee.dateOfBirth, // dateOfBirth
                employee.medicalCondition, // medicalCondition
                employee.employeeStatus, // employeeStatus
                employee.notes, // notes
                employee.promotions, // promotions
                employee.salary, // salary
                employee.hireDate, // hireDate
                employee.jobPosition // jobPosition
            );
            setLoading(false);
        } catch (err) {
            setError("Failed to add new employee.");
            setLoading(false);
        }
    };

    return (
        <section>
            <form className="sectionForm" onSubmit={handleForm} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <div className="flex items-center gap-4">
                    <h6 className="altHeadline">Add New Employee</h6>
                    <hr className="line" />
                </div>
                <input onChange={getData} placeholder="Name" type="text" name="name" value={employee.name} />
                <input onChange={getData} placeholder="Last Name" type="text" name="lastName" value={employee.lastName} />
                <input onChange={getData} placeholder="Employee ID" type="text" name="employeeID" value={employee.employeeID} />
                <input onChange={getData} placeholder="Email" type="email" name="email" value={employee.email} />
                <input onChange={getData} placeholder="Phone Number" type="text" name="phoneNumber" value={employee.phoneNumber} />
                <input onChange={getData} placeholder="Emergency Contact" type="text" name="emergencyContact" value={employee.emergencyContact} />
                <input onChange={getData} placeholder="Home Address" type="text" name="homeAddress" value={employee.homeAddress} />
                <input onChange={getData} placeholder="Date of Birth" type="text" name="dateOfBirth" value={employee.dateOfBirth} />
                <input onChange={getData} placeholder="Medical Condition" type="text" name="medicalCondition" value={employee.medicalCondition} />
                <input onChange={getData} placeholder="Employee Status" type="text" name="employeeStatus" value={employee.employeeStatus} />
                <input onChange={getData} placeholder="Notes" type="text" name="notes" value={employee.notes} />
                <input onChange={getData} placeholder="Salary" type="number" name="salary" value={employee.salary} />
                <input onChange={getData} placeholder="Hire Date" type="text" name="hireDate" value={employee.hireDate} />
                <input onChange={getData} placeholder="Job Position" type="text" name="jobPosition" value={employee.jobPosition} />
                <button type="submit" className={!loading ? "mainButton mb-8": "loadingButton mb-8"}>Submit</button>
               {error && <p className="text-red-500">Error: {error}</p>}
            </form>
        </section>
    );
}
