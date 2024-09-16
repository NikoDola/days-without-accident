"use server"
import { db, storage } from '@/firebase'
import { cookies } from 'next/headers'
import { doc, getDoc, collection, getDocs, Timestamp } from 'firebase/firestore'
import { use } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

interface UserType {
    id: string;
    email: string;
    createAt: Timestamp;
    lastOnline: string;
    profilePicture:string;
    [key: string]: any;  // Optional extra fields
  }

interface LanguagesType{
    id: string;
    name: string;
    link: string;
    image: string;
}

interface SnippetType{
    id: string;
    title: string;
    language:string;
    framework:string;
    api:string;
    sdk: string;
    link: string;
    createAt: Timestamp;
    byUser: string;
}


//getting User
export async function getUser(): Promise<UserType | {}> {
    const cookiesStore = cookies()
    const userID = cookiesStore.get('user_id')?.value
    if (!userID) return []

    const docRef = doc(db, 'users', userID)
    const gettingUser = await getDoc(docRef)
    return gettingUser.data() || {}
}


//getting Languages

export async function getLanguages(): Promise<LanguagesType[]> {
    const cookiesStore = cookies()
    const userID = cookiesStore.get('user_id')?.value
    const docRef = doc(db, 'users', userID)
    const collRef = collection(docRef, 'languages')
    const languagesSnap = await getDocs(collRef)

    try {
        return languagesSnap.docs.map((element) => ({
            id: element.id,
            ...element.data()
        })) as LanguagesType[]
    } catch (error) {
        console.error('error getting users' + {error})
        return []
    }
  
}

//get Snippets
export async function getSnippets(): Promise<SnippetType[]> {
    const cookiesStore = cookies()
    const userID = cookiesStore.get('user_id')?.value
    const docRef = doc(db, 'users', userID)
    const colRef = collection(docRef, 'snippets')
    const snippetSnap = await getDocs(colRef)

    try {
        return snippetSnap.docs.map((element)=>({
            id: element.id,
            ...element.data()
        })) as SnippetType[]
    } catch (error) {
        console.log('not able to get snippets' + {error})
        console.log('fixing')
        return[]
    }
}

//Get All Image Avatars 
export async function getAllImages() {
    try {
        const imagesRef = ref(storage, 'avatars'); 
        const imageList = await listAll(imagesRef);
        const urls = await Promise.all(
        imageList.items.map((itemRef) => getDownloadURL(itemRef)));
        return urls;
    } catch (error) {
        console.error(error)
    }
  }

//Random image Picker
// In your firebase/actions.js or relevant file
export async function randomAvatar() {
    const imageRef = await getAllImages();
    const imageURL = imageRef.map((index) => index); // Assuming getAllImages() returns an array of URLs
    const randomIndex = Math.floor(Math.random() * imageURL.length);
    return imageURL[randomIndex];
}
