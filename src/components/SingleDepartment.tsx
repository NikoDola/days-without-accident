"use client"


export default function SingleDepartment({shortName, fullName, accidents, employees, createdAt}){
    

    return(
        <section>
            <h2>{shortName}</h2>
            <h5>{fullName}</h5>
            <p>created at: {createdAt}</p>
            <div>
                {accidents === 1 ? <p>{accidents} accident:</p>: <p>{accidents} accidents</p>}
                {employees === 1 ? <p>{employees} employee:</p>: <p>{employees} emoployees</p>}
            </div>
        
        </section>
    )
}