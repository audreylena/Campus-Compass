"use client";

import { useState } from "react";
import { Clock, MapPin, Plus, BookOpen, CheckCircle, Upload, X, Loader2 } from "lucide-react";

type Course = {
  id: number;
  name: string;
  time: string;
  days: string[];
  room: string;
  color: string;
};

type ParsedCourse = {
  name: string;
  type: string;
  days: string[];
  startTime: string;
  endTime: string;
  room: string;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const colors = ["#A8CFA0", "#CFE8D0", "#6F8F72", "#B8E6C1", "#8FBC8F"];
const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PlannerPage() {
  const [classes, setClasses] = useState<Course[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imported, setImported] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formRoom, setFormRoom] = useState("");
  const [formDays, setFormDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setFormDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAddClass = () => {
    if (!formName.trim() || !formTime.trim() || formDays.length === 0) return;

    const newClass: Course = {
      id: Date.now(),
      name: formName.trim(),
      time: formTime.trim(),
      days: formDays,
      room: formRoom.trim() || "TBD",
      color: colors[classes.length % colors.length],
    };

    setClasses((prev) => [...prev, newClass]);
    setFormName("");
    setFormTime("");
    setFormRoom("");
    setFormDays([]);
    setShowAddModal(false);
  };

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

  const removeClass = (id: number) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
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
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: "#A8CFA0" }}
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* PDF Import */}
      <div
        className="rounded-2xl p-5 shadow-sm"
        style={{ backgroundColor: imported ? "#EAF3E7" : "#FFFFFF" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Upload size={18} style={{ color: "#6F8F72" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#2F3A2F" }}>Import from myUNT</h2>
          {imported && (
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "#A8CFA0", color: "white" }}>
              ✓ Imported
            </span>
          )}
        </div>

        <p className="text-xs mb-4" style={{ color: "#6B756B" }}>
          Download your weekly schedule PDF from my.unt.edu and upload it here.
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
          <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>

        {error && (
          <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-50">
            <X size={14} className="text-red-400" />
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}
      </div>

      {/* Weekly View */}
      {classes.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "#2F3A2F" }}>This Week</h2>
          <div className="grid grid-cols-5 gap-2">
            {days.map((day) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium" style={{ color: "#6B756B" }}>{day}</p>
                <div className="w-full space-y-1">
                  {classes.filter((c) => c.days.includes(day)).map((c) => (
                    <div key={c.id} className="w-full rounded-lg py-1 px-1 text-center" style={{ backgroundColor: c.color }}>
                      <p className="text-xs font-medium text-white leading-tight">{c.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Classes */}
      <div>
        <h2 className="text-base font-semibold mb-3" style={{ color: "#2F3A2F" }}>📚 My Classes</h2>

        {classes.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center gap-2">
            <p className="text-2xl">📭</p>
            <p className="text-sm font-medium" style={{ color: "#2F3A2F" }}>No classes yet</p>
            <p className="text-xs" style={{ color: "#6B756B" }}>Tap Add or import your PDF to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {classes.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.color }}>
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
                      <span key={d} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EAF3E7", color: "#6F8F72" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => removeClass(c.id)}>
                  <X size={16} style={{ color: "#6B756B" }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 pb-8">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: "#2F3A2F" }}>Add a Class</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F5F8F4" }}
              >
                <X size={16} style={{ color: "#6B756B" }} />
              </button>
            </div>

            {/* Course Name */}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6B756B" }}>Course Name</label>
              <input
                type="text"
                placeholder="e.g. CSCE 2100"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border border-[#EAF3E7] focus:border-[#A8CFA0]"
                style={{ color: "#2F3A2F" }}
              />
            </div>

            {/* Time */}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6B756B" }}>Start Time</label>
              <input
                type="text"
                placeholder="e.g. 9:30 AM"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border border-[#EAF3E7] focus:border-[#A8CFA0]"
                style={{ color: "#2F3A2F" }}
              />
            </div>

            {/* Room */}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6B756B" }}>Room</label>
              <input
                type="text"
                placeholder="e.g. Wooten 120"
                value={formRoom}
                onChange={(e) => setFormRoom(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none border border-[#EAF3E7] focus:border-[#A8CFA0]"
                style={{ color: "#2F3A2F" }}
              />
            </div>

            {/* Days */}
            <div>
              <label className="text-xs font-medium mb-2 block" style={{ color: "#6B756B" }}>Days</label>
              <div className="flex gap-2 flex-wrap">
                {dayOptions.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                    style={{
                      backgroundColor: formDays.includes(day) ? "#6F8F72" : "#F5F8F4",
                      color: formDays.includes(day) ? "white" : "#6B756B",
                      borderColor: formDays.includes(day) ? "#6F8F72" : "#EAF3E7",
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddClass}
              disabled={!formName.trim() || !formTime.trim() || formDays.length === 0}
              className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: formName && formTime && formDays.length > 0 ? "#A8CFA0" : "#CFE8D0" }}
            >
              Add Class
            </button>

          </div>
        </div>
      )}

    </div>
  );
}