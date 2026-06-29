"use client";

import { X, Clock, Navigation, Star } from "lucide-react";
import { Building } from "@/lib/data";

type Props = {
  building: Building | null;
  onClose: () => void;
};

export default function BottomSheet({ building, onClose }: Props) {
  if (!building) return null;

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${building.lat},${building.lng}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-20 bg-black/10"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-30 rounded-t-3xl shadow-2xl p-6 space-y-4"
        style={{ backgroundColor: "#FFFFFF" }}>

        {/* Handle bar */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto -mt-1" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-bold" style={{ color: "#2F3A2F" }}>
              {building.name}
            </h2>
            <span
              className="inline-block text-xs px-2 py-0.5 rounded-full mt-1"
              style={{ backgroundColor: "#EAF3E7", color: "#6F8F72" }}
            >
              {building.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F5F8F4" }}
          >
            <X size={16} style={{ color: "#6B756B" }} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm" style={{ color: "#6B756B" }}>
          {building.description}
        </p>

        {/* Hours */}
        <div className="flex items-start gap-2 p-3 rounded-2xl"
          style={{ backgroundColor: "#F5F8F4" }}>
          <Clock size={15} style={{ color: "#A8CFA0" }} className="mt-0.5 flex-shrink-0" />
          <p className="text-xs" style={{ color: "#6B756B" }}>{building.hours}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {building.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: "#EAF3E7", color: "#6F8F72" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={openInMaps}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: "#6F8F72" }}
          >
            <Navigation size={16} />
            Get Directions
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#EAF3E7" }}
          >
            <Star size={18} style={{ color: "#6F8F72" }} />
          </button>
        </div>

      </div>
    </>
  );
}