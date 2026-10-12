import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectLink } from "@/components/Projects";
import { ContactFinale } from "@/components/ContactFinale";
import { Media } from "@/components/Media";
import { TechnicalVisual } from "@/components/TechnicalVisual";
import { Process } from "@/components/Process";
import { Software } from "@/components/Software";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const metadata = { alternates: { canonical: "/" } };
const featured = [
  "villa-contemporaine",
  "cafe-khemisset",
  "parapharmacie-sale",
  "appartement-ayoub",
].map((slug) => getProject(slug)!);

export default function Home() {
  return (
    <>
      <Hero />
      <section
        id="introduction"
        className="home-services section"
        aria-labelledby="services-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">01 / WHAT I DO</p>
            <h2 id="services-title">
              Design, Visualization
              <br />
              &amp; <em>Technical Expertise</em>
            </h2>
          </div>
          <p>
            From spatial concepts to detailed drawings and photorealistic
            imagery.
          </p>
          <Link className="text-link" href="/services/">
            Explore all services <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="service-stories" data-stagger>
          {services.slice(0, 3).map((service) => (
            <Link
              key={service.id}
              href={`/services/#${service.id}`}
              className="service-story"
            >
              <div className="service-story-visual">
                {service.id === "technical" ? (
                  <TechnicalVisual />
                ) : (
                  <Media image={getProject(service.project)!.preview} />
                )}
              </div>
              <div className="service-story-copy">
                <span className="eyebrow">{service.number} / SERVICE</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <span className="service-story-cta">
                  Explore {service.title.toLowerCase()}{" "}
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section
        className="featured-projects section"
        aria-labelledby="projects-title"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / THE PORTFOLIO</p>
            <h2 id="projects-title">
              Selected <em>Projects</em>
            </h2>
          </div>
          <p>
            Explore interior spaces, architectural concepts, and photorealistic
            visualizations.
          </p>
          <Link href="/projects/" className="text-link">
            View all projects <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="featured-composition">
          {featured.map((project) => (
            <div className="featured-item" key={project.slug} data-reveal>
              <ProjectLink project={project} featured />
            </div>
          ))}
        </div>
      </section>
      <Process />
      <Software />
      <section className="about-preview section" aria-labelledby="about-title">
        <div className="portrait-frame" data-reveal>
          <img
            src={site.portrait}
            alt="Portrait of Imrane Ammour"
            width="1086"
            height="1448"
            loading="lazy"
          />
        </div>
        <div className="about-preview-copy" data-reveal>
          <p className="eyebrow">05 / ABOUT ME</p>
          <h2 id="about-title">
            Meet <em>Imrane Ammour</em>
          </h2>
          <p>
            Interior designer and architectural 3D visualizer based in
            Rabat–Salé, Morocco. I combine space planning, lighting and material
            selection with 3D modeling and technical documentation.
          </p>
          <p>
            My work includes residential interiors, cafés, retail spaces and
            healthcare environments. The goal is to make each design practical,
            visually coherent and easy to understand before realization.
          </p>
          <div className="skill-tags">
            <span>Interior design</span>
            <span>3D visualization</span>
            <span>Technical drawings</span>
          </div>
          <Link href="/about/" className="text-link">
            More about Imrane <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ContactFinale home />
    </>
  );
}
