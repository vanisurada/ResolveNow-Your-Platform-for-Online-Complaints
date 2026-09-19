# ResolveNow — Online Complaint Registration and Management

Quick scaffold for the ResolveNow full-stack app (backend: Express + MongoDB + Socket.io; frontend: React + Vite).

Prerequisites
- Node.js (18+)
- MongoDB running locally or a connection string

Backend

1. Open a terminal in `backend` and install:

```powershell
cd backend
npm install
```

2. Create `.env` (copy from `.env.example`) and set `MONGO_URI` and `JWT_SECRET`.

3. Run server:

```powershell
npm run dev
```

API endpoints (examples)
- POST `/api/auth/register` { name, email, password }
- POST `/api/auth/login` { email, password }
- GET `/api/complaints/mine` (auth)
- POST `/api/complaints` (auth)

Frontend

1. Open a terminal in `frontend` and install:

```powershell
cd frontend
npm install
npm run dev
```

2. The frontend expects the backend at `http://localhost:5000`. Override by setting `REACT_APP_API_URL`.

Notes
- This is a scaffold with core features. You should harden validation, error handling, file uploads, and production settings before deploying.
