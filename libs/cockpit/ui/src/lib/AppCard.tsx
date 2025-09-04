import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
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
  disabled?: boolean;
  disabledTooltipText?: string;
}

export function AppCard({
  title,
  description,
  url,
  Icon,
  disabled = false,
  disabledTooltipText,
}: AppCardProps) {
  const cardContent = (
    <Card
      className={`bg-background h-[175px] w-[350px] transition-all ${
        disabled
          ? 'cursor-not-allowed opacity-50 grayscale'
          : 'hover:bg-muted cursor-pointer'
      }`}
    >
      <CardContent className="py-6">
        <div className="flex gap-5">
          <Icon className={`h-10 w-10 ${disabled ? 'opacity-60' : ''}`} />
          <div className="flex-1 pt-2">
            <CardTitle className="pb-2">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (disabled && disabledTooltipText) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-not-allowed" title={disabledTooltipText}>
            {cardContent}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{disabledTooltipText}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (disabled) {
    return <div className="cursor-not-allowed">{cardContent}</div>;
  }

  return (
    <a href={url} className="cursor-pointer">
      {cardContent}
    </a>
  );
}
