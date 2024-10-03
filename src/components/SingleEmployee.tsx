interface SingleEmployeeProps{
    employeeID: string;
    departmentID:string;

    selected:{
        name: string;
        lastName:string;
        accidents: number;
        departmentName: string;
        description: string;
        photoURL:string;
        timeStam:string;
    }
}

export default function SingleEmployee({ employeeID, departmentID, selected}: SingleEmployeeProps){
    return(
        <main>
            <p>{selected.name}</p>
            <p>{selected.lastName}</p>
            <img src={selected.photoURL}></img>
        </main>
    )
}