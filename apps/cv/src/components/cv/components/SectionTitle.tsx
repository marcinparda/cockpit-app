import React from 'react';

export interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="mb-3 border-b-2 border-black pb-1 text-lg font-bold uppercase">
      {children}
    </h3>
  );
}
