import { Calendar, Clock, MapPin, Plus, BookOpen, CheckCircle } from "lucide-react";
import { tasks } from "@/lib/data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const classes = [
  { id: 1, name: "CSCE 2100", time: "9:30 AM", days: ["Mon", "Wed", "Fri"], room: "Wooten 120", color: "#A8CFA0" },
  { id: 2, name: "Calculus III", time: "11:00 AM", days: ["Tue", "Thu"], room: "GAB 105", color: "#CFE8D0" },
  { id: 3, name: "Digital Logic", time: "2:00 PM", days: ["Mon", "Wed"], room: "Discovery Park F285", color: "#6F8F72" },
];

const assignments = [
  { id: 1, name: "Digital Logic Lab Report", due: "Jun 10", done: false },
  { id: 2, name: "Calculus III Problem Set", due: "Jun 12", done: false },
  { id: 3, name: "Research Deliverable Draft", due: "Jun 15", done: true },
];

export default function PlannerPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#2F3A2F" }}>My Planner</h1>
          <p className="text-sm mt-1" style={{ color: "#6B756B" }}>Stay on top of your week</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: "#A8CFA0" }}
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Weekly View */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#2F3A2F" }}>This Week</h2>
        <div className="grid grid-cols-5 gap-2">
          {days.map((day) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium" style={{ color: "#6B756B" }}>{day}</p>
              <div className="w-full space-y-1">
                {classes
                  .filter((c) => c.days.includes(day))
                  .map((c) => (
                    <div
                      key={c.id}
                      className="w-full rounded-lg py-1 px-1 text-center"
                      style={{ backgroundColor: c.color }}
                    >
                      <p className="text-xs font-medium text-white leading-tight">{c.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Classes */}
      <div>
        <h2 className="text-base font-semibold mb-3" style={{ color: "#2F3A2F" }}>📚 My Classes</h2>
        <div className="space-y-3">
          {classes.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: c.color }}
              >
                <BookOpen size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "#2F3A2F" }}>{c.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={11} style={{ color: "#A8CFA0" }} />
                  <p className="text-xs" style={{ color: "#6B756B" }}>{c.time}</p>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} style={{ color: "#A8CFA0" }} />
                  <p className="text-xs" style={{ color: "#6B756B" }}>{c.room}</p>
                </div>
                <div className="flex gap-1 mt-2">
                  {c.days.map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#EAF3E7", color: "#6F8F72" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments */}
      <div>
        <h2 className="text-base font-semibold mb-3" style={{ color: "#2F3A2F" }}>📝 Assignments</h2>
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <CheckCircle
                size={22}
                style={{ color: a.done ? "#A8CFA0" : "#CFE8D0" }}
              />
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{
                    color: a.done ? "#6B756B" : "#2F3A2F",
                    textDecoration: a.done ? "line-through" : "none",
                  }}
                >
                  {a.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6B756B" }}>Due {a.due}</p>
              </div>
              {!a.done && (
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#EAF3E7", color: "#6F8F72" }}
                >
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}