"use client";

import { useEffect, useState } from "react";
import { getAllAccidents } from "@/firebase/actions";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface AccidentType {
    id: string;
    title: string;
    time: number;
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
                const accidents: any = await getAllAccidents(departmentID);
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
                            <button onClick={() => handleDeleteDoc(item.id)} className="mainButton">Delete Accident</button>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </ul>
        </>
    );
}
