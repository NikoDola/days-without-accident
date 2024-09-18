import { collection, setDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Function to add a new department with a custom ID
export async function addDepartment(name: string, employees: number = 0): Promise<string | null> {
    try {
        const docRef = doc(db, "departments", name);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            throw new Error(`Document with ID "${name}" already exists.`);
        }

        await setDoc(docRef, {
            name,
            employees,
            createdAt: new Date(),
        });

        console.log("Document written with custom ID: ", name);
        return name;
    } catch (error) {
        console.error("Error adding document: ", error.message || error);
        return error.message || null;
    }
}

// Function to get all departments
export async function getAllDepartments(): Promise<any[]> {
    try {
        const collRef = collection(db, 'departments');
        const docSnap = await getDocs(collRef);

        // Map over the documents and return an array of objects with id and data
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
        const docRef = doc(db, "departments", id);
        await deleteDoc(docRef);
        console.log("Document deleted with ID: ", id);
    } catch (error) {
        console.error("Error deleting document: ", error.message || error);
    }
}
