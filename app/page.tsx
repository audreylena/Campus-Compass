import {
  MapPin,
  Clock,
  ChevronRight,
  Bot,
  Navigation,
  Search,
  BookOpen,
  Printer,
  Utensils,
  Car,
} from "lucide-react";
import { tasks } from "@/lib/data";

const stats = [
  { label: "Classes", value: "5" },
  { label: "Events", value: "4" },
  { label: "Due Soon", value: "3" },
];

const assignments = [
  { name: "Digital Logic", progress: 80 },
  { name: "Calculus III", progress: 60 },
  { name: "Research Deliverable", progress: 95 },
];

const events = [
  { name: "HerScript Launchpad", date: "Jun 12", time: "5:00 PM", location: "Discovery Park" },
  { name: "NSBE General Meeting", date: "Jun 13", time: "6:30 PM", location: "Union 385" },
  { name: "Career Fair", date: "Jun 15", time: "10:00 AM", location: "Coliseum" },
];

const categories = [
  { label: "Study", icon: BookOpen },
  { label: "Print", icon: Printer },
  { label: "Food", icon: Utensils },
  { label: "Parking", icon: Car },
];

const aiPrompts = [
  "Where is Discovery Park?",
  "What clubs are recruiting?",
  "Show me open study rooms.",
  "What events are today?",
];

export default function Home() {
  return (
    <div className="space-y-6">

      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#2F3A2F" }}>
            Good Afternoon, Audrey 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6B756B" }}>
            Monday, June 9 · UNT Denton
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#A8CFA0] flex items-center justify-center font-bold text-white">
          A
        </div>
      </div>

      {/* Hero Search */}
      <div className="rounded-3xl p-6 shadow-sm space-y-4" style={{ backgroundColor: "#EAF3E7" }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#2F3A2F" }}>
            Find anything at UNT
          </h2>
          <p className="text-sm mt-1" style={{ color: "#6B756B" }}>
            Buildings, printers, study spots, and more
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm">
          <Search size={20} style={{ color: "#A8CFA0" }} />
          <input
            type="text"
            placeholder="Search buildings, printers, study spots..."
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "#2F3A2F" }}
          />
        </div>

        {/* I'm Lost Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#A8CFA0] hover:bg-white transition-all">
          <MapPin size={18} style={{ color: "#6F8F72" }} />
          <span className="text-sm font-semibold" style={{ color: "#6F8F72" }}>
            I'm Lost — Show me what's nearby
          </span>
        </button>

        {/* Category Chips */}
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.label}
                className="flex items-center justify-center gap-2 bg-white rounded-2xl py-2.5 px-3 shadow-sm hover:bg-[#CFE8D0] transition-all"
              >
                <Icon size={15} style={{ color: "#6F8F72" }} />
                <span className="text-xs font-medium" style={{ color: "#2F3A2F" }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold" style={{ color: "#6F8F72" }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: "#6B756B" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base" style={{ color: "#2F3A2F" }}>
            📅 Today's Schedule
          </h2>
          <ChevronRight size={18} style={{ color: "#6B756B" }} />
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#A8CFA0]" />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "#2F3A2F" }}>{task.title}</p>
                <p className="text-xs" style={{ color: "#6B756B" }}>
                  {task.time} {task.location ? `· ${task.location}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Class Navigation */}
      <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#A8CFA0" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/80 mb-1">Next Class</p>
            <h2 className="text-lg font-bold text-white">Discovery Park F285</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-white/90 text-sm">
                <Clock size={14} /> 15 min walk
              </span>
              <span className="flex items-center gap-1 text-white/90 text-sm">
                <MapPin size={14} /> Leave by 1:42 PM
              </span>
            </div>
          </div>
          <button className="bg-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
            <Navigation size={16} style={{ color: "#6F8F72" }} />
            <span className="text-sm font-semibold" style={{ color: "#6F8F72" }}>Navigate</span>
          </button>
        </div>
      </div>

      {/* Assignments */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base" style={{ color: "#2F3A2F" }}>
            📚 Assignments
          </h2>
          <ChevronRight size={18} style={{ color: "#6B756B" }} />
        </div>
        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.name}>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium" style={{ color: "#2F3A2F" }}>{a.name}</p>  
              </div>
              <div className="w-full h-2 rounded-full bg-[#EAF3E7]">
                <div
                  className="h-2 rounded-full bg-[#A8CFA0]"
                  style={{ width: `${a.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base" style={{ color: "#2F3A2F" }}>
            🎯 Upcoming Events
          </h2>
          <ChevronRight size={18} style={{ color: "#6B756B" }} />
        </div>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.name} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ backgroundColor: "#F5F8F4" }}>
              <div className="text-center min-w-[40px]">
                <p className="text-xs font-bold" style={{ color: "#6F8F72" }}>{event.date}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "#2F3A2F" }}>{event.name}</p>
                <p className="text-xs" style={{ color: "#6B756B" }}>{event.time} · {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus AI */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bot size={20} style={{ color: "#6F8F72" }} />
          <h2 className="font-semibold text-base" style={{ color: "#2F3A2F" }}>
            Campus AI
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {aiPrompts.map((prompt) => (
            <button
              key={prompt}
              className="text-xs px-3 py-2 rounded-xl border border-[#CFE8D0] hover:bg-[#EAF3E7] transition-all"
              style={{ color: "#6F8F72" }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}