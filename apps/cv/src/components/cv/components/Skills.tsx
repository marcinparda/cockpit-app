import { Badge } from '@cockpit-app/shared-react-ui';
import { SectionTitle } from './SectionTitle';

export interface SkillsProps {
  skills: string[];
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
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
}
