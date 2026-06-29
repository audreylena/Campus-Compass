"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { Building } from "@/lib/data";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Props = {
  buildings: Building[];
  onSelect: (building: Building) => void;
  userLocation: [number, number] | null;
};

export default function CampusMap({ buildings, onSelect, userLocation }: Props) {
  return (
    <MapContainer
      center={[33.2099, -97.1489]}
      zoom={15}
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Building markers */}
      {buildings.map((building) => (
        <Marker
          key={building.id}
          position={[building.lat, building.lng]}
          icon={icon}
          eventHandlers={{ click: () => onSelect(building) }}
        >
          <Popup>
            <p className="font-semibold">{building.name}</p>
          </Popup>
        </Marker>
      ))}

      {/* User location */}
      {userLocation && (
        <>
          <Circle
            center={userLocation}
            radius={15}
            pathOptions={{ color: "#6F8F72", fillColor: "#A8CFA0", fillOpacity: 0.8 }}
          />
          <Circle
            center={userLocation}
            radius={40}
            pathOptions={{ color: "#A8CFA0", fillColor: "#A8CFA0", fillOpacity: 0.2 }}
          />
        </>
      )}

    </MapContainer>
  );
}