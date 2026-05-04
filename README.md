# MedDistribusi (med-web)

Medical distributor **company profile** site with a built-in CMS: parallax marketing home, dual language (ID/EN), SQLite + Drizzle, and admin authentication via Better Auth.

## Prerequisites

- Node.js 20+
- npm

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

   Set `BETTER_AUTH_SECRET` to a long random string (e.g. `openssl rand -base64 32`). Set `NEXT_PUBLIC_APP_URL` to the site origin (e.g. `http://localhost:3000`).

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the database and apply migrations:

   ```bash
   npm run db:migrate
   ```

4. Seed an admin user and demo content (optional):

   ```bash
   npm run db:seed
   ```

   Default login (unless overridden by `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`):

   - Email: `admin@example.com`
   - Password: `admin123change`

5. Start the dev server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the CMS.

## Scripts

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Next.js dev server (Turbopack)       |
| `npm run build` | Production build                     |
| `npm run start` | Run production server                |
| `npm run db:generate` | Generate Drizzle migrations from schema |
| `npm run db:migrate`  | Apply migrations to SQLite file    |
| `npm run db:push`     | Push schema (dev shortcut)        |
| `npm run db:seed`     | Seed admin + demo data             |

## Deployment notes

- The default database is a **local SQLite file** (`DATABASE_URL=file:./data/med.db`), suitable for VPS or single-server handoff.
- **Serverless** hosts (e.g. Vercel) cannot persist a writable SQLite file on the filesystem; use a hosted SQLite (e.g. Turso) or another database and adjust `DATABASE_URL` / Drizzle config.

## Stack

Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion, Drizzle ORM, better-sqlite3, Better Auth.
