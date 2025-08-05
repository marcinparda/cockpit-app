import React from 'react';
import { SectionTitle } from './SectionTitle';

export interface PersonalProject {
  name: string;
  liveUrl: string;
  code: string;
  date: string;
  description: string[];
}

export interface PersonalProjectsProps {
  projects: PersonalProject[];
}

export function PersonalProjects({ projects }: PersonalProjectsProps) {
  return (
    <section className="mb-8">
      <SectionTitle>PERSONAL PROJECTS</SectionTitle>
      {projects.map((project, idx) => (
        <div className="mb-4" key={idx}>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-base">{project.name}</h4>
            <div className="text-right text-sm text-gray-600">
              {project.date}
            </div>
          </div>
          <div className="mb-2">
            <span className="text-sm">Live - </span>
            <a
              href={project.liveUrl}
              className="text-sm text-blue-600 underline"
            >
              {project.liveUrl}
            </a>
          </div>
          <div className="mb-2">
            <span className="text-sm">Code - </span>
            <span className="text-sm text-blue-600">{project.code}</span>
          </div>
          <ul className="text-xs space-y-1 ml-4 list-disc">
            {project.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
