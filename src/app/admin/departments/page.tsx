import ListAllDepartments from "@/components/ListAllDepartments";
import AddNewDepartment from "@/components/AddNewDepartment";


export default function AdminPage() {

  return (
    <main>
      <h4 className="mainHeadline">Departments</h4>
      <div className="sectionWrapper">
        <AddNewDepartment />
        <ListAllDepartments />
      </div>
    </main>
  );
}
