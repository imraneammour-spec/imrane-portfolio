"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { MotionPreference } from "./MotionPreference";
import { prefersReducedMotion } from "@/lib/motion-preference";

const navigation = [
  ["01", "Projects", "/projects/"],
  ["02", "About", "/about/"],
  ["03", "Services", "/services/"],
  ["04", "Contact", "/contact/"],
] as const;
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
    const old = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [open]);
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Imrane Ammour — Home">
        <span className="monogram" aria-hidden="true">
          IA<span>.</span>
        </span>
        <span className="brand-name">
          IMRANE
          <br />
          AMMOUR
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(([number, label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname.startsWith(href.slice(0, -1)) ? "page" : undefined
            }
            className={label === "Contact" ? "nav-contact" : ""}
          >
            <span>{number}</span>
            {label}
            {label === "Contact" && <ArrowUpRight size={15} />}
          </Link>
        ))}
      </nav>
      <button
        className="menu-toggle icon-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        aria-label="Site navigation"
        className="navigation-dialog"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) setOpen(false);
        }}
      >
        <div className="navigation-dialog-head">
          <span className="eyebrow">Architectural atelier</span>
          <button
            className="icon-button"
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map(([number, label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <small>{number}</small>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <p className="navigation-note">
          {site.location}
          <br />
          Interior architecture &amp; visualization
        </p>
      </dialog>
    </header>
  );
}

export function Preloader() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem("imrane-visited")) return;
      sessionStorage.setItem("imrane-visited", "1");
    } catch {
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`preloader ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <span className="preloader-name">
        IMRANE<span>.</span>
      </span>
      <span className="eyebrow">ARCHITECTURE &amp; VISUALIZATION</span>
      <span className="preloader-track">
        <i />
      </span>
    </div>
  );
}

export function RouteStage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const clickedRoute = useRef(false);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element)?.closest("a");
      if (!link || link.target || link.hasAttribute("download")) return;
      const target = new URL(link.href, window.location.href);
      clickedRoute.current =
        target.origin === window.location.origin &&
        target.pathname !== window.location.pathname &&
        !target.hash;
    };
    const back = () => {
      clickedRoute.current = false;
    };
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", back);
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", back);
    };
  }, []);
  useEffect(() => {
    // Reset only explicit page-link visits. Back/forward retains Next's restoration.
    if (clickedRoute.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      clickedRoute.current = false;
    }
  }, [pathname]);
  return (
    <div key={pathname} className="route-stage">
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" className="footer-name">
          IMRANE<span>AMMOUR.</span>
        </Link>
        <p>
          Spaces with intention.
          <br />
          Images with atmosphere.
        </p>
        <a href="#page-top" className="back-top" aria-label="Back to top">
          <ArrowUp size={20} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>{site.location}</span>
        <Link href="/contact/">
          Let’s talk <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="motion-settings">
        <MotionPreference />
      </div>
    </footer>
  );
}
