export type Story = {
  slug: string;
  title: string;
  standfirst: string;
  author: string;
  role: string;
  trek: string;
  date: string;
  minutes: number;
  category: "Field notes" | "Green Trails" | "Safety" | "Trekker story" | "Gear";
  body: string[];
};

export const stories: Story[] = [
  {
    slug: "what-12000-feet-does-to-you",
    title: "What 12,000 feet actually does to you",
    standfirst:
      "Altitude sickness is not a fitness problem, and treating it like one is how people get hurt. A plain explanation of what changes in your body above the treeline.",
    author: "Dr. Ananya Kulkarni",
    role: "Mountain medicine advisor",
    trek: "kedarkantha",
    date: "2026-08-28",
    minutes: 9,
    category: "Safety",
    body: [
      "The first thing to understand is that acute mountain sickness has almost nothing to do with how strong you are. Marathon runners get it. People who have never run a kilometre in their lives sometimes do not. What decides it is how quickly you went up, and how well your body compensated on the way.",
      "At 12,000 feet there is roughly 40 per cent less oxygen in every breath you take than at sea level. Your body responds by breathing faster and, over a day or two, by changing the chemistry of your blood. That adaptation takes time. If you climb faster than the adaptation can keep up, pressure builds where it should not — usually in the brain, occasionally in the lungs.",
      "The symptoms are unglamorous and easy to dismiss. A headache that does not respond to water. Loss of appetite at dinner. Sleeping badly and waking up short of breath. On their own each of these is ordinary. Together, at altitude, they are a signal.",
      "This is why every one of our trek leaders carries a pulse oximeter and why we record readings twice a day for every trekker on the trek. It is not a formality. A resting saturation that drops below 80 and does not recover overnight ends someone's trek, regardless of how they feel about it.",
      "The single most effective thing you can do is also the least dramatic: walk slowly on the first two days, drink more than you want to, and eat dinner even when you do not feel like it. Almost everything else is downstream of those three.",
    ],
  },
  {
    slug: "ninety-one-kilos-of-waste",
    title: "Ninety-one kilos came off one ridge in a single season",
    standfirst:
      "Every Green Trails group carries an eco-bag. Here is what four months of that added up to on the Singalila ridge, sorted by what it was.",
    author: "Pema Bhutia",
    role: "Green Trails coordinator",
    trek: "sandakphu-phalut",
    date: "2026-08-14",
    minutes: 6,
    category: "Green Trails",
    body: [
      "Between March and June this year, groups on Sandakphu–Phalut brought down ninety-one kilograms of waste that was not theirs. We weigh it at Sepi, sort it, and log it — which means we can tell you exactly what a popular trail accumulates.",
      "Just over half of it was multi-layer plastic: wrappers from biscuits, chips and instant noodles. These are the hardest category to deal with because nobody recycles them. They go to a cement kiln in Siliguri that co-processes them as fuel.",
      "Glass was the second-largest share by weight, and almost all of it came from within two hundred metres of the trekkers' huts. Aluminium and tin were a distant third, but they are the only category that actually pays for its own transport down.",
      "The number that matters more than ninety-one is this: the same stretch produced a hundred and forty kilos in the same window two years ago. It is going down. Not because the mountain cleans itself, but because enough groups now arrive expecting to carry something out.",
    ],
  },
  {
    slug: "i-turned-back-at-the-pass",
    title: "I turned back four hundred metres from the pass",
    standfirst:
      "A trekker on Rupin describes the decision, why her leader made it easy, and why she does not regret it eleven months later.",
    author: "Shreya Bhattacharya",
    role: "Trekker, Rupin Pass 2025",
    trek: "rupin-pass",
    date: "2026-07-30",
    minutes: 7,
    category: "Trekker story",
    body: [
      "We were in the gully by six. The snow was firm, the steps were cut, and I had been doing fine for six days. Then somewhere around fourteen thousand eight hundred feet my hands stopped working properly and I could not get my fingers into my glove.",
      "Kabir did not make a speech about it. He asked me to touch my nose with my eyes closed, watched me do it badly, and said we were going down. Two of the support staff came with me. The rest of the group went over.",
      "What I want people to know is how completely unremarkable it felt. Nobody treated it as a failure. Nobody made me feel like I had cost anyone anything. I sat in the sun at Dhanderas Thach for six hours, ate a great deal, and felt fine by evening.",
      "I went back last October and crossed it. The second time I knew exactly how the gully would feel, and I knew that turning around was available to me if I needed it. I think that is the only reason I made it.",
    ],
  },
  {
    slug: "reading-a-himalayan-weather-window",
    title: "How we read a weather window before a pass day",
    standfirst:
      "Three forecasts, a barometer, and somebody's uncle in the village. What actually goes into the call on the night before a crossing.",
    author: "Rohan Mehta",
    role: "Senior trek leader",
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
    author: "Devika Nair",
    role: "Trek leader",
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
  {
    slug: "the-village-at-the-start-of-the-trail",
    title: "The economics of a village at the start of a trail",
    standfirst:
      "Sankri has about four hundred households. In a good season, trekking is the largest single source of cash income for more than half of them.",
    author: "Ipshita Bose",
    role: "Community programmes",
    trek: "har-ki-dun",
    date: "2026-05-22",
    minutes: 10,
    category: "Field notes",
    body: [
      "Before the road came up the Tons valley, Sankri's economy ran on apples, rajma and whatever could be carried down to Purola. Cash was seasonal and thin. What trekking changed was not the amount so much as the timing — money now arrives in December and January, which is when the old economy had nothing.",
      "A horseman working a full winter season on Kedarkantha will earn more between December and February than a season of apples brings in. That is a real change in a household's year, and it explains why almost every family in the village has someone working the trails.",
      "It also creates a dependency that is worth being honest about. A bad snow year, a road closure, or a permit change hits this village harder than it hits us. When the sanctuary closed for six weeks in 2023, we kept our staff on payroll, and the horsemen — who work for themselves — had nothing.",
      "We now pay a guaranteed minimum for the season rather than per trek, which shifts some of that risk onto us where it belongs. It is not a complete answer. It is better than what came before it.",
    ],
  },
];

export function storyBySlug(slug: string) {
  return stories.find((s) => s.slug === slug);
}
