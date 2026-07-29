alter table public.subscribers enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can subscribe"
on public.subscribers;

drop policy if exists "Authenticated admins can view subscribers"
on public.subscribers;

drop policy if exists "Anyone can send contact messages"
on public.contact_messages;

drop policy if exists "Authenticated admins can view contact messages"
on public.contact_messages;

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
