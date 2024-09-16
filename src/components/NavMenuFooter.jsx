
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from "next/image"

export default async function NavMenuAuth() {
    const cookieStore = cookies()
    const userID = cookieStore.get('user_id')?.value || null
    
    return (
        <nav>
            <ul className="navMenuFooter">
                <Link href={`/${userID}/profile`}>
                    <Image 
                        src='/branding/icons/profile.svg'
                        width={24}
                        height={24}
                        alt="profile icon"
                        className="filter invert brightness-100"
                    />
                </Link>

                <Link href={`/${userID}/search`}>
                    <Image 
                        src='/branding/icons/search.svg'
                        alt="search icon"
                        width={24}
                        height={24}
                        className="filter invert brightness-100"
                    />
                </Link>

                <Link href={`/${userID}/add`}>
                    <Image 
                        src='/branding/icons/add.svg'
                        width={24}
                        height={24}
                        alt="add icon"
                        className="filter invert brightness-100"
                    />
                </Link>

                <Link href={`/${userID}/documents`}>
                    <Image 
                        src='/branding/icons/documents.svg'
                        width={24}
                        height={24}
                        style={{width:'20px'}}
                        alt="documents icon"
                        className="filter invert brightness-100"
                    />
                </Link>

                <Link href={`/${userID}/settings`}>
                    <Image 
                        src='/branding/icons/settings.svg'
                        width={24}
                        height={24}
                        alt="settings icon"
                        className="filter invert brightness-100"
                    />
                </Link>
            </ul>
        </nav>
    )
}
