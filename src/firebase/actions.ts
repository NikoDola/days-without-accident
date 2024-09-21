import { collection, setDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Function to add a new department with a custom ID 
export async function addDepartment(shortName: string, fullName: string, employees: number = 0, accidents: number = 0): Promise<string | null> {
    try {
        const docRef = doc(db, "users", "Nik's", "departments", shortName); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            throw new Error(`Document with ID "${shortName}" already exists.`);
        }

        await setDoc(docRef, {
            shortName,
            fullName,
            employees,
            createdAt: new Date(),
        });

        console.log("Document written with custom ID: ", shortName);
        return shortName;
    } catch (error) {
        console.error("Error adding document: ", error.message || error);
        return error.message || null;
    }
}


// Function to get all departments 
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


// Function to delete a department by its ID
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

// Function gettingCounter Info
export async function getCounter() {
    try {
        const collRef = collection(db, "users" )
        const getDocsRef = await getDocs(collRef)
    
        const docSnap = getDocsRef.docs.map((item)=>({
            id: item.id,
            ...item.data()
        }))
        return docSnap
    } catch (error) {
        console.error(error)
        return []
    }
    
}

export async function addAccident(department, time, people, status,  severityAssessment, description) {
    const docRef = doc(db, 'users', "Nik's", "departments", department,'accidents', time )
    await setDoc(docRef, {
        time,
        people,
        status,
        severityAssessment,
        description,
    })
}