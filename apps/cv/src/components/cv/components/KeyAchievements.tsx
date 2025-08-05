import { Diamond } from 'lucide-react';
import { TypographySmall } from '@cockpit-app/shared-react-ui';
import { SectionTitle } from './SectionTitle';

export interface Achievement {
  title: string;
  description: string;
}

export interface KeyAchievementsProps {
  achievements: Achievement[];
}

export function KeyAchievements({ achievements }: KeyAchievementsProps) {
  return (
    <section className="mb-4">
      <SectionTitle>KEY ACHIEVEMENTS</SectionTitle>
      <div>
        {achievements.map((achievement, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center gap-2">
              <Diamond className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
              <h4 className="font-semibold text-sm">{achievement.title}</h4>
            </div>
            <TypographySmall>{achievement.description}</TypographySmall>
          </div>
        ))}
      </div>
    </section>
  );
}
