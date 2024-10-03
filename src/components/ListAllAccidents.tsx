"use client";

import { useEffect, useState } from "react";
import { getAllAccidents } from "@/firebase/actions";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

interface AccidentType {
    id: string;
    title: string;
    time: number;
    involvedEmployees: number; // Keep this as a number
    status: string;
}

interface ListAllAccidentsProps {
    departmentID: string; // Ensure departmentID is a string
}

export default function ListAllAccidents({ departmentID }: ListAllAccidentsProps) {
    const [allAccidents, setAllAccidents] = useState<AccidentType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const accidents: AccidentType[] | any = await getAllAccidents(departmentID); // Specify type here
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

    const handleDeleteDoc = async (accidentID: string) => {
        try {
            const docRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'accidents', accidentID);
            await deleteDoc(docRef);

            // Update the state to remove the deleted accident from the list
            setAllAccidents(prevAccidents => prevAccidents.filter(accident => accident.id !== accidentID));
        } catch (error) {
            console.error("Error deleting accident: ", error);
        }
    };

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
                            <li>{Math.round(item.time / (24 * 60 * 60))} days</li>
                            <p>{item.involvedEmployees > 0 ? `${item.involvedEmployees} involved employees` : "No involved employees"}</p>
                            <li>{item.status}</li>
                            <button onClick={() => handleDeleteDoc(item.id)} className="mainButton">Delete Accident</button>
                            <Link href={`/admin/${departmentID}/accidents/${item.id}`}>View</Link>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </ul>
        </>
    );
}
