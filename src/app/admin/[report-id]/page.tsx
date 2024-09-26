
import { getAllDepartments } from "@/firebase/actions";
import Employees from "@/components/Employees";
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
         {selectedDepartment ? (
        <div>
          <p>ID: {selectedDepartment.id}</p>
          <p>{selectedDepartment.fullName}</p>
          <Employees departmentID={selectedDepartment.id}/>
          
        </div>
      ) : (
        <p>No page found</p>
      )}
    </main>
  );
}



    