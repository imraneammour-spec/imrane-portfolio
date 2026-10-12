"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { site } from "@/data/site";
import {
  motionPreferenceEvent,
  prefersReducedMotion,
} from "@/lib/motion-preference";

export function Hero() {
  const hero = useRef<HTMLElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false),
    update = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false),
    [paused, setPaused] = useState(true),
    [available, setAvailable] = useState(false);
  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let inView = false,
      failed = false;
    const allowed = () => !prefersReducedMotion() && !connection?.saveData;
    const sync = () => setPaused(film.paused);
    const run = () => {
      if (
        failed ||
        !allowed() ||
        manualPause.current ||
        !inView ||
        document.hidden
      ) {
        film.pause();
        if (failed || !allowed()) {
          setReady(false);
          setAvailable(false);
        }
        return;
      }
      if (!film.getAttribute("src")) film.src = site.heroVideo;
      film.muted = true;
      setAvailable(true);
      film.play().catch(sync);
    };
    update.current = run;
    const playing = () => {
      setReady(true);
      sync();
    };
    const error = () => {
      failed = true;
      run();
    };
    film.addEventListener("playing", playing);
    film.addEventListener("pause", sync);
    film.addEventListener("error", error);
    preference.addEventListener("change", run);
    document.addEventListener("visibilitychange", run);
    window.addEventListener(motionPreferenceEvent, run);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      run();
    });
    if (hero.current) observer.observe(hero.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", run);
      document.removeEventListener("visibilitychange", run);
      window.removeEventListener(motionPreferenceEvent, run);
      film.removeEventListener("playing", playing);
      film.removeEventListener("pause", sync);
      film.removeEventListener("error", error);
      film.pause();
    };
  }, []);
  return (
    <section
      ref={hero}
      className={`cinematic-hero ${ready ? "has-video" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">
          <i />
          RABAT · SALÉ, MOROCCO
        </p>
        <h1 id="hero-title">
          <span className="title-mask">
            <span>Imrane</span>
          </span>
          <span className="title-mask">
            <span>Ammour.</span>
          </span>
        </h1>
        <p className="hero-role">INTERIOR DESIGNER &amp; 3D VISUALIZER</p>
        <p className="hero-subtitle">
          Interior spaces designed with precision and brought to life through
          photorealistic visualization.
        </p>
        <div className="hero-actions">
          <Link className="button button-solid" href="/projects/">
            View my projects <ArrowUpRight size={17} />
          </Link>
          <Link className="button button-outline" href="/contact/">
            Contact me <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="hero-art">
        <img
          className="hero-poster"
          src={site.heroImage}
          alt="A contemporary villa — architectural visualization by Imrane Ammour"
          width="1448"
          height="1086"
          fetchPriority="high"
          decoding="async"
        />
        <video
          ref={video}
          id="hero-film"
          className="hero-film"
          muted
          loop
          playsInline
          preload="none"
          poster={site.heroImage}
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-shade" />
        {available && (
          <button
            className="film-control"
            type="button"
            aria-controls="hero-film"
            aria-label={
              paused ? "Play background film" : "Pause background film"
            }
            onClick={() => {
              manualPause.current = !video.current?.paused;
              update.current();
            }}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            <span>{paused ? "Play" : "Pause"}</span>
          </button>
        )}
        <div className="hero-caption">
          <span>FEATURED VISUAL / 02</span>
          <strong>Villa contemporaine</strong>
          <small>Personal architectural study</small>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#introduction" className="scroll-indicator">
          <ArrowDown size={18} />
          Scroll to explore
        </a>
        <span>RABAT · SALÉ, MOROCCO</span>
        <span>DESIGN / VISUALIZATION / DETAIL</span>
      </div>
    </section>
  );
}
