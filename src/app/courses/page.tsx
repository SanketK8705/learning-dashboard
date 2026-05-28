"use client";

import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

import {
  Palette,
  Code2,
  Sparkles,
  Binary,
  Brain,
  PenTool,
  Server,
  Database,
  Clock,
  Users,
} from "lucide-react";

const courses = [
  {
    id: "ae0e700c-9109-4812-8a78-8fb84d8ada53",
    title: "Introduction to Design Systems",
    instructor: "Sarah Chen",
    progress: 72,
    total_lessons: 24,
    completed_lessons: 17,
    icon: Palette,
    tag: "Design",
    duration: "6h 40m",
    students: 1240,
  },

  {
    id: "b7c8d9e0-1234-4abc-8def-111111111111",
    title: "Advanced TypeScript",
    instructor: "Marcus Reid",
    progress: 45,
    total_lessons: 32,
    completed_lessons: 14,
    icon: Code2,
    tag: "Engineering",
    duration: "9h 20m",
    students: 3410,
  },

  {
    id: "c8d9e0f1-2345-4abc-8def-222222222222",
    title: "Motion & Interaction Design",
    instructor: "Priya Nair",
    progress: 89,
    total_lessons: 18,
    completed_lessons: 16,
    icon: Sparkles,
    tag: "Design",
    duration: "5h 10m",
    students: 890,
  },

  {
    id: "d9e0f1a2-3456-4abc-8def-333333333333",
    title: "Data Structures & Algorithms",
    instructor: "James Okafor",
    progress: 31,
    total_lessons: 40,
    completed_lessons: 12,
    icon: Binary,
    tag: "Engineering",
    duration: "12h 00m",
    students: 5200,
  },

  {
    id: "d8896d59-01c7-494a-ae35-5ea151dd494d",
    title: "Advanced React Patterns",
    instructor: "Michael Torres",
    progress: 45,
    total_lessons: 30,
    completed_lessons: 14,
    icon: Code2,
    tag: "Engineering",
    duration: "9h 20m",
    students: 3410,
  },

  {
    id: "c41f1fb9-2de0-42e9-9001-bde743e94369",
    title: "Machine Learning Basics",
    instructor: "Emily Carter",
    progress: 88,
    total_lessons: 40,
    completed_lessons: 35,
    icon: Brain,
    tag: "AI",
    duration: "11h 10m",
    students: 2210,
  },

  {
    id: "c45eb454-c1e5-44f3-9737-3ab406e97040",
    title: "UI UX Fundamentals",
    instructor: "David Kim",
    progress: 60,
    total_lessons: 20,
    completed_lessons: 12,
    icon: PenTool,
    tag: "Design",
    duration: "4h 50m",
    students: 1540,
  },

  {
    id: "21239757-f4d4-4ea9-a9f6-7f120441ce2c",
    title: "Node.js API Development",
    instructor: "Olivia Brown",
    progress: 30,
    total_lessons: 28,
    completed_lessons: 8,
    icon: Server,
    tag: "Backend",
    duration: "8h 00m",
    students: 2980,
  },

  {
    id: "33270c0f-6763-4be5-a7fb-0d78d1ceffcb",
    title: "Data Structures in JavaScript",
    instructor: "James Wilson",
    progress: 95,
    total_lessons: 35,
    completed_lessons: 33,
    icon: Database,
    tag: "Engineering",
    duration: "12h 00m",
    students: 5200,
  },
];

const tileVariant = {
  hidden: { opacity: 0, y: 20 },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function CoursesPage() {
  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <Sidebar />
      <MobileNav />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3"
          >
            {/* Header */}
            <motion.div variants={tileVariant}>
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                Library
              </p>

              <h1 className="font-syne font-extrabold text-3xl text-white">
                Your Courses
              </h1>
            </motion.div>

            {/* Course List */}
            <div className="flex flex-col gap-3">
              {courses.map((course) => {
                const Icon = course.icon;

                return (
                  <motion.article
                    key={course.id}
                    variants={tileVariant}
                    className="rounded-2xl border border-border bg-surface px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
                    whileHover={{
                      scale: 1.005,
                      borderColor: "#00D4FF33",
                      boxShadow: "0 0 24px #00D4FF11",
                    }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-accent" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-syne font-semibold text-base text-white">
                          {course.title}
                        </h3>

                        <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-accent/20 text-accent bg-accent-dim">
                          {course.tag}
                        </span>
                      </div>

                      <p className="font-mono text-xs text-gray-400">
                        {course.instructor}
                      </p>

                      <div className="flex items-center gap-4 mt-1 flex-wrap">
                        <span className="font-mono text-[11px] text-gray-400 flex items-center gap-1">
                          <Clock size={10} />
                          {course.duration}
                        </span>

                        <span className="font-mono text-[11px] text-gray-400 flex items-center gap-1">
                          <Users size={10} />
                          {course.students.toLocaleString()} students
                        </span>

                        <span className="font-mono text-[11px] text-gray-400">
                          {course.completed_lessons}/{course.total_lessons} lessons
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-1 sm:w-36 shrink-0">
                      <div className="flex justify-between">
                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                          Progress
                        </span>

                        <span className="font-mono text-sm text-accent">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="h-1 w-full bg-surface-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              course.progress >= 80
                                ? "linear-gradient(90deg, #00D4FF, #00FF88)"
                                : "linear-gradient(90deg, #00D4FF88, #00D4FF)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{
                            delay: 0.3,
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}