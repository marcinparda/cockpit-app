import { SectionTitle } from './SectionTitle';



export interface CoursesProps {
  courses: string[];
}

/**
 * Courses section for CV
 */
export function Courses({ courses }: CoursesProps) {
  return (
    <section className="mb-4">
      <SectionTitle>COURSES</SectionTitle>
      <ul className="text-sm space-y-1">
        {courses.map((course, idx) => (
          <li key={idx}>• {course}</li>
        ))}
      </ul>
    </section>
  );
}
