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
    return(
        <main>
            <SingleEmployee departmentID={selectedDepartment.id} employeeID={selectedEmployee.id} selected={selectedEmployee}/>
        </main>
    )
}
