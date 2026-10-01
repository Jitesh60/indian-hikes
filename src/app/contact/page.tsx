import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { InfoShell, Panel } from "@/components/site/InfoShell";
import { ContactForm } from "@/components/site/content/ContactForm";
import { brand, telHref, whatsappHref } from "@/data/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email, call or WhatsApp the ${brand.name} team in ${brand.base}. ${brand.contact.responseTime}`,
};

export default function ContactPage() {
  const { email, phones, responseTime } = brand.contact;

  return (
    <InfoShell
      photo="woodenHut"
      eyebrow="Contact"
      title="Ask us before you book, not after"
      intro="Tell us honestly about your fitness and the dates you can take off, and we will help you pick the right trek — or plan one around your group."
    >
      <div className="grid gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Panel as="div">
          <ContactForm />
        </Panel>

        <aside className="grid content-start gap-3 sm:gap-5" aria-label="Other ways to reach us">
          {/* Email */}
          <div className="flex items-start gap-4 rounded-bento bg-white p-5 shadow-soft sm:p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice-100 text-ice-500">
              <Mail size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] text-ink-500">Email</p>
              <a
                href={`mailto:${email}`}
                className="mt-1 block break-words text-[16.5px] font-semibold text-ink-900 hover:text-forest-600"
              >
                {email}
              </a>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-400">
                <Clock size={12} aria-hidden="true" /> {responseTime}
              </p>
            </div>
          </div>

          {/* Phones */}
          <div className="flex items-start gap-4 rounded-bento bg-white p-5 shadow-soft sm:p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice-100 text-ice-500">
              <Phone size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] text-ink-500">Call us</p>
              <ul className="mt-1 space-y-1">
                {phones.map((p) => (
                  <li key={p}>
                    <a href={telHref(p)} className="nums text-[16.5px] font-semibold text-ink-900 hover:text-forest-600">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Base */}
          <div className="flex items-start gap-4 rounded-bento bg-white p-5 shadow-soft sm:p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice-100 text-ice-500">
              <MapPin size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] text-ink-500">Based in</p>
              <p className="mt-1 text-[16.5px] font-semibold leading-snug text-ink-900">{brand.base}</p>
              <p className="mt-1 text-[13px] text-ink-400">
                Treks across the {brand.ranges.join(", ")} ranges
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="rounded-bento bg-ink-900 p-6 text-white sm:p-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-3 py-1.5 text-[12.5px] font-medium">
              <MessageCircle size={13} /> Quicker on WhatsApp
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              Prefer to chat? Message us on WhatsApp with the trek, your dates and how many
              of you there are.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </aside>
      </div>
    </InfoShell>
  );
}
