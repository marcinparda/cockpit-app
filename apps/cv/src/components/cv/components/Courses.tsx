import { SectionTitle } from './SectionTitle';

export interface CoursesProps {
  courses: string[];
}

export function Courses({ courses }: CoursesProps) {
  return (
    <section className="mb-4">
      <SectionTitle>COURSES</SectionTitle>
      <ul className="space-y-1 text-sm">
        {courses.map((course, idx) => (
          <li key={idx}>• {course}</li>
        ))}
      </ul>
    </section>
  );
}
