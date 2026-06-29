"use client";

import {
  BookOpen,
  Utensils,
  Printer,
  Bus,
  Car,
  Bath,
  HeartPulse,
  BatteryCharging,
  Star,
  Library,
} from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
};

export const categories: Category[] = [
  { id: "all", label: "All", icon: Library },
  { id: "Academic", label: "Academic", icon: BookOpen },
  { id: "Dining & Social", label: "Dining", icon: Utensils },
  { id: "Study", label: "Study", icon: BookOpen },
  { id: "Print", label: "Print", icon: Printer },
  { id: "Recreation", label: "Recreation", icon: Star },
  { id: "Parking", label: "Parking", icon: Car },
  { id: "Bus", label: "Bus Stop", icon: Bus },
  { id: "Health", label: "Health", icon: HeartPulse },
  { id: "Charging", label: "Charging", icon: BatteryCharging },
];

type Props = {
  active: string;
  onChange: (id: string) => void;
};

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-sm border ${
              isActive
                ? "border-[#6F8F72] text-white"
                : "bg-white/90 backdrop-blur-md border-white text-[#2F3A2F] hover:bg-[#EAF3E7]"
            }`}
            style={isActive ? { backgroundColor: "#6F8F72" } : {}}
          >
            <Icon size={13} />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}