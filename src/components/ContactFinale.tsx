import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function ContactFinale() {
  return (
    <section className="contact-finale" data-reveal>
      <p className="eyebrow">A CONVERSATION IS WHERE IT BEGINS</p>
      <h2>
        Have a project
        <br />
        in mind?
        <em>
          Let’s create something
          <br />
          exceptional.
        </em>
      </h2>
      <Link href="/contact/" className="button button-outline">
        Start a conversation <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
