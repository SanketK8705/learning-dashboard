"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function HeroTile() {
  const { profile } = useUser();
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
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent opacity-[0.04] blur-3xl animate-glow-pulse pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-accent opacity-[0.03] blur-3xl pointer-events-none" />
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
            {profile.name}
          </h1>
          <p className="font-mono text-sm text-text-dim mt-2">
            Continue where you left off
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 bg-surface-2 border border-border rounded-xl px-5 py-4">
          <Flame size={20} className="text-orange-400" />
          <span className="font-syne font-bold text-2xl text-text">{streak}</span>
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
            day streak
          </span>
        </div>
      </div>

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