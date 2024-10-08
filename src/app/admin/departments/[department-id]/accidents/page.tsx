
import { listAllDepartments, singleDepartment } from "@/firebase/actions";
import AddNewAccident from "@/components/AddNewAccident";
import ListDepartmentAccidents from "@/components/ListDepartmentAccidents"
import { Department } from "@/firebase/types";
interface ReportPageProps {
  params: {
    'department-ids': string; 
  };
}


export default  async function accidentPage({ params }: ReportPageProps) {

  const department = await singleDepartment(params['department-id']) as Department
  const departmetns = await listAllDepartments()

  const selectedDepartment = departmetns.find((item) => 
    item.id.toLowerCase() === params['department-id'].toLowerCase()
  );
  
  return (
    <main>
        <p>report accident at {department.shortName}</p>
        <AddNewAccident departmentID={selectedDepartment.id}/>
        <ListDepartmentAccidents departmentID={selectedDepartment.id}/>

    </main>
  );
}



    