"use client"
import { listAllEmployees } from "@/firebase/actions"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ListAllEmployees(){
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const fetchData = async () => {
        const employees = await listAllEmployees()
        setSelectedEmployee(employees)
    }
    console.log(selectedEmployee)
    useEffect(()=>{
        fetchData()
    },[])
  
    return (
        <>
          {(!selectedEmployee || selectedEmployee.length === 0) ? (
            <p>No data</p>
          ) : (
            <div >
                 <p>{selectedEmployee.length}</p>
                {selectedEmployee.map((employee, index)=>(
                    <div key={index}>
                        <p>{employee.name} {employee.lastName}</p>
                        <p>{employee.departmentName}</p>
                        <p>{employee.accidents}</p>
                        <Image alt="employee image" width={100} height={100} className='w-12' src={employee.photoURL}/>
                    </div>
                ))}
            </div>
          )}
        </>
      );
    }