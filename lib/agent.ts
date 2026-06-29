import { buildings, tasks } from "./data";

type AgentResponse = {
  answer: string;
  buildings?: typeof buildings;
};

export function runAgent(message: string): AgentResponse {
  const msg = message.toLowerCase().trim();

  // --- Building search ---
  if (
    msg.includes("where is") ||
    msg.includes("find") ||
    msg.includes("locate") ||
    msg.includes("how do i get to") ||
    msg.includes("directions to")
  ) {
    const match = buildings.find(
      (b) =>
        msg.includes(b.name.toLowerCase()) ||
        (b.shortName && msg.includes(b.shortName.toLowerCase())) ||
        b.tags.some((t) => msg.includes(t))
    );

    if (match) {
      return {
        answer: `${match.name} is located on UNT campus. ${match.description} Hours: ${match.hours}.`,
        buildings: [match],
      };
    }
  }

  // --- Study spots ---
  if (msg.includes("study") || msg.includes("where can i study")) {
    const spots = buildings.filter((b) => b.tags.includes("study"));
    return {
      answer: `Here are some great study spots on campus: ${spots.map((s) => s.name).join(", ")}.`,
      buildings: spots,
    };
  }

  // --- Printing ---
  if (msg.includes("print") || msg.includes("printer")) {
    const spots = buildings.filter((b) => b.tags.includes("print"));
    return {
      answer: `You can print at: ${spots.map((s) => s.name).join(", ")}. Willis Library has the most printers on campus.`,
      buildings: spots,
    };
  }

  // --- Food / Dining ---
  if (
    msg.includes("food") ||
    msg.includes("eat") ||
    msg.includes("dining") ||
    msg.includes("hungry")
  ) {
    const spots = buildings.filter(
      (b) => b.tags.includes("dining") || b.tags.includes("food")
    );
    return {
      answer: `Here are dining options on campus: ${spots.map((s) => s.name).join(", ")}.`,
      buildings: spots,
    };
  }

  // --- Schedule ---
  if (
    msg.includes("schedule") ||
    msg.includes("today") ||
    msg.includes("class") ||
    msg.includes("what do i have")
  ) {
    const todayTasks = tasks.filter((t) => t.type === "class");
    if (todayTasks.length === 0) {
      return { answer: "You have no classes scheduled today. Enjoy the break!" };
    }
    const list = todayTasks
      .map((t) => `${t.title} at ${t.time}${t.location ? ` in ${t.location}` : ""}`)
      .join(", ");
    return { answer: `Here are your classes: ${list}.` };
  }

  // --- Assignments ---
  if (
    msg.includes("assignment") ||
    msg.includes("due") ||
    msg.includes("homework")
  ) {
    const assignments = tasks.filter((t) => t.type === "assignment");
    if (assignments.length === 0) {
      return { answer: "You have no assignments due soon. You're all caught up!" };
    }
    const list = assignments
      .map((t) => `${t.title} on ${t.day} at ${t.time}`)
      .join(", ");
    return { answer: `Your upcoming assignments: ${list}.` };
  }

  // --- Gym / Recreation ---
  if (
    msg.includes("gym") ||
    msg.includes("workout") ||
    msg.includes("fitness") ||
    msg.includes("pool")
  ) {
    const rec = buildings.find((b) => b.tags.includes("gym"));
    if (rec) {
      return {
        answer: `The ${rec.name} is your go-to spot. ${rec.description} Hours: ${rec.hours}.`,
        buildings: [rec],
      };
    }
  }

  // --- I'm lost ---
  if (msg.includes("lost") || msg.includes("confused") || msg.includes("help me")) {
    return {
      answer: `No worries! Go to the Map tab and tap "I'm Lost" — it will show nearby buildings based on your location. You can also search by name or abbreviation like "BLB", "Willis", or "GAB".`,
    };
  }

  // --- Fallback ---
  return {
    answer: `I'm not sure about that yet! Try asking things like "Where is Willis Library?", "Where can I study?", "Where can I print?", or "What classes do I have today?"`,
  };
}