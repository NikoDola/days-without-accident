"use client";

import { deleteEmployeer, editEmployee } from "@/firebase/actions";
import { useEffect, useState } from "react";
import { storage } from "@/firebase"; // Import the storage instance
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions

interface SingleEmployeeProps {
    employeeID: string;
    departmentID: string;
    selected: {
        name: string;
        lastName: string;
        accidents: number;
        departmentName: string;
        description: string;
        photoURL: string;
        timestamp: string;
    }
}

export default function SingleEmployee({ employeeID, departmentID, selected }: SingleEmployeeProps) {
    const [newData, setNewData] = useState(selected);
    const [file, setFile] = useState<File | null>(null); // State for the selected file

    useEffect(() => {
        setNewData(selected);
    }, [selected]);

    const handleNewData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "photoURL") {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
                setFile(selectedFile);
                // You can also set the newData photoURL to the file name temporarily
                setNewData(prevData => ({
                    ...prevData,
                    photoURL: selectedFile.name // This is just for preview; the actual URL will be fetched later
                }));
            }
        } else {
            setNewData(prevData => ({
                ...prevData,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Handle the file upload if a new file is selected
        if (file) {
            const imageRef = ref(storage, `images/${file.name}`); // Reference to the file in storage

            try {
                // Upload the file
                await uploadBytes(imageRef, file);
                const photoURL = await getDownloadURL(imageRef); // Get the download URL after upload
                
                // Update the newData object with the new photoURL
                newData.photoURL = photoURL;
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }

        // Update the employee data in Firestore
        await editEmployee(departmentID, employeeID, newData);
    };

    return (
        <main>
            <img className="w-12" src={selected.photoURL || '/default-avatar.png'} alt={`${selected.name} ${selected.lastName}`} />
            <p>{selected.name} {selected.lastName}</p>
            <p>{selected.timestamp}</p>
            <form onSubmit={handleSubmit}>
                <input onChange={handleNewData} type="text" name="name" value={newData.name} />
                <input onChange={handleNewData} type="text" name="lastName" value={newData.lastName} />
                <input type="file" onChange={handleNewData} name="photoURL" />
                <button className="mainButton">Update</button>
            </form>

            <button onClick={() => deleteEmployeer(departmentID, employeeID)} className="mainButton">Delete</button>
        </main>
    );
}
