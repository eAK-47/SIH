# 🇮🇳 Tourism Intelligence & Trusted Local Services Platform

**A production-grade SIH (Smart India Hackathon) prototype built around the Vallikavu Hub, Kerala.**
A real-time trust, safety, and price-transparency platform for tourists, powered by PostGIS spatial queries, Median Absolute Deviation (MAD) outlier detection, OpenAI advisory heuristics, Google Maps Distance Matrix, and a Proof-of-Presence (PoP) verification engine.

---

## ✨ Live Demo URLs
| Service | URL |
| --- | --- |
| 🗺️ **Tourist Frontend (Vite + React + TS)** | [http://localhost:5173](http://localhost:5173) |
| ⚙️ **Backend API (Fastify + Prisma)** | [http://localhost:3001](http://localhost:3001) |
| 📚 **Interactive Swagger API Docs** | [http://localhost:3001/docs](http://localhost:3001/docs) |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  client/  (Vite + React 19 + TS + Tailwind + Leaflet)   │
│  └─ TouristApp (Split-Screen) │ MerchantDashboard        │
└─────────────────────────────────────────────────────────┘
                          │  HTTP / Axios
                          ▼
┌─────────────────────────────────────────────────────────┐
│  src/  (Fastify + Prisma + PostGIS)                      │
│  ├─ routes/  ├─ controllers/  ├─ services/              │
│  ├─ repositories/  ├─ seeds/  ├─ types/                 │
└─────────────────────────────────────────────────────────┘
                          │  Prisma + PostGIS
                          ▼
┌─────────────────────────────────────────────────────────┐
│  PostgreSQL 14 + PostGIS Extension                      │
│  └─ Place, PriceObservation, IntelligenceProfile,        │
│     PopVerification, TravelAdvisory, PriceSubmission,   │
│     MerchantProfile                                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Modules

### Part 1 — Price Intelligence Engine
- **PostGIS Spatial Search** — `ST_DWithin` queries return all places within a configurable radius of the user.
- **MAD Price Engine** — Median Absolute Deviation algorithm filters extreme outliers (Modified Z-Score > 3.5) and computes 25th–75th percentile "Fair Price Bands".
- **Seeded Vallikavu Hub Dataset** — 10 realistic places, 62 verified price observations (with intentional outliers), 10 intelligence profiles, 1 merchant.

### Part 2 — Proof-of-Presence (PoP) & AI Advisory
- **Haversine PoP Engine** — verifies the tourist is physically within 150 m of the place before allowing submissions.
- **Deterministic OpenAI Advisory** — GPT-4o-mini generates positive highlights, things to know, and risk levels with strict guardrails.
- **Offline Fallback** — when the OpenAI quota is exhausted or the API key is missing, a heuristic synthesizer returns context-aware advisories *with zero downtime*.

### Part 3 — Price Submission & Merchant Portal
- **PoP-validated Bill Submission** — every reported price is signed with a verified token.
- **Merchant Dashboard** — claims management, real MAD-engine vs. crowd median discrepancy detection, and live alert banners.

### Part 4 — Dynamic Road Transit Meter & Fare Audit Engine
- **Google Distance Matrix API** for live road routing + duration.
- **Haversine + 1.25× Tortuosity Fallback** when no API key is configured.
- **Kerala MVD Auto Rates** — ₹30 base (1.5 km) + ₹15/km thereafter; 1.5× night tariff.
- **Discrepancy Gouging Logic** — `FAIR` ≤ 1.15×, `MODERATE_SURGE` 1.15×–1.5×, `SEVERE_GOUGING` > 1.5×.
- **Interactive Frontend Simulator** — choose a destination from 4 Vallikavu hotspots (Karunagappally, Ochira, Azheekal, Amrita), enter the quoted fare, and instantly see the audit badge.

---

## 🧠 Smart Design System (Vallikavu Hub)

| Token | Hex |
| --- | --- |
| **Brand Emerald 600** | `#059669` |
| **Brand Dark Emerald 700** | `#047857` |
| **Slate 50 / 100 / 200** | `#F8FAFC` / `#F1F5F9` / `#E2E8F0` |
| **Amber 500 (Advisory)** | `#F59E0B` |
| **Rose 600 (Gouging)** | `#E11D48` |
| **Category — Transport (Blue)** | `#2563EB` |
| **Category — Meals (Emerald)** | `#059669` |
| **Category — Boats (Purple)** | `#9333EA` |
| **Category — Rentals (Amber)** | `#D97706` |

- **Typography**: Inter + Plus Jakarta Sans, with `font-numeric` tabular numerals for currency.
- **Radii**: `rounded-xl` (12 px) and `rounded-2xl` (16 px).
- **Elevation**: `shadow-card` (subtle) and `shadow-card-hover` (lifted).

---

## 📡 API Reference

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/v1/places/search?lat&lng&radiusMeters&category&maxBudget` | GET | PostGIS spatial search with optional category/budget filters |
| `/api/v1/places/:id` | GET | Detailed place info (price bands, safety tags, intel profile) |
| `/api/v1/places/:id/price-analysis` | GET | Item-level MAD statistics |
| `/api/v1/platform/pop/verify` | POST | Verify tourist is within 150 m of a place |
| `/api/v1/platform/advisory/generate` | POST | Generate AI advisory (with offline fallback) |
| `/api/v1/platform/prices/submit` | POST | Submit a PoP-verified price observation |
| `/api/v1/platform/transit/audit-quote` | POST | Audit a quoted auto-rickshaw fare against the regulated meter |
| `/api/v1/platform/merchant/dashboard` | GET | Merchant claims, submissions, and pricing analytics |

Full interactive schema at **[/docs](http://localhost:3001/docs)**.

---

## 🛠️ Quick Start

### 1. Install dependencies
```bash
cd /home/om/Documents/sih && npm install
cd client && npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# (Set DATABASE_URL, OPENAI_API_KEY, GOOGLE_MAPS_API_KEY)
```

### 3. Database setup (PostgreSQL + PostGIS required)
```bash
sudo systemctl start postgresql
npm run db:push
npm run seed
```

### 4. Start the system
```bash
# Backend (Terminal 1)
npm run start

# Frontend (Terminal 2)
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## 🧪 Testing
```bash
# Unit tests (MAD engine + price engine)
npm run test

# Live API smoke test
curl -X POST http://localhost:3001/api/v1/platform/transit/audit-quote \
  -H "Content-Type: application/json" \
  -d '{"placeId":"11111111-1111-1111-1111-111111111101","destLat":9.0544,"destLng":76.5338,"quotedPrice":250,"isNightFare":false}'
```

---

## 🔒 Environment Variables

| Variable | Required | Fallback |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | — |
| `OPENAI_API_KEY` | optional | offline heuristic fallback |
| `GOOGLE_MAPS_API_KEY` | optional | Haversine × 1.25 tortuosity fallback |
| `PORT` | optional | `3001` |
| `SWAGGER_ENABLED` | optional | `true` |

---

## 📦 Tech Stack
- **Backend**: Fastify 4, Prisma 5, PostgreSQL 14 + PostGIS, Zod, OpenAI SDK, Axios
- **Frontend**: Vite 8, React 19, TypeScript 5, Tailwind CSS 3, Zustand 4, React-Leaflet 4, Axios
- **Tooling**: Vitest, tsx, ESLint, Google Distance Matrix API

---

## 📈 Roadmap
- ✅ Vallikavu Hub spatial dataset
- ✅ MAD anomaly engine
- ✅ Proof-of-Presence verification
- ✅ AI advisory with offline fallback
- ✅ Transit meter & fare audit (Google + Haversine)
- ✅ Merchant dashboard with discrepancy alerts
- 🔜 Multi-language tourist support (Hindi / Malayalam)
- 🔜 Photo-evidence verification via ML
- 🔜 Hotel aggregator integration

---

## 📜 License
MIT © 2026 Tourism Intelligence Team
