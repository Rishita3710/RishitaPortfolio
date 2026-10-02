import ExperienceList from "../components/ExperienceList";

export default function Experience() {
  return (
    <section>
      <h1 className="display text-5xl">Experience</h1>
      <p className="lead mt-4">Where I've worked and what I did there.</p>
      <div className="mt-10"><ExperienceList /></div>
    </section>
  );
}