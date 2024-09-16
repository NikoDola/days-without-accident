import { getUser } from '@/firebase/actions';



export default async function ProfilePage() {

  const userInfo  =  await getUser()
  console.log(userInfo)

  return (
    <div>
      <img className='profilePicture' src={userInfo.profilePicture}></img>
      <p className='text-center my-4' >Welcome {userInfo.user_name}</p>
      
    </div>
  );
}

