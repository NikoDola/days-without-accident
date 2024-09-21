"use client";
import { getCounter} from '@/firebase/actions';

import { useEffect, useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState<any[] | null>(null); // Use any for flexibility


  useEffect(() => {
    const fetchData = async () => {
      const counterData = await getCounter();

      if (counterData && Array.isArray(counterData)) {
        setCounter(counterData);
      } else {
        console.warn("Fetched data is not a valid array of objects");
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {counter?.map((item) => (
        <div key={item.id}>
          <p>Current Time {item.currentTime}</p>
          <p> Follow Up {item.currentTime - item.snapshotTime}</p>
          <p>Latest activity {item.latestActivity}</p>
          <p>Record Time {item.recordTime}</p>
        </div>
      ))}
    </main>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function Counter() {
 
//   const [startDate, setStartDate] = useState(20)
//   const [currentTime, setCurrentTime] = useState<number>(30);
//   const [latestActivity, setLatestActivity] = useState<number>(0);
//   const [recordTime, setRecordTime] = useState<number>(0);
//   const [snapshotTime, setSnapshotTime] = useState<number>(20);
 

//   useEffect(()=>{
//     const intervalId = setInterval(() => {
//       const time = new Date().getSeconds()
//       setCurrentTime(time)
//     }, 1000);

//     return () => clearInterval(intervalId)
//   },[])

//   const handleReset = () =>{
//     setSnapshotTime(currentTime)
//   }

//   return (
//     <>
//       <h1>Counter</h1>
//       <h3>Current Time: {currentTime}</h3>
//       <h3>Followup: {currentTime-snapshotTime}</h3>
//       <h3>Latest Activity: {latestActivity}</h3>
//       <h3>Record Time: {recordTime}</h3>
//       <p>{snapshotTime}</p>
//       <button onClick={handleReset} className="mainButton w-28">Reset</button>
//     </>
//   );
// }