interface TypographySmallProps {
  children?: React.ReactNode;
}

export function TypographySmall({ children }: TypographySmallProps) {
  return <small className="text-sm leading-none">{children}</small>;
}
