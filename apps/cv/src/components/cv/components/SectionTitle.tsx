import React from 'react';

export interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="text-lg font-bold mb-3 pb-1 border-b-2 border-black uppercase">
      {children}
    </h3>
  );
}
