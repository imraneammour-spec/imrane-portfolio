"use client";
import { useState } from "react";
import type { ProjectImage } from "@/data/projects";
export function Media({
  image,
  className = "",
  priority = false,
}: {
  image: ProjectImage;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`media ${loaded ? "is-loaded" : ""} ${className}`}>
      {failed ? (
        <span className="media-error">Image unavailable</span>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
