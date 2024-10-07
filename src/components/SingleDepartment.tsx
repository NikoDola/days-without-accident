export default function SingleDepartment({selectedDepartment}){
    return(
        <main>
<           p>{selectedDepartment.shortName}</p>
            <p>{selectedDepartment.longName}</p>
            <p>{selectedDepartment.accidents}</p>
            <p>{selectedDepartment.employees}</p>
        </main>
        
    )
}