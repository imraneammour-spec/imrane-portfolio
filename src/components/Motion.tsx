"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motionPreferenceEvent,
  prefersReducedMotion,
} from "@/lib/motion-preference";

export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [preferenceVersion, setPreferenceVersion] = useState(0);
  useEffect(() => {
    const update = () => setPreferenceVersion((version) => version + 1);
    window.addEventListener(motionPreferenceEvent, update);
    return () => window.removeEventListener(motionPreferenceEvent, update);
  }, []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;
    const scope = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 900px)",
        },
        (context) => {
          if (!context.conditions?.motion) return;
          root.current
            ?.querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { autoAlpha: 0, y: 28 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.85,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 94%",
                    once: true,
                  },
                },
              );
            });
          if (
            context.conditions.desktop &&
            navigator.hardwareConcurrency >= 4
          ) {
            root.current
              ?.querySelectorAll<HTMLElement>("[data-parallax]")
              .forEach((frame) => {
                const visual = frame.querySelector("img");
                if (visual)
                  gsap.fromTo(
                    visual,
                    { yPercent: -3 },
                    {
                      yPercent: 3,
                      ease: "none",
                      scrollTrigger: {
                        trigger: frame,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                      },
                    },
                  );
              });
            root.current
              ?.querySelectorAll<HTMLElement>("[data-drift]")
              .forEach((line) => {
                gsap.fromTo(
                  line,
                  { x: line.dataset.drift === "left" ? 22 : -22 },
                  {
                    x: line.dataset.drift === "left" ? -22 : 22,
                    ease: "none",
                    scrollTrigger: {
                      trigger: line,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 1,
                    },
                  },
                );
              });
          }
        },
      );
      return () => media.revert();
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    document.fonts.ready.then(() => {
      if (root.current) refresh();
    });
    return () => {
      window.removeEventListener("load", refresh);
      scope.revert();
    };
  }, [pathname, preferenceVersion]);
  return <div ref={root}>{children}</div>;
}
