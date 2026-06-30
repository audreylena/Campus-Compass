export type Building = {
  id: number;
  name: string;
  shortName?: string;
  description: string;
  category: string;
  hours: string;
  lat: number;
  lng: number;
  tags: string[];
};

export const buildings: Building[] = [
  {
    id: 1,
    name: "Willis Library",
    shortName: "WL",
    description: "Main campus library with study rooms, computer labs, and printing.",
    category: "Study",
    hours: "Mon–Thu 7am–2am, Fri 7am–8pm, Sat 10am–8pm, Sun 10am–2am",
    lat: 33.2099,
    lng: -97.1489,
    tags: ["study", "print", "computers", "library"],
  },
  {
    id: 2,
    name: "Wooten Hall",
    shortName: "WH",
    description: "Home to the College of Arts and Sciences. Houses math and science departments.",
    category: "Academic",
    hours: "Mon–Fri 8am–5pm",
    lat: 33.2111,
    lng: -97.1468,
    tags: ["academic", "math", "science", "classes"],
  },
  {
    id: 3,
    name: "Union Building",
    shortName: "UNION",
    description: "Student union with dining, lounges, student orgs, and services.",
    category: "Dining & Social",
    hours: "Mon–Fri 7am–11pm, Sat–Sun 9am–11pm",
    lat: 33.2088,
    lng: -97.1472,
    tags: ["food", "dining", "social", "study", "events"],
  },
  {
    id: 4,
    name: "Sage Hall",
    shortName: "SAGE",
    description: "College of Business building with classrooms and faculty offices.",
    category: "Academic",
    hours: "Mon–Fri 8am–6pm",
    lat: 33.2075,
    lng: -97.1461,
    tags: ["academic", "business", "classes"],
  },
  {
    id: 5,
    name: "Recreation Center",
    shortName: "REC",
    description: "Full gym, pool, basketball courts, and wellness programs.",
    category: "Recreation",
    hours: "Mon–Fri 6am–11pm, Sat–Sun 8am–9pm",
    lat: 33.2121,
    lng: -97.1502,
    tags: ["gym", "fitness", "pool", "recreation"],
  },
  {
    id: 6,
    name: "Discovery Park",
    shortName: "DP",
    description: "Engineering and technology complex. Home to CSCE, engineering, and research labs.",
    category: "Academic",
    hours: "Mon–Fri 7am–10pm, Sat 9am–5pm",
    lat: 33.2313,
    lng: -97.1654,
    tags: ["engineering", "computer science", "csce", "academic", "labs"],
  },
  {
    id: 7,
    name: "General Academic Building",
    shortName: "GAB",
    description: "Central academic building with classrooms and faculty offices across many departments.",
    category: "Academic",
    hours: "Mon–Fri 7am–10pm",
    lat: 33.2103,
    lng: -97.1478,
    tags: ["academic", "classes", "departments"],
  },
  {
    id: 8,
    name: "Chilton Hall",
    shortName: "CHIL",
    description: "Home to the College of Education and the advising center.",
    category: "Academic",
    hours: "Mon–Fri 8am–5pm",
    lat: 33.2092,
    lng: -97.1463,
    tags: ["academic", "education", "advising"],
  },
  {
    id: 9,
    name: "BLB — Business Leadership Building",
    shortName: "BLB",
    description: "Modern business school building with lecture halls and collaboration spaces.",
    category: "Academic",
    hours: "Mon–Fri 7am–9pm",
    lat: 33.2081,
    lng: -97.1455,
    tags: ["business", "academic", "classes", "blb"],
  },
  {
    id: 10,
    name: "Pohl Recreation Center Annex",
    shortName: "POHL",
    description: "Outdoor recreation fields and intramural sports facilities.",
    category: "Recreation",
    hours: "Mon–Fri 8am–8pm, Sat–Sun 9am–5pm",
    lat: 33.2135,
    lng: -97.1515,
    tags: ["recreation", "sports", "outdoor", "intramural"],
  },
];

export const tasks = [
  {
    id: 1,
    title: "CSCE 1030 Lecture",
    type: "class",
    day: "Monday",
    time: "9:30 AM",
    location: "Wooten Hall 120",
  },
  {
    id: 2,
    title: "Math Homework Due",
    type: "assignment",
    day: "Wednesday",
    time: "11:59 PM",
    location: null,
  },
  {
    id: 3,
    title: "Study Group – Willis Library",
    type: "event",
    day: "Tuesday",
    time: "3:00 PM",
    location: "Willis Library 2nd Floor",
  },
];

export function getDistanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getNearestBuildings(
  userLat: number,
  userLng: number,
  limit = 3
) {
  return buildings
    .map((b) => ({
      ...b,
      distance: getDistanceMiles(userLat, userLng, b.lat, b.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}