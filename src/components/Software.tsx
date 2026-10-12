import { site } from "@/data/site";

export function Software({ home = true }: { home?: boolean }) {
  return (
    <section className="tools-section section" aria-labelledby="tools-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">
            {home ? "04 / SKILLS & SOFTWARE" : "SKILLS & SOFTWARE"}
          </p>
          <h2 id="tools-title">
            Professional Tools
            <br />
            &amp; <em>Expertise</em>
          </h2>
        </div>
        <p>
          Modeling, rendering and documentation tools that turn the design into
          clear images and drawings.
        </p>
      </div>
      <div className="tool-grid" data-stagger>
        {site.software.map((tool, index) => (
          <div className="tool-item" key={tool.name}>
            <span className="eyebrow">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{tool.name}</h3>
            <p>{tool.use}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
