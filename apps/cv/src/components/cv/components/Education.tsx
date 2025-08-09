import { SectionTitle } from './SectionTitle';

export interface EducationItem {
  degree: string;
  university: string;
  years: string;
}

export interface EducationProps {
  education: EducationItem[];
}

/**
 * Education section for CV
 */
export function Education({ education }: EducationProps) {
  return (
    <section className="mb-4">
      <SectionTitle>EDUCATION</SectionTitle>
      {education.map((item, idx) => (
        <div className="mb-4" key={idx}>
          <h4 className="text-base font-bold">{item.degree}</h4>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{item.university}</div>
            <div className="text-sm text-gray-600">{item.years}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
