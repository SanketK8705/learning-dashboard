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
