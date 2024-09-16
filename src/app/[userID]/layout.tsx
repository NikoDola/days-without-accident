// app/(profile)/layout.tsx
import React from 'react';
import { ReactNode } from 'react';
import NavMenuFooter from '@/components/NavMenuFooter'


interface LayoutProps {
  children: ReactNode;
}

const ProfileLayout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    <div>
      <main>{children}</main>
      <NavMenuFooter/>
    </div>
  );
};

export default ProfileLayout;
