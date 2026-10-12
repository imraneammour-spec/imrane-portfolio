import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function ContactFinale({ home = false }: { home?: boolean }) {
  return (
    <section
      className="contact-finale"
      aria-labelledby="contact-title"
      data-reveal
    >
      <div>
        <p className="eyebrow">{home ? "06 / CONTACT" : "CONTACT IMRANE"}</p>
        <h2 id="contact-title">
          Let’s Work
          <br />
          on <em>Your Project</em>
        </h2>
        <p className="contact-finale-description">
          Planning an interior, an architectural visualization or technical
          drawings? Share your space, references and the deliverables you need.
        </p>
        <Link href="/contact/" className="button button-solid">
          Contact me <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="contact-finale-channels">
        <a href={`mailto:${site.email}`}>
          <Mail size={20} />
          <span>
            <small>Email</small>
            {site.email}
          </span>
          <ArrowUpRight size={18} />
        </a>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={20} />
          <span>
            <small>WhatsApp</small>
            {site.phone}
          </span>
          <ArrowUpRight size={18} />
        </a>
        <p>{site.location}</p>
      </div>
    </section>
  );
}
