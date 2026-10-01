import { treks, departures } from "@/data/treks";

/* Deterministic mock operations data shared by every admin screen. */

function rng(seed: number) {
  // Lehmer generator. Plain float multiplication keeps the result positive and
  // exact below 2^53 — Math.imul would wrap to a signed int and go negative.
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const FIRST = [
  "Aarav", "Ishita", "Rohan", "Meera", "Kabir", "Ananya", "Vikram", "Tara",
  "Nikhil", "Sanya", "Arjun", "Rhea", "Farhan", "Divya", "Karthik", "Naina",
  "Zoya", "Aditya", "Leela", "Yash", "Pooja", "Siddharth", "Anjali", "Rahul",
  "Nandini", "Imran", "Kavya", "Dev", "Sneha", "Manav",
];
const LAST = [
  "Sharma", "Iyer", "Banerjee", "Menon", "Gupta", "Reddy", "Nair", "Khan",
  "Chatterjee", "Patel", "Rao", "Desai", "Bose", "Joshi", "Kulkarni", "Shetty",
  "Mehta", "Verma", "Pillai", "Ghosh",
];
const CITIES = [
  "Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata",
  "Ahmedabad", "Jaipur", "Kochi", "Chandigarh", "Indore",
];

export type BookingStatus = "confirmed" | "pending" | "waitlist" | "cancelled";

export type Booking = {
  id: string;
  trekker: string;
  email: string;
  city: string;
  trek: string;
  trekName: string;
  departureId: string;
  start: string;
  people: number;
  amount: number;
  paid: number;
  status: BookingStatus;
  bookedOn: string;
  addOns: string[];
  fitnessFlag: boolean;
  docsComplete: boolean;
};

const ADDONS = ["Transport", "Offloading", "Gear rental", "Insurance"];

function buildBookings(): Booking[] {
  const rand = rng(4242);
  const out: Booking[] = [];
  const pool = departures.slice(0, 140);

  pool.forEach((d, i) => {
    const t = treks.find((x) => x.slug === d.trek)!;
    const n = 1 + Math.floor(rand() * 4);
    for (let k = 0; k < n; k++) {
      const people = 1 + Math.floor(rand() * 3);
      const amount = t.price * people;
      const r = rand();
      const status: BookingStatus =
        r > 0.93 ? "cancelled" : r > 0.84 ? "pending" : r > 0.79 ? "waitlist" : "confirmed";
      const paid =
        status === "confirmed" ? amount : status === "pending" ? Math.round(amount * 0.25) : 0;
      const bookedOffset = Math.floor(rand() * 120);
      const bookedOn = new Date(Date.UTC(2026, 8, 16) - bookedOffset * 86400000)
        .toISOString()
        .slice(0, 10);

      out.push({
        id: `IH-${String(30100 + out.length).padStart(5, "0")}`,
        trekker: `${FIRST[Math.floor(rand() * FIRST.length)]} ${LAST[Math.floor(rand() * LAST.length)]}`,
        email: `trekker${out.length}@example.com`,
        city: CITIES[Math.floor(rand() * CITIES.length)],
        trek: t.slug,
        trekName: t.name,
        departureId: d.id,
        start: d.start,
        people,
        amount,
        paid,
        status,
        bookedOn,
        addOns: ADDONS.filter(() => rand() > 0.55),
        fitnessFlag: t.difficulty === "Difficult" && rand() > 0.72,
        docsComplete: rand() > 0.32,
      });
    }
    void i;
  });

  return out.sort((a, b) => b.bookedOn.localeCompare(a.bookedOn));
}

export const bookings = buildBookings();

export type Leader = {
  name: string;
  since: number;
  home: string;
  grades: string;
  treksLed: number;
  rating: number;
  status: "on trek" | "available" | "on leave" | "training";
  nextDeparture?: string;
  certifications: string[];
};

export const leaders: Leader[] = [
  { name: "Kartik Rawat", since: 2019, home: "Dehradun", grades: "All grades", treksLed: 50, rating: 4.9, status: "available", nextDeparture: "Kedarkantha, 4 Dec", certifications: ["Founder & Owner", "WFR"] },
  { name: "Praveen Chauhan", since: 2020, home: "Dehradun", grades: "All grades", treksLed: 42, rating: 4.9, status: "available", nextDeparture: "Brahmatal, 20 Dec", certifications: ["Co-Owner", "Operations & safety"] },
  { name: "Farooq", since: 2020, home: "Sonamarg", grades: "Up to Difficult", treksLed: 60, rating: 4.9, status: "on trek", nextDeparture: "Kashmir Great Lakes", certifications: ["Trek guide", "WFR"] },
];

export type WasteLog = {
  id: string;
  basecamp: string;
  trek: string;
  date: string;
  kg: number;
  plastic: number;
  glass: number;
  metal: number;
  other: number;
  coordinator: string;
};

export const wasteLogs: WasteLog[] = (() => {
  const rand = rng(909);
  const camps = [
    ["Sankri", "kedarkantha"], ["Lohajung", "brahmatal"], ["Manali", "hampta-pass"],
    ["Sonamarg", "kashmir-great-lakes"], ["Kafnu", "pin-bhaba-pass"], ["Raithal", "dayara-bugyal"],
    ["Aru", "tarsar-marsar"], ["Govindghat", "valley-of-flowers"],
  ];
  const out: WasteLog[] = [];
  for (let i = 0; i < 26; i++) {
    const [camp, slug] = camps[i % camps.length];
    const kg = Math.round((8 + rand() * 34) * 10) / 10;
    const plastic = Math.round(kg * (0.45 + rand() * 0.2) * 10) / 10;
    const glass = Math.round(kg * (0.1 + rand() * 0.12) * 10) / 10;
    const metal = Math.round(kg * (0.05 + rand() * 0.1) * 10) / 10;
    out.push({
      id: `GT-${2600 + i}`,
      basecamp: camp,
      trek: slug,
      date: new Date(Date.UTC(2026, 8, 15) - i * 4 * 86400000).toISOString().slice(0, 10),
      kg,
      plastic,
      glass,
      metal,
      other: Math.round((kg - plastic - glass - metal) * 10) / 10,
      coordinator: ["Kartik Rawat", "Praveen Chauhan", "Farooq"][i % 3],
    });
  }
  return out;
})();

/* Twelve months of revenue and headcount, for the dashboard. */
export const monthlySeries = (() => {
  const rand = rng(77);
  const labels = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  // Winter (Dec–Mar) and the Kashmir window (Jul–Sep) are the two real peaks.
  const shape = [0.55, 0.7, 1.0, 0.95, 0.85, 0.8, 0.6, 0.65, 0.7, 0.9, 0.95, 0.6];
  return labels.map((m, i) => {
    const trekkers = Math.round(shape[i] * (820 + rand() * 180));
    return {
      month: m,
      trekkers,
      revenue: Math.round(trekkers * (12800 + rand() * 4200)),
      cancellations: Math.round(trekkers * (0.04 + rand() * 0.05)),
    };
  });
})();

export const kpis = (() => {
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const pending = bookings.filter((b) => b.status === "pending");
  const revenue = confirmed.reduce((s, b) => s + b.amount, 0);
  const outstanding = pending.reduce((s, b) => s + (b.amount - b.paid), 0);
  const capacity = departures.reduce((s, d) => s + d.capacity, 0);
  const booked = departures.reduce((s, d) => s + d.booked, 0);
  return {
    revenue,
    outstanding,
    confirmed: confirmed.length,
    pending: pending.length,
    waitlist: bookings.filter((b) => b.status === "waitlist").length,
    trekkers: confirmed.reduce((s, b) => s + b.people, 0),
    fillRate: Math.round((booked / capacity) * 100),
    openSlots: capacity - booked,
    departures: departures.length,
    fitnessFlags: bookings.filter((b) => b.fitnessFlag && b.status !== "cancelled").length,
    docsMissing: bookings.filter((b) => !b.docsComplete && b.status === "confirmed").length,
  };
})();
