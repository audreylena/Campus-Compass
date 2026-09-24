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
  // Academic Buildings
  { id: 1, name: "Willis Library", shortName: "WL", description: "Main campus library with study rooms, computer labs, and printing.", category: "Study", hours: "Mon–Thu 7am–2am, Fri 7am–8pm, Sat 10am–8pm, Sun 10am–2am", lat: 33.2099, lng: -97.1489, tags: ["study", "print", "computers", "library"] },
  { id: 2, name: "Wooten Hall", shortName: "WH", description: "Home to the College of Arts and Sciences.", category: "Academic", hours: "Mon–Fri 8am–5pm", lat: 33.2111, lng: -97.1468, tags: ["academic", "math", "science", "classes"] },
  { id: 3, name: "General Academic Building", shortName: "GAB", description: "Central academic building with classrooms across many departments.", category: "Academic", hours: "Mon–Fri 7am–10pm", lat: 33.2103, lng: -97.1478, tags: ["academic", "classes", "gab"] },
  { id: 4, name: "Chilton Hall", shortName: "CHIL", description: "Home to the College of Education and advising center.", category: "Academic", hours: "Mon–Fri 8am–5pm", lat: 33.2092, lng: -97.1463, tags: ["academic", "education", "advising"] },
  { id: 5, name: "Business Leadership Building", shortName: "BLB", description: "Modern business school with lecture halls and collaboration spaces.", category: "Academic", hours: "Mon–Fri 7am–9pm", lat: 33.2081, lng: -97.1455, tags: ["business", "academic", "classes", "blb"] },
  { id: 6, name: "Sage Hall", shortName: "SAGE", description: "College of Business building with classrooms and faculty offices.", category: "Academic", hours: "Mon–Fri 8am–6pm", lat: 33.2075, lng: -97.1461, tags: ["academic", "business", "classes", "sage"] },
  { id: 7, name: "Discovery Park", shortName: "DP", description: "Engineering and technology complex. Home to CSCE, engineering, and research labs.", category: "Academic", hours: "Mon–Fri 7am–10pm, Sat 9am–5pm", lat: 33.2313, lng: -97.1654, tags: ["engineering", "computer science", "csce", "academic", "labs", "discovery park"] },
  { id: 8, name: "Sycamore Hall", shortName: "SYCA", description: "Houses the College of Music and performing arts spaces.", category: "Academic", hours: "Mon–Fri 8am–8pm", lat: 33.2108, lng: -97.1495, tags: ["academic", "music", "arts", "classes"] },
  { id: 9, name: "Matthews Hall", shortName: "MATH", description: "Houses the College of Information and various classrooms.", category: "Academic", hours: "Mon–Fri 8am–6pm", lat: 33.2095, lng: -97.1472, tags: ["academic", "information", "classes"] },
  { id: 10, name: "Environmental Education Science Building", shortName: "EESAT", description: "Science labs and classrooms for environmental and science programs.", category: "Academic", hours: "Mon–Fri 7am–9pm", lat: 33.2088, lng: -97.1445, tags: ["academic", "science", "labs", "classes"] },

  // Dining
  { id: 11, name: "Union Building", shortName: "UNION", description: "Student union with dining, lounges, and student org offices.", category: "Dining & Social", hours: "Mon–Fri 7am–11pm, Sat–Sun 9am–11pm", lat: 33.2088, lng: -97.1472, tags: ["food", "dining", "social", "study", "events", "union"] },
  { id: 12, name: "Kerr Hall Dining", shortName: "KERR", description: "All-you-can-eat dining hall inside Kerr Hall residence.", category: "Dining & Social", hours: "Mon–Fri 7am–9pm, Sat–Sun 9am–8pm", lat: 33.2115, lng: -97.1510, tags: ["food", "dining", "eat", "meal plan"] },
  { id: 13, name: "Mean Greens Cafe", shortName: "MG", description: "UNT's award-winning fully vegan dining hall.", category: "Dining & Social", hours: "Mon–Fri 11am–8pm", lat: 33.2101, lng: -97.1498, tags: ["food", "dining", "vegan", "eat"] },
  { id: 14, name: "Pohl Recreation Center", shortName: "POHL", description: "Dining and social space near the recreation fields.", category: "Dining & Social", hours: "Mon–Fri 8am–8pm", lat: 33.2135, lng: -97.1515, tags: ["food", "dining", "social"] },

  // Recreation
  { id: 15, name: "Recreation Center", shortName: "REC", description: "Full gym, pool, basketball courts, and wellness programs.", category: "Recreation", hours: "Mon–Fri 6am–11pm, Sat–Sun 8am–9pm", lat: 33.2121, lng: -97.1502, tags: ["gym", "fitness", "pool", "recreation", "workout"] },

  // Study Spots
  { id: 16, name: "Toulouse Graduate School", shortName: "TOUL", description: "Graduate school offices with quiet study lounges.", category: "Study", hours: "Mon–Fri 8am–5pm", lat: 33.2097, lng: -97.1483, tags: ["study", "graduate", "quiet"] },

  // Parking
  { id: 17, name: "Parking Garage A", shortName: "PGA", description: "Main student parking garage near the Union.", category: "Parking", hours: "Open 24/7", lat: 33.2079, lng: -97.1468, tags: ["parking", "car", "garage"] },
  { id: 18, name: "Parking Garage B", shortName: "PGB", description: "Parking garage near the business buildings.", category: "Parking", hours: "Open 24/7", lat: 33.2069, lng: -97.1452, tags: ["parking", "car", "garage"] },
  { id: 19, name: "Parking Lot 53", shortName: "LOT53", description: "Surface parking lot near Discovery Park.", category: "Parking", hours: "Open 24/7", lat: 33.2298, lng: -97.1641, tags: ["parking", "car", "lot"] },

  // Bus Stops
  { id: 20, name: "Union Circle Bus Stop", shortName: "BUS1", description: "Main UNT campus bus stop at the Union circle.", category: "Bus Stop", hours: "Follows UNT shuttle schedule", lat: 33.2086, lng: -97.1476, tags: ["bus", "transit", "shuttle", "transport"] },
  { id: 21, name: "Willis Library Bus Stop", shortName: "BUS2", description: "Bus stop directly in front of Willis Library.", category: "Bus Stop", hours: "Follows UNT shuttle schedule", lat: 33.2102, lng: -97.1492, tags: ["bus", "transit", "shuttle", "transport"] },
  { id: 22, name: "Discovery Park Bus Stop", shortName: "BUS3", description: "Bus stop serving the Discovery Park engineering complex.", category: "Bus Stop", hours: "Follows UNT shuttle schedule", lat: 33.2308, lng: -97.1658, tags: ["bus", "transit", "shuttle", "transport"] },

  // Health
  { id: 23, name: "Student Health and Wellness Center", shortName: "SHWC", description: "Medical services, counseling, and wellness resources for students.", category: "Health", hours: "Mon–Fri 8am–5pm", lat: 33.2094, lng: -97.1507, tags: ["health", "medical", "counseling", "wellness"] },

  // Print
  { id: 24, name: "Eagle Student Services Center", shortName: "ESSC", description: "Student services hub with printing, ID services, and financial aid.", category: "Study", hours: "Mon–Fri 8am–5pm", lat: 33.2083, lng: -97.1479, tags: ["print", "services", "financial aid", "id"] },
];

export const tasks = [
  { id: 1, title: "CSCE 1030 Lecture", type: "class", day: "Monday", time: "9:30 AM", location: "Wooten Hall 120" },
  { id: 2, title: "Math Homework Due", type: "assignment", day: "Wednesday", time: "11:59 PM", location: null },
  { id: 3, title: "Study Group – Willis Library", type: "event", day: "Tuesday", time: "3:00 PM", location: "Willis Library 2nd Floor" },
];

export function getDistanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestBuildings(userLat: number, userLng: number, limit = 3) {
  return buildings
    .map((b) => ({ ...b, distance: getDistanceMiles(userLat, userLng, b.lat, b.lng) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}