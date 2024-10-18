
import { listAllDepartments, singleDepartment } from "@/firebase/actions";
import AddNewAccident from "@/components/AddNewAccident";
import AddOrUpdate from "@/components/AddOrUpdate";
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
      <h4 className="mainHeadline">{selectedDepartment.shortName} Accidents</h4>
      <AddOrUpdate form={<AddNewAccident departmentID={selectedDepartment.id}/>} />
      <div className="sectionWrapper">

        <ListDepartmentAccidents departmentID={selectedDepartment.id}/>
      </div>

    </main>
  );
}



    