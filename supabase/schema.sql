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
