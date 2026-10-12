import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactFinale } from "@/components/ContactFinale";
import { site } from "@/data/site";
export const metadata = {
  title: "About",
  description:
    "Meet Imrane Ammour, interior architect and 3D visualizer. Spatial design, lighting, material expression and technical precision.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">THE DESIGNER / THE APPROACH</p>
        <h1>
          Imrane
          <br />
          <em>Ammour.</em>
        </h1>
        <div className="page-intro-bottom">
          <p>Interior Architecture &amp; 3D Visualization</p>
          <span className="tiny-label">BASED IN RABAT–SALÉ, MOROCCO</span>
        </div>
      </section>
      <section className="biography section">
        <div className="biography-portrait" data-reveal>
          <div className="portrait-frame">
            <img
              src={site.portrait}
              alt="Imrane Ammour"
              width="1086"
              height="1448"
              loading="lazy"
            />
          </div>
          <p className="tiny-label">
            IMRANE AMMOUR / INTERIOR ARCHITECT &amp; 3D VISUALIZER
          </p>
        </div>
        <div className="biography-copy" data-reveal>
          <p className="eyebrow">A PERSONAL PHILOSOPHY</p>
          <h2>
            Thoughtful spaces.
            <br />
            <em>Atmospheric images.</em>
          </h2>
          <p>
            I work at the meeting point of interior architecture and
            architectural visualization. My approach brings creative design and
            technical precision together, from spatial planning to the final
            image.
          </p>
          <p>
            Light, materials and proportion define how a space feels. I explore
            these relationships through interiors and photorealistic 3D imagery,
            so a project can be understood and experienced before it is
            realized.
          </p>
          <Link className="text-link" href="/projects/">
            Explore the work <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="approach section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">THE WAY I WORK</p>
            <h2>
              One idea.
              <br />
              <em>Many perspectives.</em>
            </h2>
          </div>
          <p>
            Each project is a conversation between
            <br />
            the creative and the practical.
          </p>
        </div>
        <div className="approach-grid">
          {[
            [
              "01",
              "Understand",
              "The purpose of the space, the practical needs and the atmosphere you want to create.",
            ],
            [
              "02",
              "Explore",
              "Layouts, light, materials and proportion become a coherent spatial proposal.",
            ],
            [
              "03",
              "Visualize",
              "Architectural images and technical drawings bring the idea into focus.",
            ],
          ].map(([n, title, text]) => (
            <article data-reveal key={n}>
              <span className="eyebrow">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="tools-section section">
        <p className="eyebrow" data-reveal>
          TOOLS OF THE ATELIER
        </p>
        <div className="software-list">
          {site.software.map((software, i) => (
            <div key={software} data-reveal>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{software}</strong>
            </div>
          ))}
        </div>
      </section>
      <ContactFinale />
    </>
  );
}
