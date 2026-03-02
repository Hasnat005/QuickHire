# QuickHire

QuickHire is a full-stack job portal application.

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL (Supabase)

## Features

- Public job listings with search and filters
- Job detail page with application form
- Admin authentication (signup/login with JWT)
- Admin job management (create/delete)
- Input validation and API error handling
- Responsive UI for mobile, tablet, and desktop

## Project Structure

```
quickhire/
├─ frontend/
│  ├─ src/
│  └─ vercel.json
├─ backend/
│  ├─ api/
│  ├─ src/
│  ├─ supabase/
│  │  └─ setup_core_tables.sql
│  └─ vercel.json
└─ README.md
```

## Run Locally

### 1) Prerequisites

- Node.js 18+
- npm
- Supabase project (or any PostgreSQL-compatible setup used through Supabase client)

### 2) Backend Setup

1. Go to backend folder:

  ```bash
  cd backend
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Create `.env` from `.env.example` and fill values.

4. Run required DB schema in Supabase SQL editor:

  `backend/supabase/setup_core_tables.sql`

5. Start backend:

  ```bash
  npm run dev
  ```

Backend base URLs (both supported):

- `http://localhost:5000/api`
- `http://localhost:5000/api/v1`

Health check:

- `GET /api/health`

### 3) Frontend Setup

1. Go to frontend folder:

  ```bash
  cd frontend
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Create `.env` from `.env.example` and set API base URL.

4. Start frontend:

  ```bash
  npm run dev
  ```

Frontend runs on `http://localhost:5173` by default.

## Environment Variables

### Backend (`backend/.env`)

- `NODE_ENV` – environment (`development`/`production`)
- `PORT` – backend port (default `5000`)
- `CORS_ORIGIN` – comma-separated allowed origins
  - Example: `http://localhost:5173,https://your-frontend.vercel.app`
- `CORS_ALLOW_VERCEL_PREVIEW` – `true`/`false`
- `CORS_VERCEL_PROJECT` – optional project prefix for Vercel preview domains
- `SUPABASE_URL` – Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key
- `JWT_SECRET` – strong random secret for signing JWT

Reference file: `backend/.env.example`

### Frontend (`frontend/.env`)

- `VITE_API_BASE_URL` – backend API base URL
  - Local example: `http://localhost:5000/api`
  - Deployed example: `https://your-backend.vercel.app/api`

Reference file: `frontend/.env.example`

## Core API Endpoints

### Jobs

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` (Admin)
- `DELETE /api/jobs/:id` (Admin)

### Applications

- `POST /api/applications`

### Admin Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

## Deployment Notes (Vercel)

- Frontend uses SPA rewrite config in `frontend/vercel.json`.
- Backend uses serverless entry in `backend/api/index.js` and routing in `backend/vercel.json`.
- Ensure deployed frontend URL is included in backend `CORS_ORIGIN`.
