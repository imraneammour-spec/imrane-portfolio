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
                { opacity: 0.65, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  immediateRender: false,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 94%",
                    once: true,
                  },
                },
              );
            });
          root.current
            ?.querySelectorAll<HTMLElement>("[data-stagger]")
            .forEach((group) => {
              gsap.fromTo(
                Array.from(group.children),
                { opacity: 0.65, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  stagger: 0.09,
                  immediateRender: false,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: group,
                    start: "top 90%",
                    once: true,
                  },
                },
              );
            });
          root.current
            ?.querySelectorAll<HTMLElement>("[data-process-line]")
            .forEach((line) => {
              gsap.fromTo(
                line,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  duration: 1.2,
                  immediateRender: false,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: line.parentElement,
                    start: "top 85%",
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
