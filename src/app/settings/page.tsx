"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import { User, Bell, Shield, Palette } from "lucide-react";
import { useUser } from "../context/UserContext";

const tileVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className="relative w-10 h-5 rounded-full border transition-colors duration-200"
      style={{
        background: on ? "#00D4FF22" : "#151820",
        borderColor: on ? "#00D4FF44" : "#1E2330",
      }}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-0.5 w-4 h-4 rounded-full"
        style={{ background: on ? "#00D4FF" : "#4A5568" }}
      />
    </button>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.article
      variants={tileVariant}
      className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5"
      whileHover={{ scale: 1.005, borderColor: "#00D4FF22" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center">
          <Icon size={14} className="text-accent" />
        </div>
        <h2 className="font-syne font-semibold text-sm text-text">{title}</h2>
      </div>
      {children}
    </motion.article>
  );
}

export default function SettingsPage() {
  const { profile, updateProfile } = useUser();

  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <Sidebar />
      <MobileNav />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">

            <motion.div variants={tileVariant}>
              <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">Preferences</p>
              <h1 className="font-syne font-extrabold text-3xl text-text">Settings</h1>
            </motion.div>

            <Section icon={User} title="Profile">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center shrink-0">
                  <span className="font-syne font-bold text-lg text-accent">
                    {form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-syne font-semibold text-sm text-text">{form.name}</p>
                  <p className="font-mono text-[11px] text-text-dim">{form.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Username", key: "username" },
                  { label: "Timezone", key: "timezone" },
                ].map(({ label, key }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{label}</label>
                    <input
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="bg-surface-2 border border-border rounded-lg px-3 py-2 font-mono text-xs text-text outline-none focus:border-accent/40 transition-colors duration-200"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="self-start px-4 py-2 rounded-lg bg-accent-dim border border-accent/30 font-mono text-xs text-accent hover:bg-accent/20 transition-colors duration-200"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </Section>

            <Section icon={Bell} title="Notifications">
              {[
                { label: "Daily learning reminders", sub: "Get reminded to keep your streak", on: true },
                { label: "Course updates", sub: "New lessons and content alerts", on: true },
                { label: "Weekly progress report", sub: "Summary of your learning week", on: false },
                { label: "Achievement unlocks", sub: "Celebrate milestones", on: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-syne text-sm text-text">{item.label}</p>
                    <p className="font-mono text-[10px] text-text-dim mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle defaultOn={item.on} />
                </div>
              ))}
            </Section>

            <Section icon={Palette} title="Appearance">
              {[
                { label: "Reduce motion", sub: "Disable animations for accessibility", on: false },
                { label: "Compact mode", sub: "Tighter spacing across the UI", on: false },
                { label: "Show progress percentages", sub: "Display numeric progress on cards", on: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-syne text-sm text-text">{item.label}</p>
                    <p className="font-mono text-[10px] text-text-dim mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle defaultOn={item.on} />
                </div>
              ))}
            </Section>

            <Section icon={Shield} title="Security">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Current Password", "New Password"].map((label) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{label}</label>
                    <input
                      type="password"
                      defaultValue={label === "Current Password" ? "••••••••" : ""}
                      className="bg-surface-2 border border-border rounded-lg px-3 py-2 font-mono text-xs text-text outline-none focus:border-accent/40 transition-colors duration-200"
                    />
                  </div>
                ))}
              </div>
              <button className="self-start px-4 py-2 rounded-lg bg-accent-dim border border-accent/30 font-mono text-xs text-accent hover:bg-accent/20 transition-colors duration-200">
                Update Password
              </button>
            </Section>

          </motion.div>
        </div>
      </main>
    </div>
  );
}