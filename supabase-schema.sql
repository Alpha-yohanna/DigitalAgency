create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.contact_messages enable row level security;

create policy "Anyone can subscribe"
on public.subscribers
for insert
to anon, authenticated
with check (true);

create policy "Authenticated admins can view subscribers"
on public.subscribers
for select
to authenticated
using (true);

create policy "Anyone can send contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

create policy "Authenticated admins can view contact messages"
on public.contact_messages
for select
to authenticated
using (true);
