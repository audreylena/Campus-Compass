"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function MapSearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-white">
      <Search size={18} style={{ color: "#6F8F72" }} />
      <input
        type="text"
        placeholder="Search buildings, printers, study spots..."
        className="flex-1 text-sm bg-transparent outline-none"
        style={{ color: "#2F3A2F" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-200"
        >
          <X size={12} style={{ color: "#6B756B" }} />
        </button>
      )}
    </div>
  );
}