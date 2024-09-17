"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "@/firebase";
import { addUserData } from "@/firebase/actions";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Cookies from 'js-cookie'; // Correct import

export const UserContext = createContext();

export function Wrapper({ children }) {
    const [errorCode, setErrorCode] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authChangeHandler = (user) => {
            if (user) {
                setUser(user);
                addUserData({ id: user.uid, email: user.email });
            } else {
                // Handle logged-out state, don't call addUserData(null)
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

    return (
        <UserContext.Provider value={{ user, errorCode, login }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
