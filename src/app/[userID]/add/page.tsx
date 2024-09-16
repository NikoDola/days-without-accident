
import { db } from "@/firebase";
import { cookies } from "next/headers";
import {collection, doc, getDocs} from 'firebase/firestore'
import WordSearcher from "@/components/WordSearcher";;
import { getLanguages, getSnippets } from '@/firebase/actions'



export default async function asyncParentComponent() {

    const languages = await getLanguages()
    const snippets = await getSnippets()

        return (
            <div>
                {snippets.map((snippet)=>(
                    <p key={snippet.id}>{snippet.title}</p>
                ))}
        {languages.map((language) => (
            <p key={language.id}>{language.id}</p>
        ))}
                <form>
        
                </form>
            
            </div>
        );
    }
