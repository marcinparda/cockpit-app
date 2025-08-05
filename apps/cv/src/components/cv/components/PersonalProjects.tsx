import React from 'react';

/**
 * Personal Projects section for CV
 */
export function PersonalProjects() {
  return (
    <section className="mb-4">
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
            productivity and overall quality of life, such as managing my budget
            and
          </li>
          <li>assisting with newsletters.</li>
          <li>
            FastAPI backend for frontend applications. Using Postgres,
            SQLAlchemy, Pydantic.
          </li>
          <li>
            NX monorepo for my frontend applications. Using React, Angular, Vue,
            OpenAPI types generation, tailwindcss, vitest.
          </li>
          <li>Docker & Raspberry Pi Deployment</li>
        </ul>
      </div>
    </section>
  );
}
