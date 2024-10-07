"use client";
import { useState, useEffect } from "react";
import "./css-components/counter.css";

import { listAllDepartments, getAllSeconds } from "@/firebase/actions";

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
  const [record, setRecordTime] = useState<number>()

  const fetchData = async () => {
    try {
      const getSeconds = await getAllSeconds();
      const getSecondsOne = getSeconds.sortedTimes;
      const getGaps = getSeconds.gap
      setRecordTime(getGaps)
      setSeconds(getSecondsOne);

      const allDepartments: TypeCheckDepartments[] = await listAllDepartments();
      setDepartments(allDepartments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const startDate: Date = new Date("2022-05-09");
    const currentDate: Date = new Date();
    const differenceInTime: number = currentDate.getTime() - startDate.getTime();
    const daysPassed: number = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    setCurrentTime(daysPassed);

    // Set an interval to refresh the data every 5 minutes (300000 ms)
    const refreshDataInterval = setInterval(() => {
      fetchData();
    }, 300000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(refreshDataInterval);
    };
  }, []);

  // Calculate the days since the last accident
  const daysSinceLastAccident = seconds.length > 0 && Math.floor((currentTime * 86400 - Math.max(...seconds)) / 86400);
  if(daysSinceLastAccident > record || record === null){
    setRecordTime(daysSinceLastAccident)
  }




  // Function to render loading divs
  const renderLoadingDivs = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="CounterWrapper CounterWrapperLoading">
        <div className="departmentWrapper loading departmentWrapperLoading">
          <p className="fullName fullNameLoading">loading loading</p>
          <p className="shortName shortNameLoading">LG</p>
        </div>
        <p className="counterNum counterNumLoading">9</p>
      </div>
    ));
  };

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

          <div className=" analiticAndTotal" >
          <div className="departmentWrapper totalAccident mb-4">
                <p className="fullName">Total Accidents</p>
                <p className="counterNum">{seconds.length}</p>
              </div>
            {daysSinceLastAccident <= 0 ? (
              <p className="daysSinceLast">Loading Stastic...</p>
            ) : (
              <div className="daysSinceLast">
                 <p > {daysSinceLastAccident} Days since the last accident </p>
                 {!isNaN(record) && <p>Record days with out accident {record}</p>}
              </div>
             
            )}
       

      
          </div>
        </div>

        <div className="rightWrapper">
          {departments.length > 0 ? <p className="departmentHeader" >Departments:</p >: <p className="departmentHeader" >Loading Departments...</p >}
          
          {departments.length > 0 ? (
            departments.sort((a, b) =>  a.accidents - b.accidents).map((item) => (
              <div key={item.shortName} className="CounterWrapper">
                <div className="departmentWrapper">
                  <p className="fullName">{item.fullName}</p>
                  <p className="shortName">{item.shortName}</p>
                </div>
                <p className="counterNum">{item.accidents}</p>
              </div>
            ))
          ) : (
            <div>{renderLoadingDivs()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
