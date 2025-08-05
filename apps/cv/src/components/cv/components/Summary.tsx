import { TypographySmall } from '@cockpit-app/shared-react-ui';
import { SectionTitle } from './SectionTitle';

export interface SummaryProps {
  summary: string[];
}

/**
 * Summary section for CV
 */
export function Summary({ summary }: SummaryProps) {
  return (
    <section className="mb-4">
      <SectionTitle>SUMMARY</SectionTitle>
      {summary.map((text, idx) => (
        <div key={idx}>
          <TypographySmall>{text}</TypographySmall>
        </div>
      ))}
    </section>
  );
}
