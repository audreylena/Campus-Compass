"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { buildings, Building } from "@/lib/data";
import MapSearchBar from "@/components/MapSearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import BottomSheet from "@/components/BottomSheet";
import { Locate } from "lucide-react";

const CampusMap = dynamic(() => import("@/components/CampusMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: "#EAF3E7" }}
    >
      <p className="text-sm" style={{ color: "#6F8F72" }}>Loading map...</p>
    </div>
  ),
});

export default function MapPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<Building | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const filtered = useMemo(() => {
    return buildings.filter((b) => {
      const matchesQuery =
        !query ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.shortName?.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some((t) => t.includes(query.toLowerCase()));

      const matchesCategory =
        activeCategory === "all" || b.category === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Map — fills entire screen */}
      <div className="absolute inset-0 z-0">
        <CampusMap
          buildings={filtered}
          onSelect={setSelected}
          userLocation={userLocation}
        />
      </div>

      {/* Floating UI on top of map */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 space-y-3 pointer-events-none">
        <div className="pointer-events-auto">
          <MapSearchBar value={query} onChange={setQuery} />
        </div>
        <div className="pointer-events-auto">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>
      </div>

      {/* Locate Me button */}
      <button
        onClick={handleLocate}
        className="absolute bottom-8 right-4 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-white"
        style={{ backgroundColor: "white" }}
      >
        <Locate size={20} style={{ color: "#6F8F72" }} />
      </button>

      {/* Bottom Sheet */}
      <BottomSheet building={selected} onClose={() => setSelected(null)} />

    </div>
  );
}