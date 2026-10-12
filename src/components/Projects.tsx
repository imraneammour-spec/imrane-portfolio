"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Media } from "./Media";
import {
  matchesProjectCategory,
  projectCategories,
} from "@/lib/project-filters";

export function ProjectLink({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={`project-link ${featured ? "is-featured" : ""}`}
      aria-label={`View ${project.title}`}
    >
      <div className="project-visual" data-parallax>
        <Media image={featured ? project.cover : project.preview} />
        <span className="project-index">{project.number}</span>
        <span className="project-view">
          View project <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <p className="eyebrow">
            {project.category} / {project.kind}
            {project.year ? ` / ${project.year}` : ""}
          </p>
          <h3>{project.title}</h3>
          <p className="project-description">{project.overview}</p>
        </div>
        <ArrowUpRight size={26} />
      </div>
    </Link>
  );
}
export function ProjectBrowser() {
  const [filter, setFilter] = useState("All");
  const categories = projectCategories(projects);
  const visible = projects.filter((project) =>
    matchesProjectCategory(project, filter),
  );
  return (
    <div className="project-browser">
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            className={filter === category ? "is-active" : ""}
            onClick={() => setFilter(category)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? categories.length - 1
                    : (index +
                        (event.key === "ArrowLeft" ? -1 : 1) +
                        categories.length) %
                      categories.length;
              setFilter(categories[next]);
              (
                event.currentTarget.parentElement?.children[
                  next
                ] as HTMLButtonElement
              )?.focus();
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="project-result" aria-live="polite">
        {visible.length} project{visible.length !== 1 ? "s" : ""} / {filter}
      </p>
      <div key={filter} className="project-browser-grid">
        {visible.map((project) => (
          <ProjectLink project={project} key={project.slug} />
        ))}
      </div>
    </div>
  );
}
