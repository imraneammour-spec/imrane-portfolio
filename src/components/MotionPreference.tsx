"use client";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  motionPreferenceEvent,
  prefersReducedMotion,
} from "@/lib/motion-preference";
export function MotionPreference() {
  const [reduced, setReduced] = useState(false),
    [system, setSystem] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setSystem(query.matches);
      setReduced(prefersReducedMotion());
    };
    const systemChanged = () => {
      sync();
      window.dispatchEvent(new Event(motionPreferenceEvent));
    };
    try {
      document.documentElement.dataset.motion =
        localStorage.getItem("imrane-motion") === "reduced"
          ? "reduced"
          : "full";
    } catch {}
    sync();
    window.dispatchEvent(new Event(motionPreferenceEvent));
    query.addEventListener("change", systemChanged);
    window.addEventListener(motionPreferenceEvent, sync);
    return () => {
      query.removeEventListener("change", systemChanged);
      window.removeEventListener(motionPreferenceEvent, sync);
    };
  }, []);
  if (system)
    return (
      <span className="motion-system">Reduced motion · system preference</span>
    );
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={reduced}
      onClick={() => {
        document.documentElement.dataset.motion = reduced ? "full" : "reduced";
        try {
          localStorage.setItem("imrane-motion", reduced ? "full" : "reduced");
        } catch {}
        setReduced(!reduced);
        window.dispatchEvent(new Event(motionPreferenceEvent));
      }}
    >
      {reduced ? <Play size={13} /> : <Pause size={13} />}{" "}
      {reduced ? "Enable motion" : "Reduce motion"}
    </button>
  );
}
