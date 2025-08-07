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
    <nav className="flex items-center px-4 h-14 bg-muted/80 dark:bg-muted text-foreground border-b border-border backdrop-blur">
      <div className="flex items-center mr-8">
        {BrandIcon && <BrandIcon size={24} className="mr-2 text-primary" />}
        <span className="font-bold text-lg">{brandName}</span>
      </div>

      <div className="flex space-x-6 flex-1">
        {navLinks.map(({ name, href, external }) =>
          external ? (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground no-underline hover:text-primary hover:underline transition-colors"
            >
              {name}
            </a>
          ) : (
            <a
              key={name}
              href={href}
              className="text-foreground no-underline hover:text-primary hover:underline transition-colors"
            >
              {name}
            </a>
          )
        )}
      </div>
      {rightContent && (
        <div className="ml-auto flex items-center">{rightContent}</div>
      )}
    </nav>
  );
}
