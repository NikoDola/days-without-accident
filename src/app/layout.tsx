import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

import { Wrapper } from '@/contexts/userContext';
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

// Define metadata using the new API
export const metadata = {
  title: 'My Next.js App',
  icons: {
    icon: '/favicon.ico',
  },
};



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Wrapper>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </Wrapper>
    </html>
  );
}
