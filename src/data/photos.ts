/* ------------------------------------------------------------------
   Photography registry.

   Every photograph on the site is a free Unsplash image, referenced by
   its Unsplash photo id and loaded straight from Unsplash in the
   browser. To swap a picture, change the id here — nothing else in the
   codebase knows where images come from.

   If an image ever fails to load, <Photo> falls back to generated ridge
   artwork, so a missing photo never shows up as a broken image.
   ------------------------------------------------------------------ */

export type PhotoDef = {
  /** Unsplash photo id — the last segment of an unsplash.com/photos/... URL */
  id: string;
  alt: string;
  /** Tone of the fallback artwork while/if the photo is unavailable */
  tone?: "cool" | "warm" | "dark";
};

export const photos = {
  // Night and camp
  tentMilkyWay: { id: "l0HDG2Nh1Rs", alt: "A tent lit from inside under a sky full of stars", tone: "dark" },
  tentNight: { id: "WaYexRfsZbs", alt: "A green tent pitched in the mountains under a night sky", tone: "dark" },
  tentForest: { id: "3THUppPPyBA", alt: "A tent glowing at night among trees", tone: "dark" },
  tentStars: { id: "edw_zCMCrVo", alt: "A green tent under a night sky filled with stars", tone: "dark" },

  // Snow and summits
  snowTrekkers: { id: "9I7Ttuykelc", alt: "Trekkers descending a snow-covered slope under a blue sky", tone: "cool" },
  snowField: { id: "xvNE3FW8Vd8", alt: "Trekkers crossing a snowfield near pine trees and mountains", tone: "cool" },
  snowPines: { id: "6Mp08UsIXO0", alt: "Pine trees standing in snow with mountains behind", tone: "cool" },
  snowRanges: { id: "mInpCVInYII", alt: "Layered Himalayan ranges seen from a high ridge", tone: "cool" },
  snowPeak: { id: "ZC7w_a6vS9c", alt: "A mountain covered with fresh snow", tone: "cool" },
  loneTree: { id: "aQLNi4FbwII", alt: "A lone tree on a snow-covered mountainside", tone: "cool" },
  summitGroup: { id: "eKCeVOfw4J8", alt: "A group of trekkers on top of a snow-covered mountain", tone: "cool" },
  snowRange2: { id: "7atocEoxUNI", alt: "A view of a long mountain range with snow on it", tone: "cool" },
  blueSkyPeak: { id: "yJ7FcTIlmjo", alt: "A snow-covered peak under a clear blue sky", tone: "cool" },
  whitePeak: { id: "3QYkxEqogJ4", alt: "A snow-covered Himalayan peak in daylight", tone: "cool" },
  kanchenjunga: { id: "C7UJ1Pu_S_I", alt: "The Kanchenjunga massif under snow in daylight", tone: "cool" },

  // Sunrise and sunset
  sunriseSummit: { id: "CV7KPRM6fHc", alt: "A trekker standing on a summit facing the sunrise", tone: "warm" },
  rangeSunset: { id: "g_FAG2zYPNI", alt: "A mountain range glowing at sunset", tone: "warm" },
  silhouette: { id: "X1fiJchaKF4", alt: "Silhouetted mountain ridges at sunset", tone: "warm" },
  tungnathSunset: { id: "rbce6mELCIc", alt: "Sunset over a mountain near Tungnath", tone: "warm" },
  cairn: { id: "OWZdXMuN_Vo", alt: "A stack of stones on a summit at first light", tone: "warm" },
  morningLight: { id: "xYiDhRt6KGU", alt: "Mountains and valleys fading into morning light", tone: "warm" },

  // Valleys, meadows and lakes
  harKiDun: { id: "5k9CWL0GhqU", alt: "A river running through the Har Ki Dun valley", tone: "cool" },
  uttarakhandValley: { id: "dtO_PwGyCvg", alt: "A wide valley and mountains in Uttarakhand", tone: "cool" },
  valley: { id: "hmi0h3nxSDc", alt: "A green valley with mountains in the background", tone: "cool" },
  valleyBetween: { id: "FgR5i1_e1uQ", alt: "A valley running between two mountain walls", tone: "cool" },
  flowerMeadow: { id: "g1WXje9LINk", alt: "Wildflowers blooming in a lush mountain meadow", tone: "warm" },
  greenClouds: { id: "oHDcqk2AgAk", alt: "Green grassy mountains wrapped in cloud", tone: "cool" },
  greenMountain: { id: "_yba505vv1k", alt: "A green mountain covered in cloud and grass", tone: "cool" },
  grazing: { id: "oOdn8bUfaCY", alt: "Cattle grazing on a grassy hillside below mountains", tone: "warm" },
  alpineLake: { id: "XTroPPNq6JA", alt: "A lake in the middle of mountains", tone: "cool" },
  alpineLake2: { id: "XbeNe7UfWIo", alt: "A lake and mountains in an alpine valley", tone: "cool" },
  lakeTrees: { id: "iy5FLDiKuiY", alt: "A lake with trees and mountains behind it", tone: "cool" },
  snowValley: { id: "Bkci_8qcdvQ", alt: "Snow-capped mountains above a forested valley", tone: "cool" },
  barrenRange: { id: "8zXJuplRzW4", alt: "A bare brown mountain under a grey sky", tone: "warm" },
  windingRoad: { id: "tE6Nv1KfcKc", alt: "A mountain range with a winding trail in the foreground", tone: "warm" },
  woodenHut: { id: "HlQi14Q_iO0", alt: "A wooden hut on a snowy mountain ridge", tone: "cool" },
  aerialGreen: { id: "01_igFr7hd4", alt: "A bird's-eye view of green forested mountains", tone: "cool" },

  // Forest
  mistPines: { id: "OYFHT4X5isg", alt: "An aerial view of pine trees in mist", tone: "dark" },
  mistForest: { id: "-2EWyAOBRPw", alt: "A misty forest of pine trees on a foggy day", tone: "dark" },
  forestPath: { id: "-Jzz666rQC8", alt: "A path through a misty pine forest", tone: "dark" },
  snowForest: { id: "mqEKg5D6lnE", alt: "Snow-covered pine trees in a quiet winter forest", tone: "cool" },
  tallPines: { id: "OxTT6kZs_gU", alt: "Tall pine trees covered with snow", tone: "cool" },

  // People
  hikerView: { id: "mxIj46EEvic", alt: "A hiker with a backpack looking out at a snow-capped mountain", tone: "warm" },
  hikerPeak: { id: "XQRHkFzmCT0", alt: "A hiker with a backpack in front of a snowy peak", tone: "cool" },
  leaderPortrait: { id: "dpaCQ-v-Vxg", alt: "A smiling man with mountains behind him", tone: "warm" },

  // Gear, culture, wildlife
  gearFlatlay: { id: "uSuJf5xWYvQ", alt: "A backpack and trail gear laid out flat", tone: "warm" },
  bootsGrass: { id: "0Mwf_P_wwEI", alt: "A pair of hiking boots on grass", tone: "warm" },
  bootsBench: { id: "eZyL-RRWQUs", alt: "A pair of hiking boots on a wooden bench", tone: "warm" },
  prayerFlags: { id: "X5C17SHF2eA", alt: "Prayer flags fluttering in front of mountains", tone: "warm" },
  flags: { id: "x303wT2uygo", alt: "Green, yellow and blue prayer flags against the sky", tone: "cool" },
  redPanda: { id: "ey5ITfjV9cU", alt: "A red panda resting on a branch", tone: "warm" },
} satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof photos;

/** One lead photo per trek, plus a small gallery. */
export const trekPhotos: Record<string, PhotoKey[]> = {
  kedarkantha: ["snowTrekkers", "snowPines", "summitGroup", "loneTree"],
  "dayara-bugyal": ["greenClouds", "snowField", "grazing", "woodenHut"],
  brahmatal: ["snowPeak", "lakeTrees", "tallPines", "snowRanges"],
  "deoriatal-chandrashila": ["sunriseSummit", "tungnathSunset", "woodenHut", "lakeTrees"],
  "har-ki-dun": ["harKiDun", "valleyBetween", "mistForest", "snowValley"],
  "hampta-pass": ["valley", "barrenRange", "greenMountain", "snowRange2"],
  "kashmir-great-lakes": ["alpineLake", "alpineLake2", "greenClouds", "leaderPortrait"],
  "rupin-pass": ["snowValley", "whitePeak", "valleyBetween", "snowRanges"],
  "buran-ghati": ["snowRange2", "blueSkyPeak", "greenMountain", "snowField"],
  "sandakphu-phalut": ["kanchenjunga", "windingRoad", "cairn", "rangeSunset"],
  "valley-of-flowers": ["flowerMeadow", "uttarakhandValley", "greenClouds", "valley"],
  goechala: ["whitePeak", "kanchenjunga", "prayerFlags", "silhouette"],
  "tarsar-marsar": ["alpineLake2", "alpineLake", "grazing", "greenMountain"],
  "phulara-ridge": ["morningLight", "greenMountain", "snowRanges", "aerialGreen"],
  "bhrigu-lake": ["blueSkyPeak", "lakeTrees", "greenClouds", "valley"],
};

export function trekCover(slug: string): PhotoKey {
  return trekPhotos[slug]?.[0] ?? "snowRanges";
}

/** Unsplash serves the image for an id at this URL (it redirects to the CDN). */
export function photoUrl(key: PhotoKey, width = 1600) {
  return `https://unsplash.com/photos/${photos[key].id}/download?w=${width}`;
}
