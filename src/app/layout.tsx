import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // Import the Head component
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>My Next.js App</title>
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
