"use client";

import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

const stats = [
  { label: "Total Hours Learned", value: "47h", change: "+3h this week" },
  { label: "Courses Completed", value: "3", change: "+1 this month" },
  { label: "Current Streak", value: "14 days", change: "Personal best" },
  { label: "Avg Daily Time", value: "1.2h", change: "+12% vs last week" },
];

const weekData = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 0.5 },
  { day: "Thu", hours: 1.8 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 0.8 },
  { day: "Sun", hours: 1.2 },
];

const maxHours = Math.max(...weekData.map((d) => d.hours));

const tileVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <Sidebar />
      <MobileNav />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">

            {/* Header */}
            <motion.div variants={tileVariant}>
              <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">Overview</p>
              <h1 className="font-syne font-extrabold text-3xl text-text">Analytics</h1>
            </motion.div>

            {/* Stat Cards */}
            <motion.div variants={tileVariant} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <motion.article
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface p-5 flex flex-col gap-2"
                  whileHover={{ scale: 1.02, borderColor: "#00D4FF33", boxShadow: "0 0 24px #00D4FF11" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{stat.label}</p>
                  <p className="font-syne font-bold text-2xl text-text">{stat.value}</p>
                  <p className="font-mono text-[10px] text-accent">{stat.change}</p>
                </motion.article>
              ))}
            </motion.div>

            {/* Bar Chart */}
            <motion.article
              variants={tileVariant}
              className="rounded-2xl border border-border bg-surface p-6"
              whileHover={{ scale: 1.005, borderColor: "#00D4FF22" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-semibold text-sm text-text">Hours This Week</h2>
                <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Daily breakdown</span>
              </div>

              <div className="flex items-end gap-3 h-40">
                {weekData.map((d, i) => (
                  <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                    <motion.div
                      className="w-full rounded-t-md"
                      style={{
                        background: "linear-gradient(180deg, #00D4FF, #00D4FF44)",
                        boxShadow: "0 0 12px #00D4FF22",
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                      transition={{ delay: i * 0.07, type: "spring", stiffness: 200, damping: 20 }}
                    />
                    <span className="font-mono text-[10px] text-text-dim">{d.day}</span>
                  </div>
                ))}
              </div>
            </motion.article>

            {/* Course Progress */}
            <motion.article
              variants={tileVariant}
              className="rounded-2xl border border-border bg-surface p-6"
              whileHover={{ scale: 1.005, borderColor: "#00D4FF22" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h2 className="font-syne font-semibold text-sm text-text mb-5">Course Progress</h2>
              <div className="flex flex-col gap-4">
                {[
  { title: "Introduction to Design Systems", progress: 72 },
  { title: "Advanced TypeScript", progress: 45 },
  { title: "Motion & Interaction Design", progress: 89 },
  { title: "Data Structures & Algorithms", progress: 31 },
  { title: "Advanced React Patterns", progress: 45 },
  { title: "Machine Learning Basics", progress: 88 },
  { title: "UI UX Fundamentals", progress: 60 },
  { title: "Node.js API Development", progress: 30 },
  { title: "Data Structures in JavaScript", progress: 95 },
].map((course, i) => (
                  <div key={course.title} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="font-syne text-xs text-text">{course.title}</span>
                      <span className="font-mono text-xs text-accent">{course.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-surface-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: course.progress >= 80
                            ? "linear-gradient(90deg, #00D4FF, #00FF88)"
                            : "linear-gradient(90deg, #00D4FF88, #00D4FF)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>

          </motion.div>
        </div>
      </main>
    </div>
  );
}