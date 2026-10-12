import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
export const metadata = {
  title: "Contact",
  description:
    "Discuss your interior design or architectural visualization project with Imrane Ammour. Email, WhatsApp and project enquiry form.",
  alternates: { canonical: "/contact/" },
};
export default function Contact() {
  return (
    <>
      <section className="page-intro section contact-intro">
        <p className="eyebrow">YOUR NEXT SPACE STARTS HERE</p>
        <h1>
          Let’s create
          <br />
          <em>something exceptional.</em>
        </h1>
        <div className="page-intro-bottom">
          <p>
            A first idea, a space to transform, an image to bring to life.
            <br />
            Tell me what you have in mind.
          </p>
          <span className="tiny-label">{site.location}</span>
        </div>
      </section>
      <section className="contact-layout section">
        <aside className="contact-details" data-reveal>
          <p className="eyebrow">A DIRECT CONVERSATION</p>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
            <Mail size={20} />
          </a>
          <a
            className="contact-channel"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <span className="eyebrow">WHATSAPP</span>
              <strong>{site.phone}</strong>
            </div>
            <ArrowUpRight size={22} />
          </a>
          <a className="contact-channel" href={`tel:${site.phoneHref}`}>
            <div>
              <span className="eyebrow">CALL</span>
              <strong>{site.phone}</strong>
            </div>
            <ArrowUpRight size={22} />
          </a>
          {Object.entries(site.social)
            .filter(([, url]) => url)
            .map(([name, url]) => (
              <a
                className="contact-channel"
                href={url}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
                <ArrowUpRight size={18} />
              </a>
            ))}
          <p className="contact-note">
            Based in Rabat–Salé.
            <br />
            Projects across Morocco.
            <br />
            <br />
            Your enquiry is only used to discuss your project.
          </p>
        </aside>
        <div className="contact-form-panel">
          <p className="eyebrow">TELL ME ABOUT YOUR PROJECT</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
