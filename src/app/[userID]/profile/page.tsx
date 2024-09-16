import { getUser } from '@/firebase/actions';



export default async function ProfilePage() {

  const userInfo  =  await getUser()
  console.log(userInfo)

  return (
    <div>
      <p>Hello</p>
      
    </div>
  );
}

