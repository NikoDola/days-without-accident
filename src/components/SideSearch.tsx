// components/SideSearch.js
"use client"
import { useUser } from "@/contexts/userContext"
import { db } from "@/firebase"
import { collection, doc, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

export default function GettingData() {
    const [languageList, setLanguageList] = useState([]);
    const { user } = useUser();
    const [storingData, setStoringData] = useState('abee');

    const handleOnClick = (item) => {
        const selectedName = item.name; 
        setStoringData(selectedName);
    };

    useEffect(() => {
        const fetchingData = async () => {
            if (!user) return; 

            try {
                // Reference the specific user's document
                const userDocRef = doc(db, 'users', user.uid); 
                const collRef = collection(userDocRef, 'languages');
                const snapShot = await getDocs(collRef);
                const snapShotTransferData = snapShot.docs.map((item) => ({
                    id: item.id, 
                    ...item.data()
                }));

                setLanguageList(snapShotTransferData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchingData();
    }, [user]);

    return (
        <form>
            <p>{storingData}</p>
            <ul>
                {languageList.length > 0 ? (
                    languageList.map((item) => (
                        <li
                            onClick={() => handleOnClick(item)} // Handle item selection
                            key={item.id}
                        >
                            {item.name}
                        </li>
                    ))
                ) : (
                    <p>No languages found</p>
                )}
            </ul>
        </form>
    );
}
