"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart2, Settings } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border">
      <ul className="flex items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => setActive(item.id)}
                className="relative w-full flex flex-col items-center gap-1 py-3 px-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-highlight"
                    className="absolute inset-x-2 inset-y-1 bg-accent-dim rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                />
                <span
                  className={`relative z-10 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
