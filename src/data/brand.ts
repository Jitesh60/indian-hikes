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

  /**
   * Trekker testimonials as featured on heyhikers.com.
   * Paraphrased from the site — replace with the exact wording when updating.
   */
  testimonials: [
    {
      name: "Priya Sharma",
      trek: "Kedarkantha",
      quote:
        "The HeyHikers team made me feel safe from the first day to the last. Watching the sunrise from the summit at 12,500 ft is something I'll never forget.",
    },
    {
      name: "Arjun Mehta",
      trek: "Verified trekker",
      quote:
        "Logistics were flawless and the food at high altitude was genuinely good. Our guide Farooq knew every turn of the trail.",
    },
    {
      name: "Sneha & Rohan",
      trek: "Honeymoon trek",
      quote:
        "Trekking for our honeymoon was the best decision we made. The team knew exactly when to give us space and when to keep us company.",
    },
  ],
} as const;

export const whatsappHref = `https://wa.me/${brand.contact.phones[0].replace(/\D/g, "")}`;
export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
