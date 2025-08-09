import { LucideProps } from 'lucide-react';
import { ReactNode } from 'react';

export interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

interface TopNavBarProps {
  brandName?: string;
  BrandIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  /**
   * Navigation links to display in the top navigation bar.
   * Each link can be internal or external.
   */
  navLinks: NavLink[];
  /**
   * Optional content to display on the right side of the navigation bar.
   */
  rightContent?: ReactNode;
}

export function TopNavBar({
  navLinks,
  rightContent,
  BrandIcon,
  brandName,
}: TopNavBarProps) {
  return (
    <nav className="bg-muted/80 dark:bg-muted text-foreground border-border flex h-14 items-center border-b px-4 backdrop-blur">
      <div className="mr-8 flex items-center">
        {BrandIcon && <BrandIcon size={24} className="text-primary mr-2" />}
        <span className="text-lg font-bold">{brandName}</span>
      </div>

      <div className="flex flex-1 space-x-6">
        {navLinks.map(({ name, href, external }) =>
          external ? (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary no-underline transition-colors hover:underline"
            >
              {name}
            </a>
          ) : (
            <a
              key={name}
              href={href}
              className="text-foreground hover:text-primary no-underline transition-colors hover:underline"
            >
              {name}
            </a>
          ),
        )}
      </div>
      {rightContent && (
        <div className="ml-auto flex items-center">{rightContent}</div>
      )}
    </nav>
  );
}
