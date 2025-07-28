import { AppCard } from '@cockpit-app/cockpit-ui';
import { CheckSquare, DollarSign } from 'lucide-react';

const appsList = [
  {
    name: 'Todo App',
    description: 'A simple todo application to manage your tasks.',
    url: '/todo',
    Icon: CheckSquare,
  },
  {
    name: 'Budget Tracker',
    description: 'Track your expenses and manage your budget effectively.',
    url: 'https://budget.parda.me',
    Icon: DollarSign,
  },
];

export default function AppsPage() {
  return (
    <div className="flex items-center justify-center">
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
  );
}
