"use client";



import { useEffect, useState } from "react";
import { getAllAccidents } from "@/firebase/actions";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

interface ListAllAccidentsProps {
    departmentID: string; // Ensure departmentID is a string
}

export default function ListAllAccidents({ departmentID }: ListAllAccidentsProps) {
    const [allAccidents, setAllAccidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const accidents = await getAllAccidents(departmentID);
                console.log(accidents);
                setAllAccidents(accidents);

                const docRef = doc(db, 'users', "Nik's", 'departments', departmentID)
                await updateDoc(docRef,{
                    accidents: accidents.length as number
                })
            } catch (error) {
                console.error("Error fetching accidents: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [departmentID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {allAccidents.length > 0 ? (
                <p>We have data</p>
            ) : (
                <p>No data available</p>
            )}
        </>
    );
}
