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
      <div className="grid grid-cols-1 print:grid-cols-2 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex gap-3 print:break-inside-avoid">
            <Diamond className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-2">
                {achievement.title}
              </h4>
              <TypographySmall>{achievement.description}</TypographySmall>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
