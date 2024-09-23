"use client"
import { useState, useEffect } from "react"
import "./css-components/counter.css"

export default function Counter(){
  const [currentTime, setCurrentTime] = useState<number>()

  useEffect(()=>{
    
  const startDate: Date = new Date("2022-05-09")
  const currentDate: Date = new Date()

  const differencinTime: number = currentDate.getTime() - startDate.getTime()
  const daysPassed: number = Math.floor(differencinTime / (1000 * 60 * 60 * 24));
    const intervalID = setInterval(() => {
      setCurrentTime((x) => x = new Date().getSeconds())
    }, 1000);
  },[])


  return (
    <div>
      <div className="mainWrapper">
        <div className="leftWrapper">
          <div className="logoWrapper">
            <img src="branding/logo/niks_logo.svg" className="logo"></img>  
            <p className="statistic">Accident Counter</p>          
          </div>

          <div className="mainCounterWrapper">
            <p className="day">Days</p>
            <span className="currentTime"> {currentTime}</span>
          </div>
          <div>
          <div className="departmentWrapper flex gap-4 items-center">
              <p className="fullName">Total Accidents</p>
              <p className="counterNum">0</p>
          </div>
          <div className="statisticWrapper">
          <p className="statistic"><b>100</b> days without accident, a new <b>Record</b></p>
          <p className="statistic">Latest activity was <b>30</b> days without accident</p>
          </div>
          </div>
          
         
        </div>
        <div className="rightWrapper">
          
        <div className="CounterWrapper">
            <div className="departmentWrapper">
              <p className="fullName">Human Resources</p>
              <p className="shortName">Hr</p>
            </div>
            <p className="counterNum">0</p>
        </div>

        <div className="CounterWrapper">
            <div className="departmentWrapper">
              <p className="fullName">Human Resources</p>
              <p className="shortName">Hr</p>
            </div>
            <p className="counterNum">0</p>
        </div>

        <div className="CounterWrapper">
            <div className="departmentWrapper">
              <p className="fullName">Human Resources</p>
              <p className="shortName">Hr</p>
            </div>
            <p className="counterNum">0</p>
        </div>

        <div className="CounterWrapper">
            <div className="departmentWrapper">
              <p className="fullName">Human Resources</p>
              <p className="shortName">Hr</p>
            </div>
            <p className="counterNum">0</p>
        </div>

        <div className="CounterWrapper">
            <div className="departmentWrapper">
              <p className="fullName">Human Resources</p>
              <p className="shortName">Hr</p>
            </div>
            <p className="counterNum">0</p>
        </div>

        <div className="CounterWrapper">
            <div className="departmentWrapper">
              <p className="fullName">Human Resources</p>
              <p className="shortName">Hr</p>
            </div>
            <p className="counterNum">0</p>
        </div>


        </div>
      </div>
    </div>
    
  )
}