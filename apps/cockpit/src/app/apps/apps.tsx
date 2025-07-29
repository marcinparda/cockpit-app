import { AppCard } from '@cockpit-app/cockpit-ui';
import { TypographyH1, TypographyP } from '@cockpit-app/shared-react-ui';
import { CheckSquare, DollarSign } from 'lucide-react';
import { environments } from '@cockpit-app/shared-utils';

const appsList = [
  {
    name: 'Todo App',
    description: 'A simple todo application to manage your tasks.',
    url: environments.todoUrl,
    Icon: CheckSquare,
  },
  {
    name: 'Budget Tracker',
    description: 'Track your expenses and manage your budget effectively.',
    url: environments.budgetUrl,
    Icon: DollarSign,
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
          Here are the list of cockpit apps that you have access to:
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
          />
        ))}
      </div>
    </div>
  );
}
