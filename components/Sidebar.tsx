"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  Users,
  Map,
  Bot,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "My Classes", href: "/planner", icon: BookOpen },
  { label: "Assignments", href: "/planner", icon: ClipboardList },
  { label: "Events", href: "/planner", icon: Calendar },
  { label: "Organizations", href: "/planner", icon: Users },
  { label: "Campus Map", href: "/map", icon: Map },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen fixed top-0 left-0 z-40"
      style={{ backgroundColor: "#EAF3E7" }}>

      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#CFE8D0]">
        <p className="text-xs font-medium" style={{ color: "#6B756B" }}>
          Navigate. Organize. Thrive.
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#A8CFA0] text-[#2F3A2F]"
                  : "text-[#6B756B] hover:bg-[#CFE8D0] hover:text-[#2F3A2F]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-6 py-5 border-t border-[#CFE8D0] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#A8CFA0] flex items-center justify-center text-sm font-bold text-white">
          A
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#2F3A2F" }}>Audrey</p>
          <p className="text-xs" style={{ color: "#6B756B" }}>UNT Student</p>
        </div>
      </div>
    </aside>
  );
}