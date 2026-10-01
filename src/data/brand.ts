/* ------------------------------------------------------------------
   HeyHikers — company facts, in one place.

   Taken from heyhikers.com (home, about, contact and blog pages).
   Everything the site says about the company itself should read from
   here, so it stays consistent and is easy to update.
   ------------------------------------------------------------------ */

export const brand = {
  name: "HeyHikers",
  domain: "heyhikers.com",
  tagline: "Best guided Himalayan treks in India",
  promise:
    "Safe, guided Himalayan treks with certified leaders, small groups, caring on-trail support and 24×7 service.",
  base: "Dehradun, Uttarakhand",
  story:
    "Born in the foothills of Uttarakhand and built by people who grew up walking these trails, HeyHikers is a small, owner-operated team that treats every trekker like a guest, not a booking.",
  ranges: ["Garhwal", "Kumaon", "Himachal"],
  regions: ["Uttarakhand", "Himachal Pradesh", "Jammu & Kashmir", "Ladakh"],

  stats: {
    routes: 47, // "47+ routes"
    trekkers: 5500, // "5,500+ trekkers led safely"
    years: 6, // "6 years"
    rating: 4.9, // "4.9/5 average rating"
    seriousIncidents: 0, // "zero serious incidents in 6 years"
    fromPrice: 7499, // "treks start from ₹7,499"
  },

  contact: {
    email: "teamheyhikers@gmail.com",
    phones: ["+91 63960 97481", "+91 78178 27248", "+91 70603 80444"],
    responseTime: "We reply to every email within 24 hours.",
  },

  founders: [
    {
      name: "Kartik Rawat",
      role: "Founder & Owner",
      bio: "Passionate about the Himalayas from a young age, Kartik turned his love for the mountains into a mission — to help every trekker experience the trails safely and authentically. He personally scouts, plans and guides journeys so each one is safe, memorable and true to the spirit of the mountains.",
      facts: ["7+ years trekking", "50+ treks"],
    },
    {
      name: "Praveen Chauhan",
      role: "Co-Owner & Operations Head",
      bio: "With 6+ years exploring the Himalayas and a passion for making mountain experiences accessible to all, Praveen oversees trek quality, safety protocols and the partnerships that keep every journey authentic.",
      facts: ["6+ years in the Himalayas", "Runs safety & operations"],
    },
  ],

  /** What every HeyHikers trek includes or offers. */
  promises: [
    { title: "Certified trek leaders", body: "Every group is led by trained, certified leaders who know the route personally." },
    { title: "Small groups", body: "Batches stay small, so leaders can watch every trekker, every day." },
    { title: "24×7 support", body: "Caring on-trail support, and someone at the end of the phone around the clock." },
    { title: "All-inclusive pricing", body: "Transparent prices with no hidden costs — what you see is what you pay." },
    { title: "Pickup & drop", body: "Included on most treks, with transport help from Dehradun, Manali and Srinagar." },
    { title: "Women-only batches", body: "Batches led by female trek leaders — the operator solo women trekkers trust most." },
  ],

  /** Custom treks: who they're for and what can change. */
  custom: {
    audiences: ["School groups", "Corporate teams", "Solo travellers", "Friends & families"],
    flexible: ["Custom dates", "Your own pace", "Dietary needs", "Pickup points"],
  },

  /** Verified trekker testimonials, as published on heyhikers.com. */
  testimonials: [
    {
      name: "Priya Sharma",
      trek: "Kedarkantha · Dec 2025",
      quote:
        "I'd never camped in snow before. The HeyHikers team made me feel safe every single step. The summit sunrise — standing at 12,500 ft watching peaks turn gold — I cried. From the beauty.",
    },
    {
      name: "Arjun Mehta",
      trek: "Kashmir Great Lakes · Aug 2025",
      quote:
        "Seven lakes, each more unreal than the last. The logistics were flawless — the food at 13,000 ft was better than most restaurants I know. Our guide Farooq knew every stone on the trail. Doing Goechala with them next.",
    },
    {
      name: "Sneha & Rohan",
      trek: "Hampta Pass · Jul 2025",
      quote:
        "We did this as our honeymoon. Best decision we ever made. Crossing the pass from green to desert felt like entering another planet. The team gave us space when we needed it and company when we wanted it.",
    },
  ],

  /** Cancellation terms, as published on heyhikers.com. */
  cancellation: [
    { when: "30 days or more before departure", back: "Full refund, minus a processing fee", pct: 100 },
    { when: "15 to 29 days before departure", back: "50% refund", pct: 50 },
    {
      when: "Within 14 days of departure",
      back: "No refund — but you can transfer your booking to another person or another date at no extra charge",
      pct: 0,
    },
  ],

  /** Trek count by region, as listed on heyhikers.com. */
  regionCounts: [
    { region: "Uttarakhand", treks: 21 },
    { region: "Himachal Pradesh", treks: 18 },
    { region: "Jammu & Kashmir", treks: 4 },
    { region: "Ladakh", treks: 1 },
  ],
} as const;

export const whatsappHref = `https://wa.me/${brand.contact.phones[0].replace(/\D/g, "")}`;
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
