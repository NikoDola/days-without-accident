import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  
  const getCookie = cookies()
  const userID = getCookie.get('user_id')?.value

  return (
   
    <main>
       {userID ?
       <form>
        <input name='title' placeholder='title'/>
        <button className='mainButton'>Report Accident</button>
      </form> :
      redirect('/login')
      }
    </main>
  );
}
