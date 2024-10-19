import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import './globals.css';

import { Wrapper } from '@/contexts/userContext';
import NavBar from '@/components/NavBar';

// Specify the font weight(s) and style explicitly
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // You can add other weights like '100', '300', etc., if needed
  style: ['normal'], // You can also add 'italic' if needed
});

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
        <body className={roboto.className}>
          <NavBar />
          {children}
        </body>
      </Wrapper>
    </html>
  );
}
