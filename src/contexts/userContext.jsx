"use client";


import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import Cookies from 'js-cookie'; // Correct import

export const UserContext = createContext();

export function Wrapper({ children }) {
    const [errorCode, setErrorCode] = useState('');
    const [user, setUser] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const authChangeHandler = (user) => {
            if (user) {
                setUser({ id: user.uid, email: user.email });
                Cookies.set('user_id', user.uid, { expires: 360 * 100 });
            } else {
                Cookies.remove('user_id');
                setUser(null);
            }
        };

      

        const unsubscribe = onAuthStateChanged(auth, authChangeHandler);
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Logged in:", user.uid);
            router.push('/admin')
        } catch (error) {
            console.log(error);
            
            // Process the error code
            const message = error.code;
            const removeAuth = message.replace('auth/', '');
            const errorCode = removeAuth.replace('-', ' ');
            
            setErrorCode(errorCode); // Set the processed error code
        }
        };
      

      const logoutUser =  async () =>{
        await signOut(auth)
        router.push('/login')
    }

    return (
        <UserContext.Provider value={{ user, errorCode, login, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}



export function useUser() {
    return useContext(UserContext);
}
