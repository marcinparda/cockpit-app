import { Badge } from '@cockpit-app/shared-react-ui';
import { Skill } from '../../../types/cv.types';
import { SectionTitle } from './SectionTitle';

export interface SkillsProps {
  skills: Skill[];
}

/**
 * Skills section for CV
 */
export function Skills({ skills }: SkillsProps) {
  return (
    <section className="mb-4">
      <SectionTitle>SKILLS</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
