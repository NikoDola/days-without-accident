import React, { useState, useEffect } from 'react';

const CounterCard = () => {
    const [mainCount, setMainCount] = useState(0);
    const [current, setCurrent] = useState(0);
    const [last, setLast] = useState(0);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState({
        hr: 0,
        she: 0,
        si: 0,
    });
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);  // Set selected option to state
    };

    const clickHandler = () => {
        setLast(current);
        setCurrent(0);
        setTotal(x=> x + 1);

        // Increment the count for the selected category on button click
        setCategory(x => {
            const newCategory = { ...x };
            if (selectedOption === "option1") {
                newCategory.hr += 1;
            } else if (selectedOption === "option2") {
                newCategory.she += 1;
            } else if (selectedOption === "option3") {
                newCategory.si += 1;
            }
            else{
                newCategory.hr += 1;
            }
            return newCategory;
        });

        if (selectedOption === 'option2') {
            console.log('ej');
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const time = new Date();
            const seconds = time.getSeconds();
            setMainCount(seconds);
            setCurrent(prevCurrent => prevCurrent + 1);
            if (mainCount === 59) {
                setLast(0);
                setCurrent(0);
                setTotal(0);
                setCategory(x=>({...x,
                hr:0,
                she:0,
                si:0
            }))
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [mainCount]);

    return (
        <div>
            <p className='main__counter'>{mainCount} Main Counter</p>
            <p className='current__counter'>{current} Current Activity</p>
            <p className='last__counter'>{last} Last Activity</p>
            <p className='total__counter'>{total} Total Counter</p>
            <p className='hr'>{`${category.hr} Human Resources (HR)`}</p>
            <p className='she'>{`${category.she} Safety, Health, and Environment (SHE)`}</p>
            <p className='si'>{`${category.si} State Institutions (SI)`}</p>
            <select onChange={handleSelectChange} id="theInput">
                <option value="option1">Human Resources</option>
                <option value="option2">Safety, Health, and Environment</option>
                <option value="option3">State Institutions</option>
            </select>
            <button onClick={clickHandler}>Report</button>
        </div>
    );
};

export default CounterCard;
