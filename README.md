# QuickHire

QuickHire is a full-stack starter project with a clearly separated frontend and backend architecture.

## Project Structure

```
quickhire/
  frontend/   # React app (Vite + Tailwind CSS)
  backend/    # Node.js + Express API
  README.md
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express

## Getting Started

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2) Backend

```bash
cd backend
npm install
npm run dev
```

Backend health check endpoint:

`GET /api/health`

## Supabase DB Setup (Required)

This project requires these tables in Supabase:

- `public.users`
- `public.jobs`
- `public.applications`

Run the SQL in:

`backend/supabase/setup_core_tables.sql`

Then restart the backend and retry:

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/jobs`
- `GET /api/v1/jobs`
- `POST /api/v1/applications`
