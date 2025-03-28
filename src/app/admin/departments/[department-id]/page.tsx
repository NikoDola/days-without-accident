import { listAllDepartments } from "@/firebase/actions";
import { notFound } from "next/navigation";
import SingleDepartment from "@/components/SingleDepartment";
import "@/components/loader.css"

interface DepartmentProps {
    params: {
        'department-id': string;
    }
}

export default async function Department({ params }: DepartmentProps) {
    const department = await listAllDepartments();
    const selectedDepartment = department.find((item) =>
        item.id.toLowerCase() === params['department-id'].toLowerCase()
    );

    if (!selectedDepartment) {
        notFound();
    }

    return (
        <main>
            <div>
                {selectedDepartment ? (
                    <h4 className="mainHeadline">Department {selectedDepartment.shortName}</h4>
                ) : (
                    <h4 className="mainHeadline">Department Not Found</h4>
                )}
            </div>

            {selectedDepartment && <SingleDepartment departmentID={selectedDepartment.id} />}
        </main>
    );
}
