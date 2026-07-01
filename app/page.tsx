"use client";

import { useState } from "react";
import {
  MapPin, Clock, Navigation, Search, X, Loader2,
} from "lucide-react";
import { getNearestBuildings } from "@/lib/data";

type NearbyBuilding = {
  id: number;
  name: string;
  category: string;
  distance: number;
  lat: number;
  lng: number;
};

export default function Home() {
  const [locating, setLocating] = useState(false);
  const [nearbyBuildings, setNearbyBuildings] = useState<NearbyBuilding[]>([]);
  const [showLostModal, setShowLostModal] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleImLost = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Your browser doesn't support location.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearby = getNearestBuildings(pos.coords.latitude, pos.coords.longitude, 3) as NearbyBuilding[];
        setNearbyBuildings(nearby);
        setLocating(false);
        setShowLostModal(true);
      },
      (err) => {
        setLocationError(`Location error: ${err.message}`);
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const openDirections = (building: NearbyBuilding) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${building.lat},${building.lng}`, "_blank");
  };

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

      {/* Hero Search + I'm Lost */}
      <div className="rounded-3xl p-6 shadow-sm space-y-4" style={{ backgroundColor: "#EAF3E7" }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#2F3A2F" }}>Find anything at UNT</h2>
          <p className="text-sm mt-1" style={{ color: "#6B756B" }}>Buildings, printers, study spots, and more</p>
        </div>

        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm">
          <Search size={20} style={{ color: "#A8CFA0" }} />
          <input
            type="text"
            placeholder="Search buildings, printers, study spots..."
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "#2F3A2F" }}
          />
        </div>

        <button
          onClick={handleImLost}
          disabled={locating}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#A8CFA0] hover:bg-white transition-all"
        >
          {locating ? (
            <>
              <Loader2 size={18} style={{ color: "#6F8F72" }} className="animate-spin" />
              <span className="text-sm font-semibold" style={{ color: "#6F8F72" }}>Finding your location...</span>
            </>
          ) : (
            <>
              <MapPin size={18} style={{ color: "#6F8F72" }} />
              <span className="text-sm font-semibold" style={{ color: "#6F8F72" }}>I'm Lost — Show me what's nearby</span>
            </>
          )}
        </button>

        {locationError && (
          <p className="text-xs text-red-400 text-center">{locationError}</p>
        )}
      </div>

      {/* Next Class */}
      <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: "#A8CFA0" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/80 mb-1">Next Class</p>
            <h2 className="text-lg font-bold text-white">Add your schedule</h2>
            <p className="text-sm text-white/80 mt-1">
              Import your PDF or add classes manually in the Planner tab
            </p>
          </div>
          <button className="bg-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-sm">
            <Navigation size={16} style={{ color: "#6F8F72" }} />
            <span className="text-sm font-semibold" style={{ color: "#6F8F72" }}>Navigate</span>
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base" style={{ color: "#2F3A2F" }}>🎯 Upcoming Events</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-2">
          <p className="text-2xl">📭</p>
          <p className="text-sm font-medium" style={{ color: "#2F3A2F" }}>No events yet</p>
          <p className="text-xs text-center" style={{ color: "#6B756B" }}>
            Events you add or import will show up here
          </p>
        </div>
      </div>

      {/* I'm Lost Modal */}
      {showLostModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 pb-8">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: "#2F3A2F" }}>📍 You are near...</h2>
              <button
                onClick={() => setShowLostModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F5F8F4" }}
              >
                <X size={16} style={{ color: "#6B756B" }} />
              </button>
            </div>

            <p className="text-sm" style={{ color: "#6B756B" }}>
              Here are the closest buildings to your current location:
            </p>

            <div className="space-y-3">
              {nearbyBuildings.map((building) => (
                <div key={building.id} className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: "#F5F8F4" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EAF3E7" }}>
                    <MapPin size={18} style={{ color: "#6F8F72" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#2F3A2F" }}>{building.name}</p>
                    <p className="text-xs" style={{ color: "#6B756B" }}>
                      {building.category} · {(building.distance * 5280).toFixed(0)} ft away
                    </p>
                  </div>
                  <button
                    onClick={() => openDirections(building)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                    style={{ backgroundColor: "#A8CFA0" }}
                  >
                    <Navigation size={12} />
                    Go
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}