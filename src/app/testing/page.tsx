"use client";
import { storage } from "@/firebase"; // Import the initialized storage
import { ref, uploadBytes } from "firebase/storage"; // Import necessary functions
import { useEffect, useState } from "react";

export default function Testing() {
    const [image, setImage] = useState(null); // Change initial state to null

    useEffect(() => {
        console.log(image);
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = e.target.imageURL.files[0];

        if (file) {
            const imageRef = ref(storage, `images/${file.name}`); 
            try {
                await uploadBytes(imageRef, file); 
                setImage(file);
                console.log('File uploaded successfully!');
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="imageURL" accept="image/*" />
            <button type="submit">Submit</button>
        </form>
    );
}
