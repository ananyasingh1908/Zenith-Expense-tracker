create extension if not exists "pgcrypto";

create table if not exists public.expenses (
    id uuid primary key default gen_random_uuid(),

    description text not null,

    amount numeric(12,2) not null
        check (amount >= 0),

    category text not null,

    expense_date date not null default current_date,

    mood text,

    notes text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()
);

create index if not exists idx_expenses_category
on public.expenses(category);

create index if not exists idx_expenses_date
on public.expenses(expense_date);

alter table public.expenses enable row level security;

drop policy if exists "development_access_expenses"
on public.expenses;

create policy "development_access_expenses"
on public.expenses
for all
to anon, authenticated
using (true)
with check (true);