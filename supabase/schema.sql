-- Faithful Serve: run in the Supabase SQL editor for a new project.

-- Profiles mirror auth.users with a role.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  role text not null default 'volunteer' check (role in ('admin', 'volunteer')),
  created_at timestamptz not null default now()
);

create table public.events (
  id text primary key,
  title text not null,
  title_ko text,
  age_group text not null check (age_group in ('youth', 'college', 'adults', 'all')),
  event_date date not null,
  event_time text,
  location text,
  description text,
  spots_total int not null default 0,
  signup_deadline date,
  tags text[] default '{}',
  created_at timestamptz not null default now()
);

create table public.signups (
  event_id text not null references public.events (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

-- Auto-create a profile when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', 'Member'),
    coalesce(new.raw_user_meta_data ->> 'role', 'volunteer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.signups enable row level security;

create policy "Profiles are viewable by owner and admins"
  on public.profiles for select
  using (auth.uid() = id or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Anyone can read events"
  on public.events for select
  using (true);

create policy "Admins manage events"
  on public.events for all
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Users see their own signups; admins see all"
  on public.signups for select
  using (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Users create their own signups"
  on public.signups for insert
  with check (auth.uid() = user_id);

create policy "Users cancel their own signups"
  on public.signups for delete
  using (auth.uid() = user_id);
