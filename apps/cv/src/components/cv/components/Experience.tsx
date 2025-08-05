import { SectionTitle } from './SectionTitle';
import { TypographySmall } from '@cockpit-app/shared-react-ui';

export interface ExperienceItem {
  title: string;
  company: string;
  description: string[];
  details?: string;
  date: string;
  location: string;
}

export interface ExperienceProps {
  experience: ExperienceItem[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section className="mb-4">
      <SectionTitle>EXPERIENCE</SectionTitle>
      {experience.map((item, idx) => (
        <div className="mb-6" key={idx}>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">{item.title}</h4>
            <div className="text-right text-sm text-gray-600">
              <div>{item.date}</div>
              <div>{item.location}</div>
            </div>
          </div>
          <div className="font-semibold text-sm mb-2">{item.company}</div>
          {item.details && <TypographySmall>{item.details}</TypographySmall>}
          <ul className="text-xs space-y-1 ml-4 list-disc">
            {item.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
