import React from 'react';
import { useState,useEffect } from 'react';

const CounterCard = () => {
    const [mainCount, setMainCount] = useState(0);
    const [current, setCurrent] = useState(0);
    const [last, setLast] = useState(0)
    const [total, setTotal] = useState(0)
   

    const clickHandler = () =>{
        setLast(x => x = current)
        setCurrent(0)
        setTotal(total + 1)
    }

    useEffect(() =>{
        const time = new Date();
        const seconds = time.getSeconds()

        const intervalId = setInterval(() => {
            setMainCount(x => x = seconds );
            setCurrent(current + 1)
            if(mainCount === 59){
                setLast(x => x = 0)
                setCurrent(x => x = 0)
                setTotal(x => x = 0)
            }
        }, 1000);

        return() =>{
            clearInterval(intervalId)
        };
    });

    return (
        <div>
        <p className='main__counter'> {mainCount} Main Counter</p>
        <p className='current__counter'> {current} Current Activity</p>
        <p className='last__counter'> {last} Last Activity</p>
        <p className='total__counter'> {total} Total Counter</p>
        <select>
            <option value="option1">Human Resources</option>
            <option value="option2">Safety, health and enviroment</option>
            <option value="option1">State institutions</option>
        </select>
        <button onClick={clickHandler}>Report</button>

        </div>
  )
}

export default CounterCard
