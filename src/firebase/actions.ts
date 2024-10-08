import { collection, setDoc, doc, getDoc, getDocs, deleteDoc, addDoc, updateDoc} from "firebase/firestore";
import { db } from "@/firebase";



// Departments 

export async function addNewDepartment(shortName: string, fullName: string, employees: number = 0, accidents: number = 0): Promise<string | null> {
    try {
        const departmentsCollectionRef = collection(db, "users", "Nik's", "departments"); 

        const docRef = await addDoc(departmentsCollectionRef, {
            shortName,
            fullName,
            employees,
            createdAt: new Date(),
            accidents: 0
        });
        window.location.reload()
        console.log("Document written with unique ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error.message || error);
        return error.message || null;
    }
}



export async function listAllDepartments(): Promise<any[]> { 
    try {
        // Assuming departments are stored under 'users/Nik's/departments'
        const collRef = collection(db, 'users', "Nik's", 'departments'); 
        const docSnap = await getDocs(collRef);
        
        const departments = docSnap.docs.map((item) => ({
            id: item.id,
            ...item.data()
        }));
        
        return departments;
    } catch (error) {
        console.error("Error fetching departments: ", error.message || error);
        return [];
    }
}

export async function singleDepartment(departmentID: string) {
    try {
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        console.error(error)
        return []
    }
    
}


export async function deleteDepartment(id: string): Promise<void> {
    try {
        // Deleting department under 'users/Nik's/departments/{id}'
        const docRef = doc(db, "users", "Nik's", "departments", id); 
        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", id);
    } catch (error) {
        console.error("Error deleting document: ", error.message || error);
    }
}

interface EmployeeType {
    id: string;
    name: string;
    lastName: string;
    // Add other properties as needed
}


//Accidents
interface Accident {
    title: string;
    accidentDescription: string;
    status: string;
    time: number;
    involvedEmployees: EmployeeType[];
    description: string;
}



export async function listDepartmentAccidents(departmentID: string): Promise<Accident[]> {
    try {
        const docRef = collection(db, "users", "Nik's", 'departments', departmentID, 'accidents');
        console.log(docRef.path);
        const docSnap = await getDocs(docRef);

        const accidents = docSnap.docs.map((item) => ({
            id: item.id,
            ...item.data() as Accident
        }));
        console.log(accidents)
        return accidents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addNewAccident(
    departmentID: string, 
    title: string = 'default', 
    description: string = 'Unamed', 
    involvedEmployees: EmployeeType[] = [],
    timestamp: Date // Add this new parameter
) {
    try {
        const collRef = collection(db, "users", "Nik's", 'departments', departmentID, 'accidents');
        
        const startDate: Date = new Date('2022-05-10');
        const differenceInMilliseconds: number = timestamp.getTime() - startDate.getTime(); // Use the timestamp
        const differenceInSeconds: number = Math.floor(differenceInMilliseconds / 1000);
        const involvedEmployeesData = involvedEmployees.map(emp => ({
            id: emp.id,
            name: emp.name,
            lastName: emp.lastName,
            description,
        }));
    
        // Add accident document to Firestore with the involved employees
        await addDoc(collRef, {
            title,
            description,
            status: 'unsolved',
            time: differenceInSeconds, // This is a number
            involvedEmployees: involvedEmployeesData // Add involved employees here
        });
        
         
        alert('accident was added')
        window.location.reload()
        console.log('Accident reported successfully with involved employees.');
        
    } catch (error) {
        console.error("Error adding accident: ", error);
    }
}

export async function editAccident(departmentID:string, accidentID:string, newData:Partial<Accident>){
    try {
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID )
        await updateDoc(docRef, newData)
    } catch (error) {
        console.error(error)
    }
}

export async function deleteAccident(departmentID: string, accidentID:string) {
    try {
        const docRef = doc(db, 'users', "Niks", 'departments', departmentID, 'accidents', accidentID)
        await deleteDoc(docRef)
        alert('accedent was deleted')
    } catch (error) {
        console.error(error)
    }
}



//Employees

export async function listAllEmployees() {
try {
        const collRefDep = collection(db,'users', "Nik's", 'departments')
        const docSnapDep = await getDocs(collRefDep)
        
        const employees = await Promise.all(
            docSnapDep.docs.map(async (item)=>{
                const collRefEmployees = collection(db, 'users', "Nik's", 'departments', item.id, 'employees')
                const docSnapEmployees = await getDocs(collRefEmployees)
                
                return docSnapEmployees.docs.map((item) => item.data())
            })
        )
        return  employees.flat()
} catch (error) {
    console.error(error)
    return []
}
}

export async function listDepartmentEmployees(departmentID) {
    try {
        const docRef = collection(db, "users", "Nik's", 'departments', departmentID, 'employees' )
        const docSnp = await getDocs(docRef)

        const employees = docSnp.docs.map((item) =>({
            id: item.id,
            ...item.data()
            
        }))
        return employees
    } catch (error) {
        console.error(error)
    }

}


export async function deleteEmployeer(departmentID:string, employeeID:string) {
    try {
        const docRef = doc(db, 'users', "Nik's",'departments', departmentID, 'employees', employeeID)
        await deleteDoc(docRef)
        alert('Employee was deleted')
    } catch (error) {
        console.error(error)
    }
}



export async function addNewEmployee(departmentID: string, name: string, lastName: string, accidents: number) {
    try {
        if (typeof departmentID !== 'string' || !departmentID) {
            throw new Error('Invalid departmentID');
        }

        const employeesCollectionRef = collection(db, "users", "Nik's", "departments", departmentID, "employees");

        if (!name || !lastName) {
            throw new Error('Name and last name are required');
        }

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0'); // Ensures 2 digits
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        const year = now.getFullYear();

        const formattedTimestamp = `${day}-${month}-${year}`;

        await addDoc(employeesCollectionRef, {
            name,
            lastName,
            timestamp: formattedTimestamp,  
            accidents,
            photoURL: '/general/profile.png',
            departmentName: departmentID
        });

        alert('Employee data was created');
        window.location.reload()
    } catch (error) {
        console.error("Error adding employee: ", error);
    }
}




//Counter
export async function getAllSeconds() {
  try {
    const departmentsRef = collection(db, "users", "Nik's", 'departments');
    const departmentsSnapshot = await getDocs(departmentsRef);
    
    let allTimes = [];
    
    for (const department of departmentsSnapshot.docs) {
      const departmentId = department.id;
      const accidentsRef = collection(db, "users", "Nik's", 'departments', departmentId, 'accidents');
      const accidentsSnapshot = await getDocs(accidentsRef);
      
      const times = accidentsSnapshot.docs.map((doc) => doc.data().time);
      allTimes = allTimes.concat(times);
    }

    const sortedTimes = allTimes.sort((a, b) => b - a);
    const gapsSlice = sortedTimes.slice(1).map((item, index) => sortedTimes[index] - item);
    const sortGaps = gapsSlice.sort((a,b) => b-a)
    const gaps = sortGaps[0]
    const gap = Math.round(gaps / 86400)
    // Calculate the latest activity in days without an accident
    const latestActivityDays = gapsSlice.length > 0 ? Math.floor(gapsSlice[gapsSlice.length - 1] / (1000 * 60 * 60 * 24)) : 0; // convert seconds to days

    return {
      sortedTimes,
      gap,
      latestActivityDays, // New property to track the latest activity
    };
  } catch (error) {
    console.error(error);
    return {
      sortedTimes: [],
      gaps: [],
      latestActivityDays: 0, // Default value
    };
  }
}