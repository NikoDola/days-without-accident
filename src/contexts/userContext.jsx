"use client";


import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "@/firebase";

import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import Cookies from 'js-cookie'; // Correct import

export const UserContext = createContext();

export function Wrapper({ children }) {
    const [errorCode, setErrorCode] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authChangeHandler = (user) => {
            if (user) {
                setUser(user);
                setUser({ id: user.uid, email: user.email });
                Cookies.set('user_id', user.uid, { expires: 360 * 100});
                
            } else {
                Cookies.remove('user_id');
                setUser(null);
            }
        };

      

        const unsubscribe = onAuthStateChanged(auth, authChangeHandler);
        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
      
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in:", user.uid);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error logging in:", errorMessage);
          });
      };

      const logoutUser = () =>{
        signOut(auth)
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
