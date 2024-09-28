import React, { useState } from 'react';

export default function MultipleSelectExample() {
    // State to control the number of select elements
    const [numSelects, setNumSelects] = useState(0);
    
    // Hardcoded list of options
    const optionsList = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

    // State to keep track of selected values for each select
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    // Handle change in the input field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10) || 0;
        setNumSelects(value);
        // Initialize or trim the selectedValues array based on the input number
        setSelectedValues(Array(value).fill(''));
    };

    // Handle change in each select element
    const handleSelectChange = (index: number, value: string) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = value;
        setSelectedValues(newSelectedValues);
    };

    return (
        <div>
            {/* Input field to specify the number of select elements */}
            <label>Number of Selects: </label>
            <input 
                type="number" 
                min="0" 
                value={numSelects} 
                onChange={handleInputChange} 
            />

            {/* Render select elements based on the number specified */}
            {[...Array(numSelects)].map((_, index) => (
                <div key={index}>
                    <select 
                        value={selectedValues[index] || ''} 
                        onChange={(e) => handleSelectChange(index, e.target.value)}
                    >
                        <option value="">Select an option</option>
                        {optionsList.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Display selected values */}
            <div>
                <h4>Selected Values:</h4>
                <ul>
                    {selectedValues.map((value, idx) => (
                        <li key={idx}>{value || 'None selected'}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
