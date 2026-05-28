"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart2, href: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col h-screen bg-surface border-r border-border shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-border min-h-[73px]">
        <div className="w-8 h-8 rounded-lg bg-accent-dim border border-accent/30 flex items-center justify-center shrink-0">
          <GraduationCap size={15} className="text-accent" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-syne font-bold text-sm text-text tracking-wide whitespace-nowrap"
            >
              Learnpath
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <ul className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.id}>
              <Link href={item.href}>
                <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg group cursor-pointer">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 bg-accent-dim border border-accent/20 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={16}
                    className={`relative z-10 shrink-0 transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-muted group-hover:text-text-dim"
                    }`}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`relative z-10 font-syne text-sm whitespace-nowrap transition-colors duration-200 ${
                          isActive ? "text-accent" : "text-muted group-hover:text-text-dim"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 p-2 rounded-lg border border-border text-muted hover:text-text hover:border-accent/30 transition-all duration-200 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronLeft size={14} />
        </motion.div>
      </button>
    </motion.nav>
  );
}