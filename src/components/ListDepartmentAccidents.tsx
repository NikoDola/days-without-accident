"use client";

import { useEffect, useState } from "react";
import { listDepartmentAccidents } from "@/firebase/actions";
import { updateDoc, doc} from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

interface AccidentType {
    id: string;
    title: string;
    time: number;  // this will be in seconds
    involvedEmployees: any[]; 
    status: string;
    
}

interface ListAllAccidentsProps {
    departmentID: string; 
}

export default function ListAllAccidents({ departmentID }: ListAllAccidentsProps) {
    const [allAccidents, setAllAccidents] = useState<AccidentType[]>([]);
    const [loading, setLoading] = useState(true);

    const startDate: Date = new Date("2022-05-10"); // Set your start date here

    useEffect(() => {
        async function fetchData() {
            try {
                const accidents: AccidentType[] | any = await listDepartmentAccidents(departmentID); // Specify type here
                setAllAccidents(accidents);

                const docRef = doc(db, 'users', "Nik's", 'departments', departmentID);
                await updateDoc(docRef, {
                    accidents: accidents.length as number
                });
            } catch (error) {
                console.error("Error fetching accidents: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [departmentID]);

    // Helper function to convert time (in seconds) to a readable date
    function convertSecondsToDate(seconds: number) {
        const milliseconds = seconds * 1000; // Convert seconds to milliseconds
        const accidentDate = new Date(startDate.getTime() + milliseconds); // Add to the start date
        return accidentDate.toLocaleDateString(); // Format to readable date
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <ul>
                {allAccidents.length > 0 ? (
                    allAccidents.map((item) => (
                        <div key={item.id}>
                            <li>{item.title}</li>
                            <li>{convertSecondsToDate(item.time )}</li> {/* Convert item.time to readable date */}
                            <li>Involved {item.involvedEmployees.length} People</li>
                            <li>{item.status}</li>
                            <Link href={`/admin/departments/${departmentID}/accidents/${item.id}`}>View</Link>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </ul>
        </>
    );
}
