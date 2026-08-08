# The Faithful · Serve (demo)

Volunteering and opportunities site for church events, mission trips, and teams.
React + TypeScript + Vite, TailwindCSS v4, TanStack Router, Supabase.

## Run the demo

```bash
npm install
npm run dev
```

No setup needed. Without Supabase keys the app runs in **mock mode**: auth and
sign-ups are simulated in memory and reset on refresh. Demo logins are shown on
the sign-in page:

- Admin (Charles): `charles@demo.church` / `demo1234`
- Volunteer: `volunteer@demo.church` / `demo1234`

## Connect Supabase

1. Create a project at supabase.com
2. Run `supabase/schema.sql` in the SQL editor
3. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`
4. Restart the dev server; the mock-mode banner disappears

To make Charles an admin, sign him up normally, then in the SQL editor:
`update public.profiles set role = 'admin' where name = 'Charles';`

## Deploy (Netlify)

Build command `npm run build`, publish directory `dist`. Add the two env vars in
Site settings > Environment variables. Add a redirect rule for the SPA router:
create `public/_redirects` containing `/* /index.html 200` (already included).

## What's intentionally out of scope for the demo

- Payments (left for a later phase per plan)
- Korean/English full toggle (type system is already bilingual-ready)
- Photo uploads (placeholder tiles; swap in real images in `src/data/photos.ts`)
