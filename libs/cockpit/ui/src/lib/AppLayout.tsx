interface AppLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const AppLayout = ({ children, header }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      {header && <header>{header}</header>}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};
