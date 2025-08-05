import { TypographySmall } from '@cockpit-app/shared-react-ui';

export function Experience() {
  return (
    <section className="mb-4">
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
        <TypographySmall>Consulting company, BIG4</TypographySmall>
        <ul className="text-xs space-y-1 ml-4 list-disc">
          <li>
            Successfully led a team developing internal applications; handled
            requirements gathering with managers, authored user stories,
            assigned tasks, set priorities for architecture and complex feature
            development, and facilitated a smooth project handover to
            management.
          </li>
          <li>
            Spearheaded the migration from a broken microfrontend solution to a
            monorepo architecture for five projects, enabling easier code
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
            matrix, accelerating the on-boarding and learning skills assessment
            for employees using a technical problem-solving skills.
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
            Built and maintained design component libraries using Storybook for
            two key projects, improving UI consistency, docs and reusability.
          </li>
          <li>
            Resolved a persistent login issue by forking and updating the MSAL
            library, ensuring stable authentication for end users.
          </li>
          <li>
            Gained valuable insights and work-ethics lessons about
            documentation, testing, code reviews, and sprint refinement through
            close collaboration with an experienced tech lead, leading to more
            accurate task estimation and flawless sprint goal delivery.
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
        <TypographySmall>AI Python software house</TypographySmall>
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
            Planned frontend architecture multiple times, selecting appropriate
            tools and libraries for new projects.
          </li>
          <li>
            Learned a Python extension development and created a MVP of an
            extension project before estimated time.
          </li>
          <li>Developed a mobile application for vets and patients.</li>
          <li>Implemented integration systems.</li>
          <li>Provided assistance and guidance to other Team members.</li>
          <li>
            Participated in additional activities such as AI hackathons (manage
            to won!), Tech Talks, and Meetups.
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
        <TypographySmall>AI Python software house</TypographySmall>
        <ul className="text-xs space-y-1 ml-4 list-disc">
          <li>
            Worked on developing and maintaining frontend projects in React and
            Angular technologies.
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
  );
}
