"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { auth, provider } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie'; // Correct import

export const UserContext = createContext();

export function Wrapper({ children }) {
  const [user, setUser] = useState(null);
  const [errorCode, setErrorCode] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to control rendering
  const router = useRouter();
  const pathname = router.pathname

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
      setUser(user); // Set user state
      console.log("User logged in:", user);
      router.push('/admin'); // Redirect to admin page after successful login
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setErrorCode(error.message); // Set the error message for display
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in:", user.uid);
      setUser({ id: user.uid, email: user.email });
      router.push('/admin');
    } catch (error) {
      console.error("Login error:", error);

      // Process the error code
      const message = error.code;
      const removeAuth = message.replace('auth/', '');
      const errorCode = removeAuth.replace('-', ' ');

      setErrorCode(errorCode); // Set the processed error code
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state after logging out
      Cookies.remove('user_id'); // Remove the user ID cookie
      router.push('/login'); // Redirect to login page
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
