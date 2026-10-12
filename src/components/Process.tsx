import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { processSteps } from "@/data/process";
import { getProject } from "@/data/projects";
import { Media } from "@/components/Media";

export function Process({ home = true }: { home?: boolean }) {
  return (
    <section
      className="process-section section"
      aria-labelledby="process-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">{home ? "03 / HOW I WORK" : "HOW I WORK"}</p>
          <h2 id="process-title">
            From Concept
            <br />
            to <em>Final Visualization</em>
          </h2>
        </div>
        <p>
          A clear sequence of design decisions, with the deliverables defined
          around your project.
        </p>
        <Link href="/contact/" className="text-link">
          Discuss your project <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="process-timeline">
        <div className="process-track" aria-hidden="true">
          <span data-process-line />
        </div>
        <ol data-stagger>
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <span className="process-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
      <Link
        className="process-output"
        href="/projects/villa/"
        aria-label="View Villa interior renders"
      >
        <div className="process-output-visual">
          <Media image={getProject("villa")!.gallery[1]} />
        </div>
        <div>
          <p className="eyebrow">EXAMPLE / FINAL VISUALIZATION</p>
          <h3>Villa interior renders</h3>
          <p>
            Explore the rendered living space and the complete project gallery.
          </p>
          <span>
            View the full project <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </section>
  );
}
