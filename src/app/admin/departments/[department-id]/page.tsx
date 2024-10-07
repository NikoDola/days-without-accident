
import { listAllDepartments, deleteDepartment } from "@/firebase/actions"
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
    const time = new Date(selectedDepartment.createdAt.seconds * 1000)
    .toLocaleString("en-GB", {day: "2-digit",month: "2-digit",year: "numeric",})

    return(
<>
    <p>Department Short Name{selectedDepartment.shortName} </p>
    <p>Department Long Name {selectedDepartment.fullName}</p>
    <p>Department Employees {selectedDepartment.employees}</p>
    <p>Accidents {selectedDepartment.accidents}</p>
    <p>Created At: {time}</p>
    <form method="POST">
        <button type="submit">Delete this appartment</button>
    </form>
   
</>
    )
}