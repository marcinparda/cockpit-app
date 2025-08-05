import { SectionTitle } from './SectionTitle';

export function Courses() {
  return (
    <section className="mb-4">
      <SectionTitle>COURSES</SectionTitle>
      <ul className="text-sm space-y-1">
        <li>• Microsoft Certified: Azure AI Fundamentals</li>
        <li>• Microsoft Certified: Azure Fundamentals</li>
        <li>• AI Devs 2 & 3 - AI integration and building agents</li>
        <li>• Modern Frontend - Next.js, React, GraphQL and Typescript</li>
        <li>• Architecture on Frontend (Architektura na Froncie)</li>
      </ul>
    </section>
  );
}
