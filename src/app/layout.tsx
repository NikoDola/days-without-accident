import { ReactNode } from 'react';
import {Roboto} from "next/font/google"
import './globals.css';

import { Wrapper } from '@/contexts/userContext';
import NavBar from '@/components/NavBar';

// Specify the font weight(s) and style explicitly
const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '700'],
  variable: '--font-roboto'

})

// Define metadata using the new API
export const metadata = {
  title: 'Incident Counter',
  icons: {
    icon: '/Managment App',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Wrapper>
        <body className={`${roboto_init} antialiased`}>
          <NavBar />
          {children}
        </body>
      </Wrapper>
    </html>
  );
}
