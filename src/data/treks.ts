import type { Trek, Departure } from "@/lib/types";

/* ------------------------------------------------------------------
   All descriptive copy here is written for this project.
   Place names, altitudes and distances are real geography.
   ------------------------------------------------------------------ */

const p = (day: number, label: string, altFt: number, km: number, note: string) => ({
  day,
  label,
  altFt,
  km,
  note,
});

export const treks: Trek[] = [
  {
    slug: "kedarkantha",
    name: "Kedarkantha",
    region: "Govind Wildlife Sanctuary",
    state: "Uttarakhand",
    difficulty: "Moderate",
    days: 6,
    nights: 5,
    maxAltFt: 12500,
    trailKm: 20,
    basecamp: "Sankri",
    railhead: "Dehradun",
    price: 12450,
    seasons: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    rating: 4.8,
    reviews: 2841,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: true,
    snow: true,
    hue: 210,
    tagline: "The winter summit that teaches you what altitude feels like",
    summary:
      "Kedarkantha is the trek most Indian trekkers cut their teeth on, and for good reason. In six days you walk out of a pine forest, cross three clearings that each feel like a different country, and stand on a summit at 12,500 ft with the Swargarohini massif filling the entire northern sky. In deep winter the last 2,000 ft are a snow climb — the first real one for most people who do it.",
    whyThis: [
      "A true summit, not a pass or a lake — you end the trek standing on a point with nothing higher around you.",
      "Three distinct campsites, each with a different character: forest, clearing, ridge.",
      "The safest place in the Indian Himalaya to learn snow technique, because the slope is short and the run-out is clean.",
    ],
    profile: [
      p(1, "Sankri", 6400, 0, "Drive in from Dehradun. Ten hours on the Yamuna road, the last two along the Tons."),
      p(2, "Juda ka Talab", 9100, 4, "Straight into deodar and maple. The lake at the top freezes solid by January."),
      p(3, "Kedarkantha Base", 11250, 4, "The forest thins and the ridge opens. First clear view of the Swargarohini wall."),
      p(4, "Summit & Hargaon", 12500, 6, "Pre-dawn start. Summit by eight, then a long descent to a camp inside the treeline."),
      p(5, "Sankri", 6400, 6, "Down through Hargaon's shepherd trails to the road head."),
      p(6, "Dehradun", 2200, 0, "Drive out. You'll be back in the city by evening."),
    ],
    fitnessTarget: "5 km in 40 minutes",
    fitnessNote:
      "Build this over four weeks before you arrive. The summit day is six hours of continuous effort at altitude, and cardio is what carries you through it.",
    included: [
      "Camping and stay from Sankri to Sankri",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags rated to −10°C, mats, crampons and microspikes",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Dehradun", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "dayara-bugyal",
    name: "Dayara Bugyal",
    region: "Upper Bhagirathi",
    state: "Uttarakhand",
    difficulty: "Easy–Moderate",
    days: 6,
    nights: 5,
    maxAltFt: 11900,
    trailKm: 21,
    basecamp: "Raithal",
    railhead: "Dehradun",
    price: 11900,
    seasons: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Sep", "Oct", "Nov"],
    rating: 4.9,
    reviews: 1620,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: true,
    snow: true,
    hue: 96,
    tagline: "The largest high-altitude meadow you can reach in a weekend and a half",
    summary:
      "Dayara is 28 square kilometres of rolling grassland sitting at 11,000 ft, ringed by Bandarpoonch, Draupadi ka Danda and Srikanth. It is the gentlest introduction to the Himalaya that still gives you a genuinely big view. In winter the whole meadow goes under four feet of snow and turns into the closest thing India has to a ski bowl.",
    whyThis: [
      "The gradient is forgiving throughout — no single day is punishing.",
      "Two ancient villages on the way in, Raithal and Barsu, both still built in the Garhwali koti-banal style.",
      "Runs almost the whole year, which makes it the easiest trek to schedule around work.",
    ],
    profile: [
      p(1, "Raithal", 7550, 0, "Drive from Dehradun along the Bhagirathi. Stay in a village homestay."),
      p(2, "Gui", 9450, 4, "Oak forest the whole way, with the first meadow edge appearing at camp."),
      p(3, "Chilapada", 10650, 3, "Short day. Spend the afternoon walking out onto the bugyal itself."),
      p(4, "Dayara Top & back", 11900, 8, "Out to the high point and the Bakaria Top ridge, then back to camp."),
      p(5, "Barsu", 7200, 6, "Different descent line, ending in a village with a 400-year-old temple."),
      p(6, "Dehradun", 2200, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 45 minutes",
    fitnessNote:
      "This is the trek we recommend to people who have never walked at altitude. Four weeks of steady jogging is enough.",
    included: [
      "Stay from Raithal to Barsu including two village homestays",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Dehradun", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "brahmatal",
    name: "Brahmatal",
    region: "Lohajung",
    state: "Uttarakhand",
    difficulty: "Moderate",
    days: 6,
    nights: 5,
    maxAltFt: 12250,
    trailKm: 22,
    basecamp: "Lohajung",
    railhead: "Kathgodam",
    price: 12800,
    seasons: ["Dec", "Jan", "Feb", "Mar"],
    rating: 4.7,
    reviews: 1194,
    greenTrails: false,
    familyFriendly: false,
    firstTimer: true,
    snow: true,
    hue: 200,
    tagline: "Two frozen lakes and the best winter view of Trishul in the country",
    summary:
      "Brahmatal is a winter trek that keeps its biggest card for the last morning. You climb a ridge above two frozen lakes, and Trishul and Nanda Ghunti stand up in front of you at a distance that feels wrong — as if someone moved them closer overnight. The rhododendron forest below is worth the trek on its own.",
    whyThis: [
      "Trishul from the Brahmatal ridge is, mile for mile, the closest big-mountain view on any easy winter trek.",
      "Continuous snow underfoot from December through early March.",
      "An old-growth rhododendron forest that flowers red in late March.",
    ],
    profile: [
      p(1, "Lohajung", 7700, 0, "Drive from Kathgodam through Gwaldam. A long but beautiful road day."),
      p(2, "Bekaltal", 9700, 6, "Through oak and rhododendron to a lake ringed by trees."),
      p(3, "Brahmatal", 10500, 7, "Traverse above the treeline with Trishul appearing and disappearing."),
      p(4, "Brahmatal Top & Daldum", 12250, 8, "Ridge walk to the top, then down the far side."),
      p(5, "Lohajung", 7700, 6, "Descend through Wan's terraced fields."),
      p(6, "Kathgodam", 1800, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 40 minutes",
    fitnessNote:
      "Day four is long and exposed. Wind on the ridge is the real difficulty, not the gradient.",
    included: [
      "Stay from Lohajung to Lohajung",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats, microspikes and gaiters",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Kathgodam", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "deoriatal-chandrashila",
    name: "Deoriatal–Chandrashila",
    region: "Kedarnath Wildlife Sanctuary",
    state: "Uttarakhand",
    difficulty: "Easy–Moderate",
    days: 5,
    nights: 4,
    maxAltFt: 12083,
    trailKm: 17,
    basecamp: "Sari",
    railhead: "Dehradun",
    price: 11400,
    seasons: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Sep", "Oct", "Nov"],
    rating: 4.8,
    reviews: 2103,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: true,
    snow: true,
    hue: 30,
    tagline: "A reflecting lake, a temple at the top, and the widest summit panorama in Garhwal",
    summary:
      "From Chandrashila you can see Nanda Devi, Trishul, Kedar Dome, Chaukhamba and Bandarpoonch without turning more than 180 degrees. Getting there takes five days and begins at Deoriatal, a lake that holds Chaukhamba upside down on its surface if you are there at first light and the wind is still.",
    whyThis: [
      "The single most complete summit view available on a short trek in Uttarakhand.",
      "Tungnath, the highest Shiva temple anywhere, sits on the trail an hour below the top.",
      "Works in both the spring and autumn windows, so it is easy to fit into a calendar.",
    ],
    profile: [
      p(1, "Sari", 6500, 0, "Drive from Dehradun via Devprayag and Rudraprayag along the Alaknanda."),
      p(2, "Deoriatal", 7900, 2, "A short climb to the lake. Camp far enough back to keep the water clean."),
      p(3, "Rohini Bugyal", 8500, 6, "A forest traverse with almost no other trekkers on it."),
      p(4, "Chandrashila & Chopta", 12083, 9, "Summit at sunrise via Tungnath, then down to the road."),
      p(5, "Dehradun", 2200, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 45 minutes",
    fitnessNote:
      "Short trek, but summit day covers nine kilometres and 3,500 ft of gain and loss. Train for the descent as much as the climb.",
    included: [
      "Stay from Sari to Chopta",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Dehradun", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "har-ki-dun",
    name: "Har Ki Dun",
    region: "Govind Wildlife Sanctuary",
    state: "Uttarakhand",
    difficulty: "Moderate",
    days: 7,
    nights: 6,
    maxAltFt: 11675,
    trailKm: 47,
    basecamp: "Sankri",
    railhead: "Dehradun",
    price: 14900,
    seasons: ["Mar", "Apr", "May", "Jun", "Sep", "Oct", "Nov", "Dec"],
    rating: 4.8,
    reviews: 1486,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: false,
    snow: false,
    hue: 120,
    tagline: "A hanging valley the Mahabharata claims as its own",
    summary:
      "Har Ki Dun is a cradle-shaped valley at the head of the Supin, and the walk in is as much the point as the destination. You pass through Osla and Gangad, villages that have kept their timber-and-stone architecture and their own calendar, and camp beside a river the whole way. Swargarohini closes the valley at the far end.",
    whyThis: [
      "Seven days of valley walking with very little altitude stress — the gain is spread thin.",
      "The old villages of the Supin are among the last places in Garhwal still building in koti-banal.",
      "You can add Ruinsara Tal at the same basecamp if you want two valleys in one trip.",
    ],
    profile: [
      p(1, "Sankri", 6400, 0, "Drive from Dehradun."),
      p(2, "Puani Garaat", 7550, 12, "Along the Supin through Taluka. Long, flat and easy."),
      p(3, "Kalkatiyadhaar", 9100, 10, "Above Osla, with the valley opening wider every hour."),
      p(4, "Har Ki Dun & back", 11675, 12, "Into the valley head. Swargarohini from end to end."),
      p(5, "Puani Garaat", 7550, 10, "Retrace down the true left bank."),
      p(6, "Sankri", 6400, 12, "Back through Taluka to the road head."),
      p(7, "Dehradun", 2200, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 40 minutes",
    fitnessNote:
      "The difficulty here is mileage, not altitude. Two 12 km days back to back need endurance more than lungs.",
    included: [
      "Stay from Sankri to Sankri",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Dehradun", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "hampta-pass",
    name: "Hampta Pass",
    region: "Kullu to Lahaul",
    state: "Himachal Pradesh",
    difficulty: "Moderate",
    days: 5,
    nights: 4,
    maxAltFt: 14100,
    trailKm: 26,
    basecamp: "Manali",
    railhead: "Chandigarh",
    price: 13900,
    seasons: ["Jun", "Jul", "Aug", "Sep"],
    rating: 4.9,
    reviews: 3020,
    greenTrails: true,
    familyFriendly: false,
    firstTimer: false,
    snow: true,
    hue: 260,
    tagline: "Green Kullu on one side, the bare Lahaul desert on the other, in a single afternoon",
    summary:
      "Hampta is a crossover, and the crossing is abrupt enough to be disorienting. You spend three days in a wet green valley full of wildflowers and waterfalls, climb to a notch at 14,100 ft, and drop into a landscape with no colour in it at all. Few treks in the world change this completely over one ridge.",
    whyThis: [
      "The sharpest landscape transition on any Indian trek, and it happens in about four hours.",
      "Chandratal is an easy drive from the exit, so most groups add it on.",
      "A monsoon-season trek — it runs in the months when Uttarakhand is closed.",
    ],
    profile: [
      p(1, "Jobra", 9800, 0, "Drive up 42 hairpins from Manali. Camp beside the Rani nallah."),
      p(2, "Chika to Balu ka Ghera", 11900, 9, "Follow the river up. The valley narrows and the meadow ends."),
      p(3, "Hampta Pass to Shea Goru", 14100, 8, "Steep snow to the notch, then a long scree descent into Lahaul."),
      p(4, "Chatru to Chandratal", 12100, 6, "Out to the Chandra river, then the drive to the lake."),
      p(5, "Manali", 6700, 0, "Over Rohtang and back."),
    ],
    fitnessTarget: "5 km in 38 minutes",
    fitnessNote:
      "The pass day gains 2,200 ft and loses 2,000 ft on loose ground. Strong knees matter more than speed.",
    included: [
      "Stay from Manali to Manali",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Chandigarh", "Backpack offloading", "Chandratal add-on", "Insurance"],
  },
  {
    slug: "kashmir-great-lakes",
    name: "Kashmir Great Lakes",
    region: "Sonamarg",
    state: "Jammu & Kashmir",
    difficulty: "Moderate–Difficult",
    days: 7,
    nights: 6,
    maxAltFt: 13750,
    trailKm: 67,
    basecamp: "Sonamarg",
    railhead: "Srinagar",
    price: 19500,
    seasons: ["Jul", "Aug", "Sep"],
    rating: 4.9,
    reviews: 2670,
    greenTrails: true,
    familyFriendly: false,
    firstTimer: false,
    snow: false,
    hue: 180,
    tagline: "Seven alpine lakes, four passes, and a week with no repeated view",
    summary:
      "There is an argument that this is the finest trek in India, and after the third pass it stops being an argument. Vishansar, Kishansar, Gadsar, Satsar, Gangabal and Nundkol are strung across a high traverse below the Harmukh massif, each in its own bowl, each a different colour. The mileage is serious — 67 km in six walking days.",
    whyThis: [
      "Seven lakes, and you camp beside four of them.",
      "Four passes above 13,000 ft, so the trek stays high for its entire length.",
      "The meadows between Nichnai and Vishansar are the most photographed grassland in the country, and still under-photographed.",
    ],
    profile: [
      p(1, "Shitkadi", 7800, 0, "Drive from Srinagar to the Sonamarg basecamp."),
      p(2, "Nichnai", 11500, 9, "Through the Table Top and a birch forest to a wide camp."),
      p(3, "Vishansar", 12000, 10, "Over Nichnai pass and down to the first two lakes."),
      p(4, "Gadsar", 12000, 14, "Kishansar, then Gadsar pass at 13,750 ft — the high point of the trek."),
      p(5, "Satsar", 12000, 12, "Rolling traverse past army posts into the Satsar bowl."),
      p(6, "Gangabal", 11500, 11, "Zach pass and the twin lakes below Harmukh."),
      p(7, "Naranag to Srinagar", 7450, 11, "A steep 4,000 ft descent to the road."),
    ],
    fitnessTarget: "10 km in 90 minutes",
    fitnessNote:
      "Six consecutive days of 10–14 km at 12,000 ft. This is the fitness bar where the trek stops being fun if you have not trained.",
    included: [
      "Stay from Srinagar to Srinagar",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Flights to Srinagar", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "rupin-pass",
    name: "Rupin Pass",
    region: "Sangla to Sankri",
    state: "Himachal & Uttarakhand",
    difficulty: "Difficult",
    days: 8,
    nights: 7,
    maxAltFt: 15250,
    trailKm: 52,
    basecamp: "Dhaula",
    railhead: "Dehradun",
    price: 19900,
    seasons: ["May", "Jun", "Sep", "Oct"],
    rating: 4.9,
    reviews: 1310,
    greenTrails: true,
    familyFriendly: false,
    firstTimer: false,
    snow: true,
    hue: 300,
    tagline: "A trek that changes character every single day for eight days",
    summary:
      "Rupin starts in a Garhwali river gorge and ends in a Kinnauri apple valley, and in between it gives you a hanging village, a three-stage waterfall you climb beside, a snow gully at 15,250 ft and a ridge walk out. No other Indian trek reinvents itself this often. It is also genuinely hard, and we are strict about who we take.",
    whyThis: [
      "The waterfall ascent is the most dramatic hour of walking available on a commercial trek in India.",
      "You cross a state line on foot at the pass.",
      "Eight days with eight distinct landscapes — forest, gorge, hanging village, snow bridge, meadow, waterfall, gully, orchard.",
    ],
    profile: [
      p(1, "Dhaula", 5100, 0, "Drive in from Dehradun along the Tons."),
      p(2, "Sewa", 6300, 12, "River-level walking to a village with a temple you cannot enter."),
      p(3, "Jiskun to Jakha", 8700, 11, "Cross into Himachal and climb to the hanging village."),
      p(4, "Saruwas Thach", 11150, 8, "Two snow bridges over the Rupin, then a meadow camp."),
      p(5, "Dhanderas Thach", 11700, 5, "Short day. The three-stage waterfall is in view the whole time."),
      p(6, "Upper Waterfall Camp", 13100, 4, "Climb beside the falls to a camp on the shelf above."),
      p(7, "Rupin Pass to Ronti Gad", 15250, 10, "The snow gully, the pass, and a long descent into Kinnaur."),
      p(8, "Sangla to Shimla", 8600, 6, "Ridge walk out to the road."),
    ],
    fitnessTarget: "10 km in 80 minutes",
    fitnessNote:
      "We ask for a documented fitness record before confirming a booking on Rupin. The gully is 60 degrees of snow and there is no way to shortcut it.",
    included: [
      "Stay from Dhaula to Sangla",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats, ropes, ice axes and crampons",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Dehradun", "Exit transport from Sangla", "Backpack offloading", "Insurance"],
  },
  {
    slug: "buran-ghati",
    name: "Buran Ghati",
    region: "Pabbar Valley",
    state: "Himachal Pradesh",
    difficulty: "Difficult",
    days: 8,
    nights: 7,
    maxAltFt: 15000,
    trailKm: 37,
    basecamp: "Janglik",
    railhead: "Shimla",
    price: 18900,
    seasons: ["May", "Jun", "Sep", "Oct"],
    rating: 4.8,
    reviews: 870,
    greenTrails: false,
    familyFriendly: false,
    firstTimer: false,
    snow: true,
    hue: 20,
    tagline: "You rappel off the pass. That is the whole pitch.",
    summary:
      "Buran Ghati ends with a 400 ft snow wall that you come down on a rope, which makes it the only commercial trek in India with a genuine technical descent. Before that it gives you Dayara's meadow twin at Litham, the Chandranahan lake below a glacier, and a campsite at Dunda that sits in a bowl of peaks.",
    whyThis: [
      "A roped descent off the pass, supervised, for trekkers with no prior climbing experience.",
      "Chandranahan Lake sits directly beneath the glacier that feeds the Pabbar.",
      "Two of the best-sited campsites in Himachal, at Litham and Dunda.",
    ],
    profile: [
      p(1, "Janglik", 9300, 0, "Drive from Shimla through Rohru and Chirgaon."),
      p(2, "Dayara Thach", 11000, 5, "Out of the village and onto the first meadow."),
      p(3, "Litham", 11400, 5, "A wide flat camp with the Pabbar running through it."),
      p(4, "Chandranahan Lake & back", 13500, 8, "Acclimatisation day out to the glacial lake."),
      p(5, "Dunda", 13500, 5, "Climb into the bowl below the pass."),
      p(6, "Buran Ghati to Munirang", 15000, 9, "The pass, the rappel, and a long descent."),
      p(7, "Barua", 7900, 5, "Down through pine into the Baspa valley."),
      p(8, "Shimla", 7200, 0, "Drive out."),
    ],
    fitnessTarget: "10 km in 85 minutes",
    fitnessNote:
      "The rappel is safe but it is exposed. If heights are a problem for you, choose Rupin instead — same difficulty, no vertical section.",
    included: [
      "Stay from Janglik to Barua",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats, ropes, harnesses and crampons",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Shimla", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "sandakphu-phalut",
    name: "Sandakphu–Phalut",
    region: "Singalila Ridge",
    state: "West Bengal",
    difficulty: "Moderate",
    days: 7,
    nights: 6,
    maxAltFt: 11930,
    trailKm: 47,
    basecamp: "Sepi",
    railhead: "New Jalpaiguri",
    price: 16500,
    seasons: ["Mar", "Apr", "May", "Oct", "Nov", "Dec"],
    rating: 4.7,
    reviews: 1420,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: false,
    snow: false,
    hue: 340,
    tagline: "Four of the world's five highest mountains from one ridge",
    summary:
      "The Singalila ridge runs along the Nepal border, and from it you can see Everest, Lhotse, Makalu and Kanchenjunga at the same time — the Sleeping Buddha, as it is known locally. You sleep in trekkers' huts rather than tents, walk through the largest rhododendron forest in India, and cross into Nepal for tea about four times a day without anyone minding.",
    whyThis: [
      "Everest and Kanchenjunga in a single frame, from 11,930 ft, on an unglaciated trail.",
      "Teahouse stays throughout, which makes this the most comfortable long trek we run.",
      "Late April turns the entire ridge red and pink with rhododendron.",
    ],
    profile: [
      p(1, "Sepi", 4500, 0, "Drive from New Jalpaiguri through Darjeeling's tea country."),
      p(2, "Samanden", 7500, 10, "Into the Singalila National Park through bamboo and oak."),
      p(3, "Sabarkum", 11000, 12, "A long climb onto the ridge proper."),
      p(4, "Sandakphu & Phalut", 11930, 8, "The high point, and the view the whole trek is built around."),
      p(5, "Gorkhey", 7300, 10, "Steep descent to a village on a stream, half in Nepal."),
      p(6, "Sepi", 4500, 7, "Out along the Sirikhola."),
      p(7, "New Jalpaiguri", 400, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 40 minutes",
    fitnessNote:
      "Two 10 km-plus days in a row with sustained climbing. The altitude is mild but the distance is not.",
    included: [
      "Teahouse and lodge stay from Sepi to Sepi",
      "All meals on trek",
      "Trek leader, guides and support staff",
      "Sleeping bags and technical equipment",
      "National park permits",
    ],
    excluded: ["Transport from New Jalpaiguri", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "valley-of-flowers",
    name: "Valley of Flowers",
    region: "Bhyundar Ganga",
    state: "Uttarakhand",
    difficulty: "Easy–Moderate",
    days: 6,
    nights: 5,
    maxAltFt: 14100,
    trailKm: 37,
    basecamp: "Govindghat",
    railhead: "Haridwar",
    price: 15400,
    seasons: ["Jul", "Aug", "Sep"],
    rating: 4.8,
    reviews: 1980,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: true,
    snow: false,
    hue: 320,
    tagline: "Three hundred flowering species in one hanging valley, for six weeks a year",
    summary:
      "The Valley of Flowers only exists as an experience between mid-July and early September, when the monsoon turns a glacial valley into something closer to a botanical garden that nobody planted. It is a World Heritage site, and the trek pairs it with Hemkund Sahib at 14,100 ft — the highest gurudwara anywhere.",
    whyThis: [
      "Around 300 species flower here, and the mix changes completely between July and September.",
      "Hemkund Sahib and its lake sit 2,000 ft above the valley, reachable as a day climb.",
      "A monsoon trek with real infrastructure — you stay in lodges at Ghangaria.",
    ],
    profile: [
      p(1, "Govindghat", 6000, 0, "Drive from Haridwar along the Alaknanda through Joshimath."),
      p(2, "Ghangaria", 10200, 10, "A steady climb beside the Laxman Ganga to the base village."),
      p(3, "Valley of Flowers", 11500, 8, "Into the valley and as far up it as the day allows."),
      p(4, "Hemkund Sahib", 14100, 12, "A hard 4,000 ft climb to the lake and the gurudwara."),
      p(5, "Govindghat", 6000, 10, "Descend to the road head."),
      p(6, "Haridwar", 1000, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 45 minutes",
    fitnessNote:
      "Hemkund day is the only hard one, but it is very hard: 4,000 ft up and down in a single push on stone steps.",
    included: [
      "Lodge stay from Govindghat to Govindghat",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Technical equipment",
      "National park permits",
    ],
    excluded: ["Transport from Haridwar", "Backpack offloading", "Mule or porter hire", "Insurance"],
  },
  {
    slug: "goechala",
    name: "Goechala",
    region: "Kanchenjunga National Park",
    state: "Sikkim",
    difficulty: "Difficult",
    days: 11,
    nights: 10,
    maxAltFt: 15100,
    trailKm: 90,
    basecamp: "Yuksom",
    railhead: "New Jalpaiguri",
    price: 24900,
    seasons: ["Mar", "Apr", "May", "Oct", "Nov"],
    rating: 4.9,
    reviews: 640,
    greenTrails: false,
    familyFriendly: false,
    firstTimer: false,
    snow: true,
    hue: 240,
    tagline: "Standing under the third-highest mountain on earth",
    summary:
      "Goechala is a long approach to a single view, and the view justifies every one of the ninety kilometres. From the viewpoint at first light, Kanchenjunga's southeast face rises 11,000 ft directly in front of you, close enough to see the avalanche lines. Eleven days, most of it inside a national park that has not been logged.",
    whyThis: [
      "The most complete view of Kanchenjunga available to anyone without a climbing permit.",
      "Samiti Lake, Dzongri Top and the Thansing valley are each destination-grade on their own.",
      "A properly long expedition — the closest thing to Nepal's classic treks on Indian ground.",
    ],
    profile: [
      p(1, "Yuksom", 5670, 0, "Drive from New Jalpaiguri to Sikkim's old capital."),
      p(2, "Sachen", 7200, 8, "Into the park along the Rathong. Four bridges."),
      p(3, "Tshoka", 9700, 7, "Climb through Bakhim to a Tibetan settlement."),
      p(4, "Dzongri", 13000, 9, "The long rhododendron staircase to the Dzongri meadow."),
      p(5, "Dzongri Top & rest", 13675, 4, "Acclimatisation and the first Kanchenjunga sunrise."),
      p(6, "Thansing", 12900, 10, "Drop to the Prek Chu and up the far valley."),
      p(7, "Lamuney", 13600, 3, "Short day to position for the summit push."),
      p(8, "Goechala View Point", 15100, 14, "Pre-dawn to the viewpoint, then all the way back to Thansing."),
      p(9, "Tshoka", 9700, 15, "A long descent day."),
      p(10, "Yuksom", 5670, 15, "Out of the park."),
      p(11, "New Jalpaiguri", 400, 0, "Drive out."),
    ],
    fitnessTarget: "10 km in 75 minutes",
    fitnessNote:
      "Eleven days, two 15 km descent days and a 14 km summit day. This is our highest fitness bar outside of expeditions.",
    included: [
      "Stay from Yuksom to Yuksom",
      "All meals on trek",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Sikkim inner line and park permits",
    ],
    excluded: ["Transport from New Jalpaiguri", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "tarsar-marsar",
    name: "Tarsar Marsar",
    region: "Aru Valley",
    state: "Jammu & Kashmir",
    difficulty: "Moderate",
    days: 7,
    nights: 6,
    maxAltFt: 13200,
    trailKm: 48,
    basecamp: "Aru",
    railhead: "Srinagar",
    price: 18900,
    seasons: ["Jul", "Aug", "Sep"],
    rating: 4.9,
    reviews: 1105,
    greenTrails: true,
    familyFriendly: false,
    firstTimer: false,
    snow: false,
    hue: 170,
    tagline: "Two twin lakes, and you camp on the shore of both",
    summary:
      "Tarsar and Marsar are almond-shaped lakes on opposite sides of the same ridge, and unlike on most lake treks you get to sleep beside them rather than walk past. The approach from Aru runs through the Lidder's meadows, which in August are shoulder-high in wildflowers and full of Bakarwal shepherd camps.",
    whyThis: [
      "Camping on the shore of Tarsar is the best single campsite we run anywhere.",
      "Quieter than Kashmir Great Lakes with much of the same terrain.",
      "Sundersar and the Marsar viewpoint make a strong final day.",
    ],
    profile: [
      p(1, "Aru", 7900, 0, "Drive from Srinagar through Pahalgam."),
      p(2, "Lidderwat", 9100, 10, "Along the Lidder through pine and open meadow."),
      p(3, "Shekwas", 11000, 6, "Climb above the treeline into shepherd country."),
      p(4, "Tarsar", 12500, 5, "Camp on the lake shore. Most groups stay two nights."),
      p(5, "Sundersar", 12900, 7, "Over the Tarsar pass to a lake nobody photographs."),
      p(6, "Marsar & Homwas", 13200, 11, "Sunrise at the Marsar viewpoint, then descend."),
      p(7, "Aru to Srinagar", 7900, 9, "Out to the road."),
    ],
    fitnessTarget: "5 km in 38 minutes",
    fitnessNote:
      "Boulder fields on days five and six. Ankle strength matters more here than on most treks at this grade.",
    included: [
      "Stay from Srinagar to Srinagar",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Flights to Srinagar", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "phulara-ridge",
    name: "Phulara Ridge",
    region: "Govind Wildlife Sanctuary",
    state: "Uttarakhand",
    difficulty: "Easy–Moderate",
    days: 6,
    nights: 5,
    maxAltFt: 12150,
    trailKm: 23,
    basecamp: "Sankri",
    railhead: "Dehradun",
    price: 12900,
    seasons: ["Mar", "Apr", "May", "Sep", "Oct", "Nov"],
    rating: 4.7,
    reviews: 520,
    greenTrails: true,
    familyFriendly: true,
    firstTimer: true,
    snow: false,
    hue: 60,
    tagline: "Four kilometres of walking along the top edge of a ridge",
    summary:
      "Most treks take you to a viewpoint. Phulara keeps you on one for an entire day. The ridge walk from Pushtara to Bhoj Gadi runs four kilometres along a narrow crest with the ground falling away on both sides and the Swargarohini group in front of you the whole way. It is rare, and on a trek this easy it is close to unheard of.",
    whyThis: [
      "A continuous ridge traverse, not a summit — you are on the skyline for hours.",
      "Runs in the spring and autumn shoulders when the popular Sankri treks are crowded.",
      "Same basecamp as Kedarkantha, so it is easy to combine.",
    ],
    profile: [
      p(1, "Sankri", 6400, 0, "Drive from Dehradun."),
      p(2, "Kotgaon to Sikolta", 8700, 5, "Through a village and into oak forest."),
      p(3, "Pushtara", 10500, 4, "Onto the meadow at the foot of the ridge."),
      p(4, "Ridge walk to Bhoj Gadi", 12150, 8, "The traverse. Exposed, gentle underfoot, and long."),
      p(5, "Sankri", 6400, 6, "Down through Taluka's forest."),
      p(6, "Dehradun", 2200, 0, "Drive out."),
    ],
    fitnessTarget: "5 km in 45 minutes",
    fitnessNote:
      "Gentle throughout. The ridge day is exposed to wind, so layering matters more than fitness.",
    included: [
      "Stay from Sankri to Sankri",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Dehradun", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
  {
    slug: "bhrigu-lake",
    name: "Bhrigu Lake",
    region: "Kullu",
    state: "Himachal Pradesh",
    difficulty: "Moderate",
    days: 4,
    nights: 3,
    maxAltFt: 14100,
    trailKm: 18,
    basecamp: "Gulaba",
    railhead: "Chandigarh",
    price: 10900,
    seasons: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    rating: 4.6,
    reviews: 1340,
    greenTrails: true,
    familyFriendly: false,
    firstTimer: true,
    snow: true,
    hue: 140,
    tagline: "Above the treeline within two hours of leaving the car",
    summary:
      "Bhrigu is the fastest way to get high in the Indian Himalaya. The trail leaves the Rohtang road at 10,500 ft and is above the treeline almost immediately, which means four days gets you to a glacial lake at 14,100 ft with meadows the whole way. The trade-off is that acclimatisation is compressed, so we pace it carefully.",
    whyThis: [
      "You are in alpine meadow from the first hour — no long forest approach.",
      "Four days total, which fits a long weekend.",
      "The lake holds snow on its edges into July.",
    ],
    profile: [
      p(1, "Gulaba", 10500, 0, "Drive up from Manali and camp at the road head."),
      p(2, "Rola Kholi", 11700, 4, "Straight onto the meadow. Shepherd huts and grazing flocks."),
      p(3, "Bhrigu Lake & back", 14100, 10, "A steep 2,400 ft climb to the lake, then all the way down."),
      p(4, "Manali", 6700, 4, "Out to Gulaba and the drive back."),
    ],
    fitnessTarget: "5 km in 40 minutes",
    fitnessNote:
      "Rapid altitude gain on a short trek. If you have never been above 12,000 ft, do a longer trek first.",
    included: [
      "Stay from Manali to Manali",
      "All meals on trek, vegetarian",
      "Trek leader, guides and support staff",
      "Tents, sleeping bags, mats and technical equipment",
      "Permits and forest fees",
    ],
    excluded: ["Transport from Chandigarh", "Backpack offloading", "Personal gear rental", "Insurance"],
  },
];

/* ------------------------------------------------------------------
   Departures are generated deterministically so the site, the booking
   flow and the admin panel all agree on the same numbers.
   ------------------------------------------------------------------ */

const LEADERS = [
  "Arundhati Rane", "Kabir Sheikh", "Nima Lepcha", "Devika Nair",
  "Tashi Namgyal", "Rohan Mehta", "Ipshita Bose", "Sundar Rawat",
  "Meera Iyer", "Yeshe Dorjee", "Anoushka Grewal", "Vikram Chand",
];

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildDepartures(): Departure[] {
  const out: Departure[] = [];
  const today = new Date("2026-09-16T00:00:00Z");

  treks.forEach((t, ti) => {
    const rand = seeded(ti * 7919 + 13);
    // Look 14 months ahead from today, keeping only the trek's own season.
    for (let m = 0; m < 14; m++) {
      const cursor = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + m, 1));
      const monthKey = Object.keys(MONTH_INDEX).find(
        (k) => MONTH_INDEX[k] === cursor.getUTCMonth()
      )!;
      if (!t.seasons.includes(monthKey as never)) continue;

      const runs = 2 + Math.floor(rand() * 3);
      for (let r = 0; r < runs; r++) {
        const day = 2 + r * 8 + Math.floor(rand() * 3);
        const start = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), day));
        if (start <= today) continue;
        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + t.days - 1);

        const capacity = t.difficulty === "Difficult" ? 15 : 20;
        const fillBias = t.rating > 4.8 ? 0.55 : 0.3;
        const booked = Math.min(
          capacity,
          Math.round(capacity * (fillBias + rand() * 0.55))
        );
        const left = capacity - booked;
        const status: Departure["status"] =
          left === 0 ? "full" : left <= 3 ? "filling" : "open";

        out.push({
          id: `${t.slug}-${iso(start)}`,
          trek: t.slug,
          start: iso(start),
          end: iso(end),
          capacity,
          booked,
          leader: LEADERS[(ti + r + cursor.getUTCMonth()) % LEADERS.length],
          status,
          greenTrails: t.greenTrails && r === 1,
        });
      }
    }
  });

  return out.sort((a, b) => a.start.localeCompare(b.start));
}

export const departures: Departure[] = buildDepartures();

export function trekBySlug(slug: string) {
  return treks.find((t) => t.slug === slug);
}

export function departuresFor(slug: string) {
  return departures.filter((d) => d.trek === slug);
}
