create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  role text not null default 'admin' check (role in ('admin', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_email_idx on public.users (email);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null,
  category text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_created_at_idx on public.jobs (created_at desc);
create index if not exists jobs_category_idx on public.jobs (category);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  name text not null,
  email text not null,
  resume_link text not null,
  cover_note text,
  created_at timestamptz not null default now()
);

create index if not exists applications_job_id_idx on public.applications (job_id);
create index if not exists applications_email_idx on public.applications (email);
