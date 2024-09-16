"use client";

import { useUser } from '@/contexts/userContext'
import { useState, useEffect } from "react";
import Image from 'next/image';


export default function SignupEmail() {
  const [showPassword, setShowPassword] = useState(false)
  const { signUpWithEmail, error } = useUser();
  const handleShowPassword = () =>{
    showPassword ? setShowPassword(false)  : setShowPassword(true)
    console.log(showPassword)
}

  async function getFormData(event: any) {
    try {
      event.preventDefault(); // Prevent the form from reloading the page
      const formData = new FormData(event.target); // Get form data
      const email = formData.get('email') as string;
      const pass = formData.get('password') as string;
      const confPass = formData.get('confirmPassword') as string;
  
      await signUpWithEmail(email, pass, confPass);
  
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
      <form onSubmit={getFormData} className='logInSignInForm'>
        <input type="text" name="email" placeholder="Email" required />
        <div className="password">
            <div onClick={handleShowPassword} >
                <Image className="icon cursor-pointer" src={showPassword ? '/branding/icons/visual.svg' : '/branding/icons/blind.svg'} height={16} width={16} alt="visual"/>
            </div>
            <input className="w-full" type={showPassword ? 'text': 'password'} name="password" placeholder="password" required />
            </div>
        <input type={showPassword ? 'text': 'password'} name="confirmPassword" placeholder="Confirm Password" required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='mainButton' type="submit">Sign Up</button>
    </form>
  );
}
