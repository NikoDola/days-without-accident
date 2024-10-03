import { collection, setDoc, doc, getDoc, getDocs, deleteDoc, addDoc, updateDoc} from "firebase/firestore";
import { db } from "@/firebase";



// Departments 

export async function addDepartment(shortName: string, fullName: string, employees: number = 0, accidents: number = 0): Promise<string | null> {
    try {
        const docRef = doc(db, "users", "Nik's", "departments", shortName); 
        await getDoc(docRef);

        await setDoc(docRef, {
            shortName,
            fullName,
            employees,
            createdAt: new Date(),
            accidents: 0
        });

        console.log("Document written with custom ID: ", shortName);
        return shortName;
    } catch (error) {
        console.error("Error adding document: ", error.message || error);
        return error.message || null;
    }
}



export async function getAllDepartments(): Promise<any[]> {
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
}



export async function getAllAccidents(departmentID: string): Promise<Accident[]> {
    try {
        const docRef = collection(db, "users", "Nik's", 'departments', departmentID, 'accidents');
        console.log(docRef.path);
        const docSnap = await getDocs(docRef);

        const accidents = docSnap.docs.map((item) => ({
            id: item.id,
            ...item.data() as Accident
        }));
        return accidents;
    } catch (error) {
        console.error(error);
        return [];
    }
}





export async function addAccident(
    departmentID: string, 
    title: string = 'default', 
    accidentDescription: string = 'Unamed', 
    status: string = 'unsolved',
    involvedEmployees: EmployeeType[] = [],
    timestamp: Date // Add this new parameter
) {
    try {
        const collRef = collection(db, "users", "Nik's", 'departments', departmentID, 'accidents');
        
        const startDate: Date = new Date('2022-05-10');
        const differenceInMilliseconds: number = timestamp.getTime() - startDate.getTime(); // Use the timestamp
        const differenceInSeconds: number = Math.floor(differenceInMilliseconds / 1000);
    
        // Create an array of involved employees with only the necessary properties
        const involvedEmployeesData = involvedEmployees.map(emp => ({
            id: emp.id,
            name: emp.name,
            lastName: emp.lastName
        }));
    
        // Add accident document to Firestore with the involved employees
        await addDoc(collRef, {
            title,
            accidentDescription,
            status,
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



export async function deleteAccident(departmentID, accidentID) {
    try {
        const docRef = doc(db, 'users', "Niks", 'departments', departmentID, 'accidents', accidentID)
        await deleteDoc(docRef)
        alert('accedent was deleted')
    } catch (error) {
        console.error(error)
    }
}



//Employees

export async function getEmployees(departmentID) {
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


export async function deleteEmployeer(departmentID, employeeID:string) {
    try {
        const docRef = doc(db, 'users', "Nik's",'departments', departmentID, 'employees', employeeID)
        await deleteDoc(docRef)
    } catch (error) {
        console.error(error)
    }
}



export async function addEmployee(departmentID: string, name: string, lastName: string, timestamp: string, accidents: number) {
    try {
        // Reference to the employees collection within the specified department
        const employeesCollectionRef = collection(db, "users", "Nik's", "departments", departmentID, "employees");

        // Add a new employee document and let Firestore generate an ID
        await addDoc(employeesCollectionRef, {
            name,
            lastName,
            timestamp,
            accidents,
            photoURL: '/general/profile.png',
            description: '',
            departmentName: departmentID
        });

        console.log('Employee data was created');
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