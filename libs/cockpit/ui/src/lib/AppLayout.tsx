interface AppLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const AppLayout = ({ children, header }: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {header && <header>{header}</header>}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};
