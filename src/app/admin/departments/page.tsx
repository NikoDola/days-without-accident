import ListAllDepartments from "@/components/ListAllDepartments";
import AddNewDepartment from "@/components/AddNewDepartment";
export default function AdminPage() {
    return (
        <main>
            <h4 className="mainHeadline">Departmetns</h4>
            <div className="sectionWrapper">
                <AddNewDepartment />
                <ListAllDepartments />
            </div>
        </main>
    );
}
