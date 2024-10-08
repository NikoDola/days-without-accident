import { listAllDepartments } from "@/firebase/actions";
import ListDepartmentEmployees from "@/components/ListDepartmentEmployees";
import AddNewEmployee from "@/components/AddNewEmployee";
import { singleDepartment } from "@/firebase/actions";

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
        <div>
            <p>{department?.shortName}</p>
            <p>{department?.fullName}</p>
            <p>{department?.employees}</p>
            <AddNewEmployee departmentID={selectedDepartment.id} />
            <ListDepartmentEmployees departmentID={selectedDepartment.id} />
        </div>
    );
}
