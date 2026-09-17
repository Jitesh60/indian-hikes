"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, Leaf, Lock } from "lucide-react";
import { Button, Field, inputCls } from "@/components/site/ui";
import { AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { inr, type Departure, type Trek } from "@/lib/types";

type AddOn = { id: string; label: string; detail: string; price: number; per: "person" | "booking" };

const STEPS = ["Trekkers", "Add-ons", "Health", "Review"] as const;

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
    { id: "transport", label: `Shared transport from ${trek.railhead}`, detail: "Both ways, leaves 6:30 am on day one", price: 2400, per: "person" },
    { id: "offload", label: "Backpack offloading", detail: "A mule carries your bag between camps", price: 1650, per: "person" },
    { id: "gear", label: "Gear rental bundle", detail: "Jacket, trekking poles, and a rucksack", price: 1200, per: "person" },
    { id: "insurance", label: "Trek insurance", detail: "Covers evacuation and trip cancellation", price: 520, per: "person" },
  ];

  const [step, setStep] = useState(0);
  const [count, setCount] = useState(1);
  const [people, setPeople] = useState([{ name: "", age: "", email: "", phone: "" }]);
  const [picked, setPicked] = useState<string[]>(["transport"]);
  const [declared, setDeclared] = useState({ conditions: "", running: "", agree: false });
  const [placed, setPlaced] = useState(false);

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

  if (placed) {
    return (
      <div className="max-w-[560px] mx-auto text-center py-10">
        <div className="w-14 h-14 mx-auto bg-deodar-600 text-snow-50 flex items-center justify-center">
          <Check size={28} />
        </div>
        <h1 className="font-display text-[clamp(2rem,4.5vw,2.9rem)] leading-tight mt-7">
          {waitlist ? "You are on the waitlist" : "Your slot is held"}
        </h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-spruce-800/70">
          {waitlist
            ? `We will write to ${people[0].email || "you"} the moment a slot opens on this departure. Nothing has been charged.`
            : `We have held ${count} ${count === 1 ? "place" : "places"} on ${trek.name}, ${new Date(
                departure.start
              ).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}. A confirmation is on its way to ${people[0].email}.`}
        </p>
        {!waitlist && (
          <div className="mt-8 border border-snow-300 bg-snow-50 p-6 text-left">
            <div className="flex justify-between text-[15px]">
              <span className="text-snow-500">Paid today</span>
              <span className="nums font-semibold">{inr(dueNow)}</span>
            </div>
            <div className="flex justify-between text-[15px] mt-2.5">
              <span className="text-snow-500">Balance, due 30 days before</span>
              <span className="nums">{inr(total - dueNow)}</span>
            </div>
          </div>
        )}
        <p className="mt-7 text-[14px] text-snow-500">
          This is a front-end demonstration. No payment was taken and no booking exists.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Button href="/account" variant="dark">Go to my treks</Button>
          <Button href="/treks" variant="outline">Browse more treks</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-x-14 gap-y-10">
      <div className="min-w-0">
        {/* Step rail — a real sequence, so it is numbered */}
        <ol className="flex items-center gap-1.5 mb-10 overflow-x-auto thin-scroll pb-1">
          {STEPS.map((s, i) => {
            const done = i < step;
            const on = i === step;
            return (
              <li key={s} className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={[
                    "flex items-center gap-2 px-3 py-1.5 text-[13.5px] transition-colors",
                    on ? "bg-spruce-800 text-snow-50" : done ? "text-deodar-600 hover:bg-snow-200" : "text-snow-400",
                  ].join(" ")}
                >
                  <span className="nums">{done ? <Check size={14} /> : i + 1}</span>
                  {s}
                </button>
                {i < STEPS.length - 1 && <span className="w-5 h-px bg-snow-300" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>

        {step === 0 && (
          <section>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">
              Who is walking?
            </h2>
            <p className="mt-3 text-[16px] text-spruce-800/65 measure">
              Names must match the photo ID you will carry. Permits are issued against them.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[14px] font-semibold">Number of trekkers</span>
              <div className="flex items-center border border-snow-300">
                <button
                  onClick={() => setCountSafe(count - 1)}
                  className="px-4 py-2 hover:bg-snow-200 disabled:opacity-30"
                  disabled={count <= 1}
                  aria-label="Fewer trekkers"
                >
                  −
                </button>
                <span className="nums w-10 text-center font-semibold">{count}</span>
                <button
                  onClick={() => setCountSafe(count + 1)}
                  className="px-4 py-2 hover:bg-snow-200 disabled:opacity-30"
                  disabled={!waitlist && count >= left}
                  aria-label="More trekkers"
                >
                  +
                </button>
              </div>
              {!waitlist && (
                <span className="nums text-[13px] text-snow-500">{left} slots left on this date</span>
              )}
            </div>

            <div className="mt-8 space-y-8">
              {people.slice(0, count).map((p, i) => (
                <div key={i} className="border border-snow-300 p-6 bg-snow-50">
                  <h3 className="font-display-tight text-[18px] mb-5">
                    {i === 0 ? "Lead trekker" : `Trekker ${i + 1}`}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" htmlFor={`n${i}`}>
                      <input
                        id={`n${i}`}
                        className={inputCls}
                        value={p.name}
                        placeholder="As printed on your ID"
                        onChange={(e) =>
                          setPeople((v) => v.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                        }
                      />
                    </Field>
                    <Field label="Age" htmlFor={`a${i}`} hint={trek.familyFriendly ? "We take children from 10 on this trek" : "Minimum age 14 on this trek"}>
                      <input
                        id={`a${i}`}
                        className={inputCls}
                        inputMode="numeric"
                        value={p.age}
                        placeholder="Years"
                        onChange={(e) =>
                          setPeople((v) => v.map((x, j) => (j === i ? { ...x, age: e.target.value } : x)))
                        }
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
                            onChange={(e) =>
                              setPeople((v) => v.map((x, j) => (j === i ? { ...x, email: e.target.value } : x)))
                            }
                          />
                        </Field>
                        <Field label="Phone" htmlFor={`p${i}`} hint="Your trek leader will call three days before">
                          <input
                            id={`p${i}`}
                            className={inputCls}
                            value={p.phone}
                            placeholder="+91"
                            onChange={(e) =>
                              setPeople((v) => v.map((x, j) => (j === i ? { ...x, phone: e.target.value } : x)))
                            }
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
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">
              Anything else you need?
            </h2>
            <p className="mt-3 text-[16px] text-spruce-800/65 measure">
              All of these can be added later too, up to a week before you leave.
            </p>
            <div className="mt-8 space-y-px bg-snow-300 border border-snow-300">
              {addOns.map((a) => {
                const on = picked.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className="flex items-start gap-4 bg-snow-50 p-5 cursor-pointer hover:bg-snow-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() =>
                        setPicked((v) => (on ? v.filter((x) => x !== a.id) : [...v, a.id]))
                      }
                      className="mt-1 appearance-none w-[17px] h-[17px] border border-snow-400 checked:bg-spruce-800 checked:border-spruce-800 shrink-0 relative after:content-[''] after:absolute after:left-[5px] after:top-[1.5px] after:w-[4px] after:h-[9px] after:border-r-2 after:border-b-2 after:border-snow-50 after:rotate-45 after:opacity-0 checked:after:opacity-100"
                    />
                    <span className="flex-1">
                      <span className="block text-[16px] font-semibold">{a.label}</span>
                      <span className="block text-[14px] text-spruce-800/60 mt-0.5">{a.detail}</span>
                    </span>
                    <span className="nums text-[15px] font-semibold whitespace-nowrap">
                      {inr(a.price)}
                      <span className="text-[12px] text-snow-500 font-normal"> /person</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">
              Your trek leader needs to know this
            </h2>
            <p className="mt-3 text-[16px] text-spruce-800/65 measure">
              Read at basecamp, not by us in the office. It stays with the leader for the
              length of the trek and is destroyed afterwards.
            </p>
            <div className="mt-8 space-y-6 max-w-[620px]">
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
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declared.agree}
                  onChange={(e) => setDeclared((d) => ({ ...d, agree: e.target.checked }))}
                  className="mt-1 appearance-none w-[17px] h-[17px] border border-snow-400 checked:bg-spruce-800 checked:border-spruce-800 shrink-0 relative after:content-[''] after:absolute after:left-[5px] after:top-[1.5px] after:w-[4px] after:h-[9px] after:border-r-2 after:border-b-2 after:border-snow-50 after:rotate-45 after:opacity-0 checked:after:opacity-100"
                />
                <span className="text-[14.5px] leading-relaxed text-spruce-800/80">
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
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">
              {waitlist ? "Confirm your waitlist request" : "Check this over"}
            </h2>
            <p className="mt-3 text-[16px] text-spruce-800/65 measure">
              {waitlist
                ? "Nothing is charged for a waitlist place. We will call before we confirm anything."
                : "A quarter of the total holds your slot. The balance is due thirty days before you leave."}
            </p>

            <div className="mt-8 border border-snow-300">
              <Row k="Trek" v={trek.name} />
              <Row
                k="Dates"
                v={`${new Date(departure.start).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${new Date(
                  departure.end
                ).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
              />
              <Row k="Trek leader" v={departure.leader} />
              <Row k="Trekkers" v={people.slice(0, count).map((p) => p.name || "—").join(", ")} />
              <Row k="Add-ons" v={picked.length ? addOns.filter((a) => picked.includes(a.id)).map((a) => a.label).join(", ") : "None"} />
            </div>

            {!waitlist && (
              <div className="mt-8 border border-snow-300 bg-snow-50 p-6">
                <h3 className="font-display-tight text-[18px] mb-5 flex items-center gap-2">
                  <Lock size={15} /> Payment
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Card number" htmlFor="cc">
                    <input id="cc" className={inputCls} placeholder="0000 0000 0000 0000" />
                  </Field>
                  <Field label="Name on card" htmlFor="cn">
                    <input id="cn" className={inputCls} placeholder={people[0].name || "Full name"} />
                  </Field>
                  <Field label="Expiry" htmlFor="ce">
                    <input id="ce" className={inputCls} placeholder="MM / YY" />
                  </Field>
                  <Field label="Security code" htmlFor="cv">
                    <input id="cv" className={inputCls} placeholder="CVV" />
                  </Field>
                </div>
                <p className="text-[12.5px] text-snow-500 mt-4">
                  Demonstration only — this form is not connected to a payment provider and
                  nothing you type here is sent anywhere.
                </p>
              </div>
            )}
          </section>
        )}

        <div className="flex items-center justify-between gap-4 mt-10 pt-7 border-t border-snow-300">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 text-[15px] hover:text-deodar-600 transition-colors"
            >
              <ChevronLeft size={17} /> Back
            </button>
          ) : (
            <Link href={`/treks/${trek.slug}`} className="inline-flex items-center gap-1.5 text-[15px] hover:text-deodar-600 transition-colors">
              <ChevronLeft size={17} /> Back to {trek.name}
            </Link>
          )}

          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!stepValid[step]} variant="dark">
              Continue
            </Button>
          ) : (
            <Button onClick={() => setPlaced(true)}>
              {waitlist ? "Join the waitlist" : `Pay ${inr(dueNow)} and hold my slot`}
            </Button>
          )}
        </div>
      </div>

      {/* Summary rail */}
      <aside>
        <div className="lg:sticky lg:top-6 border border-snow-300 bg-snow-50">
          <div className="p-6 border-b border-snow-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display-tight text-[21px] leading-tight">{trek.name}</h2>
                <p className="nums text-[13.5px] text-snow-500 mt-1">
                  {new Date(departure.start).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} –{" "}
                  {new Date(departure.end).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="text-spruce-800/60 shrink-0">
                <AltitudeSpark profile={trek.profile} width={78} height={30} />
              </div>
            </div>
            {departure.greenTrails && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-deodar-600">
                <Leaf size={12} /> Green Trails departure
              </p>
            )}
          </div>

          <dl className="p-6 space-y-3 text-[14.5px] border-b border-snow-300">
            <Line k={`Trek fee × ${count}`} v={inr(trekTotal)} />
            {addOnTotal > 0 && <Line k="Add-ons" v={inr(addOnTotal)} />}
            <Line k="GST at 5%" v={inr(gst)} />
            <div className="pt-3 mt-1 border-t border-snow-300 flex justify-between items-baseline">
              <dt className="font-semibold">Total</dt>
              <dd className="nums font-display-tight text-[22px]">{inr(total)}</dd>
            </div>
          </dl>

          {!waitlist && (
            <div className="p-6 text-[14px]">
              <div className="flex justify-between">
                <span className="text-snow-500">Due today</span>
                <span className="nums font-semibold">{inr(dueNow)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-snow-500">Due 30 days before</span>
                <span className="nums">{inr(total - dueNow)}</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 px-5 py-3.5 border-b border-snow-300 last:border-b-0 text-[15px]">
      <span className="text-snow-500 shrink-0">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-5">
      <dt className="text-snow-500">{k}</dt>
      <dd className="nums">{v}</dd>
    </div>
  );
}
