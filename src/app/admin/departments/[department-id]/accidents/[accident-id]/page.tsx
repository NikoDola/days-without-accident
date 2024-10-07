

import { listDepartmentAccidents, listAllDepartments} from "@/firebase/actions";
import SingleAccident from "@/components/SingleAccident";

interface AccidentsPageProps {
    params: {
      'accident-id': string;
    };
}

interface Accident{
    id: string;
}

export default async function Accident({ params }: AccidentsPageProps) {
    const departments = await listAllDepartments();
    const selectedDepartment = departments.find((item) =>
        item.id.toLowerCase() === params['department-id'].toLowerCase()
    );

    if (!selectedDepartment) {
        return (
            <main>
                <p>No department found</p>
            </main>
        );
    }


    const accidents:any = await listDepartmentAccidents(selectedDepartment.id);  // Pass department id


    const selectedAccident = accidents.find((item) =>
        item.id.toLowerCase() === params['accident-id'].toLowerCase()
    );


    if (!selectedAccident) {
        console.log('No accident found for accident-id:', params['accident-id']);
        return (
            <main>
                <p>No accident found</p>
            </main>
        );
    }

    return (
        <main>
            <SingleAccident departmentID={selectedDepartment.id} accidentID={selectedAccident.id } selected={selectedAccident}/>
            
        </main>
    );
}
