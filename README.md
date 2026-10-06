# Thilhara Ref & Electricals (Pvt) Ltd — Modern Full-Stack Platform

Modernized web application for **Thilhara Ref & Electricals**, Sri Lanka's pioneer cooling solutions and refrigeration spare parts company since 1998.

> 📖 **Team Members:** For full setup instructions and a file-by-file breakdown, check the [Installation & Architecture Guide](INSTALLATION_AND_ARCHITECTURE_GUIDE.md).

---

## 🛠 Tech Stack

| Layer | Technology | Key Highlights |
| :--- | :--- | :--- |
| **Frontend** | **React 18 + Vite** | Vanilla CSS Design System, Lucide Icons, Glassmorphism, Micro-animations |
| **Backend** | **GoLang 1.22+** | RESTful HTTP Mux API, CORS enabled, Clean Architecture |
| **Database** | **PostgreSQL** | Relational schema (`schema.sql`), Docker Compose setup, In-Memory Hybrid Fallback |

---

## 📁 Project Architecture

```
thilhara/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── pages/              # Page Views
│   │   │   ├── HomePage.jsx    # Home landing page with featured hardware preview
│   │   │   └── ProductsPage.jsx# Dedicated Products & Spares page with category sidebar
│   │   ├── components/         # Modular Components
│   │   │   ├── Navbar.jsx      # Sticky header with client-side routing & live status
│   │   │   ├── Hero.jsx        # Cooling hero with animated metrics & catalog CTA
│   │   │   ├── FeaturePillars.jsx # Ultra Power Saving, Hyper Cooling, Universal Brands
│   │   │   ├── ProductsCatalog.jsx # Catalog component with specs modal
│   │   │   ├── ServicesSection.jsx # Cold storage, VRF, AMC & rapid spares
│   │   │   ├── WhyChooseUs.jsx # 25+ years heritage narrative & key client metrics
│   │   │   ├── WorkingHours.jsx# Weekly operating schedule with real-time status pill
│   │   │   ├── Testimonials.jsx# Interactive corporate review slider (CBL, Airlines, Galadari)
│   │   │   ├── PartnersMarquee.jsx # Authorized global alliances (LG, Copeland, Refco, etc.)
│   │   │   ├── ContactSection.jsx # Inquiry form wired to Go REST API
│   │   │   ├── QuoteModal.jsx  # Engineering quote & proposal builder modal
│   │   │   └── Footer.jsx      # Navigation links, contact info, and system indicators
│   │   ├── App.jsx             # React Router setup (/ and /products)
│   │   ├── index.css           # Modern Vanilla CSS design system
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # GoLang Backend API
│   ├── handlers/               # REST handlers (Products, Quotes, Contact, etc.)
│   ├── models/                 # Go structs
│   ├── storage/                # PostgreSQL driver + hybrid local seed fallback
│   ├── go.mod
│   └── main.go                 # HTTP server entrypoint (Port 8080)
│
└── db/                         # Database Architecture
    ├── schema.sql              # PostgreSQL DDL tables & indexes
    └── docker-compose.yml      # One-command PostgreSQL 16 container setup
```

---

## 🚀 Running the Project Locally

### 1. Backend (GoLang)
```bash
cd server
go run main.go
# Or run pre-built binary on Windows:
.\server.exe
```
*The Go server starts at `http://localhost:8080` with auto-detected PostgreSQL support or memory fallback.*

### 2. Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

### 3. Database (Optional Docker PostgreSQL)
```bash
cd db
docker compose up -d
```
*This starts a PostgreSQL instance on port `5432` with preloaded tables from `schema.sql`.*

---

## 🌟 Key Features Implemented

1. **Modernized Visual Design**: Dark navy palette (`#070d19`) with ice cyan/frost blue accents, glassmorphic cards, and dynamic background gradients.
2. **Real-Time Operating Status**: Automatically calculates if the Colombo office at Union Place is currently open based on Sri Lanka Standard Time (UTC+05:30).
3. **Interactive Hardware Catalog**:
   - Filter by categories (*Cold Room & Evaporators*, *Compressors*, *Valves & Fittings*, *HVAC Tools*).
   - Instant search across brands and model numbers.
   - Comprehensive technical specification inspection modal.
4. **Live Quote & Inquiries**:
   - Fast quote builder modal with tonnage calculation selection.
   - Direct contact form wired to `POST /api/contact`.
5. **Authentic Data & Assets**: Preserved all original content from `https://thilhara.lk/` including partner brands, 25-year history, client reviews, and direct hotlines.
