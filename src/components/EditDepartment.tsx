"use client"
import { db } from "@/firebase"
import { updateDoc, doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function EditDepartment({ departmentID }) {
    const [departmentName, setDepartmentName] = useState({
        fullName: '',
        shortName: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', "Nik's", 'departments', departmentID);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();

                if (data) {
                    setDepartmentName({
                        fullName: data.fullName || '',
                        shortName: data.shortName || '',
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [departmentID]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'users', "Nik's", 'departments', departmentID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const existingData = docSnap.data();

                // Only update if the fields have values, else retain the existing data
                const updatedData = {
                    fullName: departmentName.fullName || existingData.fullName,
                    shortName: departmentName.shortName || existingData.shortName,
                };

                await updateDoc(docRef, updatedData);
            }
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentName((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <main>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="fullName"
                    value={departmentName.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    name="shortName"
                    value={departmentName.shortName}
                    onChange={handleChange}
                    placeholder="Short Name"
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}
