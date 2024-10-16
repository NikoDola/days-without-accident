"use client"
import { useState } from 'react';
import { editAccidents, deleteAccident } from '@/firebase/actions'; // Assume these are your actions

export default function EditAccident({ departmentID, accidentID }) {
    const [newData, setNewData] = useState({});
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setNewData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'status') {
            setToggle(value === 'solved');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading animation

        try {
            await editAccidents(departmentID, accidentID, newData);
            console.log('Accident updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error updating accident:', error);
        } finally {
            setLoading(false); // Hide loading animation
        }
    };

    const handleDelete = async () => {
        setLoading(true); // Show loading animation

        try {
            await deleteAccident(departmentID, accidentID);
            console.log('Accident deleted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting accident:', error);
        } finally {
            setLoading(false); // Hide loading animation
        }
    };

    return (
        <section>
            {loading && <div className="loading-spinner">Loading...</div>} {/* Display spinner when loading */}
            
            <form className="sectionForm" onSubmit={handleSubmit}>
                <input onChange={handleUpdate} placeholder="Title" name="title" />
                <select name="status" onChange={handleUpdate}>
                    <option disabled value="">Status</option>
                    <option value="unsolved">Unsolved</option>
                    <option value="solved">Solved</option>
                </select>
                {toggle && (
                    <textarea
                        placeholder="Measurement description"
                        name="description"
                        onChange={handleUpdate}
                    />
                )}
                <button className="mainButton">Update</button>
            </form>
            
            <button onClick={handleDelete} className="mainButton">Delete</button>
        </section>
    );
}
