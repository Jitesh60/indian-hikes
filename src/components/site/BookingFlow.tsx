"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Check, ChevronDown, ChevronLeft, Leaf, Lock, Minus, Plus, ArrowRight, CalendarDays, UserRound,
  Bus, Backpack, Shirt, ShieldCheck, type LucideIcon,
} from "lucide-react";
import { Button, Field, inputCls } from "@/components/site/ui";
import { Photo } from "@/components/site/Photo";
import { trekCover } from "@/data/photos";
import { inr, type Departure, type Trek } from "@/lib/types";

type AddOn = { id: string; label: string; detail: string; price: number; per: "person" | "booking"; icon: LucideIcon };

const STEPS = ["Trekkers", "Add-ons", "Health", "Review"] as const;

const checkboxCls =
  "mt-0.5 appearance-none w-5 h-5 rounded-md border border-mist-400 bg-white checked:bg-ink-900 checked:border-ink-900 shrink-0 relative cursor-pointer transition-colors after:content-[''] after:absolute after:left-[6.5px] after:top-[3px] after:w-[5px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100";

function fmt(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString("en-IN", { ...opts, timeZone: "UTC" });
}

export function BookingFlow({
  trek,
  departure,
  waitlist,
}: {
  trek: Trek;
  departure: Departure;
  waitlist: boolean;
}) {
  const addOns: AddOn[] = [
    { id: "transport", label: `Shared transport from ${trek.railhead}`, detail: "Both ways, leaves 6:30 am on day one", price: 2400, per: "person", icon: Bus },
    { id: "offload", label: "Backpack offloading", detail: "A mule carries your bag between camps", price: 1650, per: "person", icon: Backpack },
    { id: "gear", label: "Gear rental bundle", detail: "Jacket, trekking poles, and a rucksack", price: 1200, per: "person", icon: Shirt },
    { id: "insurance", label: "Trek insurance", detail: "Covers evacuation and trip cancellation", price: 520, per: "person", icon: ShieldCheck },
  ];

  const [step, setStep] = useState(0);
  const [count, setCount] = useState(1);
  const [people, setPeople] = useState([{ name: "", age: "", email: "", phone: "" }]);
  const [picked, setPicked] = useState<string[]>(["transport"]);
  const [declared, setDeclared] = useState({ conditions: "", running: "", agree: false });
  const [placed, setPlaced] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const left = departure.capacity - departure.booked;

  function setCountSafe(n: number) {
    const next = Math.max(1, Math.min(waitlist ? 4 : Math.max(left, 1), n));
    setCount(next);
    setPeople((prev) => {
      const copy = [...prev];
      while (copy.length < next) copy.push({ name: "", age: "", email: "", phone: "" });
      return copy.slice(0, next);
    });
  }

  const addOnTotal = useMemo(
    () =>
      addOns
        .filter((a) => picked.includes(a.id))
        .reduce((s, a) => s + (a.per === "person" ? a.price * count : a.price), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [picked, count]
  );
  const trekTotal = trek.price * count;
  const gst = Math.round((trekTotal + addOnTotal) * 0.05);
  const total = trekTotal + addOnTotal + gst;
  const dueNow = Math.round(total * 0.25);

  const stepValid = [
    people.slice(0, count).every((p) => p.name.trim() && p.age.trim()) && people[0].email.includes("@"),
    true,
    declared.running.trim().length > 0 && declared.agree,
    true,
  ];

  const dateRange = `${fmt(departure.start, { day: "numeric", month: "short" })} – ${fmt(departure.end, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  // Each step replaces the content, so start the reader at the top of it.
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goTo = (n: number) => {
    setStep(n);
    toTop();
  };
  const place = () => {
    setPlaced(true);
    toTop();
  };
  const advance = () => (step < 3 ? goTo(step + 1) : place());
  const ctaLabel =
    step < 3 ? `Continue to ${STEPS[step + 1].toLowerCase()}` : waitlist ? "Join the waitlist" : `Pay ${inr(dueNow)} and hold my slot`;

  const setPerson = (i: number, key: "name" | "age" | "email" | "phone", value: string) =>
    setPeople((v) => v.map((x, j) => (j === i ? { ...x, [key]: value } : x)));

  if (placed) {
    return (
      <div className="mx-auto max-w-[620px] overflow-hidden rounded-bento bg-white shadow-soft">
        <div className="relative h-[180px] sm:h-[220px]">
          <Photo name={trekCover(trek.slug)} width={1200} alt="" />
          <div className="scrim-b absolute inset-0" aria-hidden="true" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4 text-white sm:left-8 sm:right-8">
            <div>
              <p className="text-[13px] text-white/70">{dateRange}</p>
              <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{trek.name}</p>
            </div>
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ember-500 text-white shadow-[0_8px_24px_-8px_rgb(255_106_43/0.7)]">
              <Check size={24} />
            </span>
          </div>
        </div>
        <div className="p-6 text-center sm:p-10">
          <h1 className="font-display text-[clamp(1.9rem,4.5vw,2.6rem)] leading-tight text-ink-900">
            {waitlist ? "You are on the waitlist" : "Your slot is held"}
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-500">
            {waitlist
              ? `We will write to ${people[0].email || "you"} the moment a slot opens on this departure. Nothing has been charged.`
              : `We have held ${count} ${count === 1 ? "place" : "places"} on ${trek.name}, ${fmt(departure.start, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}. A confirmation is on its way to ${people[0].email}.`}
          </p>
          {!waitlist && (
            <div className="mt-8 space-y-2.5 rounded-[20px] bg-mist-100 p-5 text-left text-[15px]">
              <div className="flex justify-between gap-4">
                <span className="text-ink-500">Paid today</span>
                <span className="nums font-semibold text-ink-900">{inr(dueNow)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ink-500">Balance, due 30 days before</span>
                <span className="nums text-ink-900">{inr(total - dueNow)}</span>
              </div>
            </div>
          )}
          <p className="mt-6 text-[13.5px] text-ink-400">
            This is a front-end demonstration. No payment was taken and no booking exists.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button href="/account" variant="dark">Go to my treks</Button>
            <Button href="/treks" variant="outline">Browse more treks</Button>
          </div>
        </div>
      </div>
    );
  }

  const breakdown = (
    <>
      <dl className="space-y-2.5 text-[14.5px]">
        <Line k={`Trek fee × ${count}`} v={inr(trekTotal)} />
        {addOns
          .filter((a) => picked.includes(a.id))
          .map((a) => (
            <Line
              key={a.id}
              k={`${a.id === "transport" ? "Shared transport" : a.label}${a.per === "person" ? ` × ${count}` : ""}`}
              v={inr(a.per === "person" ? a.price * count : a.price)}
              muted
            />
          ))}
        <Line k="GST at 5%" v={inr(gst)} muted />
        <div className="flex items-baseline justify-between gap-4 border-t border-mist-200 pt-3.5">
          <dt className="text-[15px] font-semibold text-ink-900">Total</dt>
          <dd className="nums text-[24px] font-bold tracking-[-0.02em] text-ink-900">{inr(total)}</dd>
        </div>
      </dl>
      {!waitlist && (
        <div className="mt-4 space-y-1.5 rounded-2xl bg-mist-100 px-4 py-3 text-[13.5px]">
          <p className="flex justify-between gap-4">
            <span className="text-ink-500">Due today</span>
            <span className="nums font-semibold text-ink-900">{inr(dueNow)}</span>
          </p>
          <p className="flex justify-between gap-4">
            <span className="text-ink-500">Due 30 days before</span>
            <span className="nums text-ink-900">{inr(total - dueNow)}</span>
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="grid items-start gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0 space-y-3 sm:space-y-5">
        {/* Stepper — a real sequence, so it is numbered */}
        <nav aria-label="Booking steps" className="rounded-full bg-white p-2 shadow-soft">
          <ol className="flex items-center gap-1 sm:gap-2">
            {STEPS.map((s, i) => {
              const done = i < step;
              const on = i === step;
              return (
                <li key={s} className={`flex items-center gap-1 sm:gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                  <button
                    onClick={() => i < step && goTo(i)}
                    disabled={i > step}
                    aria-current={on ? "step" : undefined}
                    className={[
                      "flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 text-[14px] transition-colors",
                      on ? "bg-mist-100 pr-4 font-medium text-ink-900" : "pr-1 sm:pr-3",
                      done ? "text-ink-900 hover:bg-mist-100" : "",
                      !on && !done ? "text-ink-400" : "",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "nums inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold",
                        on ? "bg-ember-500 text-white" : done ? "bg-ink-900 text-white" : "bg-mist-100 text-ink-400",
                      ].join(" ")}
                    >
                      {done ? <Check size={15} strokeWidth={2.5} /> : i + 1}
                    </span>
                    <span className={on ? "" : "sr-only sm:not-sr-only"}>{s}</span>
                    {done && <span className="sr-only"> (done)</span>}
                  </button>
                  {i < STEPS.length - 1 && (
                    <span
                      className={`h-px min-w-2 flex-1 ${i < step ? "bg-ink-900" : "bg-mist-300"}`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Mobile summary — collapsed to the total, opens to the breakdown */}
        <div className="overflow-hidden rounded-bento bg-white shadow-soft lg:hidden">
          <button
            onClick={() => setSummaryOpen((o) => !o)}
            aria-expanded={summaryOpen}
            aria-controls="mobile-summary"
            className="flex w-full items-center gap-3 p-3 text-left"
          >
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
              <Photo name={trekCover(trek.slug)} width={300} alt="" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15.5px] font-semibold text-ink-900">{trek.name}</span>
              <span className="nums block text-[13px] text-ink-500">
                {fmt(departure.start, { day: "numeric", month: "short" })} · {count}{" "}
                {count === 1 ? "trekker" : "trekkers"}
              </span>
            </span>
            <span className="nums text-[16px] font-bold text-ink-900">{inr(total)}</span>
            <ChevronDown
              size={18}
              className={`mr-1 shrink-0 text-ink-500 transition-transform ${summaryOpen ? "rotate-180" : ""}`}
            />
            <span className="sr-only">{summaryOpen ? "Hide" : "Show"} price breakdown</span>
          </button>
          {summaryOpen && (
            <div id="mobile-summary" className="border-t border-mist-200 px-4 pb-5 pt-4">
              <p className="nums mb-4 text-[13.5px] text-ink-500">
                {dateRange} · led by {departure.leader}
              </p>
              {breakdown}
            </div>
          )}
        </div>

        {/* Step content */}
        <div className="rounded-bento bg-white p-5 shadow-soft sm:p-8">
          {step === 0 && (
            <section>
              <StepHead
                title="Who is walking?"
                intro="Names must match the photo ID you will carry. Permits are issued against them."
              />

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-mist-100 p-4 sm:px-5">
                <div>
                  <p id="count-label" className="text-[15px] font-semibold text-ink-900">Number of trekkers</p>
                  {!waitlist && (
                    <p className="nums mt-0.5 text-[13px] text-ink-500">{left} slots left on this date</p>
                  )}
                </div>
                <div className="flex items-center gap-2" role="group" aria-labelledby="count-label">
                  <button
                    onClick={() => setCountSafe(count - 1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mist-300 bg-white text-ink-900 transition-colors hover:border-ink-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-mist-300"
                    disabled={count <= 1}
                    aria-label="Fewer trekkers"
                  >
                    <Minus size={17} />
                  </button>
                  <span className="nums w-10 text-center text-[20px] font-semibold text-ink-900" aria-live="polite">
                    {count}
                  </span>
                  <button
                    onClick={() => setCountSafe(count + 1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-white transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-35"
                    disabled={!waitlist && count >= left}
                    aria-label="More trekkers"
                  >
                    <Plus size={17} />
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {people.slice(0, count).map((p, i) => (
                  <div key={i} className="rounded-[20px] border border-mist-200 p-5 sm:p-6">
                    <h3 className="mb-5 flex items-center gap-2.5 text-[16.5px] font-semibold tracking-[-0.01em] text-ink-900">
                      <span className="nums inline-flex h-7 w-7 items-center justify-center rounded-full bg-mist-100 text-[12.5px] text-ink-600">
                        {i + 1}
                      </span>
                      {i === 0 ? "Lead trekker" : `Trekker ${i + 1}`}
                    </h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" htmlFor={`n${i}`}>
                        <input
                          id={`n${i}`}
                          className={inputCls}
                          value={p.name}
                          placeholder="As printed on your ID"
                          autoComplete={i === 0 ? "name" : "off"}
                          onChange={(e) => setPerson(i, "name", e.target.value)}
                        />
                      </Field>
                      <Field
                        label="Age"
                        htmlFor={`a${i}`}
                        hint={trek.familyFriendly ? "We take children from 10 on this trek" : "Minimum age 14 on this trek"}
                      >
                        <input
                          id={`a${i}`}
                          className={inputCls}
                          inputMode="numeric"
                          value={p.age}
                          placeholder="Years"
                          onChange={(e) => setPerson(i, "age", e.target.value)}
                        />
                      </Field>
                      {i === 0 && (
                        <>
                          <Field label="Email" htmlFor={`e${i}`} hint="Confirmations and the kit list go here">
                            <input
                              id={`e${i}`}
                              type="email"
                              className={inputCls}
                              value={p.email}
                              placeholder="you@example.com"
                              autoComplete="email"
                              onChange={(e) => setPerson(i, "email", e.target.value)}
                            />
                          </Field>
                          <Field label="Phone" htmlFor={`p${i}`} hint="Your trek leader will call three days before">
                            <input
                              id={`p${i}`}
                              type="tel"
                              className={inputCls}
                              value={p.phone}
                              placeholder="+91"
                              autoComplete="tel"
                              onChange={(e) => setPerson(i, "phone", e.target.value)}
                            />
                          </Field>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <StepHead
                title="Anything else you need?"
                intro="All of these can be added later too, up to a week before you leave."
              />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {addOns.map((a) => {
                  const on = picked.includes(a.id);
                  const Icon = a.icon;
                  return (
                    <label
                      key={a.id}
                      className={[
                        "relative flex cursor-pointer flex-col rounded-[20px] border p-5 transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ember-500",
                        on
                          ? "border-ink-900 bg-mist-50 shadow-[inset_0_0_0_1px_var(--color-ink-900)]"
                          : "border-mist-200 bg-white hover:border-mist-400",
                      ].join(" ")}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => setPicked((v) => (on ? v.filter((x) => x !== a.id) : [...v, a.id]))}
                        className="sr-only"
                      />
                      <span className="flex items-start justify-between gap-3">
                        <span
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                            on ? "bg-ink-900 text-white" : "bg-mist-100 text-ink-600"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            on ? "border-ember-500 bg-ember-500 text-white" : "border-mist-300 text-transparent"
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </span>
                      </span>
                      <span className="mt-4 block text-[15.5px] font-semibold leading-snug text-ink-900">{a.label}</span>
                      <span className="mt-1 block flex-1 text-[13.5px] leading-snug text-ink-500">{a.detail}</span>
                      <span className="nums mt-4 block text-[15px] font-semibold text-ink-900">
                        {inr(a.price)}
                        <span className="text-[12.5px] font-normal text-ink-400"> /{a.per}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <StepHead
                title="Your trek leader needs to know this"
                intro="Read at basecamp, not by us in the office. It stays with the leader for the length of the trek and is destroyed afterwards."
              />
              <div className="mt-7 max-w-[640px] space-y-6">
                <Field
                  label="Where is your fitness right now?"
                  htmlFor="run"
                  hint={`This trek asks for ${trek.fitnessTarget}. Tell us honestly where you are — nobody is turned away for being early in their training.`}
                >
                  <textarea
                    id="run"
                    rows={3}
                    className={inputCls}
                    placeholder="e.g. 5 km in 48 minutes, three times a week since August"
                    value={declared.running}
                    onChange={(e) => setDeclared((d) => ({ ...d, running: e.target.value }))}
                  />
                </Field>
                <Field
                  label="Medical conditions, medication or allergies"
                  htmlFor="cond"
                  hint="Asthma, diabetes, blood pressure, knee or back injuries, food allergies. Leave blank if none."
                >
                  <textarea
                    id="cond"
                    rows={3}
                    className={inputCls}
                    placeholder="Nothing to declare"
                    value={declared.conditions}
                    onChange={(e) => setDeclared((d) => ({ ...d, conditions: e.target.value }))}
                  />
                </Field>
                <label className="flex cursor-pointer items-start gap-3 rounded-[20px] bg-mist-100 p-4 sm:p-5">
                  <input
                    type="checkbox"
                    checked={declared.agree}
                    onChange={(e) => setDeclared((d) => ({ ...d, agree: e.target.checked }))}
                    className={checkboxCls}
                  />
                  <span className="text-[14.5px] leading-relaxed text-ink-700">
                    I understand that the trek leader can end my trek on medical grounds, that
                    the decision is final on the mountain, and that no refund applies once the
                    trek has started.
                  </span>
                </label>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <StepHead
                title={waitlist ? "Confirm your waitlist request" : "Check this over"}
                intro={
                  waitlist
                    ? "Nothing is charged for a waitlist place. We will call before we confirm anything."
                    : "A quarter of the total holds your slot. The balance is due thirty days before you leave."
                }
              />

              <div className="mt-7 rounded-[20px] bg-mist-100 px-5 py-1">
                <Row k="Trek" v={trek.name} />
                <Row k="Dates" v={dateRange} />
                <Row k="Trek leader" v={departure.leader} />
                <Row k="Trekkers" v={people.slice(0, count).map((p) => p.name || "—").join(", ")} />
                <Row
                  k="Add-ons"
                  v={picked.length ? addOns.filter((a) => picked.includes(a.id)).map((a) => a.label).join(", ") : "None"}
                />
              </div>

              {!waitlist && (
                <div className="mt-5 rounded-[20px] border border-mist-200 p-5 sm:p-6">
                  <h3 className="mb-5 flex items-center gap-2 text-[16.5px] font-semibold text-ink-900">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white">
                      <Lock size={13} />
                    </span>
                    Payment
                  </h3>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
                    <div className="col-span-2">
                      <Field label="Card number" htmlFor="cc">
                        <input id="cc" className={inputCls} inputMode="numeric" placeholder="0000 0000 0000 0000" />
                      </Field>
                    </div>
                    <div className="col-span-2">
                      <Field label="Name on card" htmlFor="cn">
                        <input id="cn" className={inputCls} placeholder={people[0].name || "Full name"} />
                      </Field>
                    </div>
                    <Field label="Expiry" htmlFor="ce">
                      <input id="ce" className={inputCls} placeholder="MM / YY" />
                    </Field>
                    <Field label="Security code" htmlFor="cv">
                      <input id="cv" className={inputCls} inputMode="numeric" placeholder="CVV" />
                    </Field>
                  </div>
                  <p className="mt-4 text-[12.5px] text-ink-400">
                    Demonstration only — this form is not connected to a payment provider and
                    nothing you type here is sent anywhere.
                  </p>
                </div>
              )}
            </section>
          )}

          <div className="mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-mist-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <button
                onClick={() => goTo(step - 1)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[14.5px] text-ink-700 transition-colors hover:bg-mist-100 hover:text-ink-900"
              >
                <ChevronLeft size={17} /> Back
              </button>
            ) : (
              <Link
                href={`/treks/${trek.slug}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[14.5px] text-ink-700 transition-colors hover:bg-mist-100 hover:text-ink-900"
              >
                <ChevronLeft size={17} /> Back to {trek.name}
              </Link>
            )}

            {step < 3 ? (
              <Button onClick={() => goTo(step + 1)} disabled={!stepValid[step]} variant="dark" size="lg">
                Continue <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={place} size="lg">
                {waitlist ? "Join the waitlist" : `Pay ${inr(dueNow)} and hold my slot`}
              </Button>
            )}
          </div>
          {!stepValid[step] && (
            <p className="mt-3 text-center text-[12.5px] text-ink-400 sm:text-right">
              {step === 0
                ? "Add a name and age for every trekker, and an email for the lead."
                : "Tell us about your fitness and tick the agreement to continue."}
            </p>
          )}
        </div>
      </div>

      {/* Summary rail */}
      <aside className="hidden lg:block lg:sticky lg:top-24" aria-label="Booking summary">
        <div className="rounded-bento bg-white p-3 shadow-soft">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
            <Photo name={trekCover(trek.slug)} width={800} alt="" priority />
            <div className="absolute inset-x-3 top-3 flex justify-between gap-2">
              <span className="glass-dark nums inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-white">
                {trek.days} days · {trek.maxAltFt.toLocaleString("en-IN")} ft
              </span>
              {departure.greenTrails && (
                <span className="glass inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-white">
                  <Leaf size={12} /> Green Trails
                </span>
              )}
            </div>
          </div>
          <div className="px-3 pb-3 pt-5">
            <h2 className="text-[21px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">{trek.name}</h2>
            <ul className="mt-3 space-y-1.5 text-[13.5px] text-ink-500">
              <li className="nums flex items-center gap-2">
                <CalendarDays size={14} className="text-ink-400" /> {dateRange}
              </li>
              <li className="flex items-center gap-2">
                <UserRound size={14} className="text-ink-400" /> {count} {count === 1 ? "trekker" : "trekkers"} · led by{" "}
                {departure.leader}
              </li>
            </ul>

            <div className="mt-5 border-t border-mist-200 pt-5">{breakdown}</div>

            <Button onClick={advance} disabled={!stepValid[step]} size="lg" className="mt-5 w-full">
              {ctaLabel}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-400">
              <Lock size={11} /> Demonstration — no payment is taken
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function StepHead({ title, intro }: { title: string; intro: ReactNode }) {
  return (
    <>
      <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight text-ink-900">{title}</h2>
      <p className="mt-2.5 max-w-[60ch] text-[15px] leading-relaxed text-ink-500">{intro}</p>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-mist-200 py-3.5 text-[14.5px] last:border-b-0">
      <span className="shrink-0 text-ink-500">{k}</span>
      <span className="min-w-0 break-words text-right text-ink-900">{v}</span>
    </div>
  );
}

function Line({ k, v, muted = false }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className="flex justify-between gap-5">
      <dt className={muted ? "text-ink-500" : "text-ink-700"}>{k}</dt>
      <dd className="nums text-ink-900">{v}</dd>
    </div>
  );
}
