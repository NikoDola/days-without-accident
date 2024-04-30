import React, { useState, useEffect } from 'react';
import './index.scss'

const CounterCard = () => {
    
    const x = 1000
    const [mainCount, setMainCount] = useState(0);
    const [current, setCurrent] = useState(0);
    const [last, setLast] = useState(0);
    const [total, setTotal] = useState(0);
    const [record, setRecord] = useState(0)

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
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const time = new Date();
            const seconds = time.getSeconds();
            setMainCount(seconds);
            setCurrent(prevCurrent => prevCurrent + 1);
            setRecord(x => x < current ? current : x);
    
            if (mainCount === 59) {
                setLast(0);
                setCurrent(0);
                setTotal(0);
                setRecord(0);
                setCategory({
                    hr: 0,
                    she: 0,
                    si: 0
                });
            }
        }, x);
    
        return () => clearInterval(intervalId);
    }, [mainCount, current, record]); 
    

    return (
        <div className='main'>
            <div className='left-side'>
                <div>
                    <p>Last activity</p>
                    <h2 className='last__counter'>{current} days without accident</h2>
                    <p className='record'>{`${record} record without accident`}</p>
                </div>

                <div>
                    <p className='days-year'>days of year</p>
                    <h1 className='main__counter'>{mainCount}</h1>
                </div>
                {/* <p className='current__counter'>{current} Current Activity</p> */}
            </div>
            <div className='right-side'>
                <div className='textBox'>
                    <h2 className='total__counter'>This year accidents </h2>
                    <div className='box'>
                        <h2 className='total'>{total}</h2>
                    </div>
                </div>

                <div className='section'>
                    <p className='hr'> Human Resources <br/> <b style={{color: '#ED227C'}}>HR</b></p>
                    <div className='box'>
                        <h3 className='total'>{category.hr}</h3>
                    </div>
                </div>

                <div className='section'>
                    <p className='hr'> Safety, Health, and Environment <br/> <b style={{color: '#ED227C'}}>SHE</b></p>
                    <div className='box'>
                        <h3 className='total'>{category.she}</h3>
                    </div>
                </div>

                <div className='section'>
                    <p className='hr'> State Institutions <br/> <b style={{color: '#ED227C'}}>SI</b></p>
                    <div className='box'>
                        <h3 className='total'>{category.si}</h3>
                    </div>
                </div>
                
                <select onChange={handleSelectChange} id="theInput">
                    <option value="option1">Human Resources</option>
                    <option value="option2">Safety, Health, and Environment</option>
                    <option value="option3">State Institutions</option>
                </select>
                <button onClick={clickHandler}>Report</button>
            </div>
        </div>
    );
};

export default CounterCard;
