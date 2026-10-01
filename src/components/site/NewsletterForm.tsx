"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (done) {
    return (
      <p role="status" className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-pine-600">
        <Check size={18} /> You’re on the list. We’ll write when the next season opens.
      </p>
    );
  }

  return (
    <form
      className="mt-6 flex max-w-md items-center gap-2 rounded-full bg-white p-1.5 shadow-soft"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[15px] outline-none placeholder:text-ink-400"
      />
      <button
        type="submit"
        disabled={!valid}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-ink-700 disabled:opacity-40"
      >
        Notify me <ArrowRight size={15} />
      </button>
    </form>
  );
}
