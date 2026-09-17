"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ApplicationAttachment } from "@/types/site";

const STORAGE_KEY = "wolf-apply-draft-v1";

type Urgency = "immediate" | "within-24h" | "within-week" | "uncertain";

interface FormState {
  step: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactZip: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  situation: string;
  urgency: Urgency;
  hospitalName: string;
  vetContact: string;
  estimateUsd: string;
  attachments: ApplicationAttachment[];
  agreedTransparency: boolean;
  agreedContentRights: boolean;
}

const INITIAL: FormState = {
  step: 0,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  contactZip: "",
  dogName: "",
  dogBreed: "",
  dogAge: "",
  situation: "",
  urgency: "uncertain",
  hospitalName: "",
  vetContact: "",
  estimateUsd: "",
  attachments: [],
  agreedTransparency: false,
  agreedContentRights: false,
};

type Action =
  | { type: "set"; field: keyof FormState; value: FormState[keyof FormState] }
  | { type: "addAttachment"; attachment: ApplicationAttachment }
  | { type: "removeAttachment"; url: string }
  | { type: "step"; step: number }
  | { type: "hydrate"; state: FormState }
  | { type: "reset" };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "set":
      return { ...state, [action.field]: action.value };
    case "addAttachment":
      return { ...state, attachments: [...state.attachments, action.attachment] };
    case "removeAttachment":
      return {
        ...state,
        attachments: state.attachments.filter((a) => a.url !== action.url),
      };
    case "step":
      return { ...state, step: action.step };
    case "hydrate":
      return action.state;
    case "reset":
      return INITIAL;
  }
}

const STEP_LABELS = [
  "Family & Dog",
  "Situation",
  "Vet estimate",
  "Agreements",
  "Review",
];

export function ApplyForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hydrated = useRef(false);

  // Hydrate from localStorage.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FormState;
        if (parsed && typeof parsed === "object") {
          dispatch({ type: "hydrate", state: { ...INITIAL, ...parsed } });
        }
      }
    } catch {
      // ignore corrupt drafts
    }
  }, []);

  // Persist drafts (skip when submitted).
  useEffect(() => {
    if (!hydrated.current || submitted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota / privacy mode
    }
  }, [state, submitted]);

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    dispatch({ type: "set", field, value });
  }

  function next() {
    dispatch({ type: "step", step: Math.min(state.step + 1, STEP_LABELS.length - 1) });
  }
  function back() {
    dispatch({ type: "step", step: Math.max(state.step - 1, 0) });
  }

  function canAdvance(): boolean {
    switch (state.step) {
      case 0:
        return Boolean(
          state.contactName &&
            /^.+@.+\..+$/.test(state.contactEmail) &&
            state.dogName,
        );
      case 1:
        return Boolean(state.situation.trim().length >= 30);
      case 2:
        return true; // attachments optional
      case 3:
        return state.agreedTransparency;
      default:
        return true;
    }
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError(null);
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await fetch("/api/applications/upload", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as
        | { url: string; filename: string; contentType: string }
        | { error: string };
      if (!res.ok || !("url" in json)) {
        setUploadError("error" in json ? json.error : "Upload failed");
        return;
      }
      dispatch({ type: "addAttachment", attachment: json });
    } catch {
      setUploadError("Network error during upload");
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (state.step !== STEP_LABELS.length - 1) {
      next();
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName: state.contactName,
          contactEmail: state.contactEmail,
          contactPhone: state.contactPhone,
          contactZip: state.contactZip,
          dogName: state.dogName,
          dogBreed: state.dogBreed,
          dogAge: state.dogAge,
          situation: state.situation,
          urgency: state.urgency,
          hospitalName: state.hospitalName,
          vetContact: state.vetContact,
          estimateUsd: state.estimateUsd,
          attachments: state.attachments,
          agreedTransparency: state.agreedTransparency,
          agreedContentRights: state.agreedContentRights,
          website: "", // honeypot — empty
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(json.error ?? "Submission failed. Please try again.");
        setSubmitting(false);
        return;
      }
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-garnet/15 bg-blush p-8 text-center">
        <h3 className="text-2xl font-bold text-ink">We received your case.</h3>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          You will hear back from a member of our team within 48 hours. If your dog is
          in immediate critical condition, please continue to coordinate with your
          veterinary team — we will work as fast as we can.
        </p>
      </div>
    );
  }

  const stepIndex = state.step;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {/* Step indicator */}
      <ol className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
        {STEP_LABELS.map((label, i) => {
          const active = i === stepIndex;
          const done = i < stepIndex;
          return (
            <li
              key={label}
              className={
                "rounded-full border px-3 py-1 " +
                (active
                  ? "border-garnet bg-garnet text-white"
                  : done
                    ? "border-garnet/30 bg-garnet-soft text-garnet-deep"
                    : "border-ink/10 bg-white text-ink-soft")
              }
            >
              {i + 1}. {label}
            </li>
          );
        })}
      </ol>

      {/* Step panels */}
      {stepIndex === 0 && (
        <fieldset className="space-y-4">
          <legend className="sr-only">Family and dog basics</legend>
          <p className="text-sm text-ink-soft">
            Tell us how to reach you and a few quick details about your dog.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Your name"
              required
              value={state.contactName}
              onChange={(v) => setField("contactName", v)}
              autoComplete="name"
            />
            <Field
              label="Email"
              type="email"
              required
              value={state.contactEmail}
              onChange={(v) => setField("contactEmail", v)}
              autoComplete="email"
            />
            <Field
              label="Phone"
              type="tel"
              value={state.contactPhone}
              onChange={(v) => setField("contactPhone", v)}
              autoComplete="tel"
            />
            <Field
              label="ZIP code"
              value={state.contactZip}
              onChange={(v) => setField("contactZip", v)}
              autoComplete="postal-code"
            />
            <Field
              label="Dog's name"
              required
              value={state.dogName}
              onChange={(v) => setField("dogName", v)}
            />
            <Field
              label="Breed"
              value={state.dogBreed}
              onChange={(v) => setField("dogBreed", v)}
            />
            <Field
              label="Age"
              value={state.dogAge}
              onChange={(v) => setField("dogAge", v)}
              placeholder="e.g. 3 years"
            />
          </div>
        </fieldset>
      )}

      {stepIndex === 1 && (
        <fieldset className="space-y-4">
          <legend className="sr-only">Situation</legend>
          <Field
            label="What is happening?"
            required
            multiline
            rows={6}
            value={state.situation}
            onChange={(v) => setField("situation", v)}
            placeholder="Tell us what's going on, what your vet has said, and what care has been recommended."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-semibold text-ink">Urgency</span>
              <select
                value={state.urgency}
                onChange={(e) => setField("urgency", e.target.value as Urgency)}
                className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
              >
                <option value="immediate">Immediate — life-threatening now</option>
                <option value="within-24h">Within 24 hours</option>
                <option value="within-week">Within a week</option>
                <option value="uncertain">Uncertain</option>
              </select>
            </label>
            <Field
              label="Veterinary hospital"
              value={state.hospitalName}
              onChange={(v) => setField("hospitalName", v)}
            />
            <Field
              label="Vet contact (name / phone / email)"
              value={state.vetContact}
              onChange={(v) => setField("vetContact", v)}
            />
            <Field
              label="Estimate amount (USD)"
              value={state.estimateUsd}
              onChange={(v) => setField("estimateUsd", v)}
              placeholder="e.g. 8500"
            />
          </div>
        </fieldset>
      )}

      {stepIndex === 2 && (
        <fieldset className="space-y-4">
          <legend className="sr-only">Vet estimate uploads</legend>
          <p className="text-sm text-ink-soft">
            Upload the vet&apos;s written estimate or any supporting paperwork (PDF or photo).
            This helps us move quickly. You can skip this step and add files later if needed.
          </p>
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white/70 p-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFile}
              className="block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-garnet file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {uploadError && (
              <p className="mt-2 text-sm text-garnet-deep">{uploadError}</p>
            )}
          </div>
          {state.attachments.length > 0 && (
            <ul className="space-y-2 text-sm">
              {state.attachments.map((att) => (
                <li
                  key={att.url}
                  className="flex items-center justify-between rounded-lg border border-ink/8 bg-white px-3 py-2"
                >
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-ink underline"
                  >
                    {att.filename || "Attachment"}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "removeAttachment", url: att.url })
                    }
                    className="ml-3 text-xs font-semibold uppercase text-garnet-deep"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      )}

      {stepIndex === 3 && (
        <fieldset className="space-y-4">
          <legend className="sr-only">Agreements</legend>
          <label className="flex gap-3 rounded-xl border border-ink/8 bg-white p-4 text-sm leading-6 text-ink">
            <input
              type="checkbox"
              checked={state.agreedTransparency}
              onChange={(e) => setField("agreedTransparency", e.target.checked)}
              className="mt-1 h-4 w-4 accent-garnet"
              required
            />
            <span>
              I understand The Wolf Project funds vet hospitals directly and may share
              de-identified case details (diagnosis, treatment, outcome) so supporters
              can see the impact of their gifts. <strong>(required)</strong>
            </span>
          </label>
          <label className="flex gap-3 rounded-xl border border-ink/8 bg-white p-4 text-sm leading-6 text-ink">
            <input
              type="checkbox"
              checked={state.agreedContentRights}
              onChange={(e) => setField("agreedContentRights", e.target.checked)}
              className="mt-1 h-4 w-4 accent-garnet"
            />
            <span>
              I give The Wolf Project permission to share my dog&apos;s name, photo, and
              story publicly to help other families. <em>(optional — you can grant
              this later)</em>
            </span>
          </label>
        </fieldset>
      )}

      {stepIndex === 4 && (
        <section className="space-y-4 rounded-2xl border border-ink/8 bg-white p-6 text-sm leading-7 text-ink">
          <h3 className="text-lg font-semibold text-ink">Please review</h3>
          <Review label="Your name" value={state.contactName} />
          <Review label="Email" value={state.contactEmail} />
          <Review label="Phone" value={state.contactPhone} />
          <Review label="ZIP" value={state.contactZip} />
          <Review label="Dog" value={`${state.dogName}${state.dogBreed ? ` · ${state.dogBreed}` : ""}${state.dogAge ? ` · ${state.dogAge}` : ""}`} />
          <Review label="Urgency" value={state.urgency} />
          <Review label="Hospital" value={state.hospitalName} />
          <Review label="Vet contact" value={state.vetContact} />
          <Review label="Estimate" value={state.estimateUsd ? `$${state.estimateUsd}` : ""} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Situation
            </p>
            <p className="mt-1 whitespace-pre-wrap">{state.situation}</p>
          </div>
          <Review
            label="Attachments"
            value={
              state.attachments.length
                ? state.attachments.map((a) => a.filename).join(", ")
                : "None"
            }
          />
        </section>
      )}

      {submitError && (
        <p className="rounded-lg border border-garnet/30 bg-blush px-4 py-3 text-sm text-garnet-deep">
          {submitError}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={back}
            className="rounded-full border border-ink/15 bg-white px-5 py-2 text-sm font-semibold text-ink"
          >
            Back
          </button>
        )}
        {stepIndex < STEP_LABELS.length - 1 && (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="rounded-full bg-garnet px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-garnet-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        )}
        {stepIndex === STEP_LABELS.length - 1 && (
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-garnet px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-garnet-deep disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>

      <p className="text-xs text-ink-soft">
        Your draft is saved on this device. You can return any time to finish.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
  multiline,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
}) {
  const id = `f-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={id} className="block text-sm">
      <span className="font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-garnet-deep">*</span>}
      </span>
      {multiline ? (
        <textarea
          id={id}
          required={required}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
        />
      )}
    </label>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </p>
      <p className="text-ink">{value || <span className="text-ink-soft">—</span>}</p>
    </div>
  );
}
