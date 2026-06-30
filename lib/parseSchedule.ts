export type ParsedCourse = {
  name: string;
  type: string;
  days: string[];
  startTime: string;
  endTime: string;
  room: string;
};

type RawCourse = {
  name: string;
  type: string;
  timeRange: string;
  startTime: string;
  endTime: string;
  room: string;
  count: number;
};

function guessDays(count: number, startTime: string): string[] {
  // Single occurrence — could be Mon, Wed, or Fri
  if (count === 1) return ["Mon"];
  // Two occurrences — Tue/Thu pattern is most common at UNT
  if (count === 2) return ["Tue", "Thu"];
  // Three occurrences — Mon/Wed/Fri
  if (count === 3) return ["Mon", "Wed", "Fri"];
  if (count >= 4) return ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return ["TBD"];
}

export function parseSchedulePDF(text: string): ParsedCourse[] {
  const rawCourses = new Map<string, RawCourse>();

  const pattern = /([A-Z]{2,4}\s\d{4})\s+(Credit|Recitation|Lab|Lecture|Seminar|Studio)\s+([\d:]+[AP]M-[\d:]+[AP]M)\s+Room:\s+([A-Za-z0-9\s]+?)(?=\s+[A-Z]{2,4}\s\d{4}|\s+\d+:\d+[AP]M\s|$)/g;

  let match;
  while ((match = pattern.exec(text)) !== null) {
    const name = match[1].trim();
    const type = match[2].trim();
    const timeRange = match[3].trim();
    const room = match[4].trim();
    const [startTime, endTime] = timeRange.split("-");

    // Use name+type+time as key to count duplicates
    const key = `${name}-${type}-${timeRange}`;

    if (rawCourses.has(key)) {
      rawCourses.get(key)!.count += 1;
    } else {
      rawCourses.set(key, {
        name,
        type,
        timeRange,
        startTime: startTime || "",
        endTime: endTime || "",
        room,
        count: 1,
      });
    }
  }

  const courses: ParsedCourse[] = [];

  for (const raw of rawCourses.values()) {
    courses.push({
      name: raw.name,
      type: raw.type,
      days: guessDays(raw.count, raw.startTime),
      startTime: raw.startTime,
      endTime: raw.endTime,
      room: raw.room,
    });
  }

  return courses;
}