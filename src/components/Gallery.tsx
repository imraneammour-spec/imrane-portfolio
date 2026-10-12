"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { Media } from "./Media";

export function Gallery({
  images,
  title,
}: {
  images: ProjectImage[];
  title: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const opened = index !== null;
  useEffect(() => {
    const element = dialog.current;
    if (opened) element?.showModal();
    else if (element?.open) {
      element.close();
      trigger.current?.focus();
    }
    const previous = document.body.style.overflow;
    if (opened) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);
  const move = (direction: number) =>
    setIndex((current) =>
      current === null
        ? null
        : (current + direction + images.length) % images.length,
    );
  const image = index === null ? null : images[index];
  return (
    <>
      <div className="render-gallery">
        {images.map((image, i) => (
          <button
            key={image.src}
            className={
              "gallery-frame " +
              (image.height > image.width ? "is-portrait" : "")
            }
            type="button"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setIndex(i);
            }}
            aria-label={"Open image " + (i + 1) + ": " + image.alt}
          >
            <Media image={image} />
            <span className="gallery-expand">
              <Expand size={16} />
            </span>
            <span className="gallery-number">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} — full-screen gallery`}
        onClose={() => {
          setIndex(null);
          trigger.current?.focus();
        }}
        onCancel={() => setIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
        onClick={(event) => {
          if (event.target === dialog.current) setIndex(null);
        }}
      >
        <div className="lightbox-top">
          <span aria-live="polite">
            {index !== null
              ? `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`
              : ""}
          </span>
          <button
            className="icon-button"
            type="button"
            autoFocus
            aria-label="Close gallery"
            onClick={() => setIndex(null)}
          >
            <X />
          </button>
        </div>
        {image && (
          <img
            className="lightbox-image"
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            onTouchStart={(event) => {
              touch.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              };
            }}
            onTouchEnd={(event) => {
              if (!touch.current) return;
              const dx = event.changedTouches[0].clientX - touch.current.x,
                dy = event.changedTouches[0].clientY - touch.current.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
                move(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          />
        )}
        <div className="lightbox-bottom">
          <button
            className="icon-button"
            type="button"
            aria-label="Previous image"
            onClick={() => move(-1)}
          >
            <ArrowLeft />
          </button>
          <p>{image?.alt}</p>
          <button
            className="icon-button"
            type="button"
            aria-label="Next image"
            onClick={() => move(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </>
  );
}
