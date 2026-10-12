import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectLink } from "@/components/Projects";
import { ContactFinale } from "@/components/ContactFinale";
import { Media } from "@/components/Media";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";
export const metadata = { alternates: { canonical: "/" } };
const featured = [
  "villa-contemporaine",
  "cafe-khemisset",
  "appartement-ayoub",
  "dr-hafidi-opera",
].map((slug) => getProject(slug)!);
export default function Home() {
  return (
    <>
      <Hero />
      <section id="introduction" className="intro-statement section">
        <div className="section-index" data-reveal>
          <span className="eyebrow">01 / THE APPROACH</span>
          <span className="tiny-label">CREATIVITY MEETS PRECISION</span>
        </div>
        <h2>
          <span data-drift="left">Beyond spaces.</span>
          <em data-drift="right">Into experiences.</em>
        </h2>
        <div className="intro-bottom" data-reveal>
          <span className="atelier-symbol" aria-hidden="true">
            ✳
          </span>
          <p>
            I shape spaces through a dialogue between material, light and daily
            life. From an initial idea to a photorealistic image, creative
            direction and technical precision bring the design into focus.
          </p>
          <Link href="/about/" className="text-link">
            Meet the designer <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="featured-projects section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2>
              A sense
              <br />
              of <em>place.</em>
            </h2>
          </div>
          <p>
            Residential, hospitality and commercial spaces.
            <br />
            Different stories. A considered approach.
          </p>
          <Link href="/projects/" className="text-link">
            All projects <ArrowUpRight size={17} />
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
      <section className="expertise section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">03 / EXPERTISE</p>
            <h2>
              From intention
              <br />
              to <em>detail.</em>
            </h2>
          </div>
          <p>
            A complete view of your space.
            <br />
            The concept, the image, the drawing.
          </p>
        </div>
        <div className="expertise-list">
          {[
            [
              "01",
              "Interior architecture",
              "Space planning, material palettes and considered interiors.",
            ],
            [
              "02",
              "Architectural visualization",
              "Lighting, composition and photorealistic 3D imagery.",
            ],
            [
              "03",
              "Technical design & documentation",
              "Plans, sections, elevations and design detailing.",
            ],
          ].map(([number, title, description]) => (
            <Link
              href="/services/"
              className="expertise-row"
              key={number}
              data-reveal
            >
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ArrowUpRight size={26} />
            </Link>
          ))}
        </div>
      </section>
      <section className="showcase">
        <div className="showcase-title" data-reveal>
          <p className="eyebrow">04 / THE ATMOSPHERE</p>
          <h2>
            Light. Matter.
            <br />
            <em>Emotion.</em>
          </h2>
        </div>
        <div className="showcase-images">
          <Link
            href="/projects/villa/"
            aria-label="Explore the Villa interior"
            className="showcase-frame"
            data-parallax
          >
            <Media image={getProject("villa")!.gallery[1]} />
            <span>
              01 / MATERIAL &amp; LIGHT <ArrowUpRight size={18} />
            </span>
          </Link>
          <Link
            href="/projects/appartement-said-opera/"
            aria-label="Explore Appartement Said Opera"
            className="showcase-frame"
          >
            <Media image={getProject("appartement-said-opera")!.gallery[1]} />
            <span>
              02 / SPATIAL ATMOSPHERE <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </section>
      <section className="about-preview section">
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
          <p className="eyebrow">05 / THE PERSON BEHIND THE SPACES</p>
          <h2>
            Imrane
            <br />
            <em>Ammour.</em>
          </h2>
          <p>
            Interior architect and 3D visualizer. I bring spatial ideas to life
            through considered interiors, technical design and atmospheric
            images.
          </p>
          <div className="skill-tags">
            <span>Spatial design</span>
            <span>Light &amp; materials</span>
            <span>3D visualization</span>
          </div>
          <Link href="/about/" className="text-link">
            My approach &amp; expertise <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <ContactFinale />
    </>
  );
}
