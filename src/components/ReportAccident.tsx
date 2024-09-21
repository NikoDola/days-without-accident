"use client"
// ReportAccident.tsx
import { useState } from 'react';
import { addAccident } from "@/firebase/actions";

export default function ReportAccident({ id }) {
    const [people, setPeople] = useState('10'); // Initial state for people
    const [status, setStatus] = useState('unsolved'); // Initial state for status
    const [severityAssessment, setSeverityAssessment] = useState('minor'); // Initial state for severity
    const [description, setDescription] = useState<string>('')
    const handleAccidentSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        await addAccident(id, new Date().toISOString(), people, status, severityAssessment, description);
        // Optionally handle success or error states here
    };

    return (
        <main>
            <form onSubmit={handleAccidentSubmit}>
                <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                <label>People Involved:</label>
                <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="unsolved">Unsolved</option>
                    <option value="solved">Solved</option>
                </select>
                <label>Severity Assessment:</label>
                <select value={severityAssessment} onChange={(e) => setSeverityAssessment(e.target.value)}>
                    <option value="minor">Minor</option>
                    <option value="major">Major</option>
                </select>
                <button className='mainButton mb-8' type="submit">Report Accident</button>
            </form>
        </main>
    );
}