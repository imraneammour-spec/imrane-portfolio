import { PencilRuler, Layers3, ScanLine, Ruler } from "lucide-react";

// TODO: replace this icon composition with a verified project drawing when supplied.
// This explanatory visual is not a plan or an invented project document.
export function TechnicalVisual() {
  return (
    <div
      className="technical-visual"
      aria-label="Technical documentation: plans, elevations and sections"
    >
      <PencilRuler
        className="technical-symbol"
        size={64}
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="eyebrow">DESIGN DOCUMENTATION</span>
      <div className="technical-labels">
        <span>
          <Layers3 size={20} aria-hidden="true" />
          Plans
        </span>
        <span>
          <ScanLine size={20} aria-hidden="true" />
          Elevations
        </span>
        <span>
          <Ruler size={20} aria-hidden="true" />
          Sections
        </span>
      </div>
    </div>
  );
}
