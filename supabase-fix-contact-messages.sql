create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid()
);

alter table public.contact_messages
add column if not exists name text;

alter table public.contact_messages
add column if not exists email text;

alter table public.contact_messages
add column if not exists message text;

alter table public.contact_messages
add column if not exists created_at timestamptz not null default now();

update public.contact_messages
set name = 'Unknown'
where name is null;

update public.contact_messages
set email = 'unknown@example.com'
where email is null;

update public.contact_messages
set message = 'No message provided'
where message is null;

alter table public.contact_messages
alter column name set not null;

alter table public.contact_messages
alter column email set not null;

alter table public.contact_messages
alter column message set not null;

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can send contact messages"
on public.contact_messages;

drop policy if exists "Authenticated admins can view contact messages"
on public.contact_messages;

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
