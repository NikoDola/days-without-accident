import ListAllDepartments from "@/components/ListAllDepartments";
import AddNewDepartment from "@/components/AddNewDepartment";
export default function AdminPage() {
    return (
        <div>
            <AddNewDepartment />
            <ListAllDepartments />
        </div>
    );
}
