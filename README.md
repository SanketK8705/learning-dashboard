# Learning Dashboard

A futuristic cyberpunk-themed learning dashboard built with Next.js, TypeScript, Supabase, TailwindCSS, and Framer Motion.

---

# Live Demo

Add your deployed Vercel URL here.

Example:

```txt id="r2p8mx"
https://learning-dashboard.vercel.app
```

---

# GitHub Repository

```txt id="n5u1wa"
https://github.com/SanketK8705/learning-dashboard
```

---
- **Staggered entrance**: `BentoGrid` uses Framer Motion `variants` with `staggerChildren` so tiles cascade in sequentially
- **Spring physics**: All hover states and sidebar highlights use `type: "spring" as const` with `stiffness: 300, damping: 20`
- **No layout shifts**: Every animation uses `transform` (scale, translateY) and `opacity` only — zero repaints
- **Progress bars**: Animated via CSS transition on mount, not layout-triggering properties
- **Sidebar**: `layoutId="sidebar-highlight"` creates the sliding background on nav click

# Tech Stack

* Next.js 16
* TypeScript
* TailwindCSS
* Framer Motion
* Supabase
* Lucide React
* Vercel

---

# Features

* Modern cyberpunk UI
* Animated dashboard experience
* Responsive sidebar navigation
* Course progress tracking
* Activity heatmap visualization
* Smooth Framer Motion animations
* Supabase-powered backend
* Fully responsive design

---

# Architecture Choices

## App Router

The project uses the Next.js App Router for:

* file-based routing
* better layout composition
* improved rendering performance
* server/client component separation

---

## Component Structure

The application is divided into reusable modules:

```txt id="m9x3qe"
src/app/components → reusable UI components
src/app/lib        → Supabase and utility logic
src/app            → route pages
```

This structure improves scalability and maintainability.

---

# Server / Client Component Split

## Server Components

Server Components were used for:

* page rendering
* layout composition
* fetching Supabase data

This reduces unnecessary client-side JavaScript and improves performance.

---

## Client Components

`"use client"` was used where interactivity was required:

* Framer Motion animations
* sidebar state management
* hover interactions
* animated progress bars
* mobile navigation

This helped maintain smooth UI interactions while keeping rendering efficient.

---

# Styling

TailwindCSS was used to create:

* a reusable design system
* responsive layouts
* consistent spacing and typography
* cyberpunk-inspired dark theme

Custom theme colors and utility classes were added for:

* glow effects
* gradients
* surface layers
* accent highlights

---

# Animations

Framer Motion was used extensively for:

* staggered page transitions
* hover animations
* animated progress indicators
* sidebar transitions
* micro-interactions

Animations primarily use transforms and opacity to maintain smooth performance.

---

# Supabase Integration

Supabase was used as the backend database for storing:

* courses
* course progress
* learning analytics data

Environment variables are securely managed using `.env.local`.

---

# Challenges Faced

* Managing Server vs Client component boundaries
* Creating reusable animated components
* Maintaining responsive layouts across devices
* Keeping animations smooth without affecting performance
* Building a consistent cyberpunk-themed UI

---

# Environment Variables

Create a `.env.local` file in the project root:

```env id="h6v4tw"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# `.env.example`

```env id="u7c2lo"
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

# Local Development

Install dependencies:

```bash id="j4n8ks"
npm install
```

Run development server:

```bash id="k2m5vz"
npm run dev
```

---

# Deployment

The application is deployed using Vercel.

Deployment steps:

1. Push project to GitHub
2. Import repository into Vercel
3. Add environment variables
4. Deploy

---

# Notes

* `.env.local` is excluded using `.gitignore`
* Actual Supabase credentials are never committed
* Built with reusable animated UI components
* Optimized for desktop and mobile devices
