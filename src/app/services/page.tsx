import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { getProject } from "@/data/projects";
import { Media } from "@/components/Media";
import { ContactFinale } from "@/components/ContactFinale";
import { TechnicalVisual } from "@/components/TechnicalVisual";
export const metadata = {
  title: "Services",
  description:
    "Interior design, photorealistic 3D visualization, technical drawings and furniture modeling by Imrane Ammour.",
  alternates: { canonical: "/services/" },
};
export default function Services() {
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">PROFESSIONAL SERVICES</p>
        <h1>
          Interior Design &amp;
          <br />
          <em>3D Visualization</em>
        </h1>
        <div className="page-intro-bottom">
          <p>
            Space planning, photorealistic imagery, technical drawings and
            furniture modeling.
          </p>
          <span className="tiny-label">EXPLORE THE SCOPE OF EACH SERVICE</span>
        </div>
      </section>
      <nav className="service-anchor-nav" aria-label="Service areas">
        {services.map((service) => (
          <a key={service.id} href={`#${service.id}`}>
            <span>{service.number}</span>
            {service.title}
            <ArrowUpRight size={14} />
          </a>
        ))}
      </nav>
      {services.map((service) => {
        const project = getProject(service.project)!;
        return (
          <section
            className="service-detail section"
            id={service.id}
            key={service.id}
          >
            <div className="service-detail-copy" data-reveal>
              <p className="eyebrow">{service.number} / THE EXPERTISE</p>
              <h2>
                {service.title}
                <em>.</em>
              </h2>
              <h3>{service.subtitle}</h3>
              <p>{service.description}</p>
              <ul className="deliverables">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact/" className="text-link">
                Discuss your project <ArrowUpRight size={17} />
              </Link>
            </div>
            {service.id === "technical" ? (
              <div className="service-visual">
                <TechnicalVisual />
              </div>
            ) : (
              <Link
                className="service-visual"
                href={`/projects/${project.slug}/`}
                aria-label={`Explore ${project.title}`}
                data-parallax
              >
                <Media image={project.gallery[service.image]} />
                <span>
                  {project.title} <ArrowUpRight size={18} />
                </span>
              </Link>
            )}
          </section>
        );
      })}
      <ContactFinale />
    </>
  );
}
