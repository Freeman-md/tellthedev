# TellTheDev

A clean, embeddable feedback collector for solo devs and makers.
Collect bug reports, feature requests, and general comments — with optional screenshots — right from your site.

## Features

* 📝 Feedback widget (embed anywhere)
* 📸 Screenshot support
* 🔒 Supabase-backed storage with RLS
* 🛠 Admin dashboard for filtering and managing feedback

## Monorepo Structure

```
apps/         # widget & dashboard apps
packages/     # shared UI components
supabase/     # schema, policies, seed data
```

## Getting Started

1. Create `.env.local` using `.env.example` as reference

2. Run local Supabase:

   ```bash
   npx supabase start
   ```

3. Reset and seed database:

   ```bash
   npx supabase db reset
   ```

## License

MIT
