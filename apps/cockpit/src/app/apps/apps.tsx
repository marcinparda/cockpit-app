import { AppCard } from '@cockpit-app/cockpit-ui';
import { TypographyH1, TypographyP } from '@cockpit-app/shared-react-ui';
import { CheckSquare, DollarSign, User } from 'lucide-react';
import { environments } from '@cockpit-app/shared-utils';

const appsList = [
  {
    name: 'Todo',
    description: 'Todo application to manage tasks between multiple people.',
    url: environments.todoUrl,
    Icon: CheckSquare,
  },
  {
    name: 'CV',
    description: 'Professional CV and resume showcase with detailed experience and skills.',
    url: environments.cvUrl,
    Icon: User,
  },
  {
    name: 'Budget Tracker',
    description:
      'Track your expenses and manage your budget effectively with your team.',
    url: environments.budgetUrl,
    Icon: DollarSign,
    disabled: true,
    disabledTooltipText:
      'This app is currently work in progress and not available yet.',
  },
];

export default function AppsPage() {
  return (
    <div>
      <div className="mb-4">
        <TypographyH1>Your apps</TypographyH1>
      </div>
      <div className="mb-4">
        <TypographyP>
          Here are the list of all cockpit apps that you have access to:
        </TypographyP>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {appsList.map((project) => (
          <AppCard
            key={project.name}
            title={project.name}
            description={project.description}
            url={project.url}
            Icon={project.Icon}
            disabled={project.disabled}
            disabledTooltipText={project.disabledTooltipText}
          />
        ))}
      </div>
    </div>
  );
}
