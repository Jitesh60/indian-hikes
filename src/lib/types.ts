export type Difficulty =
  | "Easy"
  | "Easy–Moderate"
  | "Moderate"
  | "Moderate–Difficult"
  | "Difficult";

export type Month =
  | "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun"
  | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export type ProfilePoint = {
  day: number;
  label: string;
  altFt: number;
  km: number;
  note: string;
};

export type Departure = {
  id: string;
  trek: string;
  start: string;
  end: string;
  capacity: number;
  booked: number;
  leader: string;
  status: "open" | "filling" | "full" | "waitlist" | "closed";
  greenTrails: boolean;
};

export type Trek = {
  slug: string;
  name: string;
  region: string;
  state: string;
  difficulty: Difficulty;
  days: number;
  nights: number;
  maxAltFt: number;
  trailKm: number;
  basecamp: string;
  railhead: string;
  price: number;
  seasons: Month[];
  rating: number;
  reviews: number;
  greenTrails: boolean;
  familyFriendly: boolean;
  firstTimer: boolean;
  snow: boolean;
  tagline: string;
  summary: string;
  whyThis: string[];
  profile: ProfilePoint[];
  fitnessTarget: string;
  fitnessNote: string;
  included: string[];
  excluded: string[];
  hue: number;
};

/** The whole demo dataset is generated against this date, so every countdown,
 *  calendar and "slots left" figure agrees with it. */
export const TODAY = new Date("2026-09-17T00:00:00Z");

export function daysUntil(iso: string) {
  return Math.round((new Date(iso).getTime() - TODAY.getTime()) / 86400000);
}

export const DIFFICULTY_ORDER: Difficulty[] = [
  "Easy",
  "Easy–Moderate",
  "Moderate",
  "Moderate–Difficult",
  "Difficult",
];

export const MONTHS: Month[] = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Altitude band a height belongs to — drives colour across the whole product. */
export function band(altFt: number) {
  if (altFt < 8000) return { key: "forest", label: "Forest", color: "#1f4438" };
  if (altFt < 11000) return { key: "meadow", label: "Meadow", color: "#4c8770" };
  if (altFt < 13000) return { key: "bugyal", label: "Bugyal", color: "#d4a22b" };
  if (altFt < 15000) return { key: "moraine", label: "Moraine", color: "#6e93a6" };
  return { key: "snow", label: "Snowline", color: "#a6c2cf" };
}

export function difficultyScore(d: Difficulty) {
  return DIFFICULTY_ORDER.indexOf(d) + 1;
}

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function ft2m(ft: number) {
  return Math.round(ft * 0.3048);
}
