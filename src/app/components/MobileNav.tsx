"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
} from "lucide-react";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    label: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border">
      <ul className="flex items-center">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                className="relative flex flex-col items-center gap-1 py-3 px-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-highlight"
                    className="absolute inset-x-2 inset-y-1 bg-accent-dim rounded-lg"
                    transition={{
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 30,
                    }}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}