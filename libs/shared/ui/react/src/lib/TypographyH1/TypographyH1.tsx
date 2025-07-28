interface TypographyH1Props {
  children?: React.ReactNode;
}

export function TypographyH1({ children }: TypographyH1Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}
