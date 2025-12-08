import { TypographySmall } from '@cockpit-app/shared-react-ui';
import { SectionTitle } from './SectionTitle';

export interface SummaryProps {
  summary: string[];
}

function renderTextWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
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
          <TypographySmall>{renderTextWithLinks(text)}</TypographySmall>
        </div>
      ))}
    </section>
  );
}
