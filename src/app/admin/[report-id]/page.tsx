
import { getAllDepartments } from "@/firebase/actions";
import Employees from "@/components/Employees";
import AddNewAccident from "@/components/AddNewAccident";
import ListAllAccidents from "@/components/ListAllAccidents";
interface ReportPageProps {
  params: {
    'report-id': string; 
  };
}

export default  async function ReportPage({ params }: ReportPageProps) {

  const allDepartmetns = await getAllDepartments()
  const selectedDepartment = allDepartmetns.find((item) => 
    item.id.toLowerCase() === params['report-id'].toLowerCase()
  );
  return (
    <main>
      <div className="flex">
        <AddNewAccident departmentID={selectedDepartment.id}/>
        <ListAllAccidents departmentID={selectedDepartment.id}/>
      </div>
     
         {selectedDepartment ? (
        <div>
          <Employees departmentID={selectedDepartment.id}/>
        </div>
      ) : (
        <p>No page found</p>
      )}
    </main>
  );
}



    