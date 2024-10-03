import { getEmployees, getAllDepartments } from "@/firebase/actions";
import SingleEmployee from "@/components/SingleEmployee";
interface EmployeePageProps{
    params:{
        'employee-id': string;
        'report-id': string;
    }
}


export default async function Employees({params}){
    const department = await getAllDepartments();
    const selectedDepartment = department.find((item) =>
    item.id.toLowerCase() === params['report-id'].toLowerCase()
    );
    
    if(!selectedDepartment){
        return(
            <main>
                <p>No Department fOUND</p>
            </main>
        )
    }

    const employee: any = await getEmployees(selectedDepartment.id);

    const selectedEmployee = employee.find((item)=>
    item.id.toLowerCase() === params['employee-id'].toLowerCase()
    );
    if(!selectedEmployee){
        return(
            <main>
                <p>No Accident Found</p>
            </main>
        )
    }
    return(
        <main>
            <SingleEmployee departmentID={selectedDepartment.id} employeeID={selectedEmployee.id} selected={selectedEmployee}/>
        </main>
    )
}
