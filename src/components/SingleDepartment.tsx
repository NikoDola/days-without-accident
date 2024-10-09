"use client"


export default function SingleDepartment({shortName, fullName, accidents, employees, createdAt}){
    

    return(
        <section>
            <h2><b>{shortName}</b></h2>
            <h5>{fullName}</h5>
            <p>created at: <b>{createdAt}</b></p>
            <div>
                {accidents === 1 ? <p><b>{accidents}</b>accident:</p>: <p><b>{accidents}</b> accidents</p>}
                {employees === 1 ? <p><b>{employees}</b> employee:</p>: <p><b>{employees}</b> emoployees</p>}
            </div>
        
        </section>
    )
}