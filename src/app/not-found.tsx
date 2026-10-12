import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found section">
      <p className="eyebrow">404 / A DIFFERENT PERSPECTIVE</p>
      <span className="error-number" aria-hidden="true">
        404
      </span>
      <h1>
        This space
        <br />
        is <em>unmapped.</em>
      </h1>
      <p>
        The page you’re looking for isn’t here.
        <br />
        Return to the atelier or explore the project collection.
      </p>
      <div className="not-found-actions">
        <Link className="button button-solid" href="/">
          Back to home
          <ArrowUpRight size={16} />
        </Link>
        <Link className="text-link" href="/projects/">
          Explore projects
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
