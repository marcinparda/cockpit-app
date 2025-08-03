import {
  Badge,
  TypographyH1,
  TypographyP,
  TypographySmall,
} from '@cockpit-app/shared-react-ui';
import { Phone, Mail, Linkedin, MapPin, Diamond } from 'lucide-react';

/**
 * CV component that displays Marcin Parda's professional resume
 */
export function CV() {
  const skills = [
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
  ];

  const achievements = [
    {
      title: 'Helped excels carrier of my mentees and mine',
      description:
        'I mentored several colleagues, building strong professional relationships with each of them. My mentees consistently excelled in their roles and received promotions year after year. I also achieved significant personal growth during my tenure - I initially joined the company as an "early senior" due to my lack experience, but thanks to my accomplishments both within and beyond project work, I earned a promotion to a higher position in less than a year.',
    },
    {
      title: 'Delivering with cut budget',
      description:
        'In a project where I served as the sole developer, I was able to reduce the application development time from six months to four. Together with the client, we prioritized essential features and eliminated solutions that would accelerate the development process. Through close collaboration and focused effort, we successfully delivered a minimalistic product, and the client subsequently returned with an additional budget for further development.',
    },
    {
      title: 'Great feedbacks',
      description:
        "So far, I've received mostly great feedback on my work - especially regarding the speed with which I can start contributing to projects and the appreciation for my efforts to improve software delivery processes.",
    },
    {
      title: 'Awarded "SPOT award" bonus',
      description:
        "For quickly implementing and leading a side project automating the company's CV updating process, saving approximately 9.5 hours per month for over 100 employees.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 print:p-2 print:max-w-none bg-white print:bg-white print:m-0">
      {/* Header */}
      <div className="mb-4 print:mb-4">
        <TypographyH1 className="text-4xl print:text-3xl font-bold mb-2 print:mb-1">
          MARCIN PARDA
        </TypographyH1>
        <h2 className="text-xl text-gray-600 mb-4">
          Senior Frontend Developer with Python
        </h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>+48 576 259 548</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>marcin98parda@gmail.com</span>
          </div>
          <div className="flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            <span>www.linkedin.com/in/marcinparda/</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Warsaw, Poland</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-8 print:mb-6">
        <h3 className="text-lg font-bold pb-1 border-b-2 border-black mb-3 print:mb-2">
          SUMMARY
        </h3>
        <div>
          <TypographySmall className="text-sm leading-relaxed">
            Specialist with over 5 years of experience, including over 1.5 years
            as a senior developer. Acting as a code mentor and technical
            recruiter. Regular frontend and seasoned speaker at IT meetings and
            blogger. Active participant in events such as Advent of Code and
            hackathons. More about me: https://www.parda.me/work
          </TypographySmall>
        </div>
        <div>
          <TypographySmall className="text-xs italic mt-2">
            (CV has more than one page, please scroll)
          </TypographySmall>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8 print:mb-6">
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

      {/* Key Achievements */}
      <section className="mb-8 print:mb-6">
        <h3 className="text-lg font-bold mb-3 print:mb-2 pb-1 border-b-2 border-black">
          KEY ACHIEVEMENTS
        </h3>
        <div className="grid grid-cols-1 print:grid-cols-2 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-3 print:break-inside-avoid">
              <Diamond className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-2">
                  {achievement.title}
                </h4>
                <TypographySmall className="text-xs leading-relaxed text-gray-700">
                  {achievement.description}
                </TypographySmall>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-3 pb-1 border-b-2 border-black">
          EXPERIENCE
        </h3>

        {/* Senior Developer */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">Senior Developer</h4>
            <div className="text-right text-sm text-gray-600">
              <div>11/2023 - Present</div>
              <div>Warsaw, Poland</div>
            </div>
          </div>
          <div className="font-semibold text-sm mb-2">EY GDS</div>
          <TypographySmall className="text-xs mb-2">
            Consulting company, BIG4
          </TypographySmall>

          <ul className="text-xs space-y-1 ml-4 list-disc">
            <li>
              Successfully led a team developing internal applications; handled
              requirements gathering with managers, authored user stories,
              assigned tasks, set priorities for architecture and complex
              feature development, and facilitated a smooth project handover to
              management.
            </li>
            <li>
              Spearheaded the migration from a broken microfrontend solution to
              a monorepo architecture for five projects, enabling easier code
              sharing, simplifying new project creation, and reducing deployment
              times from ~40min to ~10min.
            </li>
            <li>
              Orchestrated migration initiatives from legacy frameworks and
              infrastructure. Delivered React upgrade and a full UI overhaul
              across all pages, both delivered on schedule and resulting in zero
              major bugs or design inconsistencies.
            </li>
            <li>
              Created and maintained a detailed frontend developer competence
              matrix, accelerating the on-boarding and learning skills
              assessment for employees using a technical problem-solving skills.
            </li>
            <li>
              Orchestrated regular DevOps automation initiatives including
              developing and implementing CI/CD best practices to all staff.
            </li>
            <li>
              Coordinated knowledge-sharing meetings within the frontend/design
              department, fostering learning and best practices across teams by
              participating in industry events and community.
            </li>
            <li>
              Contributed to multiple proof-of-concept projects, including an AI
              RAG-based chatbot (web components + Flask) designed for easy
              integration into other solutions.
            </li>
            <li>
              Built and maintained design component libraries using Storybook
              for two key projects, improving UI consistency, docs and
              reusability.
            </li>
            <li>
              Resolved a persistent login issue by forking and updating the MSAL
              library, ensuring stable authentication for end users.
            </li>
            <li>
              Gained valuable insights and work-ethics lessons about
              documentation, testing, code reviews, and sprint refinement
              through close collaboration with an experienced tech lead, leading
              to more accurate task estimation and flawless sprint goal
              delivery.
            </li>
          </ul>
        </div>

        {/* Javascript Developer */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">Javascript Developer</h4>
            <div className="text-right text-sm text-gray-600">
              <div>04/2022 - 11/2023</div>
              <div>Olsztyn, Poland</div>
            </div>
          </div>
          <div className="font-semibold text-sm mb-2">
            STX Next (continuation of work at Ermlab Software)
          </div>
          <TypographySmall className="text-xs mb-2">
            AI Python software house
          </TypographySmall>

          <ul className="text-xs space-y-1 ml-4 list-disc">
            <li>
              Increased the employment of several people from our company at the
              client's site, thanks to successfully delivering a project from
              initial workshops with the client to a functional Minimum Viable
              Product (MVP).
            </li>
            <li>
              Speeded up internal screens of internal applications from ~5s to
              less than 0.5s via refactor.
            </li>
            <li>
              Planned frontend architecture multiple times, selecting
              appropriate tools and libraries for new projects.
            </li>
            <li>
              Learned a Python extension development and created a MVP of an
              extension project before estimated time.
            </li>
            <li>Developed a mobile application for vets and patients.</li>
            <li>Implemented integration systems.</li>
            <li>Provided assistance and guidance to other Team members.</li>
            <li>
              Participated in additional activities such as AI hackathons
              (manage to won!), Tech Talks, and Meetups.
            </li>
          </ul>
        </div>

        {/* Frontend Developer */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">Frontend Developer</h4>
            <div className="text-right text-sm text-gray-600">
              <div>07/2020 - 03/2022</div>
              <div>Olsztyn, Poland</div>
            </div>
          </div>
          <div className="font-semibold text-sm mb-2">Ermlab Software</div>
          <TypographySmall className="text-xs mb-2">
            AI Python software house
          </TypographySmall>

          <ul className="text-xs space-y-1 ml-4 list-disc">
            <li>
              Worked on developing and maintaining frontend projects in React
              and Angular technologies.
            </li>
            <li>
              Created complex multistep forms, web applications with facebook
              auth.
            </li>
            <li>Created data visualization for AI scientific research.</li>
            <li>Co-created Google Chrome extension.</li>
            <li>
              Technically supervising learning meetings and leading several of
              them.
            </li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-3 pb-1 border-b-2 border-black">
          EDUCATION
        </h3>
        <div className="mb-4">
          <h4 className="font-bold text-base">
            Bachelor of Science in Computer Science
          </h4>
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm">
              University of Warmia and Mazury in Olsztyn
            </div>
            <div className="text-sm text-gray-600">2017 - 2021</div>
          </div>
        </div>
      </section>

      {/* Personal Projects */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-3 pb-1 border-b-2 border-black">
          PERSONAL PROJECTS
        </h3>

        {/* Blog */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">Blog</h4>
            <div className="text-right text-sm text-gray-600">
              <div>03/2023 - Present</div>
              <div>Remote</div>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-sm">Live - </span>
            <a
              href="https://www.parda.me/blog"
              className="text-sm text-blue-600 underline"
            >
              https://www.parda.me/blog
            </a>
          </div>
          <div className="mb-2">
            <span className="text-sm">Code - </span>
            <span className="text-sm text-blue-600">Blog</span>
          </div>

          <ul className="text-xs space-y-1 ml-4 list-disc">
            <li>Technical blog where I write about web development topics.</li>
            <li>
              Primarily cover front-end development, but I also cover topics
              related to working as a developer.
            </li>
            <li>
              Trying to keep them short but understandable, using real-life
              scenarios for better understanding.
            </li>
            <li>Trying to write posts monthly.</li>
          </ul>
        </div>

        {/* Cockpit */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">Cockpit</h4>
            <div className="text-right text-sm text-gray-600">
              <div>03/2023 - Present</div>
              <div>Remote</div>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-sm">Live - </span>
            <a
              href="https://www.cockpit.parda.me"
              className="text-sm text-blue-600 underline"
            >
              https://www.cockpit.parda.me
            </a>
          </div>
          <div className="mb-2">
            <span className="text-sm">Code - </span>
            <span className="text-sm text-blue-600">Cockpit Backend</span>
            <span className="text-sm"> & </span>
            <span className="text-sm text-blue-600">Cockpit Frontend</span>
          </div>

          <ul className="text-xs space-y-1 ml-4 list-disc">
            <li>
              Cockpit project consists of several apps that help boost my
              productivity and overall quality of life, such as managing my
              budget and
            </li>
            <li>assisting with newsletters.</li>
            <li>
              FastAPI backend for frontend applications. Using Postgres,
              SQLAlchemy, Pydantic.
            </li>
            <li>
              NX monorepo for my frontend applications. Using React, Angular,
              Vue, OpenAPI types generation, tailwindcss, vitest.
            </li>
            <li>Docker & Raspberry Pi Deployment</li>
          </ul>
        </div>
      </section>

      {/* Courses */}
      <section className="mb-8">
        <h3 className="text-lg font-bold mb-3 pb-1 border-b-2 border-black">
          COURSES
        </h3>
        <ul className="text-sm space-y-1">
          <li>• Microsoft Certified: Azure AI Fundamentals</li>
          <li>• Microsoft Certified: Azure Fundamentals</li>
          <li>• AI Devs 2 & 3 - AI integration and building agents</li>
          <li>• Modern Frontend - Next.js, React, GraphQL and Typescript</li>
          <li>• Architecture on Frontend (Architektura na Froncie)</li>
        </ul>
      </section>

      {/* Footer */}
      <div className="text-xs text-gray-600 mt-8">
        <p>
          I agree to the processing of personal data provided in this document
          for realizing the recruitment process pursuant to the Personal Data
          Protection Act of 10 May 2018 (Journal of Laws 2018, item 1000) and in
          agreement with Regulation (EU) 2016/679 of the European Parliament and
          of the Council of 27 April 2016 on the protection of natural persons
          with regard to the processing of personal data and on the free
          movement of such data, and repealing Directive 95/46/EC (General Data
          Protection Regulation).
        </p>
      </div>
    </div>
  );
}
