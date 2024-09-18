
import Login from '@/components/Login'
import { cookies } from 'next/headers';


export default function Home() {
  
  const getCookie = cookies()
  const userID = getCookie.get('user_id')?.value
  console.log(userID)

  return (
    <main>
      <Login/>
    </main>
  );
}
