import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { Gallery } from "@/components/Gallery";
import { ContactFinale } from "@/components/ContactFinale";
import { Media } from "@/components/Media";
import { site } from "@/data/site";
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.overview,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: project.title,
      description: project.overview,
      url: `/projects/${project.slug}/`,
      images: [
        {
          url: project.cover.src,
          width: project.cover.width,
          height: project.cover.height,
          alt: project.cover.alt,
        },
      ],
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const position = projects.indexOf(project),
    next = projects[(position + 1) % projects.length],
    previous = projects[(position - 1 + projects.length) % projects.length];
  return (
    <>
      <section className="case-hero">
        <div className="case-hero-image" data-parallax>
          <Media image={project.cover} priority />
        </div>
        <div className="case-hero-shade" />
        <div className="case-hero-top">
          <Link href="/projects/" className="text-link">
            <ArrowLeft size={16} />
            All projects
          </Link>
          <span className="tiny-label">PROJECT / {project.number}</span>
        </div>
        <div className="case-hero-title">
          <p className="eyebrow">
            {project.category} / {project.kind}
            {project.status ? ` / ${project.status}` : ""}
          </p>
          <h1>
            {project.title}
            <em>.</em>
          </h1>
        </div>
      </section>
      <section className="case-overview section">
        <div className="case-overview-copy" data-reveal>
          <p className="eyebrow">01 / PROJECT OVERVIEW</p>
          <h2>Project Overview</h2>
          <p className="case-summary">{project.overview}</p>
        </div>
        <dl className="case-facts" data-reveal>
          <div>
            <dt>Project</dt>
            <dd>{project.kind}</dd>
          </div>
          {project.location && (
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
          )}
          {project.year && (
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          )}
          {project.status && (
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
          )}
          <div>
            <dt>Work performed</dt>
            <dd>{project.services.join(" · ")}</dd>
          </div>
        </dl>
      </section>
      <section className="case-concept section" data-reveal>
        <div>
          <p className="eyebrow">02 / THE DESIGN</p>
          <h2>Design Approach</h2>
        </div>
        <p>{project.concept}</p>
      </section>
      <section className="case-renders section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">03 / PROJECT IMAGES</p>
            <h2>
              Project <em>Renders</em>
            </h2>
          </div>
          <p>
            Open any image to explore the full render.
            <br />
            Use the arrow keys or swipe to navigate.
          </p>
        </div>
        <Gallery images={project.gallery} title={project.title} />
      </section>
      {!!project.materialBoard?.length && (
        <section className="section">
          <p className="eyebrow">MATERIALS &amp; ATMOSPHERE</p>
          <Gallery
            images={project.materialBoard}
            title={`${project.title} materials`}
          />
        </section>
      )}
      {!!project.technicalDrawings?.length && (
        <section className="section">
          <p className="eyebrow">TECHNICAL DRAWINGS</p>
          <Gallery
            images={project.technicalDrawings}
            title={`${project.title} drawings`}
          />
        </section>
      )}
      {project.slug === "villa-contemporaine" && (
        <section className="case-film section">
          <div data-reveal>
            <p className="eyebrow">04 / PROJECT VIDEO</p>
            <h2>
              Villa <em>3D Walkthrough</em>
            </h2>
          </div>
          <video
            controls
            playsInline
            preload="none"
            poster={site.heroImage}
            width={1448}
            height={1086}
            aria-label="Villa contemporaine — 3D walkthrough"
          >
            <source
              src="/assets/villa-contemporaine/villa-walkthrough.mp4"
              type="video/mp4"
            />
          </video>
        </section>
      )}
      <nav className="project-pagination" aria-label="More projects">
        <Link href={`/projects/${previous.slug}/`}>
          <span className="eyebrow">
            <ArrowLeft size={14} />
            Previous project
          </span>
          <strong>{previous.title}</strong>
        </Link>
        <Link href={`/projects/${next.slug}/`}>
          <span className="eyebrow">
            Next project
            <ArrowUpRight size={14} />
          </span>
          <strong>{next.title}</strong>
        </Link>
      </nav>
      <ContactFinale />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.overview,
            url: `${site.url}/projects/${project.slug}/`,
            image: `${site.url}${project.cover.src}`,
            creator: { "@type": "Person", name: site.name },
          }),
        }}
      />
    </>
  );
}
