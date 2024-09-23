import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Counter from '@/components/Counter';


export default function Home() {
  
  const getCookie = cookies()
  const userID = getCookie.get('user_id')?.value

  return (
   
    <main>
       <Counter/>
    </main>
  );
}
