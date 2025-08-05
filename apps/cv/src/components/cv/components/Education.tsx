import { SectionTitle } from './SectionTitle';

export function Education() {
  return (
    <section className="mb-4">
      <SectionTitle>EDUCATION</SectionTitle>
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
  );
}
