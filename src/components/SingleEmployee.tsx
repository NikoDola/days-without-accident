"use client";

import { deleteEmployeer, editEmployee, listDepartmentAccidents } from "@/firebase/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmployeeType, AccidentType } from "@/firebase/types";
import Update from "@/components/Update";
import "./css-components/SingleEmployee.css";
import Link from "next/link";

interface SingleEmployeeProps {
  employeeID: string;
  departmentID: string;
  selected: EmployeeType; // Selected employee's data
}

export default function SingleEmployee({
  employeeID,
  departmentID,
  selected,
}: SingleEmployeeProps) {
  const [newData, setNewData] = useState<EmployeeType>(selected); // Ensure EmployeeType is used for state
  const [employeeAccidents, setEmployeesAccident] = useState<AccidentType[] | null>(null); // Type array or null
  const [file, setFile] = useState<File | null>(null); // State for the selected file
  const router = useRouter();

  useEffect(() => {
    setNewData(selected);
  }, [selected]);

  useEffect(() => {
    async function fetchData() {
      try {
        const accidents = await listDepartmentAccidents(departmentID);
        const involvedAccidents = accidents.filter((accident: AccidentType) =>
          accident.involvedEmployees?.some((employee) => employee.id === employeeID)
        );
        setEmployeesAccident(involvedAccidents);
      } catch (error) {
        console.error("Error fetching accidents:", error);
      }
    }

    fetchData();
  }, [departmentID, employeeID]);

  const handleNewData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "photoURL") {
      const selectedFile = (e.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        setNewData((prevData) => ({
          ...prevData,
          photoURL: selectedFile.name, // Only for preview
        }));
      }
    } else {
      setNewData((prevData) => ({
        ...prevData,
        [name]: value, // Update other fields
      }));
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you want to delete Employee ${selected.name} ${selected.lastName}? Please confirm.`
    );

    if (confirmed) {
      try {
        await deleteEmployeer(departmentID, employeeID);
        router.push(`/admin/departments/${departmentID}/employees`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await editEmployee(departmentID, employeeID, newData, file);
    if (result) {
      // Handle success if needed
    }
  };



  return (
    <>
    <Update text={'Employee'} editForm = {
  <div>
    <div className="flex items-center gap-4 whitespace-nowrap my-4">
      <h6 className="altHeadline">Edit Employee</h6>
      <hr className="line" />
    </div>
    <form onSubmit={handleSubmit}>
      <div className="gridCol">

        <div className="gridItems">
          <label className="keyInput">First Name</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="name" value={selected.name} placeholder="First Name" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Last Name</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="lastName" value={selected.lastName} placeholder="Last Name" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Gender</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="gender" value={selected.gender} placeholder="Gender" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Date of Birth</label>
          <input className="valueInput" onChange={handleNewData} type='string' name="dateOfBirth" value={selected.dateOfBirth} />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Home Address</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="homeAddress" value={selected.homeAddress} placeholder="Home Address" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Email</label>
          <input className="valueInput" onChange={handleNewData} type="email" name="email" value={selected.email} placeholder="Email" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Phone Number</label>
          <input className="valueInput" onChange={handleNewData} type="tel" name="phoneNumber" value={selected.phoneNumber} placeholder="Phone Number" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Emergency Contact</label>
          <input className="valueInput" onChange={handleNewData} type="tel" name="emergencyContact" value={selected.emergencyContact} placeholder="Emergency Contact" />
          <hr className="line invisible" />
        </div>


        <div className="gridItems">
          <label className="keyInput">Employee Status</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="employeeStatus" value={newData.employeeStatus} placeholder="Employee Status" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Job Position</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="jobPosition" value={newData.jobPosition} placeholder="Job Position" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Medical Condition</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="medicalCondition" value={newData.medicalCondition} placeholder="Medical Condition" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Notes</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="notes" value={newData.notes} placeholder="Notes" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Photo</label>
          <input className="valueInput" onChange={handleNewData} type="file" name="photoURL" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Salary</label>
          <input className="valueInput" onChange={handleNewData} type="number" name="salary" value={newData.salary} placeholder="Salary" />
          <hr className="line invisible" />
        </div>


        <div className="gridItems">
          <label className="keyInput">Department ID</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="departmentID" value={selected.id} placeholder="Department ID" />
          <hr className="line invisible" />
        </div>

        <div className="gridItems">
          <label className="keyInput">Hire Date</label>
          <input className="valueInput" onChange={handleNewData} type="text" name="hireDate" value={newData.hireDate} placeholder="Hire Date" />
          <hr className="line invisible" />
        </div>

      </div>

      <div className="flex gap-4 my-8">
        <button onClick={handleDelete} className="deleteButton">Delete Employee</button>
        <button className="mainButton">Update Employee</button>
      </div>

    </form>
  </div>
}

 viewInfo = {
  <div>
    <div className="flex items-center gap-4 whitespace-nowrap my-4">
      <h6 className="altHeadline">Employee Information</h6>
      <hr className="line" />
    </div>

    <div className="gridCol">

      <div className="gridItems">
        <label className="keyInput">First Name</label>
        <p className="valueInput">{selected.name}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Last Name</label>
        <p className="valueInput">{selected.lastName}</p>
        <hr className="line " />
      </div>

      <div className="gridItems">
        <label className="keyInput">Gender</label>
        <p className="valueInput">{selected.gender}</p>
        <hr className="line " />
      </div>

      <div className="gridItems">
        <label className="keyInput">Date of Birth</label>
        <p className="valueInput">{selected.dateOfBirth}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Home Address</label>
        <p className="valueInput">{selected.homeAddress}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Email</label>
        <p className="valueInput">{selected.email}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Phone Number</label>
        <p className="valueInput">{selected.phoneNumber}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Emergency Contact</label>
        <p className="valueInput">{selected.emergencyContact}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Employee ID</label>
        <p className="valueInput">{selected.id}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Employee Status</label>
        <p className="valueInput">{selected.employeeStatus}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Job Position</label>
        <p className="valueInput">{selected.jobPosition}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Medical Condition</label>
        <p className="valueInput">{selected.medicalCondition}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Notes</label>
        <p className="valueInput">{selected.notes}</p>
        <hr className="line" />
      </div>





      <div className="gridItems">
        <label className="keyInput">Salary</label>
        <p className="valueInput">{selected.salary}</p>
        <hr className="line" />
      </div>

     <div className="gridItems">
  <label className="keyInput">Accidents</label>
  <p className="valueInput">
    {employeeAccidents && employeeAccidents.length === 0
      ? "No accidents recorded."
      : null}
  </p>
  {employeeAccidents && employeeAccidents.length > 0 && (
    <ul className="accidentList">
      {employeeAccidents.map((item) => (
        <li key={item.accidentID}>
          <Link
            href={`/admin/departments/${departmentID}/accidents/${item.id}`}
            className="accidentLink" // Optional: Add a class for styling
          >
            {item.description || "Accident details not available."}
          </Link>
        </li>
      ))}
    </ul>
  )}
  <hr className="line" />
</div>

      <div className="gridItems">
        <label className="keyInput">Department ID</label>
        <p className="valueInput">{selected.id}</p>
        <hr className="line" />
      </div>

      <div className="gridItems">
        <label className="keyInput">Hire Date</label>
        <p className="valueInput">{selected.hireDate}</p>
        <hr className="line" />
      </div>

    </div>
  </div>
}
 />
      
    </>
  );

}
