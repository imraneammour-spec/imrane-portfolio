import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactFinale } from "@/components/ContactFinale";
import { Process } from "@/components/Process";
import { Software } from "@/components/Software";
import { site } from "@/data/site";
export const metadata = {
  title: "About",
  description:
    "Meet Imrane Ammour, interior designer and architectural 3D visualizer based in Rabat–Salé, Morocco.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">ABOUT IMRANE</p>
        <h1>
          Meet <em>Imrane Ammour</em>
        </h1>
        <div className="page-intro-bottom">
          <p>Interior designer &amp; architectural 3D visualizer.</p>
          <span className="tiny-label">{site.location}</span>
        </div>
      </section>
      <section className="biography section">
        <div className="biography-portrait" data-reveal>
          <div className="portrait-frame">
            <img
              src={site.portrait}
              alt="Portrait of Imrane Ammour"
              width="1086"
              height="1448"
              loading="lazy"
            />
          </div>
          <p className="tiny-label">
            IMRANE AMMOUR / INTERIOR DESIGNER &amp; 3D VISUALIZER
          </p>
        </div>
        <div className="biography-copy" data-reveal>
          <p className="eyebrow">DESIGN SPECIALIZATION</p>
          <h2>
            Interior Design &amp;
            <br />
            <em>Architectural Visualization</em>
          </h2>
          <p>
            I combine visual design and technical implementation: space
            planning, furniture layouts, lighting and materials, supported by 3D
            modeling and project documentation.
          </p>
          <p>
            The portfolio includes residential interiors, cafés, retail spaces,
            healthcare environments and a personal architectural concept. Each
            project is presented through its actual renders, with the scope
            listed on its project page.
          </p>
          <p>
            I use realistic imagery to explain design decisions before
            realization, while developing technical deliverables around the
            project’s requirements.
          </p>
          <Link className="text-link" href="/projects/">
            View my projects <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <Process home={false} />
      <Software home={false} />
      <ContactFinale />
    </>
  );
}
