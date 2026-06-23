"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, CircleNotch, ArrowRight } from "@phosphor-icons/react";
import { INTEGRATIONS } from "@/lib/site";

type Status = "idle" | "submitting" | "done";

const LOCATION_BANDS = ["1", "2–5", "6–15", "16–40", "40+"];

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-signal-strong focus:ring-2 focus:ring-signal-strong/20";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [tools, setTools] = useState<string[]>([]);

  function toggleTool(name: string) {
    setTools((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name],
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="light-card rounded-2xl border-l-2 border-l-data-revenue p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-data-revenue/15 text-data-revenue">
          <CheckCircle size={32} weight="fill" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
          Got it — you&apos;re on the list
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
          We&apos;ll email you within one business day to set up your demo. Keep an
          eye on your inbox — that&apos;s where the calendar link lands.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="light-card rounded-2xl p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input id="name" name="name" required placeholder="Alex Operator" className={inputClass} />
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
            Company
          </label>
          <input id="company" name="company" required placeholder="Northgate Pet Resorts" className={inputClass} />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Your role
          </label>
          <input id="role" name="role" placeholder="Owner / COO / Manager" className={inputClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="locations" className={labelClass}>
          How many locations do you operate?
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCATION_BANDS.map((band, i) => (
            <label key={band} className="cursor-pointer">
              <input
                type="radio"
                name="locations"
                value={band}
                defaultChecked={i === 1}
                className="peer sr-only"
              />
              <span className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink-muted transition peer-checked:border-signal-strong peer-checked:bg-signal-strong peer-checked:text-white">
                {band}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <span className={labelClass}>Which systems are you running?</span>
        <div className="flex flex-wrap gap-2">
          {INTEGRATIONS.map((name) => {
            const active = tools.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleTool(name)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-signal-strong bg-signal-strong/10 text-signal-deep"
                    : "border-line bg-surface text-ink-muted hover:border-ink-muted/40"
                }`}
              >
                <span
                  className={`size-3.5 rounded-full border ${
                    active
                      ? "border-signal-strong bg-signal-strong"
                      : "border-line"
                  }`}
                />
                {name}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="tools" value={tools.join(",")} />
      </div>

      <div className="mt-4">
        <label htmlFor="notes" className={labelClass}>
          What do you want to figure out?{" "}
          <span className="text-ink-muted/60">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder="e.g. why payroll keeps creeping up across our 6 sites…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-product-primary mt-6 h-12 w-full justify-center disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <CircleNotch size={18} weight="bold" className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Book my demo
            <ArrowRight size={18} weight="bold" />
          </>
        )}
      </button>
      <p className="mt-3.5 text-center text-xs text-ink-muted">
        We&apos;ll only use this to set up your demo. No spam, and we never share
        your numbers.
      </p>
    </form>
  );
}
