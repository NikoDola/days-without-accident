"use client";
import { db } from '@/firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getCounter } from '@/firebase/actions';
import { useEffect, useState } from "react";

interface CounterItem {
  id: string;
  currentTime?: number;  // Made optional
  snapshotTime?: number;  // Made optional
  latestActivity?: number;  // Made optional
  recordTime?: number;  // Made optional
  daysPassed?: number;  // Added to store days passed
}

export default function Counter() {
  const [counter, setCounter] = useState<CounterItem[]>([]);

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

    const docRef = doc(db, 'users', "Nik's");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setCounter((prevCounter) =>
          prevCounter.map((item) =>
            item.id === doc.id
              ? {
                  ...item,
                  currentTime: data.currentTime,
                  daysPassed: data.daysPassed,
                }
              : item
          )
        );
      }
    });

    // Calculate days passed since May 1, 2021
    const startDate = new Date('2021-05-01').getTime();

    const intervalID = setInterval(() => {
      const currentDate = new Date().getTime();
      const daysPassed = Math.floor((currentDate - startDate) / (1000 ));

      updateDoc(docRef, {
        daysPassed: daysPassed,
      }).catch((error) => {
        console.error("Error updating document:", error);
      });
    }, 10000000); // Update every 10 seconds to reduce the load

    // Cleanup function
    return () => {
      clearInterval(intervalID);
      unsubscribe(); // Stop listening to real-time updates
    };
  }, []);

  return (
    <main>
      {counter.map((item) => (
        <div key={item.id}>
          <p>Days Passed Since May 1, 2021: {item.daysPassed}</p>
          <p>Current Time (from DB): {item.currentTime}</p>
          <p>Capture time: {item.captureTime}</p>
          <p>Follow Up: {item.currentTime - item.snapshotTime}</p>
          <p>Latest Activity: {item.latestActivity}</p>
          <p>Record Time: {item.recordTime}</p>
        </div>
      ))}
    </main>
  );
}
