create table if not exists public.coach_usage (
  sync_key text not null,
  usage_date date not null default current_date,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (sync_key, usage_date)
);

alter table public.coach_usage enable row level security;

-- Intentionally no public RLS policies. The Edge Function accesses this table
-- with the Supabase service-role key, while browser clients cannot read it.
create index if not exists coach_usage_updated_at_idx
  on public.coach_usage (updated_at desc);
