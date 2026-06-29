"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Map", href: "/map", icon: "🗺️" },
  { label: "Planner", href: "/planner", icon: "📅" },
  { label: "Assistant", href: "/assistant", icon: "💬" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1 px-4 py-2"
            >
              <span className="text-2xl">{tab.icon}</span>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-[#00853E]" : "text-[#6E6E73]"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}