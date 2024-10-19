import ListAllDepartments from "@/components/ListAllDepartments";
import AddNewDepartment from "@/components/AddNewDepartment";
import AddOrUpdate from "@/components/AddOrUpdate"


export default function AdminPage() {

  return (
    <main>
        <h4 className="mainHeadline">Departments</h4>
        <AddOrUpdate form={<AddNewDepartment/>} text={'Add New Department'}/>

      <div className="sectionWrapper">
        <ListAllDepartments />
      </div>
    
    </main>
  );
}
