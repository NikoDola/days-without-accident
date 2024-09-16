import SignupEmail from '@/components/SignupEmail';
import LoginSocial from '@/components/LoginSocial'
import Link from 'next/link';
export default function Home() {

  

  return (
    <main>
        <p className="text-4xl m-0 text-center ">Signup</p>
        <p className=" text-center mt-3" >Do you have an account? <Link className="text-blue-500" href='/login'> Login!</Link> </p>
        <div className='formWrapper'>
                <form className='logInSignInForm'>
                    <LoginSocial social={'google'}/>
                    <LoginSocial social={'github'}/>
                </form>
                <p className="bettweenForm my-6">or</p>

                <div className='logInSignInForm'>
                    <SignupEmail/>
                </div>
            </div>
        </main>
  );
}
