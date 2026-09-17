"use client";

import { useState } from "react";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { Button, Field, inputCls } from "@/components/site/ui";

export default function LoginPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-dvh grid lg:grid-cols-2">
      <div className="relative hidden lg:block bg-spruce-900">
        <RidgeArt seed="login-ridge" tone="dark" className="absolute inset-0 w-full h-full" />
        <div className="relative h-full flex flex-col justify-between p-12 text-snow-100">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <Mountain className="text-bugyal-400" size={26} strokeWidth={1.75} />
            <span className="font-display text-[26px] leading-none">Indiahikes</span>
          </Link>
          <div>
            <p className="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.1] text-snow-50 max-w-[22ch]">
              Your trek record, your fitness, and every date you have held.
            </p>
            <p className="nums mt-5 text-[14px] text-glacier-400">
              38,200 trekkers · 15 routes · 5 states
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-[400px]">
          <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-10">
            <Mountain className="text-deodar-600" size={24} strokeWidth={1.75} />
            <span className="font-display text-[24px] leading-none">Indiahikes</span>
          </Link>

          {sent ? (
            <div>
              <h1 className="font-display text-[32px] leading-tight">Check your email</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-spruce-800/70">
                A sign-in link is on its way. It works once and expires in fifteen minutes.
              </p>
              <Button href="/account" variant="dark" className="mt-7 w-full">
                Continue to my treks
              </Button>
              <button
                onClick={() => setSent(false)}
                className="mt-4 w-full text-[14px] text-snow-500 hover:text-spruce-800 transition-colors"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-display text-[clamp(1.9rem,4vw,2.4rem)] leading-tight">
                {mode === "in" ? "Sign in" : "Create an account"}
              </h1>
              <p className="mt-3 text-[15.5px] leading-relaxed text-spruce-800/70">
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
                    <input id="name" className={inputCls} placeholder="As printed on your ID" required />
                  </Field>
                )}
                <Field label="Email" htmlFor="email">
                  <input id="email" type="email" className={inputCls} placeholder="you@example.com" required />
                </Field>
                {mode === "up" && (
                  <Field label="Phone" htmlFor="phone" hint="Only used by your trek leader, three days before you go">
                    <input id="phone" className={inputCls} placeholder="+91" />
                  </Field>
                )}
                <Button type="submit" className="w-full">
                  {mode === "in" ? "Email me a link" : "Create my account"}
                </Button>
              </form>

              <p className="mt-7 text-[14.5px] text-spruce-800/70">
                {mode === "in" ? "New here? " : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === "in" ? "up" : "in")}
                  className="font-semibold border-b-2 border-bugyal-500 pb-px hover:border-spruce-800 transition-colors"
                >
                  {mode === "in" ? "Create an account" : "Sign in"}
                </button>
              </p>

              <p className="mt-10 pt-6 border-t border-snow-300 text-[13px] text-snow-500 leading-relaxed">
                Demonstration only — nothing is sent and no account is created. Head to{" "}
                <Link href="/account" className="underline">my treks</Link> or the{" "}
                <Link href="/admin" className="underline">admin panel</Link> to look around.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
