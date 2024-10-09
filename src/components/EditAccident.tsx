"use client"
import { editAccidents } from '@/firebase/actions';
import { useState } from 'react';

export default function EditAccident({ departmentID, accidentID }) {
    const [newData, setNewData] = useState({});
    const [toggle, setToggle] = useState<boolean>(false);

    const handleUpdate = (e) => {
        const { name, value } = e.target;

        // Update the newData state
        setNewData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Toggle the textarea visibility based on status
        if (name === 'status') {
            setToggle(value === 'solved');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accidentUpdate = await editAccidents(departmentID, accidentID, newData);
            console.log('Accident updated successfully!');

            if (accidentUpdate) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating accident:', error);
            // Handle specific error types and display user-friendly messages
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleUpdate} placeholder="Title" name="title" />
            <select name="status" onChange={handleUpdate}>
                <option disabled value="">Status</option>
                <option value="unsolved">Unsolved</option>
                <option value="solved">Solved</option>
            </select>
            {toggle && (
                <textarea
                    placeholder="Measurement description"
                    name="description" // Don't forget to add a name for the textarea
                    onChange={handleUpdate} // Make sure to handle updates for the textarea as well
                />
            )}
            <button className="mainButton">Update</button>
        </form>
    );
}
