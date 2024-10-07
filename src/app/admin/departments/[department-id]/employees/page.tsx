import { listAllDepartments } from "@/firebase/actions";
import ListDepartmentEmployees from "@/components/ListDepartmentEmployees";
import AddNewEmployee from "@/components/AddNewEmployee";

export default async function Employees({ params }) {
    const departments = await listAllDepartments();
    const selectedDepartment = departments.find((item) => (item?.id.toLowerCase() === params['department-id'].toLowerCase()));

    if (!selectedDepartment) {
        return <div>No department found.</div>;
    }

    return (
        <div>
            <AddNewEmployee departmentID={selectedDepartment.id} />
            <ListDepartmentEmployees departmentID={selectedDepartment.id} />
        </div>
    );
}
