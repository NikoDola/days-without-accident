
import { db } from '@/firebase';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import Login from '@/components/Login'
import {LogOut} from '@/components/Login'
import { cookies } from 'next/headers';




export default function Home() {
  
  const getCookie = cookies()
  const userID = getCookie.get('user_id')?.value

  return (
    <main>
      <Login/>
    </main>
  );
}
