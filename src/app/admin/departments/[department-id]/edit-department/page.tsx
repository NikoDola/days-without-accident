import { listAllDepartments } from "@/firebase/actions"
import EditDepartment from "@/components/EditDepartment"
import { notFound } from "next/navigation"


interface TypeParams{
    params: string,
}


export default async function updateDepartment({params}){

    const allDepartments = await listAllDepartments()
    const selectedDepartment = allDepartments.find((item) => item.id.toLowerCase() === params['departments-id'].toLowerCase())

    if(!selectedDepartment){
        notFound()
    }

    return(
  
        <EditDepartment departmentID={selectedDepartment.id} />
    )
}

