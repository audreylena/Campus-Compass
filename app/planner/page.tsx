"use client";

import { useState } from "react";
import { Clock, MapPin, Plus, BookOpen, CheckCircle, Upload, X, Loader2 } from "lucide-react";

type ParsedCourse = {
  name: string;
  type: string;
  days: string[];
  startTime: string;
  endTime: string;
  room: string;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const defaultClasses = [
  { id: 1, name: "CSCE 2100", time: "9:30 AM", days: ["Mon", "Wed", "Fri"], room: "Wooten 120", color: "#A8CFA0" },
  { id: 2, name: "Calculus III", time: "11:00 AM", days: ["Tue", "Thu"], room: "GAB 105", color: "#CFE8D0" },
  { id: 3, name: "Digital Logic", time: "2:00 PM", days: ["Mon", "Wed"], room: "Discovery Park F285", color: "#6F8F72" },
];

const assignments = [
  { id: 1, name: "Digital Logic Lab Report", due: "Jun 10", done: false },
  { id: 2, name: "Calculus III Problem Set", due: "Jun 12", done: false },
  { id: 3, name: "Research Deliverable Draft", due: "Jun 15", done: true },
];

const colors = ["#A8CFA0", "#CFE8D0", "#6F8F72", "#B8E6C1", "#8FBC8F"];

export default function PlannerPage() {
  const [classes, setClasses] = useState(defaultClasses);
  const [parsedCourses, setParsedCourses] = useState<ParsedCourse[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imported, setImported] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/parse-schedule", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to parse schedule");
        return;
      }

      setParsedCourses(data.courses);

      // Convert parsed courses to planner format
      const newClasses = data.courses.map((c: ParsedCourse, i: number) => ({
        id: Date.now() + i,
        name: c.name,
        time: c.startTime,
        days: c.days,
        room: c.room,
        color: colors[i % colors.length],
      }));

      setClasses(newClasses);
      setImported(true);

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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

      {/* PDF Import Card */}
      <div
        className="rounded-2xl p-5 shadow-sm"
        style={{ backgroundColor: imported ? "#EAF3E7" : "#FFFFFF" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Upload size={18} style={{ color: "#6F8F72" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#2F3A2F" }}>
            Import from myUNT
          </h2>
          {imported && (
            <span
              className="text-xs px-2 py-0.5 rounded-full ml-auto"
              style={{ backgroundColor: "#A8CFA0", color: "white" }}
            >
              ✓ Imported
            </span>
          )}
        </div>

        <p className="text-xs mb-4" style={{ color: "#6B756B" }}>
          Download your weekly schedule PDF from my.unt.edu and upload it here to auto-fill your planner.
        </p>

        <label className="block">
          <div
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer hover:bg-[#F5F8F4] transition-all"
            style={{ borderColor: "#A8CFA0" }}
          >
            {uploading ? (
              <>
                <Loader2 size={16} style={{ color: "#6F8F72" }} className="animate-spin" />
                <span className="text-sm" style={{ color: "#6F8F72" }}>Parsing your schedule...</span>
              </>
            ) : (
              <>
                <Upload size={16} style={{ color: "#6F8F72" }} />
                <span className="text-sm font-medium" style={{ color: "#6F8F72" }}>
                  {imported ? "Upload a new schedule" : "Upload schedule PDF"}
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>

        {error && (
          <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-50">
            <X size={14} className="text-red-400" />
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}
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