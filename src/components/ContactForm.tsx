"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { site } from "@/data/site";
import { sendProjectMessage } from "@/lib/send-message";

export function ContactForm() {
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [success, setSuccess] = useState(false);
  const mountedAt = useRef(0),
    controller = useRef<AbortController | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
    return () => controller.current?.abort();
  }, []);
  if (!site.form.enabled || !site.form.endpoint)
    return (
      <p>Contact me directly by email or WhatsApp to discuss your project.</p>
    );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (busy || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("_gotcha")) {
      setStatus("Please use email or WhatsApp to get in touch.");
      return;
    }
    if (Date.now() - mountedAt.current < 3000) {
      setStatus("Please take a moment to review your message, then try again.");
      return;
    }
    try {
      const last = Number(sessionStorage.getItem("imrane-last-message"));
      if (last && Date.now() - last < 60000) {
        setStatus("Please wait a minute before sending another message.");
        return;
      }
    } catch {}
    setBusy(true);
    setSuccess(false);
    setStatus("Sending your message…");
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 15000);
    try {
      data.set("_subject", "New project enquiry — Imrane Ammour portfolio");
      await sendProjectMessage(
        site.form.endpoint,
        data,
        controller.current.signal,
      );
      form.reset();
      setSuccess(true);
      setStatus(
        "Thank you — your message has been accepted. I’ll get back to you.",
      );
      try {
        sessionStorage.setItem("imrane-last-message", String(Date.now()));
      } catch {}
    } catch {
      setStatus(
        "Your message could not be sent. Your draft is still here. Please try again, or contact me by email or WhatsApp.",
      );
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      controller.current = null;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      action={site.form.endpoint}
      method="POST"
    >
      <div className="spam-field" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor="name">
          Your name <span>*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Full name"
        />
      </div>
      <div className="field">
        <label htmlFor="email">
          Email address <span>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
        />
      </div>
      <div className="field">
        <label htmlFor="phone">
          Phone <small>optional</small>
        </label>
        <input
          id="phone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          placeholder="+212 …"
        />
      </div>
      <div className="field">
        <label htmlFor="interest">Your project</label>
        <select id="interest" name="interest" defaultValue="">
          <option value="" disabled>
            Select an area
          </option>
          <option>Interior design</option>
          <option>3D visualization</option>
          <option>Technical drawings</option>
          <option>Furniture &amp; spatial modeling</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="message">
          Tell me about your project <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="The space, the idea, what you have in mind…"
        />
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className="button button-solid"
          disabled={busy}
          aria-busy={busy}
        >
          {busy ? "Sending…" : "Send your message"}
          {busy ? (
            <LoaderCircle className="spinner" size={17} />
          ) : (
            <ArrowUpRight size={17} />
          )}
        </button>
        <span>Enquiry delivery via Formspree.</span>
      </div>
      <p
        className={`form-status ${success ? "is-success" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}
