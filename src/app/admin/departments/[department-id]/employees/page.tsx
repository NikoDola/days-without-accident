import { listAllDepartments } from "@/firebase/actions";
import ListDepartmentEmployees from "@/components/ListDepartmentEmployees";
import AddNewEmployee from "@/components/AddNewEmployee";
import { singleDepartment } from "@/firebase/actions";
import AddOrUpdate from "@/components/AddOrUpdate";

interface Department{
    shortName:string,
    fullName: string,
    employees: number,
}

export default async function Employees({ params }) {
    const department = await singleDepartment(params['department-id']) as Department
    const departments = await listAllDepartments();
    const selectedDepartment = departments.find((item) => (item?.id.toLowerCase() === params['department-id'].toLowerCase()));
   
    if (!selectedDepartment) {
        return <div>No department found.</div>;
    }

    return (
        <main>
            <h4 className="mainHeadline">{selectedDepartment.shortName} Employees</h4>
                <AddOrUpdate form={<AddNewEmployee departmentID={selectedDepartment.id} />} />
                
                <div>
                <ListDepartmentEmployees departmentID={selectedDepartment.id} />
                </div>
          
        </main>
    );
}
