import { listDepartmentEmployees, listAllDepartments } from "@/firebase/actions";
import SingleEmployee from "@/components/SingleEmployee";
interface EmployeePageProps{
    params:{
        'employee-id': string;
        'report-id': string;
    }
}


export default async function Employees({params}){
    const department = await listAllDepartments();
    const selectedDepartment = department.find((item) =>
    item.id.toLowerCase() === params['department-id'].toLowerCase()
    );
    
    if(!selectedDepartment){
        return(
            <main>
                <p>No Department fOUND</p>
            </main>
        )
    }

    const employee: any = await listDepartmentEmployees(selectedDepartment.id);

    const selectedEmployee = employee.find((item)=>
    item.id.toLowerCase() === params['employee-id'].toLowerCase()
    );
    if(!selectedEmployee){
        return(
            <main>
                <p>No Employee found</p>
            </main>
        )
    }
    return (
        <main>
            <div className="inline-flex items-center">
                <img className="profileImage mr-4" src={selectedEmployee.photoURL || "/default-avatar.png"} alt={`${selectedEmployee.id}`} />
                <h4 className="mainHeadline">Employee: {selectedEmployee.id}</h4>
            </div>
    
            <SingleEmployee departmentID={selectedDepartment.id} employeeID={selectedEmployee.id} selected={selectedEmployee} />
        </main>
    );
}
