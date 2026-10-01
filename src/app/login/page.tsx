"use client";

import { useState } from "react";
import Link from "next/link";
import { Mountain, Mail, ArrowLeft } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { Button, Field, inputCls } from "@/components/site/ui";
import { brand } from "@/data/brand";

const { stats } = brand;

export default function LoginPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [sent, setSent] = useState(false);

  return (
    <main className="grid min-h-dvh gap-3 bg-mist-100 p-3 sm:gap-5 sm:p-5 lg:grid-cols-[1.05fr_1fr]">
      {/* Photo — a short banner on phones, a tall card on desktop */}
      <div className="relative h-[220px] overflow-hidden rounded-bento bg-ink-900 sm:h-[280px] lg:h-auto lg:min-h-[calc(100dvh-2.5rem)]">
        <Photo name="tentMilkyWay" width={1600} priority alt="" />
        <div className="scrim-b absolute inset-0" aria-hidden="true" />
        <div className="scrim-t absolute inset-0" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-8 lg:p-10">
          <Link href="/" className="flex w-fit items-center gap-2" aria-label={`${brand.name} home`}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900">
              <Mountain size={18} strokeWidth={2} />
            </span>
            <span className="text-[18px] font-semibold tracking-[-0.02em]">{brand.name}</span>
          </Link>

          <figure className="glass max-w-[460px] rounded-[20px] p-4 sm:p-6">
            <blockquote className="text-[15px] font-medium leading-snug sm:text-[clamp(1.25rem,2vw,1.6rem)] sm:leading-[1.2] sm:tracking-[-0.02em]">
              Your trek record, your fitness, and every date you have held.
            </blockquote>
            <figcaption className="nums mt-2 text-[12.5px] text-white/70 sm:mt-4 sm:text-[13.5px]">
              {stats.trekkers.toLocaleString("en-IN")}+ trekkers · {stats.routes}+ routes · {stats.rating}/5 average rating
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center rounded-bento bg-white px-5 py-10 shadow-soft sm:px-10 sm:py-14">
        <div className="w-full max-w-[400px]">
          {sent ? (
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-500/12 text-forest-600">
                <Mail size={22} />
              </span>
              <h1 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.4rem)] leading-tight text-ink-900">
                Check your email
              </h1>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-500">
                A sign-in link is on its way. It works once and expires in fifteen minutes.
              </p>
              <Button href="/account" variant="dark" size="lg" className="mt-8 w-full">
                Continue to my treks
              </Button>
              <button
                onClick={() => setSent(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[14px] text-ink-500 transition-colors hover:bg-mist-100 hover:text-ink-900"
              >
                <ArrowLeft size={15} /> Use a different email
              </button>
            </div>
          ) : (
            <>
              <div className="inline-flex rounded-full bg-mist-100 p-1" role="group" aria-label="Choose sign in or create an account">
                {(
                  [
                    ["in", "Sign in"],
                    ["up", "Create account"],
                  ] as const
                ).map(([m, label]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`rounded-full px-4 py-2 text-[13.5px] transition-colors ${
                      mode === m ? "bg-white font-medium text-ink-900 shadow-soft" : "text-ink-500 hover:text-ink-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <h1 className="mt-7 font-display text-[clamp(1.9rem,4vw,2.4rem)] leading-tight text-ink-900">
                {mode === "in" ? "Welcome back" : "Create an account"}
              </h1>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-500">
                {mode === "in"
                  ? "We will email you a link. There is no password to forget."
                  : "One account holds your bookings, your documents and your trek history."}
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                {mode === "up" && (
                  <Field label="Full name" htmlFor="name">
                    <input id="name" className={inputCls} placeholder="As printed on your ID" autoComplete="name" required />
                  </Field>
                )}
                <Field label="Email" htmlFor="email">
                  <input id="email" type="email" className={inputCls} placeholder="you@example.com" autoComplete="email" required />
                </Field>
                {mode === "up" && (
                  <Field label="Phone" htmlFor="phone" hint="So our team can reach you about your trek">
                    <input id="phone" type="tel" className={inputCls} placeholder="+91" autoComplete="tel" />
                  </Field>
                )}
                <Button type="submit" size="lg" className="w-full">
                  {mode === "in" ? "Email me a link" : "Create my account"}
                </Button>
              </form>

              <p className="mt-6 text-[14px] text-ink-500">
                {mode === "in" ? "New here? " : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === "in" ? "up" : "in")}
                  className="font-medium text-ink-900 underline decoration-forest-500 decoration-2 underline-offset-4 transition-colors hover:text-forest-600"
                >
                  {mode === "in" ? "Create an account" : "Sign in"}
                </button>
              </p>

              <p className="mt-10 rounded-2xl bg-mist-100 px-4 py-3 text-[12.5px] leading-relaxed text-ink-500">
                Demonstration only — nothing is sent and no account is created. Head to{" "}
                <Link href="/account" className="text-ink-900 underline underline-offset-2">my treks</Link> or the{" "}
                <Link href="/admin" className="text-ink-900 underline underline-offset-2">admin panel</Link> to look around.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
