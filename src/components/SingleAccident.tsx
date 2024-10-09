"use client"


export default function SingleDepartment({title, status, involvedEmployees, time, description}){
    return(
        <section>
            <h2>{title}</h2>
            <h5>{status}</h5>
            <p>{description}</p>
            {involvedEmployees.length}
            <p>{time}</p>
        </section>
    )
}