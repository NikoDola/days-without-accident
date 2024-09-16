// src/app/layout.tsx

import { ReactNode } from 'react';
import { WrapFunction } from '@/contexts/userContext';
import { Inter } from 'next/font/google';
import NavMenuAuth from '@/components/NavMenuAuth'
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <WrapFunction>
      <html lang="en">
        <body className={inter.className}>
        <NavMenuAuth />
          {children}
        </body>
      </html>
    </WrapFunction>
  );
}
