

import { FormEvent } from 'react';
import  Link  from 'next/link'
import LoginEmail  from '@/components/LoginEmail'
import LoginSocial from '@/components/LoginSocial'

export default function login() {

    async function Log(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    }

    return (
        <main>
               <p className="text-4xl m-0 text-center ">Login</p>
               <p className=" text-center mt-3" >Dont have an account? <Link className="text-blue-500" href='/signup'> Create one!</Link> </p>          
            <div className='formWrapper'>
                <form className='logInSignInForm'>
                    <LoginSocial social={'google'}/>
                    <LoginSocial social={'github'}/>
                </form>
                <p className="bettweenForm my-6">or</p>

                <div className='logInSignInForm'>
                    <LoginEmail/>
                </div>
            </div>
        </main>
    );
}
