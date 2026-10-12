import { ProjectBrowser } from "@/components/Projects";
import { ContactFinale } from "@/components/ContactFinale";
import { projects } from "@/data/projects";
export const metadata = {
  title: "Projects",
  description:
    "Explore Imrane Ammour’s authentic residential, hospitality, retail and healthcare design and architectural visualization projects.",
  alternates: { canonical: "/projects/" },
};
export default function Projects() {
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">THE PORTFOLIO / SELECTED EXPLORATIONS</p>
        <h1>
          Spaces,
          <br />
          <em>in perspective.</em>
        </h1>
        <div className="page-intro-bottom">
          <p>
            A collection of interior designs and architectural visualizations.
            <br />
            Explore the concept, the spaces and the details.
          </p>
          <span className="tiny-label">{projects.length} PROJECTS / SELECTED WORK</span>
        </div>
      </section>
      <section
        className="section project-library"
        aria-label="Project collection"
      >
        <ProjectBrowser />
      </section>
      <ContactFinale />
    </>
  );
}
