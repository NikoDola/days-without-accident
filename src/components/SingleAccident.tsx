"use client"
import { deleteAccident, editAccidents, listAllEmployees } from "@/firebase/actions"
import { useEffect, useState } from "react"
import { AccidentType } from "@/firebase/types"
import { useRouter } from "next/navigation"
import Update from "./Update"
import { listAll } from "firebase/storage"

export default function SingleAccident({ departmentID, accidentID, selected }) {
    const [newData, setNewData] = useState<AccidentType>(selected);
    const [involvedEmployees, setInvolvedEmployees] = useState(selected.involvedEmployees);
    const [allEmployees, setAllEmployees] = useState([]);
    const [newEmployeeId, setNewEmployeeId] = useState('');
    const router = useRouter();

    useEffect(() => {
        setNewData(selected);
        setInvolvedEmployees(selected.involvedEmployees);
    }, [selected]);

    useEffect(() => {
        async function fetchAllEmployees() {
            const employees = await listAllEmployees();
            setAllEmployees(employees); // Store all employees for selection
            console.log(employees);
        }
        fetchAllEmployees();
    }, []);

    const handleDelete = () => {
        deleteAccident(departmentID, accidentID);
    };

    const handleNewData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddEmployee = () => {
        const employeeToAdd = allEmployees.find(emp => emp.id === newEmployeeId);
        if (employeeToAdd && !involvedEmployees.some(emp => emp.id === employeeToAdd.id)) {
            setInvolvedEmployees(prev => [...prev, employeeToAdd]);
            setNewEmployeeId('');
        }
    };

    const handleRemoveEmployee = (employeeId) => {
        setInvolvedEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            ...newData,
            involvedEmployees: involvedEmployees, // Update the involved employees list
        };
        await editAccidents(departmentID, accidentID, updatedData);
    };

    return (
        <>
            <Update text={'Accident'} editForm={
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="gridCol">
                            <div className="gridItems">
                                <label>Accident Title</label>
                                <input onChange={handleNewData} name="title" value={newData.title} />
                            </div>

                            <div className="gridItems">
                                <label>Status</label>
                                <select name="status" onChange={handleNewData} value={newData.status}>
                                    <option value={'Solved'}>Solved</option>
                                    <option value={'Unsolved'}>Unsolved</option>
                                </select>
                            </div>

                            <div className="gridItems">
                                <label>Description</label>
                                <textarea onChange={handleNewData} name="description" value={newData.description} />
                            </div>

                            <div className="gridItems">
                                <label>Involved Employees</label>
                                
                                {involvedEmployees.length > 0 ? (
                                involvedEmployees.map((item) => (
                                <div className="flex items-center gap-4" key={item.id}>
                                    <p className="w-3/5 text-lg">{item.name} {item.lastName}, ID: {item.id}</p>
                                    <button className="w-3/10 altButton" type="button" onClick={() => handleRemoveEmployee(item.id)}>Remove</button>
                                </div>
                                ))
                                ) : (
                                    <p>No employees involved.</p>
                                )}

                                <div className="flex gap-4 items-center">
                                <select value={newEmployeeId} onChange={(e) => setNewEmployeeId(e.target.value)}>
                                    <option value="">Select an employee</option>
                                    {allEmployees.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name} {item.lastName}, ID: {item.id}</option>
                                    ))}
                                </select>
                                <button type="button" onClick={handleAddEmployee} className="altButton">Add Employee</button>
                                </div>
                               
                            </div>


                        </div>

                        <div className="deleteUpdate">
                            <button type="button" onClick={handleDelete} className="deleteButton">Delete Accident</button>
                            <button type="submit" className="mainButton">Update Accident</button>
                        </div>
                    </form>
                </>
            } viewInfo={
                <div>
                    <div className="flex items-center gap-4 whitespace-nowrap my-4">
                        <h6 className="altHeadline">Accident Information</h6>
                        <hr className="line" />
                    </div>
                    <div className="gridCol">
                        <div className="gridItems">
                            <label className="keyInput">Accident Title</label>
                            <p className="valueInput">{selected.title}</p>
                            <hr className="line" />
                        </div>

                        <div className="gridItems">
                            <label className="keyInput">Accident Status</label>
                            <p className="valueInput">{selected.status}</p>
                            <hr className="line" />
                        </div>

                        <div className="gridItems">
                            <label className="keyInput">Involved {involvedEmployees.length > 1 ? "Employees" : "Employee"}</label>
                            <p className="valueInput"></p>
                            {involvedEmployees.map((item) => (
                                <div key={item.id}>
                                    <p>{item.name} {item.lastName}, ID: {item.id}</p>
                                </div>
                            ))}
                            <hr className="line" />
                        </div>

                        <div className="gridItems">
                            <label className="keyInput">Accident Date</label>
                            <p className="valueInput">{selected.dataReported}</p>
                            <hr className="line" />
                        </div>

                        <div className="gridItems">
                            <label className="keyInput">Accident Description</label>
                            <p className="valueInput">{selected.description}</p>
                            <hr className="line" />
                        </div>
                    </div>
                </div>
            } />
        </>
    )
}
