export type Story = {
  slug: string;
  title: string;
  standfirst: string;
  author: string;
  role: string;
  trek: string;
  date: string;
  minutes: number;
  category: "Planning" | "Fitness" | "Safety" | "Field notes" | "Gear";
  body: string[];
};

export const stories: Story[] = [
  {
    slug: "best-time-to-trek-himalayas-month-by-month",
    title: "Best time to trek the Himalayas, month by month",
    standfirst:
      "There is no single best time to trek in the Himalayas — it depends on the trail you want and the experience you are after. Here is what every month brings, and which treks it suits.",
    author: "HeyHikers Team",
    role: "Trek planning",
    trek: "kedarkantha",
    date: "2026-08-30",
    minutes: 8,
    category: "Planning",
    body: [
      "January and February are deep winter. Heavy snow falls at every altitude above 2,500 m and high camps drop to −10°C to −20°C overnight. This is snow-trek season: Kedarkantha, Brahmatal and Nag Tibba are at their best.",
      "March and April bring the spring bloom. Snow melts back from the lower trails and the rhododendron forests flower crimson, pink and white at different heights. Chopta–Tungnath, Kedarkantha, Har Ki Dun, Dayara Bugyal and Deoriatal–Chandrashila all shine.",
      "May and June are pre-monsoon: warm, dry and long-houred, with snow largely gone from the main trails, though rivers run high with melt. It is the window for Valley of Flowers' early season, Har Ki Dun, Rupin Pass, Hampta Pass and Bali Pass.",
      "July and August are monsoon. Uttarakhand and Himachal get heavy rain, trails turn slippery, leeches appear below 2,500 m and road approaches see landslides. The exceptions are rain-shadow treks — Lahaul, Spiti and Ladakh stay largely dry — plus Valley of Flowers at peak bloom, Hampta Pass and Pin Bhaba Pass.",
      "September and October are post-monsoon and, for many, the best of the year. Skies are clear and stable, meadows are green and washed clean, days sit at 10–20°C and nights at 0–8°C. October in particular has the longest stable weather windows and the clearest air for photography.",
      "November is the shoulder season. First snow arrives above 3,500 m by mid-month, temperatures fall sharply and days shorten — quieter trails for those prepared for the cold.",
      "December is early winter, and trekking then can feel like a private Himalaya. It is colder and the highest routes close, but the classic winter treks open up under fresh snow.",
    ],
  },
  {
    slug: "how-to-train-for-himalayan-trek-8-weeks",
    title: "How to train for a Himalayan trek in 8 weeks",
    standfirst:
      "Training for a Himalayan trek is less about brute strength and more about endurance, leg stamina and the grit to keep moving. This plan works even if you are starting from a desk job.",
    author: "HeyHikers Team",
    role: "Trek fitness",
    trek: "hampta-pass",
    date: "2026-07-26",
    minutes: 7,
    category: "Fitness",
    body: [
      "Weeks 1–2: build the base. Walk briskly for 30 minutes every day — elevation matters more than speed, so use stairs if you have them, working up to 10 floors per session by the end of week two. Add bodyweight squats (3 × 15) and lunges (3 × 12 per leg) three times a week. Consistency beats intensity: missing a day is fine, missing a week is not.",
      "Weeks 3–4: introduce load. Carry a 5–7 kg daypack on your walks and stair sessions so your legs and shoulders learn what a trail day feels like. Stretch your walks towards 45 minutes and keep the strength work going.",
      "Weeks 5–6: build endurance. Add one long session each weekend — two to three hours on hills, stairs or a local trail with your pack. Bring in jogging or cycling on two weekdays to lift your cardio, aiming to run 5 km comfortably.",
      "Weeks 7–8: peak and taper. Do your longest loaded walk in week seven, then ease off in the final week so you arrive rested. Break in your boots on every session, practise with the pack you will carry, and prioritise sleep and hydration.",
      "On the trek itself, walk slower than you think you need to on the first two days, drink more water than you want, and eat even when altitude dulls your appetite. Your trek leader will set the pace — trust it.",
    ],
  },
  {
    slug: "what-12000-feet-does-to-you",
    title: "What 12,000 feet actually does to you",
    standfirst:
      "Altitude sickness is not a fitness problem, and treating it like one is how people get hurt. A plain explanation of what changes in your body above the treeline.",
    author: "HeyHikers Team",
    role: "Trek safety",
    trek: "kedarkantha",
    date: "2026-08-28",
    minutes: 9,
    category: "Safety",
    body: [
      "The first thing to understand is that acute mountain sickness has almost nothing to do with how strong you are. Marathon runners get it. People who have never run a kilometre in their lives sometimes do not. What decides it is how quickly you went up, and how well your body compensated on the way.",
      "At 12,000 feet there is roughly 40 per cent less oxygen in every breath you take than at sea level. Your body responds by breathing faster and, over a day or two, by changing the chemistry of your blood. That adaptation takes time. If you climb faster than the adaptation can keep up, pressure builds where it should not — usually in the brain, occasionally in the lungs.",
      "The symptoms are unglamorous and easy to dismiss. A headache that does not respond to water. Loss of appetite at dinner. Sleeping badly and waking up short of breath. On their own each of these is ordinary. Together, at altitude, they are a signal.",
      "This is why your trek leader keeps a close eye on every trekker, every day, and why a leader's call to rest or turn back is not up for negotiation. It is not a formality — it is the reason the trek ends well.",
      "The single most effective thing you can do is also the least dramatic: walk slowly on the first two days, drink more than you want to, and eat dinner even when you do not feel like it. Almost everything else is downstream of those three.",
    ],
  },
  {
    slug: "reading-a-himalayan-weather-window",
    title: "How we read a weather window before a pass day",
    standfirst:
      "Three forecasts, a barometer, and somebody's uncle in the village. What actually goes into the call on the night before a crossing.",
    author: "HeyHikers Team",
    role: "Trek leaders",
    trek: "hampta-pass",
    date: "2026-07-11",
    minutes: 8,
    category: "Field notes",
    body: [
      "At Balu ka Ghera there is no signal, so the forecast we use was downloaded two days earlier at Jobra. We carry three: a global model, a regional high-resolution one, and the IMD district bulletin. When they agree, the decision is easy and we rarely need to make it consciously.",
      "When they disagree — which on Hampta in August is most of the time — we start looking at the things that are in front of us. The barometer trend over the last twelve hours matters more than any forecast. A drop of four hectopascals overnight has ended more pass days for me than any model output.",
      "Then there is the part that does not fit in a protocol. The horsemen who come up with us have been crossing this pass their whole lives, and their fathers did too. If Chaman says the cloud sitting on Deo Tibba is the wrong kind of cloud, we wait. He has been right considerably more often than the models.",
      "The call gets made at seven in the evening, announced at dinner, and never revisited at four in the morning. Deciding twice is how groups end up committed to something halfway up it.",
    ],
  },
  {
    slug: "what-actually-goes-in-the-backpack",
    title: "What actually goes in the backpack, by weight",
    standfirst:
      "We weighed a properly packed bag for a six-day winter trek. Nine kilos, and two-thirds of it is things people try to leave behind.",
    author: "HeyHikers Team",
    role: "Trek leaders",
    trek: "brahmatal",
    date: "2026-06-19",
    minutes: 5,
    category: "Gear",
    body: [
      "A well-packed bag for a six-day winter trek weighs about nine kilos including water. Most people arrive at basecamp with eleven or twelve, and almost all of the excess is in two categories: clothes they will never wear and food they will never eat.",
      "The heaviest single item should be your insulation layer, and it is worth every gram. The second heaviest should be water — two litres, carried, not bought. After that the list drops off fast.",
      "The things people most often leave out and most often need: a headlamp with working batteries, sunglasses rated for snow glare, and a second pair of dry socks kept in a plastic bag. That last one sounds trivial until the evening of day three.",
      "The things people most often carry and never use: jeans, a full-size toiletry kit, a power bank larger than ten thousand milliamp hours, and a book. The book is the only one I have any sympathy for.",
    ],
  },
];

export function storyBySlug(slug: string) {
  return stories.find((s) => s.slug === slug);
}
