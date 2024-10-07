
import { listAllDepartments } from "@/firebase/actions";
import ListDepartmentlEmployees from "@/components/ListDepartmentEmployees";
import AddNewAccident from "@/components/AddNewAccident";
import AddNewEmployee from "@/components/AddNewEmployee";
import ListDepartmentAccidents from "@/components/ListDepartmentAccidents"
interface ReportPageProps {
  params: {
    'department-ids': string; 
  };
}

export default  async function accidentPage({ params }: ReportPageProps) {

  const allDepartmetns = await listAllDepartments()
  const selectedDepartment = allDepartmetns.find((item) => 
    item.id.toLowerCase() === params['department-id'].toLowerCase()
  );
  
  return (
    <main>

        <AddNewAccident departmentID={selectedDepartment.id}/>
        <ListDepartmentAccidents departmentID={selectedDepartment.id}/>

    </main>
  );
}



    