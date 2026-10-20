# ScoreMax Institute

Tuition and engineering coaching platform at **Guduvanchery & Kelambakkam** — React + Tailwind frontend with Node.js, Express, and MongoDB backend.

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Setup

```bash
# From project root
npm install
cd server && cp .env.example .env
cd ../client && cp .env.example .env

# Seed database (requires MongoDB running)
npm run seed

# Start client + server
cd ..
npm run dev
```

- **Frontend**: http://localhost:5173
- **API**: http://localhost:5000

## Demo accounts (after seed)

| Role    | Email                 | Password     |
|---------|-----------------------|--------------|
| Admin   | admin@scoremax.in     | password123  |
| Student | student@scoremax.in   | password123  |
| Parent  | parent@scoremax.in    | password123  |

## Project structure

```
├── client/     # Vite + React SPA
├── server/     # Express API + Mongoose
└── package.json
```

## Features

- Matric / CBSE / ICSE / NCERT school coaching
- BE (Mechanical, Electronics, CSE), Diploma & Arts & Science
- Demo booking with MongoDB persistence
- JWT auth with role-based dashboards
- Student analytics, parent progress, admin panel
- WhatsApp contact button

## Environment variables

**server/.env**: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`

**client/.env**: `VITE_WHATSAPP_NUMBER`, optional `VITE_API_URL`

## Address

No 04, Nakkeran Street, Guduvanchery (Near Noor Restaurant)









how to run this website 
npm install
cd server && cp .env.example .env
cd ../client && cp .env.example .env
cd ..
npm run seed    # requires MongoDB
npm run dev