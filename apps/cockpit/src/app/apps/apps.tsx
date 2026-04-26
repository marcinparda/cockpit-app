import { AppCard } from '@cockpit-app/cockpit-ui';
import { TypographyH1, TypographyP } from '@cockpit-app/shared-react-ui';
import {
  CheckSquare,
  Database,
  DollarSign,
  User,
  Bot,
  Brain,
} from 'lucide-react';
import { environments } from '@cockpit-app/shared-utils';

const appsList = [
  {
    name: 'Syncthing',
    description:
      'Personal knowledge base synchronization tool. Synchroning: Notes, reviews, summaries, projects.',
    url: environments.brainUrl,
    Icon: Brain,
  },
  {
    name: 'Agent',
    description: 'Talk with chatbot to manage all applications.',
    url: environments.agentUrl,
    Icon: Bot,
  },
  {
    name: 'Twodo',
    description:
      'Track your todo tasks in a collaborative mode. Powered by Vikunja',
    url: environments.twodoUrl,
    Icon: CheckSquare,
  },
  {
    name: 'Actual budget',
    description:
      'Track your expenses and manage your budget effectively with your team. Powered by Actual.',
    url: environments.actualUrl,
    Icon: DollarSign,
  },
  {
    name: 'CV',
    description:
      'Professional CV and resume showcase with detailed experience and skills.',
    url: environments.cvUrl,
    Icon: User,
  },
  {
    name: 'Redis Store',
    description: 'Browse and manage Redis store key-value entries.',
    url: environments.storeUrl,
    Icon: Database,
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
