import React from 'react';

type SvgProps = React.SVGProps<SVGSVGElement>;

export function PlusIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
      <path d="M8 3v10M3 8h10"/>
    </svg>
  );
}

export function SendIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/>
    </svg>
  );
}

export function SearchIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
      <circle cx="7" cy="7" r="4.5"/>
      <path d="m10.5 10.5 3 3"/>
    </svg>
  );
}

export function ChevronIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m4 6 4 4 4-4"/>
    </svg>
  );
}

export function DotsIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" {...p}>
      <circle cx="3.5" cy="8" r="1.2"/>
      <circle cx="8" cy="8" r="1.2"/>
      <circle cx="12.5" cy="8" r="1.2"/>
    </svg>
  );
}

export function CheckIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m3.5 8.5 3 3 6-7"/>
    </svg>
  );
}

export function PencilIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 2.5 13.5 5 5 13.5H2.5V11z"/>
    </svg>
  );
}

export function TrashIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.5 9h5l.5-9"/>
    </svg>
  );
}

export function SparkleIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" {...p}>
      <path d="M8 2.5v3M8 10.5v3M2.5 8h3M10.5 8h3M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2"/>
    </svg>
  );
}

export function DocIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" {...p}>
      <path d="M4 2h5l3 3v9H4z"/>
      <path d="M9 2v3h3"/>
    </svg>
  );
}

export function GlobeIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
      <circle cx="8" cy="8" r="5.5"/>
      <path d="M2.5 8h11M8 2.5c2 2 2 9 0 11M8 2.5c-2 2-2 9 0 11"/>
    </svg>
  );
}

export function AttachIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10.5 5.5 6 10a2 2 0 1 0 2.8 2.8l4.7-4.7a3.5 3.5 0 0 0-5-5L3.8 7.8"/>
    </svg>
  );
}

export function MenuIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
      <path d="M2.5 5h11M2.5 8h11M2.5 11h11"/>
    </svg>
  );
}

export function LogoIcon(p: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="var(--color-accent)"/>
      <path d="M8 15.5 12 7l4 8.5M9.5 13h5" stroke="var(--color-accent-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
