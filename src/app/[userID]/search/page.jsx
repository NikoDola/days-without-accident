"use client"


export default function SearchPage({ params }) {

  return (
    <div>
      <p>Search</p>
    </div>
  );
}


// import { cookies } from 'next/headers';
// import { getDocs, doc, collection } from 'firebase/firestore';
// import { db } from '@/firebase'; // Import Firebase client config

// export default async function MySnippets() {
//   // Fetch the cookie from the request (server-side)
//   const cookieStore = cookies();
//   const userUid = cookieStore.get('user_id')?.value || null;

//   // Handle case where no user is logged in
//   if (!userUid) {
//     return (
//       <main>
//         <p>No user is logged in.</p>
//       </main>
//     );
//   }

//   // Fetch user's snippets subcollection from Firestore using the UID from the cookie
//   try {
//     const userDocRef = doc(db, 'users', userUid);
//     const snippetsCollectionRef = collection(userDocRef, 'snippets'); // Reference to the subcollection

//     // Get all documents in the 'snippets' subcollection
//     const snippetsSnap = await getDocs(snippetsCollectionRef);

//     if (snippetsSnap.empty) {
//       return (
//         <main>
//           <p>No snippets found for this user.</p>
//         </main>
//       );
//     }

//     // Collect and render snippets data
//     const snippets = snippetsSnap.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return (
//       <main>

        
//           {snippets.map((snippet) => (
//             <div key={snippet.id} >
//                 <p >{snippet.title}</p> 
//                 <p >{snippet.description}</p>
//                 <p>{snippet.code}</p>
//             </div>
            
//           ))}
       
//       </main>
//     );
//   } catch (error) {
//     console.error('Error fetching snippets:', error);
//     return (
//       <main>
//         <p>Error fetching user snippets.</p>
//       </main>
//     );
//   }
// }
