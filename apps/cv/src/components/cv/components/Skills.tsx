import { Badge } from '@cockpit-app/shared-react-ui';

export interface SkillsProps {
  skills: string[];
}

/**
 * Skills section for CV
 */
export function Skills({ skills }: SkillsProps) {
  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold mb-3 print:mb-2 pb-1 border-b-2 border-black">
        SKILLS
      </h3>
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
