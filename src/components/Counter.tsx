"use client"
import { useState, useEffect } from "react";
import "./css-components/counter.css";

import { getAllDepartments, getAllSeconds } from "@/firebase/actions";

interface TypeCheckDepartments {
  fullName: string;
  shortName: string;
  employees: number;
  accidents: number;
}

export default function Counter() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [departments, setDepartments] = useState<TypeCheckDepartments[]>([]);
  const [seconds, setSeconds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const getSeconds = await getAllSeconds();
        const getSecondsOne = getSeconds.sortedTimes;
        setSeconds(getSecondsOne);
        const allDepartments: TypeCheckDepartments[] = await getAllDepartments();
        setDepartments(allDepartments);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

    const startDate: Date = new Date("2022-05-09");
    const intervalId = setInterval(() => {
      const currentDate: Date = new Date();
      const differencinTime: number = currentDate.getTime() - startDate.getTime();
      const daysPassed: number = Math.floor(differencinTime / (1000 * 60 * 60 * 24));
      setCurrentTime(daysPassed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const daysSinceLastAccident = seconds.length > 0? Math.floor((currentTime * 86400 - Math.max(...seconds)) / 86400): currentTime;

  return (
    <div>
      <div className="mainWrapper">
        <div className="leftWrapper">
          <div className="logoWrapper">
            <img src="branding/logo/niks_logo.svg" className="logo" alt="Logo" />
            <p className="statistic">Accident Counter</p>
          </div>

          <div className="mainCounterWrapper">
            <p className="day">Day:</p>
            <span className="currentTime"> {currentTime}</span>
          </div>
          <div>
            <div className="departmentWrapper flex gap-4 items-center">
              <p className="fullName">Total Accidents</p>
              <p className="counterNum">{seconds.length - 1}</p>
            </div>
            <div className="statisticWrapper">
              <p className="statistic">
                <b>{daysSinceLastAccident}</b> days since last accident
              </p>
            </div>
          </div>
        </div>
        <div className="rightWrapper">
          {departments.length > 0 ? (
            departments.map((item) => (
              <div key={item.shortName} className="CounterWrapper">
                <div className="departmentWrapper">
                  <p className="fullName">{item.fullName}</p>
                  <p className="shortName">{item.shortName}</p>
                </div>
                <p className="counterNum">{item.accidents}</p>
              </div>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
}
