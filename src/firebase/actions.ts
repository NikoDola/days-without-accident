import { collection, setDoc, doc, getDoc, getDocs, deleteDoc, addDoc, updateDoc, increment} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { Department, AccidentType, EmployeeType } from "./types";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




//Departments 
export async function addNewDepartment(
    shortName: string, 
    fullName: string, 
    employees: number = 0, 
    accidents: number = 0
): Promise<string | null> {
    try {
        const unjoin = `${shortName}-${fullName}`; 
        const departmentId = unjoin.replace(/\s+/g, '-')
        const departmentsCollectionRef = collection(db, "users", "Nik's", "departments");

        // Use doc() to create a document reference with a custom ID
        const docRef = doc(departmentsCollectionRef, departmentId);

        // Now use setDoc() to set the document
        await setDoc(docRef, {
            shortName,
            fullName,
            employees,
            createdAt: new Date(),
            accidents
        });

        window.location.reload(); // Optional - reloads the page after adding the document
        console.log("Document written with custom ID: ", departmentId);
        return departmentId;
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

export async function editDepartment(departmentID: string, newData: Partial<Department>) {
  try {
    const docRef = doc(db, 'users', "Nik's", 'departments', departmentID);
    
    // Await the update operation
    await updateDoc(docRef, newData);
    
    alert('The department has been updated');
    return true;
  } catch (error) {
    console.error("Error updating department: ", error);
    return false;
  }
}

export async function deleteDepartment(id: string): Promise<void> {
    try {
        // Deleting department under 'users/Nik's/departments/{id}'
        const docRef = doc(db, "users", "Nik's", "departments", id); 
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting document: ", error.message || error);
    }
}


//Accidents
export async function listDepartmentAccidents(departmentID: string): Promise<AccidentType[]> {
    try {
        const docRef = collection(db, "users", "Nik's", 'departments', departmentID, 'accidents');
        console.log(docRef.path);
        const docSnap = await getDocs(docRef);

        const accidents = docSnap.docs.map((item) => ({
            id: item.id,
            ...item.data() as AccidentType
        }));
        console.log(accidents)
        return accidents;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function listAllAccidents() {
    try {
            const collRefDep = collection(db,'users', "Nik's", 'departments')
            const docSnapDep = await getDocs(collRefDep)
            
            const accidents = await Promise.all(
                docSnapDep.docs.map(async (item)=>{
                    const collRefAccidents = collection(db, 'users', "Nik's", 'departments', item.id, 'accidents')
                    const docSnapAccidents = await getDocs(collRefAccidents)
                    
                    return docSnapAccidents.docs.map((item) =>({
                        id: item.id,
                        ...item.data()
                    }) )
                })
            )
            return  accidents.flat()
    } catch (error) {
        console.error(error)
        return []
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
    
        await addDoc(collRef, {
            title,
            description,
            status: 'unsolved',
            time: differenceInSeconds, // This is a number
            involvedEmployees: involvedEmployeesData, // Add involved employees here
            departmentID, 
        });

        const departmentRef = doc(db, 'users', "Nik's",'departments', departmentID)
        await updateDoc(departmentRef, {
            accidents: increment(1)
        })
        
         
        alert('accident was added')
        window.location.reload()
        console.log('Accident reported successfully with involved employees.');
        
    } catch (error) {
        console.error("Error adding accident: ", error);
    }
}

export async function singleAccident(departmentID: string, accidentID: string) {
    try {
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'accidents', accidentID)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
    } catch (error) {
        console.error(error)
        return []
    }
    
}

export async function editAccidents(departmentID: string, accidentID, newData: Partial<Department>) {
    try {
      const docRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'accidents', accidentID);
      
      await updateDoc(docRef, newData);
      
      alert('The department has been updated');
      return true;
    } catch (error) {
      console.error("Error updating department: ", error);
      return false;
    }
  }

export async function deleteAccident(departmentID: string, accidentID:string) {
    try {
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'accidents', accidentID)
        await deleteDoc(docRef)
    
        const departmentRef = doc(db, 'users', "Nik's",'departments', departmentID)
        await updateDoc(departmentRef, {
            employees: increment(-1)
        })
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
                
                return docSnapEmployees.docs.map((item) => ({
                    id: item.id,
                    ...item.data()
                }))
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

export async function editEmployee(departmentID: string, employeeID: string, newData: Partial<Department>) {
    try {
        const docRef = doc(db, 'users', "Nik's", 'departments', departmentID, 'employees', employeeID);
        
        await updateDoc(docRef, newData);
        
        alert('The department has been updated');
        return true;
    } catch (error) {
        console.error("Error updating department: ", error);
        return false;
    }
}


export async function deleteEmployeer(departmentID:string, employeeID:string) {
    try {
        const docRef = doc(db, 'users', "Nik's",'departments', departmentID, 'employees', employeeID)
        await deleteDoc(docRef)
        alert('Employee was deleted')

        const departmentRef = doc(db, 'users', "Nik's",'departments', departmentID)
        await updateDoc(departmentRef, {
            employees: increment(-1)
        })
    } catch (error) {
        console.error(error)
    }
}





export async function addNewEmployee(departmentID: string, name: string, lastName: string, accidents: number, employeeID: string) {
    try {
        if (typeof departmentID !== 'string' || !departmentID) {
            throw new Error('Invalid departmentID');
        }

        // Reference to the employees collection
        const employeesCollectionRef = collection(db, "users", "Nik's", "departments", departmentID, "employees");

        if (!name || !lastName) {
            throw new Error('Name and last name are required');
        }

        if (!employeeID) {
            throw new Error('EmployeeID is required');
        }

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0'); // Ensures 2 digits
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        const year = now.getFullYear();

        const formattedTimestamp = `${day}-${month}-${year}`;

        // Use setDoc() to assign a custom employeeID
        await setDoc(doc(employeesCollectionRef, employeeID), {
            name,
            lastName,
            timestamp: formattedTimestamp,  
            accidents,
            photoURL: '/general/profile.png',
            departmentID,
            employeeID,
        });

        // Update the employee count in the department
        const departmentRef = doc(db, 'users', "Nik's", 'departments', departmentID);
        await updateDoc(departmentRef, {
            employees: increment(1)
        });

        alert('Employee data was created');
        window.location.reload();
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





export async function listAllTime() {
    const collDep = collection(db, 'users', "Nik's", 'departments')
    const getDep = await getDocs(collDep)

    const allAcc = await Promise.all(
        getDep.docs.map(async(dep) => {
            const collAcc = collection(db, 'users', "Nik's", 'departments', dep.id, 'accidents')
            const getAcc = await getDocs(collAcc)
            return getAcc.docs.map((acc) => acc.data().time) 
        })
    )
    return allAcc.flat()
}






