import { Diamond } from 'lucide-react';
import { TypographySmall } from '@cockpit-app/shared-react-ui';

export interface Achievement {
  title: string;
  description: string;
}

export interface KeyAchievementsProps {
  achievements: Achievement[];
}

/**
 * Key Achievements section for CV
 */
export function KeyAchievements({ achievements }: KeyAchievementsProps) {
  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold mb-3 print:mb-2 pb-1 border-b-2 border-black">
        KEY ACHIEVEMENTS
      </h3>
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
