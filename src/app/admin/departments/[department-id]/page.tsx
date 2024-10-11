
import { listAllDepartments, deleteDepartment } from "@/firebase/actions"
import SingleDepartment from "@/components/SingleDepartment";
import { singleDepartment } from "@/firebase/actions";
import { notFound } from "next/navigation"
import EditDepartment from "@/components/EditDepartment";
import { Department } from "@/firebase/types";



export default async function department({params}){
    const department = await singleDepartment(params['department-id']) as Department
    const timestamp = department.createdAt.toDate().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

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
<main >

    <div className="sectionWrapper">
        <SingleDepartment 
        shortName={department.shortName} 
        fullName={department.fullName} 
        accidents={department.accidents}
        employees={department.employees}
        createdAt={timestamp}
        />
        <EditDepartment departmentID={selectedDepartment.id}/>
    </div>
</main>
    )
}

{/* <main>
<p className="url">{urlslice}</p>
<h4 className="mainHeadline">Departments</h4>
<div className="sectionWrapper">
  <AddNewDepartment />
  <ListAllDepartments />
</div>
</main> */}