"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Layers, Network, Code2, Zap, BookOpen, Cpu, Globe, Database, Palette, Sparkles, Binary
} from "lucide-react";
import type { Course } from "../lib/types";

const iconMap: Record<string, React.ElementType> = {
  Layers, Network, Code2, Zap, BookOpen, Cpu, Globe, Database, Palette, Sparkles, Binary,
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
  const Icon = iconMap[course.icon] ?? BookOpen;

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
        <p className="font-mono text-[11px] text-text-dim">
            {course.instructor}
        </p>
        <p className="font-mono text-[10px] text-text-dim mt-1">
          {course.completed_lessons}/{course.total_lessons} lessons
        </p>
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
