import Link from 'next/link';

interface SingleAccidentProps {
    accidentID: string;
    departmentID: string;
    
    selected: {
        status: string;
        title:string;
        involvedEmployees: { 
            name: string; 
            id: string;
            lastName: string }[];
            
    };
}

export default function SingleAccident({ accidentID, departmentID, selected }: SingleAccidentProps) {
    console.log(departmentID)
    return (
       
        <main>
            <p>
                Happened at{' '}
                <Link href={`/admin/${departmentID}`}>{departmentID}</Link>
            </p>
            <p>Status: {selected.status}</p>
            <p>{selected.title}</p>

            <p className="mt-4">People involved in the accident:</p>
            {selected.involvedEmployees.map((item, index) => (
                <div key={index} className="flex gap-2">
                    <p>{item.name}</p>
                    <p>{item.lastName}</p>
                    <Link href={`/admin/${departmentID}/employee/${item.id}`}>View Employee</Link>
                </div>
            ))}
        </main>
    );
}
