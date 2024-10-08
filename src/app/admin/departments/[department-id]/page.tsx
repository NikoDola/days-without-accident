
import { listAllDepartments, deleteDepartment } from "@/firebase/actions"
import SingleDepartment from "@/components/SingleDepartment";
import { notFound } from "next/navigation"



export default async function department({params}){
    const departments = await listAllDepartments();

    const selectedDepartment = departments.find((item) => 
        (item?.id).toUpperCase() === params['department-id'].toUpperCase()
    );
    console.log(selectedDepartment)
    !selectedDepartment && notFound()
 
    if (params.method === 'POST') {
        console.log('deleted')
    }
    
    return(
<>
<SingleDepartment departmentID={selectedDepartment.id} />
   
</>
    )
}