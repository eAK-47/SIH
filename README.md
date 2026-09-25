# 🇮🇳 YatraSahayi — Hyper-Local Tourism Intelligence & Trust Platform

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026-orange.svg)](https://sih.gov.in/)
[![Problem Statement ID](https://img.shields.io/badge/PS_ID-26204-blue.svg)](https://sih.gov.in/)
[![Theme](https://img.shields.io/badge/Theme-Travel_&_Tourism-green.svg)]()
[![Team](https://img.shields.io/badge/Team-Tech_Stark-purple.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An edge-native, evidence-grounded tourism price transparency and local services verification platform prototyped around the **Vallikavu Hub, Kerala**. 

YatraSahayi addresses unmetered transit price inflation and information asymmetry through PostGIS spatial indexing, Median Absolute Deviation (MAD) anomaly isolation, Kerala Motor Vehicles Department (MVD) gazetted tariff audits, and a cryptographic Proof-of-Presence (PoP) geofence.

---

## 📌 Repository & Prototype Navigation
* **Live Video Demonstration:** `https://bit.ly/YatraSahayi-Demo` *(Public Drive / Unlisted Video)*
* **Tourist Frontend Application:** `http://localhost:5173`
* **Fastify Backend Engine:** `http://localhost:3001`
* **Interactive OpenAPI / Swagger Documentation:** `http://localhost:3001/docs`

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│  Client Tier (Vite 8 + React 19 + TypeScript 5 + Tailwind + Leaflet)   │
│  ├─ Tourist Portal (Split-Screen Map, Live Audit, Fair Price Bands)    │
│  └─ Merchant Portal (Rate Card Management & Discrepancy Telemetry)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / JSON
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Application Gateway & Controller Tier (Node.js 20 + Fastify 4)        │
│  ├─ Security & Validation: Zod Schemas • JWT RBAC                      │
│  ├─ Spatial Routing Controller: Google Distance Matrix / Tortuosity   │
│  ├─ Anomaly Processing: In-Memory / Vectorized MAD Statistical Engine  │
│  └─ LLM Advisory Layer: Deterministic OpenAI Guardrails (Fallback HEU) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Prisma ORM 5 (Prepared Statements)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Data Persistence Tier (PostgreSQL 14+ with PostGIS Extension)         │
│  ├─ GIST Spatial Indexing (R-Tree) for Sub-50ms Radius Search          │
│  └─ Entities: Places, Observations, IntelligenceProfiles, PoPTokens    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧮 Core Modules & Algorithmic Implementation

### 1. Robust Anomaly Isolation Engine (Median Absolute Deviation)
Standard sample means and standard deviations fail in the presence of clustered price surges due to their 0% breakdown point. YatraSahayi implements **Median Absolute Deviation (MAD)** with a theoretical breakdown point of 50%:

$$\text{MAD} = \text{median}(\vert{}X_i - \tilde{X}\vert{})$$

A submitted price point $X_i$ is flagged as statistically anomalous when its Modified Z-Score satisfies:

$$M_i = \frac{0.6745 \cdot (X_i - \tilde{X})}{\text{MAD}} > 3.5$$

* **Time Complexity:** $\mathcal{O}(N \log N)$ where $N$ is the number of price observations for a category in the spatial cell (dominated by sorting for median extraction).
* **Space Complexity:** $\mathcal{O}(N)$ auxiliary memory for the absolute deviation arrays.
* **Output:** Dynamic 25th–75th percentile Interquartile Range (IQR) establishing local fair price bands.

### 2. Proof-of-Presence (PoP) Geofencing
To prevent remote review injection and spam submissions, client coordinate telemetry is validated against registered venue coordinates using the Great-Circle Haversine formulation:

$$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$

* **Spatial Boundary:** $\delta \le 150\,\text{meters}$. Submissions outside the boundary fail schema validation before database ingestion.
* **Time Complexity:** $\mathcal{O}(1)$ constant-time floating-point evaluation.
* **Space Complexity:** $\mathcal{O}(1)$ auxiliary storage.

### 3. Spatial Ingestion & Radius Queries (PostGIS)
* **Spatial Primitive:** `GEOGRAPHY(Point, 4326)` indexed via GIST (Generalized Search Tree).
* **Query Execution:** `ST_DWithin(geom, ST_MakePoint(lng, lat)::geography, radiusMeters)`
* **Performance:** Sub-50ms query latency across spatial boundaries.

### 4. Regulatory Transit Audit Engine (Kerala MVD Gazette Calibration)
Audits auto-rickshaw fare quotes against the regulated statutory fare matrix of Kerala:
* **Base Minimum Fare:** ₹30.00 for the first $1.5\,\text{km}$.
* **Distance Rate:** ₹15.00 per additional kilometer.
* **Night Tariff Multiplier:** $1.50\times$ baseline between 22:00 and 05:00.
* **Road Distance Fallback:** $\text{Distance}_{\text{est}} = d_{\text{Haversine}} \times 1.25$ (tortuosity factor) when routing keys are missing.
* **Discrepancy Scale:**
  * $\le 1.15\times$: Regulated Fair Baseline (`TARIFF_NORMAL`)
  * $1.15\times - 1.50\times$: Moderate Route Surcharge (`SURGE_MONITORED`)
  * $> 1.50\times$: Statistically Discrepant Quote (`ANOMALOUS_DISCREPANCY`)

---

## 🎨 Design System Tokens (Vallikavu Hub)

| Token | Value | Applied Context |
| :--- | :--- | :--- |
| **Brand Emerald 600** | `#059669` | Primary CTAs, Verified Indicators, Meals Category |
| **Brand Dark Emerald 700** | `#047857` | Hover states, active tab headers |
| **Slate Surface (50/100/200)**| `#F8FAFC` / `#F1F5F9` / `#E2E8F0` | Neutral backgrounds, card borders, dividers |
| **Amber 500 (Advisory)** | `#F59E0B` | Cautionary advisories, Rentals Category |
| **Rose 600 (Discrepancy)** | `#E11D48` | Anomalous price alerts, high-risk flags |
| **Transport Blue** | `#2563EB` | Transit routes, Auto-meter calculations |
| **Boats Purple** | `#9333EA` | Backwater ferry & boating services |

---

## 📡 API Specification

| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/places/search` | Public | PostGIS spatial radius query with category and budget filters |
| `GET` | `/api/v1/places/:id` | Public | Detailed place profiles, verified price bands, and safety tags |
| `GET` | `/api/v1/places/:id/price-analysis` | Public | Breakdown of MAD metrics, median, IQR bands, and sample counts |
| `POST` | `/api/v1/platform/pop/verify` | Tourist | Validates client coordinate telemetry against target coordinate ($<150\,\text{m}$) |
| `POST` | `/api/v1/platform/prices/submit` | Tourist (PoP Signed) | Submits item prices with signed PoP verification tokens |
| `POST` | `/api/v1/platform/transit/audit-quote` | Tourist | Audits quoted fares against Kerala MVD gazetted meter formulas |
| `POST` | `/api/v1/platform/advisory/generate` | Tourist | Generates structured JSON safety advisories (OpenAI / Heuristic Fallback) |
| `GET` | `/api/v1/platform/merchant/dashboard` | Merchant | Analytics, crowd observation discrepancies, and review telemetry |

*Complete interactive documentation with schema validators is served at `/docs` via Fastify Swagger.*

---

## 💻 Tech Stack & Dependencies

```json
{
  "runtime": "Node.js >= 20.0.0",
  "backend": {
    "framework": "Fastify v4.x",
    "orm": "Prisma v5.x",
    "validation": "Zod v3.x",
    "ai_integration": "OpenAI SDK v4.x (Structured JSON Schema)"
  },
  "database": {
    "engine": "PostgreSQL 14+",
    "spatial_extensions": ["PostGIS 3.x", "Uber H3 Spatial Indexing"]
  },
  "frontend": {
    "core": "Vite 8 + React 19 + TypeScript 5",
    "state": "Zustand 4",
    "styling": "Tailwind CSS 3",
    "mapping": "Leaflet 1.9 + React-Leaflet 4"
  },
  "tooling": {
    "testing": "Vitest 1.x",
    "linter": "ESLint 8.x",
    "ts_execution": "tsx"
  }
}
```

---

## 🚀 Installation & Local Environment Setup

### 1. Prerequisites
Ensure PostgreSQL with the PostGIS extension is installed and running:
```bash
# Verify PostGIS availability in PostgreSQL
psql -U postgres -c "SELECT PostGIS_Version();"
```

### 2. Repository Cloning & Dependency Setup
```bash
git clone [https://github.com/TechStark/yatrasahayi.git](https://github.com/TechStark/yatrasahayi.git)
cd yatrasahayi

# Install root & backend dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### 3. Environment Variable Provisioning
Create a `.env` file in the project root:
```env
# Database Connection URL (PostgreSQL with PostGIS enabled)
DATABASE_URL="postgresql://postgres:password@localhost:5432/yatrasahayi?schema=public"

# Service Configuration
PORT=3001
SWAGGER_ENABLED=true

# External APIs (System falls back automatically to heuristics if omitted)
OPENAI_API_KEY=""
GOOGLE_MAPS_API_KEY=""
```

### 4. Database Schema Migration & Seeding
```bash
# Push Prisma schema to Postgres
npm run db:push

# Seed the Vallikavu Hub dataset (10 places, 62 observations, baseline profiles)
npm run seed
```

### 5. Running the Application
```bash
# Terminal 1: Fastify Backend API
npm run start

# Terminal 2: Vite React Frontend
cd client
npm run dev
```
Navigate to `http://localhost:5173` in a web browser.

---

## 🧪 Automated Testing & API Validation

### Unit & Algorithmic Regression Suites
```bash
# Executes Vitest suites covering the MAD outlier pipeline and Haversine boundaries
npm run test
```

### Endpoint Smoke Test (Kerala MVD Transit Audit)
```bash
curl -X POST http://localhost:3001/api/v1/platform/transit/audit-quote \
  -H "Content-Type: application/json" \
  -d '{
    "placeId": "11111111-1111-1111-1111-111111111101",
    "destLat": 9.0544,
    "destLng": 76.5338,
    "quotedPrice": 250,
    "isNightFare": false
  }'
```

---

## 🗺️ Engineering Roadmap
* [x] **Phase 1 (Complete):** Vallikavu Hub localized dataset, PostGIS `ST_DWithin` radius search, and MAD anomaly filter.
* [x] **Phase 2 (Complete):** Haversine Proof-of-Presence (<150m) token signing and offline heuristic AI fallback.
* [x] **Phase 3 (Complete):** Kerala MVD auto-rickshaw statutory fare compliance engine and merchant telemetry.
* [ ] **Phase 4 (In Progress):** Client-side Tesseract.js (WASM) edge processing for zero-cost receipt parsing.
* [ ] **Phase 5 (Roadmap):** Uber H3 hexagonal spatial indexing for regional tariff density aggregation across Kerala.
* [ ] **Phase 6 (Roadmap):** Offline PWA service worker with multi-language (Malayalam / Hindi) localization.

---

## 📚 Academic & Statutory References
1. **Boris Iglewicz and David Hoaglin (1993):** *How to Detect and Handle Outliers*, ASQC Basic References in Quality Control, Vol. 16.
2. **Ministry of Tourism, Govt. of India:** *India Tourism Statistics Report (2024–2025)*.
3. **Motor Vehicles Department, Govt. of Kerala:** *Official Gazette on Auto-Rickshaw & Taxi Fare Revisions*.
4. **PostGIS Project:** *PostGIS 3.4 Spatial Database Management Documentation*.

---

## 📄 License
This repository is licensed under the [MIT License](LICENSE) — Developed by **Team Tech Stark** for the **Smart India Hackathon 2026**.
