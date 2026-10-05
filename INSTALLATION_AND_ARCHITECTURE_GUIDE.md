# 📘 Thilhara Full-Stack Platform — Team Installation & Architecture Guide

Welcome to the **Thilhara Ref & Electricals** modern web platform. This document is a complete walkthrough for developers and team members to set up, understand, and contribute to the project.

---

## 📑 Table of Contents
1. [Prerequisites & System Requirements](#1-prerequisites--system-requirements)
2. [Step-by-Step Installation Guide](#2-step-by-step-installation-guide)
   - [A. Clone & Directory Setup](#a-clone--directory-setup)
   - [B. Backend Setup (GoLang)](#b-backend-setup-golang)
   - [C. Frontend Setup (React + Vite)](#c-frontend-setup-react--vite)
   - [D. Database Setup (PostgreSQL)](#d-database-setup-postgresql)
3. [Comprehensive File-by-File Breakdown](#3-comprehensive-file-by-file-breakdown)
   - [Root Directory](#root-directory)
   - [Frontend (`client/`)](#frontend-client)
   - [Backend (`server/`)](#backend-server)
   - [Database (`db/`)](#database-db)
4. [Backend API Reference](#4-backend-api-reference)
5. [Troubleshooting & FAQs](#5-troubleshooting--faqs)

---

## 1. Prerequisites & System Requirements

Ensure the following tools are installed on your workstation:

| Requirement | Recommended Version | Purpose | Check Command |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v18.0.0` or higher (v20+ recommended) | JavaScript runtime for React & Vite | `node -v` |
| **npm** | `v9.0.0` or higher | Node package manager | `npm -v` |
| **Go (GoLang)** | `1.21` or higher | High-performance backend API | `go version` |
| **Docker** *(Optional)* | Docker Desktop 20+ | Running PostgreSQL in container | `docker --version` |
| **PostgreSQL** *(Optional)* | `v14` to `v16` | Relational database (if not using Docker) | `psql --version` |

> [!NOTE]
> **PostgreSQL is optional for initial frontend/backend testing!**
> The Go server is built with a **smart hybrid storage engine**: if PostgreSQL is not reachable, it automatically operates in high-performance local seed mode so team members can run the full frontend and backend immediately without setting up a database first.

---

## 2. Step-by-Step Installation Guide

### A. Clone & Directory Setup
Navigate to the root project directory:
```bash
cd thilhara
```

---

### B. Backend Setup (GoLang)
1. Open a terminal and move into the `server` folder:
   ```bash
   cd server
   ```

2. Download all Go dependencies:
   ```bash
   go mod tidy
   ```

3. Run the Go server:
   ```bash
   go run main.go
   ```
   *(Alternatively, on Windows you can run the compiled binary directly: `.\server.exe`)*

4. **Verify Backend**:
   Open [http://localhost:8080/api/health](http://localhost:8080/api/health) in your browser. You should see:
   ```json
   {
     "backend": "GoLang",
     "db": "PostgreSQL",
     "service": "Thilhara Cooling Solutions API",
     "status": "healthy",
     "version": "2.0.0"
   }
   ```

---

### C. Frontend Setup (React + Vite)
1. Open a new terminal and move into the `client` folder:
   ```bash
   cd client
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. **Verify Frontend**:
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser. You will see the modern Thilhara application running live.

---

### D. Database Setup (PostgreSQL)

You have two simple options to run PostgreSQL:

#### Option 1: Using Docker Compose (Recommended)
If you have Docker Desktop installed, open a terminal in the `db/` folder:
```bash
cd db
docker compose up -d
```
This automatically boots a PostgreSQL 16 container, creates the database `thilhara_db`, and runs `schema.sql` automatically.

#### Option 2: Using an Existing Local/Cloud PostgreSQL Instance
1. Run the SQL script located at `db/schema.sql` inside your PostgreSQL database (`psql -U postgres -d thilhara_db -f db/schema.sql`).
2. Export or set the `DATABASE_URL` environment variable before starting the Go backend:
   ```bash
   # Windows PowerShell:
   $env:DATABASE_URL="postgres://postgres:yourpassword@localhost:5432/thilhara_db?sslmode=disable"
   cd server
   go run main.go
   ```

---

## 3. Comprehensive File-by-File Breakdown

### Root Directory
- [`README.md`](file:///d:/Education/INternship/thilhara/README.md): High-level project summary and quickstart guide.
- [`INSTALLATION_AND_ARCHITECTURE_GUIDE.md`](file:///d:/Education/INternship/thilhara/INSTALLATION_AND_ARCHITECTURE_GUIDE.md): This comprehensive document detailing setup, file explanations, and team workflows.

---

### Frontend (`client/`)

```
client/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── FeaturePillars.jsx
        ├── ProductsCatalog.jsx
        ├── ServicesSection.jsx
        ├── WhyChooseUs.jsx
        ├── WorkingHours.jsx
        ├── Testimonials.jsx
        ├── PartnersMarquee.jsx
        ├── ContactSection.jsx
        ├── QuoteModal.jsx
        └── Footer.jsx
```

#### Core Files:
1. **[`client/index.html`](file:///d:/Education/INternship/thilhara/client/index.html)**:
   - Root HTML template.
   - Loads modern Google Web Fonts (`Outfit` for crisp headings and `Plus Jakarta Sans` for readable body text).
   - Sets dynamic viewport, meta descriptions, and cooling-themed SVG favicon.

2. **[`client/src/main.jsx`](file:///d:/Education/INternship/thilhara/client/src/main.jsx)**:
   - React application entrypoint.
   - Mounts the root `<App />` component into the DOM `#root` element.

3. **[`client/src/index.css`](file:///d:/Education/INternship/thilhara/client/src/index.css)**:
   - **Central Design System**.
   - Custom CSS variables defining the deep dark cooling palette (`#070d19`), icy cyan (`#00d2ff`), frost blue (`#3a86ff`), and mint teal (`#00f5d4`).
   - Glassmorphism utilities (`.glass-card`, `backdrop-filter`).
   - Micro-interaction animations, custom scrollbar, glowing border effects, button styling, and responsive media queries.

4. **[`client/src/App.jsx`](file:///d:/Education/INternship/thilhara/client/src/App.jsx)**:
   - Main orchestrator component.
   - Houses dynamic ambient background glowing orbs (`.ambient-orb`).
   - Manages global modal states (e.g., opening the Quote Modal from any component or passing preselected product data).
   - Handles smooth scrolling between sections (`home`, `products`, `services`, `about`, `reviews`, `hours`, `contact`).

#### Component Files (`client/src/components/`):
5. **[`Navbar.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/Navbar.jsx)**:
   - Sticky navigation header with frosted glass backdrop on scroll.
   - Displays real-time **"Open Now / Closed"** indicator calculated specifically against Sri Lanka Standard Time (UTC+05:30).
   - Provides quick direct hotline link (`+94 11 2314355`) and mobile-responsive drawer menu.

6. **[`Hero.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/Hero.jsx)**:
   - High-impact header section with rotating value propositions.
   - Highlights 25+ years of heritage, 1,650+ corporate clients, and 118+ brand partnerships.
   - Contains direct CTA buttons ("Request Project Quote", "View Products Catalog", "Call Hotline").

7. **[`FeaturePillars.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/FeaturePillars.jsx)**:
   - Modernized representation of the original website's 3 core hallmarks:
     - **Ultra Power Saving**: Inverter technology and energy efficiency.
     - **Hyper Cooling Output**: Sub-zero capability and rapid temperature pulldown.
     - **Universal Brands**: Global OEM component ecosystem.

8. **[`ProductsCatalog.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/ProductsCatalog.jsx)**:
   - Interactive hardware catalog connecting to `GET /api/products`.
   - Category filtering tabs (*Cold Room & Evaporators*, *Compressors & Motors*, *Valves & Fittings*, *Tools & Equipment*).
   - Live instantaneous search bar matching title, model, or brand.
   - Product cards with in-stock indicators and a **"Technical Specifications" modal** allowing users to inspect engineering data and request a quote with 1 click.

9. **[`ServicesSection.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/ServicesSection.jsx)**:
   - Detailed breakdown of engineering capabilities:
     - Turnkey Cold Room & Blast Freezer construction.
     - Commercial VRF & Central HVAC.
     - Annual Maintenance Contracts (AMC).
     - Rapid spare part swap-outs with emergency same-day dispatch.

10. **[`WhyChooseUs.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/WhyChooseUs.jsx)**:
    - Preserves and modernizes Thilhara's founding story (established in 1998).
    - Grid of high-visibility credential metrics (25 Years, 1650+ Corporate Clients, 118+ Global Partners, 100% OEM Parts).

11. **[`WorkingHours.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/WorkingHours.jsx)**:
    - Weekly operating timetable (Monday to Saturday schedule).
    - Highlights the current day automatically with a glowing badge.
    - Displays Union Place Colombo 02 showroom address and direct telephone dispatch lines.

12. **[`Testimonials.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/Testimonials.jsx)**:
    - Authentic client reviews from prestigious Sri Lankan institutions (CBL Foods, Sri Lankan Airlines, Galadari Hotel, Sri Lanka Broadcasting Corporation, Abans, Richard Pieris).
    - Interactive carousel with star ratings and company role designations.

13. **[`PartnersMarquee.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/PartnersMarquee.jsx)**:
    - Global partner matrix representing authorized brands (LG, Copeland, Honeywell, Refco Swiss, Embraco, Eliwell, Royal Cool, Ashida).

14. **[`ContactSection.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/ContactSection.jsx)**:
    - Direct inquiry form wired via `fetch` to `POST /api/contact`.
    - Handles form validation, loading spinner, and instant visual feedback alerts.

15. **[`QuoteModal.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/QuoteModal.jsx)**:
    - Engineering project quote builder modal.
    - Allows customers to specify project category (Cold Store, Blast Freezer, VRF, Spare Parts) and tonnage capacity.
    - Submits directly to `POST /api/quotes`.

16. **[`Footer.jsx`](file:///d:/Education/INternship/thilhara/client/src/components/Footer.jsx)**:
    - Site navigation links, corporate address, active tech stack indicators (Go Backend + PostgreSQL), and developer attribution to Sysflicx IT Solutions.

---

### Backend (`server/`)

```
server/
├── go.mod
├── go.sum
├── main.go
├── handlers/
│   └── handlers.go
├── models/
│   └── models.go
└── storage/
    └── storage.go
```

1. **[`server/main.go`](file:///d:/Education/INternship/thilhara/server/main.go)**:
   - Application entrypoint for the Go server.
   - Configures HTTP server port (`PORT` env var or default `8080`).
   - Sets up URL routes using `http.NewServeMux` and links handlers to endpoints.

2. **[`server/models/models.go`](file:///d:/Education/INternship/thilhara/server/models/models.go)**:
   - Defines Go data structures with JSON serialization tags:
     - `Category`: Hardware classification.
     - `Product`: Catalog item with specs map, stock status, ratings, and image URL.
     - `Testimonial`: Client review entries.
     - `Partner`: International brand partner records.
     - `ContactInquiry`: Message submission from contact form.
     - `QuoteRequest`: Detailed technical proposal request.

3. **[`server/storage/storage.go`](file:///d:/Education/INternship/thilhara/server/storage/storage.go)**:
   - Database and data access layer.
   - **PostgreSQL Connection**: Attempts connection to PostgreSQL using `DATABASE_URL` or environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
   - **Auto-Migration**: Automatically initializes database tables if connected to Postgres.
   - **In-Memory Fallback**: If PostgreSQL is not active, seamlessly stores and serves data in thread-safe memory with full preloaded seed products and reviews.

4. **[`server/handlers/handlers.go`](file:///d:/Education/INternship/thilhara/server/handlers/handlers.go)**:
   - HTTP REST request controllers.
   - `enableCORS()`: Adds cross-origin headers allowing requests from the React frontend.
   - `writeJSON()`: Formats responses as `application/json`.
   - Implements endpoints for fetching categories, products, submitting contact messages, and saving quote requests.

---

### Database (`db/`)

```
db/
├── schema.sql
└── docker-compose.yml
```

1. **[`db/schema.sql`](file:///d:/Education/INternship/thilhara/db/schema.sql)**:
   - PostgreSQL schema definition script.
   - Creates tables:
     - `categories`: Hardware categories with slugs and icons.
     - `products`: Catalog items with foreign key references and `JSONB` technical specifications.
     - `testimonials`: Client corporate testimonials.
     - `contact_inquiries`: Contact form logs with status tracking (`PENDING`, `CONTACTED`).
     - `quote_requests`: Customer quote submissions with capacity and notes.
   - Pre-populates default product categories.

2. **[`db/docker-compose.yml`](file:///d:/Education/INternship/thilhara/db/docker-compose.yml)**:
   - Docker Compose configuration for launching PostgreSQL 16 Alpine.
   - Maps port `5432:5432`.
   - Mounts `schema.sql` directly into `/docker-entrypoint-initdb.d/init.sql` so tables are created automatically on container initialization.

---

## 4. Backend API Reference

Base URL: `http://localhost:8080`

| Endpoint | Method | Description | Sample Query / Body |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health check & system version info | None |
| `/api/categories` | `GET` | List all product hardware categories | None |
| `/api/products` | `GET` | List products with optional category and search filters | `?category=cold-room&search=evaporator` |
| `/api/products/{slug}` | `GET` | Retrieve single product details by slug | `/api/products/thd-series-high-efficiency-evaporator` |
| `/api/testimonials` | `GET` | Retrieve verified client testimonials | None |
| `/api/partners` | `GET` | Retrieve brand partner list | None |
| `/api/contact` | `POST` | Submit general customer message | `{"name":"Kasun","email":"kasun@mail.lk","phone":"0771234567","serviceType":"Cold Room Hardware","message":"Need pricing"}` |
| `/api/quotes` | `POST` | Submit project quotation inquiry | `{"name":"Ruwan","company":"Hotel","email":"ruwan@hotel.lk","phone":"0712345678","projectType":"Industrial Cold Room","estimatedCapacity":"15 - 50 kW","notes":"5x4m room"}` |

---

## 5. Troubleshooting & FAQs

### Q1: What if port 8080 or port 5173 is already in use?
- **For Go backend (Port 8080)**: Set the `PORT` environment variable before running:
  ```powershell
  $env:PORT="8085"
  go run main.go
  ```
- **For React Vite (Port 5173)**: Vite automatically finds the next open port (e.g., `5174`). You can also specify:
  ```bash
  npm run dev -- --port 3000
  ```

### Q2: Do teammates need to install PostgreSQL to run the site?
**No.** The Go backend automatically checks for PostgreSQL. If none is running, it outputs:
```
[Database] PostgreSQL not currently reachable; operating in High-Performance Local Seed Mode.
```
All features (browsing catalog, searching, viewing specs, sending contact inquiries, and requesting quotes) work immediately in this mode.

### Q3: How to build for production deployment?
1. **Frontend**:
   ```bash
   cd client
   npm run build
   ```
   Outputs optimized HTML/JS/CSS assets to `client/dist/`.
2. **Backend**:
   ```bash
   cd server
   go build -o server.exe main.go
   ```
   Generates a standalone, dependency-free binary executable.

---

*Authored for the engineering team developing the Thilhara Cooling Solutions platform.*
