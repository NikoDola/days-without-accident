"use server"

import { listDepartmentAccidents, listAllDepartments} from "@/firebase/actions";
import { notFound } from "next/navigation";
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


    const accidents:any = await listDepartmentAccidents(selectedDepartment.id);
    const selectedAccident = accidents.find((item) =>
        item.id.toLowerCase() === params['accident-id'].toLowerCase()
    );


 


    if (!selectedAccident) {
        notFound()
    }

    return (
        <main >
            <div>
                <h4 className="mainHeadline">Accident</h4>
            </div>
            <SingleAccident departmentID={selectedDepartment.id} accidentID={selectedAccident.id} selected={selectedAccident} />
        </main>
    );
}
