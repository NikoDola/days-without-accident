"use client";

import { useState } from "react";
import { useUser } from "@/contexts/userContext";
import "./css-components/login.css";
import { useRouter } from "next/navigation";


export default function Login() {
  const [visualPassword, setVisualPassword] = useState("password");
  const [credential, setCredential] = useState({
    userName: "",
    password: ""
  });

  const router = useRouter()
  
  const { login, errorCode, user, googleLogin  } = useUser();

  user && router.push('/admin/departments')

  const handleLogin = () => {
    login(credential.userName, credential.password);
  };

  const userOnChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      userName: e.target.value
    }));
  };

  const passwordOnChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      password: e.target.value // Fixed the key name from passwordName to password
    }));
  };

  const handleVisualPassword = () => {
    setVisualPassword((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <div className="mainLoginWrapper">
      <div className="login">
        
        <img className="logo mx-auto" src="branding/logo/niks_logo.svg" alt="Logo" />
        <div className="flex items-center gap-4 mb-6">
            <hr className="flex-grow border-t border-black" />
            <p className="text-black ">Login with email</p>
            <hr className="flex-grow border-t border-black" />
          </div>
        <form onSubmit={(e) => {e.preventDefault(); handleLogin(); }}className="logInSignInForm">

          {/* password */}
          <div className="relative">
            <input onChange={userOnChange} placeholder="Email" className="loginInput"/>
            <img className="formIconsImage" src="branding/logo/niks_user.png" alt="User Icon"/>
          </div>

          {/* email */}
          <div className="relative">
            <input
              onChange={passwordOnChange} className="loginInput" placeholder="password" autoComplete="off" type={visualPassword}
            />
            <img
              className="formIconsImage" src="branding/logo/niks_password.png" alt="Password Icon"/>
            <img onClick={handleVisualPassword} className="eyeIcon" src={visualPassword === "password" ? "branding/icons/blind.svg": "branding/icons/visual.svg" } alt="Toggle Password Visibility"/>
          </div>
          {errorCode && <p className="text-red-500">{errorCode}</p>}
          <button className="mainButton mt-2" type="submit">Login</button>
          <div className="flex items-center gap-4">
            <hr className="flex-grow border-t border-black" />
            <p className="text-black">or</p>
            <hr className="flex-grow border-t border-black" />
          </div>
    
          <div className="buttonSignUp">
            <img src="general/google.svg"/>
            <p onClick={googleLogin}>Login with google</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LogOut(){
 const {logoutUser} = useUser()


 return(
  <button onClick={logoutUser}>Logout</button>
 )
}
