"use client"


export default function SingleDepartment({title, status, involvedEmployees, time}){
    

    return(
        <section>
            <h2>{title}</h2>
            <h5>{status}</h5>
            {involvedEmployees.length}
            <p>{time}</p>
        </section>
    )
}