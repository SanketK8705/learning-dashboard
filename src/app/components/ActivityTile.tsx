"use client";

import { motion } from "framer-motion";

const intensityStyle: Record<number, React.CSSProperties> = {
  0: { background: "#151820", borderColor: "#1E2330" },
  1: { background: "rgba(0,212,255,0.10)", borderColor: "rgba(0,212,255,0.15)" },
  2: { background: "rgba(0,212,255,0.25)", borderColor: "rgba(0,212,255,0.30)" },
  3: { background: "rgba(0,212,255,0.45)", borderColor: "rgba(0,212,255,0.50)" },
  4: { background: "rgba(0,212,255,0.70)", borderColor: "rgba(0,212,255,0.75)" },
};

const ACTIVITY_DATA = [
  [2,1,3,0,4,2,1],[0,3,2,1,0,4,3],[1,0,4,2,3,1,0],
  [3,2,1,4,0,2,3],[4,1,0,3,2,1,4],[2,3,1,0,4,3,2],
  [1,4,2,3,1,0,2],[0,2,4,1,3,2,1],[3,1,2,4,0,3,2],
  [2,0,3,1,4,2,0],[4,3,1,2,0,4,3],[1,2,4,0,3,1,2],
  [0,4,2,3,1,0,4],[3,1,0,4,2,3,1],[2,3,4,1,0,2,3],
];

export default function ActivityTile() {
  return (
    <motion.article
      className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5"
      whileHover={{ scale: 1.01, borderColor: "#00D4FF22" }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-syne font-semibold text-sm text-text">Activity</h2>
        <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
          Last 15 weeks
        </span>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {ACTIVITY_DATA.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * 7 + di) * 0.004,
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 20,
                }}
                className="w-3 h-3 rounded-[3px] border"
                style={intensityStyle[level]}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-text-dim">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className="w-3 h-3 rounded-[3px] border"
            style={intensityStyle[l]}
          />
        ))}
        <span className="font-mono text-[10px] text-text-dim">More</span>
      </div>
    </motion.article>
  );
}