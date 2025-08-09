import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from '@cockpit-app/shared-react-ui';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface AppCardProps {
  title: string;
  description: string;
  url: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

export function AppCard({ title, description, url, Icon }: AppCardProps) {
  return (
    <a href={url} className="cursor-pointer">
      <Card className="bg-background hover:bg-muted w-[350px] transition-all">
        <CardContent className="py-6">
          <div className="flex gap-5">
            <Icon className="h-10 w-10" />
            <div className="flex-1 pt-2">
              <CardTitle className="pb-2">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
