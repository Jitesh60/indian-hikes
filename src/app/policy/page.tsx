import type { Metadata } from "next";
import { InfoShell, Prose, H2 } from "@/components/site/InfoShell";

export const metadata: Metadata = {
  title: "Cancellation policy",
  description: "What you get back, when, and what happens if we cancel instead.",
};

const SCALE = [
  ["More than 30 days before", "Full refund, or a voucher with no expiry", "#2f6350"],
  ["30 to 20 days before", "50% cash refund, or 100% as a voucher", "#4c8770"],
  ["20 to 10 days before", "No cash refund, 75% as a voucher", "#d4a22b"],
  ["Fewer than 10 days", "No refund and no voucher", "#b23a48"],
];

export default function PolicyPage() {
  return (
    <InfoShell
      title="What happens if you cannot go"
      intro="Plans change, and we would rather publish the scale plainly than have you discover it in an email. Vouchers have no expiry date and can be transferred to anyone."
    >
      <section>
        <H2>If you cancel</H2>
        <div className="border-t border-snow-300">
          {SCALE.map(([w, r, c]) => (
            <div key={w} className="grid sm:grid-cols-[260px_1fr] gap-x-8 gap-y-1 py-5 border-b border-snow-300">
              <p className="text-[16.5px] font-semibold flex items-center gap-3">
                <span className="w-1 h-5 block shrink-0" style={{ background: c }} />
                {w}
              </p>
              <p className="text-[16px] text-spruce-800/75 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-snow-500 mt-4">
          Measured from the start date of your departure, not the date you booked.
        </p>
      </section>

      <section>
        <H2>If we cancel</H2>
        <Prose>
          <p>
            We cancel departures for three reasons: too few people booked, a road or permit
            closure, or a forecast that makes the trek unsafe. In all three cases you get a
            full cash refund or a voucher, whichever you prefer, and we do not keep the
            payment gateway charge.
          </p>
          <p>
            We will tell you as early as we know. For under-subscribed departures that is
            usually three weeks out. For weather it can be the night before, and we accept
            that this is genuinely disruptive — if you have already travelled, we cover
            your accommodation at the basecamp until you can get home.
          </p>
        </Prose>
      </section>

      <section>
        <H2>If your trek ends on the mountain</H2>
        <Prose>
          <p>
            If a trek leader sends you down on medical grounds, no refund applies. This is
            the hardest line in this policy and the one people find most unfair, so it is
            worth explaining: the cost of your trek is spent the moment the group leaves
            basecamp — on staff, on permits, on food carried up, on the tent that is now
            pitched for you.
          </p>
          <p>
            What we do instead is hold a credit for a future departure at 50% of what you
            paid, valid indefinitely. Around four in ten people who come down early use it.
          </p>
        </Prose>
      </section>

      <section>
        <H2>Moving to a different date</H2>
        <Prose>
          <p>
            Free more than 30 days out, once. After that, or for a second change, it is
            treated as a cancellation and a fresh booking. Transferring your place to
            somebody else is free at any time up to five days before departure — we only
            need their details for the permit.
          </p>
        </Prose>
      </section>
    </InfoShell>
  );
}
