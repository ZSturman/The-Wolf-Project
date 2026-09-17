import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { EmailSignup } from "@/components/email-signup";
import { ApplyForm } from "@/components/apply-form";
import { getSingleton } from "@/lib/db/singletons";
import type { ApplicationConfig } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply for help",
  description:
    "If your dog is facing an emergency you can't afford, you're not alone. Tell us your story and we'll review every case with care.",
};

const PROCESS_STEPS = [
  {
    step: "1",
    title: "You submit",
    body: "Tell us about your family, your dog, and what's happening. It takes about ten minutes — and you can save your draft and return any time.",
  },
  {
    step: "2",
    title: "We review",
    body: "A team member reaches out within 48 hours. We coordinate directly with your vet to confirm diagnosis, urgency, and viability.",
  },
  {
    step: "3",
    title: "We fund",
    body: "If your case is accepted, we pay your hospital directly so treatment can begin. You'll get private updates through your case portal.",
  },
];

const WHO_WE_HELP = [
  "Treatable, time-sensitive emergencies where cost is the barrier to care",
  "Families coordinating with a licensed U.S. veterinary hospital",
  "Cases where surgery, hospitalization, or specialist care is medically indicated",
];

const EXPECTATIONS = [
  "We pay vet hospitals directly — funds are never sent to families",
  "We share de-identified case details so supporters can see real impact",
  "We may ask follow-up questions or for additional records from your vet",
  "Not every case will be accepted — we focus on situations where we can fully see treatment through",
];

export default async function ApplyPage() {
  const config = await getSingleton<ApplicationConfig>("applicationConfig");
  const accepting = config?.accepting ?? false;

  return (
    <>
      {/* Reassurance hero — same copy regardless of accepting state */}
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
            Apply for Help
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
            You&apos;re not alone. We&apos;re here to help.
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            If your dog is facing an emergency and the cost of care feels impossible,
            tell us what&apos;s happening. Every story is read by a real person, and we will
            do everything we can to help you find a path forward.
          </p>
        </Reveal>
      </section>

      {/* Who we can help + Important expectations */}
      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="panel p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Who we can help</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
              {WHO_WE_HELP.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-garnet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[2.2rem] border border-garnet/15 bg-blush p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-ink">What to expect</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
              {EXPECTATIONS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-garnet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 3-step process */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A simple, three-step process."
            intro="We move as fast as the medicine demands and as carefully as the situation deserves."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 70}>
              <article className="panel h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                  Step {s.step}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form OR paused state */}
      <section id="form" className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-3xl p-6 sm:p-8">
            {accepting ? (
              <ApplyForm />
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-ink">
                    {config?.closedTitle ?? "Applications are not yet open."}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {config?.closedIntro ??
                      "We're building the lifeline responsibly. When we open applications, we want to ensure we can fully stand behind every case we accept."}
                  </p>
                </div>

                <div className="border-t border-ink/8 pt-8">
                  <EmailSignup
                    heading={config?.notifyHeading ?? "Be the first to know"}
                    description={
                      config?.notifyDescription ??
                      "Sign up to be notified the moment applications open."
                    }
                  />
                </div>

                <div className="border-t border-ink/8 pt-8">
                  <p className="text-sm text-ink-soft">
                    {config?.supportPrompt ??
                      "In the meantime, you can help us reach our launch goal:"}
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="/donate" variant="donate">
                      Support the lifeline
                    </ButtonLink>
                    <ButtonLink href="/cases" variant="secondary">
                      View cases
                    </ButtonLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
