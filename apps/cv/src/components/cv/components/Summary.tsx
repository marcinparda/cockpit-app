import { TypographySmall } from '@cockpit-app/shared-react-ui';
import { SectionTitle } from './SectionTitle';

export function Summary() {
  return (
    <section className="mb-4">
      <SectionTitle>SUMMARY</SectionTitle>
      <div>
        <TypographySmall>
          Specialist with over 5 years of experience, including over 1.5 years
          as a senior developer. Acting as a code mentor and technical
          recruiter. Regular frontend and seasoned speaker at IT meetings and
          blogger. Active participant in events such as Advent of Code and
          hackathons. More about me: https://www.parda.me/work
        </TypographySmall>
      </div>
      <div>
        <TypographySmall>
          (CV has more than one page, please scroll)
        </TypographySmall>
      </div>
    </section>
  );
}
