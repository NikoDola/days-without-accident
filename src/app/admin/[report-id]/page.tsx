
import { getAllDepartments } from "@/firebase/actions";
import ReportAccident from "@/components/ReportAccident"



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
          <p>Short Name: {selectedDepartment.shortName}</p>
          <p>Full Name: {selectedDepartment.fullName}</p>
          <ReportAccident id={selectedDepartment.id}/>
          
        </div>
      ) : (
        <p>No page found</p>
      )}
    </main>
  );
}



    