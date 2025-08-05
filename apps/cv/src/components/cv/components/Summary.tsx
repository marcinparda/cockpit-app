import { TypographySmall } from '@cockpit-app/shared-react-ui';

export function Summary() {
  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold pb-1 border-b-2 border-black mb-3 print:mb-2">
        SUMMARY
      </h3>
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
