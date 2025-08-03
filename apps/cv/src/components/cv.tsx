/**
 * CV component for Marcin Parda
 * Replicates the look and content of the PDF CV using shadcn UI and Tailwind CSS
 */
import {
  Card,
  CardHeader,
  CardContent,
  Badge,
  Separator,
} from '@cockpit-app/shared-react-ui';
/**
 * CV component displaying professional profile, skills, achievements, experience, education, and projects.
 */
export function CV() {
  return (
    <div className="max-w-3xl mx-auto bg-background text-foreground font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marcin Parda</h1>
          <p className="text-lg font-semibold text-muted-foreground">
            Senior Frontend Developer with Python
          </p>
        </div>
        <div className="mt-2 md:mt-0 text-sm text-right space-y-1">
          <div>
            <span role="img" aria-label="phone">
              📞
            </span>{' '}
            48 576 259 548
          </div>
          <div>
            <span role="img" aria-label="email">
              ✉️
            </span>{' '}
            marcin98parda@gmail.com
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/marcinparda/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              LinkedIn
            </a>
          </div>
          <div>
            <span role="img" aria-label="location">
              📍
            </span>{' '}
            Warsaw, Poland
          </div>
        </div>
      </div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p className="text-base text-muted-foreground">
          Specialist with over 5 years of experience, including over 1.5 years
          as a senior developer. Acting as a code mentor and technical
          recruiter. Regular attendee and seasonal speaker at IT meetings and
          blogger. Active participant in events such as Advent of Code and
          hackathons. More about me:{' '}
          <a
            href="https://www.parda.me/work"
            className="underline text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.parda.me/work
          </a>
        </p>
      </section>
      <Separator className="my-4" />
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'React',
            'Typescript',
            'Nx',
            'AI agents / MCP',
            'Vitest / Cypress / Jest',
            'Next.js',
            'Vue / Astro / Angular',
            'FastAPI',
            'Python',
            'Postgres',
            'Redis',
            'Docker',
            'SQLAlchemy',
            'express.js',
            'English B2',
            'Polish Native',
          ].map((skill) => (
            <Badge
              key={skill}
              className="text-xs px-2 py-1 bg-accent text-accent-foreground"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>
      <Separator className="my-4" />
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Key Achievements</h2>
        <ul className="list-disc pl-5 space-y-2 text-base">
          <li>
            <strong>Helped excels carrier of my mentees and mine:</strong>{' '}
            Mentored several colleagues, building strong professional
            relationships. Mentees consistently excelled and received
            promotions. Achieved personal growth, promoted to a higher position
            in less than a year.
          </li>
          <li>
            <strong>Delivering with cut budget:</strong> Sole developer on a
            project, reduced development time from six months to four.
            Prioritized features, collaborated closely with client, delivered a
            monetizable product, and secured additional budget.
          </li>
          <li>
            <strong>Great feedbacks:</strong> Consistently received positive
            feedback, especially for rapid onboarding and improving software
            delivery processes.
          </li>
          <li>
            <strong>Awarded "SPOT award" bonus:</strong> Led a side project
            automating CV updates, saving 0.5 hours/month for 100+ employees.
          </li>
        </ul>
      </section>
      <Separator className="my-4" />
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg">
              Senior Developer{' '}
              <span className="text-muted-foreground">@ EY GDS</span>
            </h3>
            <div className="text-sm text-muted-foreground">
              11/2023 – Present | Warsaw, Poland
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-base">
              <li>
                Led team developing internal apps, handled requirements,
                authored user stories, assigned tasks, provided architectural
                guidance.
              </li>
              <li>
                Oversaw documentation, complex features, and smooth project
                handover.
              </li>
              <li>
                Migrated from broken microfrontend to monorepo for 5 projects,
                reduced deployment times from 40min to 10min.
              </li>
              <li>
                Delivered React upgrade and UI overhaul for two projects, zero
                major bugs/design issues.
              </li>
              <li>
                Conducted 20+ recruitment interviews, created competence matrix
                for skill assessment.
              </li>
              <li>
                Managed tech newsletter, coordinated knowledge-sharing meetings,
                participated in AI community.
              </li>
              <li>
                Contributed to AI RAG-based chatbot (web components + Flask),
                built design component libraries with Storybook.
              </li>
              <li>Resolved login issue by forking/updating MSAL library.</li>
              <li>
                Gained insights on documentation, testing, code reviews, sprint
                refinement via collaboration with tech lead.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">
              Javascript Developer{' '}
              <span className="text-muted-foreground">
                @ STX Next / Ermlab Software
              </span>
            </h3>
            <div className="text-sm text-muted-foreground">
              04/2022 – 11/2023 | Olsztyn, Poland
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-base">
              <li>
                Delivered project from initial workshops to MVP, increased
                employment at client site.
              </li>
              <li>Refactored loading screens from 5s to &lt;0.5s.</li>
              <li>
                Planned frontend architecture, selected tools/libraries for new
                projects.
              </li>
              <li>Developed Chrome extension MVP ahead of schedule.</li>
              <li>
                Developed mobile app for vets/patients, integrated payment
                systems.
              </li>
              <li>
                Guided team members, participated in AI hackathons (won!), Tech
                Talks, Meetups.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">
              Frontend Developer{' '}
              <span className="text-muted-foreground">@ Ermlab Software</span>
            </h3>
            <div className="text-sm text-muted-foreground">
              07/2020 – 03/2022 | Olsztyn, Poland
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-base">
              <li>Developed/maintained frontend projects in React/Angular.</li>
              <li>
                Created complex multistep forms, web apps with Facebook auth.
              </li>
              <li>Created data collection app for AI research.</li>
              <li>Co-created Google Chrome extension.</li>
              <li>Led/supervised learning meetings.</li>
            </ul>
          </div>
        </div>
      </section>
      <Separator className="my-4" />
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <div>
          <h3 className="font-bold text-lg">
            Bachelor of Science in Computer Science
          </h3>
          <div className="text-sm text-muted-foreground">
            University of Warmia and Mazury in Olsztyn | 2017 – 2021
          </div>
        </div>
      </section>
      <Separator className="my-4" />
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Projects</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg">Blog</h3>
            <div className="text-sm text-muted-foreground">
              03/2023 – Present | Remote
            </div>
            <div className="text-base">
              Live:{' '}
              <a
                href="https://www.parda.me/blog"
                className="underline text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.parda.me/blog
              </a>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-base">
              <li>
                Technical blog about web development, mostly front-end, with
                real-life scenarios.
              </li>
              <li>Posts monthly, aiming for clarity and brevity.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Cockpit</h3>
            <div className="text-sm text-muted-foreground">
              03/2025 – Present | Remote
            </div>
            <div className="text-base">
              Live:{' '}
              <a
                href="https://www.cockpit.parda.me"
                className="underline text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.cockpit.parda.me
              </a>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-base">
              <li>
                Productivity suite: budget management, newsletter assistance.
              </li>
              <li>FastAPI backend (Postgres, SQLAlchemy, Pytest).</li>
              <li>
                NX monorepo frontend (React, Angular, Vue, OpenAPI types,
                tailwindcss, vitest).
              </li>
              <li>Docker & Raspberry Pi deployment.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
