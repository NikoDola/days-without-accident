"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { auth, provider } from "@/firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';

export const UserContext = createContext();

export function Wrapper({ children }) {
  const [user, setUser] = useState(null);
  const [errorCode, setErrorCode] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to control rendering
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ id: user.uid, email: user.email });
        Cookies.set('user_id', user.uid, { expires: 360 * 100 });
      } else {
        Cookies.remove('user_id');
        setUser(null);
      }
      setLoading(false); // Stop loading once user state is determined
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider.google);
      const user = result.user;
      setUser({ id: user.uid, email: user.email });
      Cookies.set('user_id', user.uid, { expires: 360 * 100 });
      router.push('/admin'); // Redirect to admin page after successful login
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setErrorCode(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser({ id: user.uid, email: user.email });
      Cookies.set('user_id', user.uid, { expires: 360 * 100 });
      router.push('/admin/departments');
    } catch (error) {
      console.error("Login error:", error);
      const message = error.code;
      const removeAuth = message.replace('auth/', '');
      const errorCode = removeAuth.replace('-', ' ');
      setErrorCode(errorCode);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Cookies.remove('user_id');
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, errorCode, login, logoutUser, googleLogin, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
