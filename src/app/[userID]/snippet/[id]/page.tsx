import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Import Firebase client config

const SnippetPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        // Fetch the snippet details from Firestore
        const snippetDocRef = doc(db, 'users', 'your-user-id', 'snippets', id); // Replace 'your-user-id' with the actual user ID
        const snippetDoc = await getDoc(snippetDocRef);

        if (!snippetDoc.exists()) {
            return <p>Snippet not found.</p>;
        }

        const snippet = snippetDoc.data();

        return (
            <main>
                <h1>{snippet.title}</h1>
                <p>{snippet.description}</p>
                <p>Language: {snippet.language}</p>
                <p>Framework: {snippet.framework}</p>
                <p>Date: {snippet.date}</p>
                <p>Time: {snippet.time}</p>
            </main>
        );
    } catch (error) {
        console.error('Error fetching snippet:', error);
        return <p>Error fetching snippet details.</p>;
    }
};

export default SnippetPage;
