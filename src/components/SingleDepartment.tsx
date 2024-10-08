"use client"
import { deleteDepartment } from "@/firebase/actions"
import { listAllDepartments } from "@/firebase/actions"
export default function SingleDepartment({departmentID}){
    const handleDeleteDepartment = async () => {
        try {
            await deleteDepartment(departmentID)
            console.log('department was deleted')
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <main>
        

            <form>
                <button className="mainButton" onClick={handleDeleteDepartment}>Delete Department</button>
            </form>
        </main>
    )
}