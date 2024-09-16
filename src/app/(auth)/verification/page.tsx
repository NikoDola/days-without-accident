"use server";
import Link from 'next/link';

export default async function YouAreVerify() {
    return (
        <main>
            <p>You are verified</p>
            <p>You can now <Link href="/login">login</Link> with your new account</p>
        </main>
    );
}
