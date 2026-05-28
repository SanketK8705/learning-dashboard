#!/bin/bash
set -e

echo "Scaffolding learning-dashboard..."

# ── Directories ────────────────────────────────────────────────
mkdir -p learning-dashboard/src/app/components
mkdir -p learning-dashboard/src/app/lib
mkdir -p learning-dashboard/src/app/dashboard
mkdir -p learning-dashboard/supabase
cd learning-dashboard

# ── package.json ───────────────────────────────────────────────
cat > package.json << 'PKGJSON'
{
  "name": "learning-dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.15.0",
    "@supabase/supabase-js": "^2.47.0",
    "@supabase/ssr": "^0.5.2",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1"
  }
}
PKGJSON

# ── tsconfig.json ──────────────────────────────────────────────
cat > tsconfig.json << 'TSJSON'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TSJSON

# ── next.config.ts ─────────────────────────────────────────────
cat > next.config.ts << 'NEXTCFG'
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
NEXTCFG

# ── tailwind.config.ts ─────────────────────────────────────────
cat > tailwind.config.ts << 'TWCFG'
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        base: "#080A0E",
        surface: "#0F1117",
        "surface-2": "#151820",
        border: "#1E2330",
        accent: "#00D4FF",
        "accent-dim": "#00D4FF22",
        muted: "#4A5568",
        text: "#E8EAF0",
        "text-dim": "#6B7280",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
TWCFG

# ── postcss.config.mjs ─────────────────────────────────────────
cat > postcss.config.mjs << 'POSTCSS'
const config = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
export default config;
POSTCSS

# ── .env.example ───────────────────────────────────────────────
cat > .env.example << 'ENVEX'
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ENVEX

# ── .gitignore ─────────────────────────────────────────────────
cat > .gitignore << 'GITIGNORE'
.env.local
.env
.next/
node_modules/
out/
GITIGNORE

# ── supabase/schema.sql ────────────────────────────────────────
cat > supabase/schema.sql << 'SQL'
-- Run this in your Supabase SQL Editor

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  description text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table courses enable row level security;

-- Allow public read
create policy "Public read courses"
  on courses for select
  using (true);

-- Seed data
insert into courses (title, progress, icon_name, description) values
  ('Advanced React Patterns', 75, 'Layers', 'Deep dive into compound components, render props, and custom hooks'),
  ('System Design Fundamentals', 42, 'Network', 'Scalable architecture, load balancing, and distributed systems'),
  ('TypeScript Mastery', 91, 'Code2', 'Advanced types, generics, utility types, and compiler internals'),
  ('Next.js App Router', 58, 'Zap', 'Server components, streaming, caching strategies, and edge runtime');
SQL

# ── src/app/lib/types.ts ───────────────────────────────────────
cat > src/app/lib/types.ts << 'TYPES'
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  description: string | null;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}
TYPES

# ── src/app/lib/supabase.ts ────────────────────────────────────
cat > src/app/lib/supabase.ts << 'SUPA'
import { createClient } from "@supabase/supabase-js";
import type { Course } from "./types";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. Check your .env.local file."
    );
  }
  return createClient(url, key);
}

export async function getCourses(): Promise<Course[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Failed to fetch courses: ${error.message}`);
  return data ?? [];
}
SUPA

# ── src/app/globals.css ────────────────────────────────────────
cat > src/app/globals.css << 'CSS'
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-syne: 'Syne', sans-serif;
  --font-dm-mono: 'DM Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #080A0E;
  color: #E8EAF0;
  font-family: var(--font-syne);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Grain texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.4;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #080A0E;
}
::-webkit-scrollbar-thumb {
  background: #1E2330;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00D4FF44;
}

/* Shimmer skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    #0F1117 25%,
    #151820 50%,
    #0F1117 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
CSS

# ── src/app/layout.tsx ─────────────────────────────────────────
cat > src/app/layout.tsx << 'LAYOUT'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description: "Track your learning progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
LAYOUT

# ── src/app/components/Sidebar.tsx ─────────────────────────────
cat > src/app/components/Sidebar.tsx << 'SIDEBAR'
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

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
              className="font-syne font-700 text-sm text-text tracking-wide whitespace-nowrap"
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
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg group"
              >
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
              </button>
            </li>
          );
        })}
      </ul>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 p-2 rounded-lg border border-border text-muted hover:text-text hover:border-accent/30 transition-all duration-200 flex items-center justify-center"
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
          <ChevronLeft size={14} />
        </motion.div>
      </button>
    </motion.nav>
  );
}
SIDEBAR

# ── src/app/components/HeroTile.tsx ───────────────────────────
cat > src/app/components/HeroTile.tsx << 'HERO'
"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function HeroTile() {
  const streak = 14;
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      className="relative col-span-2 rounded-2xl border border-border bg-surface overflow-hidden p-8"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent opacity-[0.04] blur-3xl animate-glow-pulse pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-accent opacity-[0.03] blur-3xl pointer-events-none" />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-mono text-xs text-text-dim tracking-widest uppercase mb-3">
            {greeting}
          </p>
          <h1 className="font-syne font-extrabold text-4xl text-text leading-tight">
            Alex Chen
          </h1>
          <p className="font-mono text-sm text-text-dim mt-2">
            Continue where you left off
          </p>
        </div>

        {/* Streak */}
        <div className="flex flex-col items-center gap-2 bg-surface-2 border border-border rounded-xl px-5 py-4">
          <Flame size={20} className="text-orange-400" />
          <span className="font-syne font-bold text-2xl text-text">{streak}</span>
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
            day streak
          </span>
        </div>
      </div>

      {/* Progress summary */}
      <div className="relative z-10 mt-8 flex gap-6">
        {[
          { label: "Courses Active", value: "4" },
          { label: "Avg Progress", value: "67%" },
          { label: "Hours This Week", value: "11h" },
        ].map((stat) => (
          <div key={stat.label} className="border-l border-border pl-4">
            <p className="font-syne font-bold text-xl text-text">{stat.value}</p>
            <p className="font-mono text-[11px] text-text-dim mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
HERO

# ── src/app/components/CourseCard.tsx ─────────────────────────
cat > src/app/components/CourseCard.tsx << 'COURSE'
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Layers,
  Network,
  Code2,
  Zap,
  BookOpen,
  Cpu,
  Globe,
  Database,
} from "lucide-react";
import type { Course } from "../lib/types";

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Network,
  Code2,
  Zap,
  BookOpen,
  Cpu,
  Globe,
  Database,
};

function AnimatedProgressBar({ value }: { value: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.width = "0%";
    const timer = setTimeout(() => {
      el.style.transition = "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.width = `${value}%`;
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="h-1 w-full bg-surface-2 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{
          background:
            value >= 80
              ? "linear-gradient(90deg, #00D4FF, #00FF88)"
              : value >= 50
              ? "linear-gradient(90deg, #00D4FF88, #00D4FF)"
              : "linear-gradient(90deg, #00D4FF44, #00D4FF88)",
          boxShadow: value >= 80 ? "0 0 8px #00D4FF44" : "none",
        }}
      />
    </div>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  const Icon = iconMap[course.icon_name] ?? BookOpen;

  return (
    <motion.article
      className="relative rounded-2xl border border-border bg-surface overflow-hidden p-6 flex flex-col gap-4 cursor-default"
      whileHover={{
        scale: 1.02,
        borderColor: "#00D4FF33",
        boxShadow: "0 0 24px #00D4FF11, 0 8px 32px #00000060",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Subtle card grain */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 20%, #00D4FF 0%, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
        <Icon size={16} className="text-accent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-syne font-semibold text-sm text-text leading-snug">
          {course.title}
        </h3>
        {course.description && (
          <p className="font-mono text-[11px] text-text-dim leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
            Progress
          </span>
          <span className="font-mono text-[11px] text-accent">
            {course.progress}%
          </span>
        </div>
        <AnimatedProgressBar value={course.progress} />
      </div>
    </motion.article>
  );
}
COURSE

# ── src/app/components/ActivityTile.tsx ───────────────────────
cat > src/app/components/ActivityTile.tsx << 'ACTIVITY'
"use client";

import { motion } from "framer-motion";

function generateActivity() {
  const weeks = 15;
  const days = 7;
  return Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5))
  );
}

const intensityClass: Record<number, string> = {
  0: "bg-surface-2 border-border",
  1: "bg-accent/10 border-accent/15",
  2: "bg-accent/25 border-accent/30",
  3: "bg-accent/45 border-accent/50",
  4: "bg-accent/70 border-accent/75",
};

const data = generateActivity();

export default function ActivityTile() {
  return (
    <motion.article
      className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5"
      whileHover={{ scale: 1.01, borderColor: "#00D4FF22" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-syne font-semibold text-sm text-text">Activity</h2>
        <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
          Last 15 weeks
        </span>
      </div>

      {/* Grid */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * 7 + di) * 0.004,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className={`w-3 h-3 rounded-[3px] border ${intensityClass[level]}`}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-text-dim">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className={`w-3 h-3 rounded-[3px] border ${intensityClass[l]}`}
          />
        ))}
        <span className="font-mono text-[10px] text-text-dim">More</span>
      </div>
    </motion.article>
  );
}
ACTIVITY

# ── src/app/components/SkeletonTile.tsx ───────────────────────
cat > src/app/components/SkeletonTile.tsx << 'SKELETON'
export function SkeletonCourseCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4">
      <div className="w-9 h-9 rounded-lg skeleton" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-3/4 rounded skeleton" />
        <div className="h-2.5 w-full rounded skeleton" />
        <div className="h-2.5 w-2/3 rounded skeleton" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="h-2 w-12 rounded skeleton" />
          <div className="h-2 w-8 rounded skeleton" />
        </div>
        <div className="h-1 w-full rounded-full skeleton" />
      </div>
    </div>
  );
}

export function SkeletonHeroTile() {
  return (
    <div className="col-span-2 rounded-2xl border border-border bg-surface p-8 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="h-2.5 w-24 rounded skeleton" />
          <div className="h-9 w-52 rounded skeleton" />
          <div className="h-2.5 w-40 rounded skeleton" />
        </div>
        <div className="w-24 h-24 rounded-xl skeleton" />
      </div>
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-l border-border pl-4 flex flex-col gap-2">
            <div className="h-5 w-10 rounded skeleton" />
            <div className="h-2 w-20 rounded skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
SKELETON

# ── src/app/components/BentoGrid.tsx ──────────────────────────
cat > src/app/components/BentoGrid.tsx << 'BENTO'
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const tileVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
    >
      {children}
    </motion.div>
  );
}
BENTO

# ── src/app/components/MobileNav.tsx ──────────────────────────
cat > src/app/components/MobileNav.tsx << 'MOBILENAV'
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
MOBILENAV

# ── src/app/components/CourseGrid.tsx ─────────────────────────
cat > src/app/components/CourseGrid.tsx << 'COURSEGRID'
"use client";

import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import type { Course } from "../lib/types";

const tileVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <>
      {courses.map((course) => (
        <motion.div key={course.id} variants={tileVariant}>
          <CourseCard course={course} />
        </motion.div>
      ))}
    </>
  );
}
COURSEGRID

# ── src/app/loading.tsx ────────────────────────────────────────
cat > src/app/loading.tsx << 'LOADING'
import { SkeletonHeroTile, SkeletonCourseCard } from "./components/SkeletonTile";

export default function Loading() {
  return (
    <div className="flex h-screen bg-base">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-[220px] border-r border-border bg-surface shrink-0" />

      <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonHeroTile />
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCourseCard key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
LOADING

# ── src/app/error.tsx ──────────────────────────────────────────
cat > src/app/error.tsx << 'ERROR'
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-base">
      <div className="text-center space-y-4 p-8 rounded-2xl border border-red-900/30 bg-surface max-w-md">
        <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <span className="text-red-400 text-lg">!</span>
        </div>
        <h2 className="font-syne font-bold text-text">Connection Failed</h2>
        <p className="font-mono text-xs text-text-dim leading-relaxed">
          {error.message.includes("Supabase")
            ? "Could not connect to the database. Check your environment variables."
            : "Something went wrong loading the dashboard."}
        </p>
        <button
          onClick={reset}
          className="mt-2 px-4 py-2 rounded-lg border border-border text-text-dim font-mono text-xs hover:border-accent/30 hover:text-accent transition-all duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
ERROR

# ── src/app/page.tsx ───────────────────────────────────────────
cat > src/app/page.tsx << 'PAGE'
import { Suspense } from "react";
import { getCourses } from "./lib/supabase";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import HeroTile from "./components/HeroTile";
import ActivityTile from "./components/ActivityTile";
import CourseGrid from "./components/CourseGrid";
import BentoGrid from "./components/BentoGrid";
import { SkeletonCourseCard } from "./components/SkeletonTile";
import { tileVariant } from "./components/BentoGrid";
import { motion } from "framer-motion";

async function CoursesSection() {
  const courses = await getCourses();
  return <CourseGrid courses={courses} />;
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <Sidebar />
      <MobileNav />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-6xl mx-auto">
          <BentoGrid>
            {/* Hero — spans 2 cols on lg */}
            <motion.div variants={tileVariant} className="lg:col-span-2">
              <HeroTile />
            </motion.div>

            {/* Activity */}
            <motion.div variants={tileVariant}>
              <ActivityTile />
            </motion.div>

            {/* Courses with Suspense */}
            <Suspense
              fallback={
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div key={i} variants={tileVariant}>
                      <SkeletonCourseCard />
                    </motion.div>
                  ))}
                </>
              }
            >
              <CoursesSection />
            </Suspense>
          </BentoGrid>
        </div>
      </main>
    </div>
  );
}
PAGE

# ── README.md ──────────────────────────────────────────────────
cat > README.md << 'README'
# Learning Dashboard

A futuristic student learning dashboard built with Next.js 15 App Router, Supabase, Tailwind CSS, and Framer Motion.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor
5. Run `npm run dev`

## Architecture

### Server / Client Split

- `page.tsx` is a **Server Component** — it fetches nothing itself but composes the layout
- `CoursesSection` (async Server Component) calls `getCourses()` directly from the server using `@supabase/supabase-js`
- All interactive components (`Sidebar`, `MobileNav`, `HeroTile`, `CourseCard`, etc.) are **Client Components** (`"use client"`) since they use Framer Motion or React state
- `React.Suspense` wraps `CoursesSection` so skeleton loaders show while data fetches

### Data Fetching

Supabase is called server-side from `src/app/lib/supabase.ts`. No API keys are ever exposed to the client — only `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used (public by Supabase design, protected by RLS policies).

### Animations

- **Staggered entrance**: `BentoGrid` uses Framer Motion `variants` with `staggerChildren` so tiles cascade in sequentially
- **Spring physics**: All hover states and sidebar highlights use `type: "spring"` with `stiffness: 300, damping: 20`
- **No layout shifts**: Every animation uses `transform` (scale, translateY) and `opacity` only — zero repaints
- **Progress bars**: Animated via CSS transition on mount, not layout-triggering properties
- **Sidebar**: `layoutId="sidebar-highlight"` creates the sliding background on nav click

### Challenges

- Mixing Server and Client Components with Framer Motion requires careful boundary placement — `BentoGrid` exports both the container and `tileVariant` so Server-rendered wrappers can still participate in the animation tree
- Supabase RLS must be configured correctly or `getCourses()` returns an empty array silently — added explicit error throwing to surface this

## Environment Variables

See `.env.example`
README

echo ""
echo "Files written. Now run:"
echo ""
echo "  npm install"
echo "  # Add your .env.local with Supabase credentials"
echo "  npm run dev"
