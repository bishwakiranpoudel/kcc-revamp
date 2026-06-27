"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, CircleNotch, PaperPlaneTilt } from "@phosphor-icons/react";

type Status = "idle" | "submitting" | "done";

const TOPICS = ["Sales & pricing", "Demo request", "Support", "Partnership"];

const inputClass =
  "w-full rounded-xl border border-trail-border bg-white px-3.5 py-2.5 text-sm text-trail-ink outline-none transition placeholder:text-trail-faint focus:border-trail-cyan focus:ring-2 focus:ring-trail-cyan/20";
const labelClass = "mb-1.5 block text-sm font-medium text-trail-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="trail-card rounded-2xl border-l-2 border-l-trail-green p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-trail-green/12 text-trail-green">
          <CheckCircle size={32} weight="fill" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-trail-ink">
          Thanks — your message is in
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-trail-muted">
          A real person on our team will get back to you within one business
          day. Check your inbox — that&apos;s where we&apos;ll reply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="trail-card rounded-2xl p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Alex Operator"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-trail-faint">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            placeholder="Northgate Pet Resorts"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-trail-faint">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 012-3456"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <span className={labelClass}>What&apos;s this about?</span>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic, i) => (
            <label key={topic} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={topic}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="inline-flex items-center rounded-full border border-trail-border bg-white px-4 py-1.5 text-sm font-medium text-trail-muted transition peer-checked:border-trail-cyan peer-checked:bg-trail-cyan peer-checked:text-white">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your group, the systems you run, and what you're trying to figure out…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-trail-primary mt-6 h-12 w-full justify-center disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <CircleNotch size={18} weight="bold" className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <PaperPlaneTilt size={18} weight="bold" />
          </>
        )}
      </button>
      <p className="mt-3.5 text-center text-xs text-trail-muted">
        We&apos;ll only use this to reply to you. No spam, and we never share your
        numbers.
      </p>
    </form>
  );
}
