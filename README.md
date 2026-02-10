# Digonto Dashboard

A modern, role-based admin dashboard for an EdTech platform built with **Next.js 16**, **React 19**, and **TypeScript**. Features real-time data visualization, dark/light theming, responsive mobile layout, and a glassmorphism-styled login system.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Decisions](#architecture-decisions)
- [Assumptions Made](#assumptions-made)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)

---

## Setup Instructions

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (ships with Node)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd digonto-dashboard-main

# 2. Install dependencies
npm install

# 3. Start both the frontend & mock API together
npm run dev:all
```

This starts:
- **Next.js dev server** → [http://localhost:3000](http://localhost:3000)
- **JSON Server mock API** → [http://localhost:4000](http://localhost:4000)

### Starting Servers Individually

```bash
# Frontend only
npm run dev

# Mock API only
npm run api
```

### Login Credentials

| Role    | Email               | Password |
|---------|---------------------|----------|
| Admin   | admin@gmail.com     | 1234     |
| Manager | manager@gmail.com   | 1234     |

### Production Build

```bash
npm run build
npm start
```

---

## Tech Stack

| Category         | Technology                                | Version   |
|------------------|-------------------------------------------|-----------|
| **Framework**    | Next.js (App Router, Turbopack)           | 16.1.6    |
| **UI Library**   | React                                     | 19.2.3    |
| **Language**     | TypeScript                                | 5.x       |
| **Styling**      | Tailwind CSS (v4, PostCSS plugin)         | 4.x       |
| **State Mgmt**   | Zustand                                   | 5.0.11    |
| **Animations**   | Framer Motion                             | 12.34.0   |
| **Charts**       | Recharts                                  | 3.7.0     |
| **Icons**        | Lucide React                              | 0.563.0   |
| **Mock API**     | JSON Server                               | 1.0.0-β5  |
| **Linting**      | ESLint + eslint-config-next               | 9.x       |
| **Dev Runner**   | Concurrently                              | 9.2.1     |

---

## Project Structure

```
src/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout (fonts, metadata, global CSS)
│   ├── page.tsx                 # Home → Dashboard
│   ├── login/page.tsx           # Login page
│   ├── revenue/page.tsx         # Revenue analytics
│   ├── reports/page.tsx         # Report management
│   ├── settings/page.tsx        # Account settings
│   └── students/page.tsx        # Student management table
│
├── components/
│   ├── auth/
│   │   └── AuthProvider.tsx     # Auth guard → redirects to /login if unauthenticated
│   │
│   ├── charts/
│   │   ├── RevenueChart.tsx     # Area chart (revenue trends)
│   │   ├── OrdersChart.tsx      # Bar chart (order volumes)
│   │   ├── EnrollmentsChart.tsx # Grouped bar chart (enrollments)
│   │   └── UserTypesChart.tsx   # Pie chart (user distribution)
│   │
│   ├── dashboard/
│   │   ├── DashboardContent.tsx # Main dashboard composition
│   │   └── KPICard.tsx          # Stat card with sparkline
│   │
│   ├── layout/
│   │   ├── DashboardLayout.tsx  # Shell: sidebar + header + content
│   │   ├── Header.tsx           # Top bar: theme toggle, profile, mobile menu
│   │   └── Sidebar.tsx          # Navigation sidebar (responsive overlay)
│   │
│   └── ui/
│       ├── Skeleton.tsx         # Shimmer skeletons (KPI, Chart, Table, Report)
│       ├── ChartDateFilter.tsx  # Per-chart date range toggle (7D/30D/12M)
│       ├── ErrorState.tsx       # Error display with retry button
│       └── EmptyState.tsx       # Empty state with icon and message
│
├── hooks/
│   ├── useApiData.ts            # Generic data-fetching hook with loading/error
│   └── useTheme.ts              # Role-based color palette hook
│
├── lib/
│   └── api.ts                   # API fetch functions (JSON Server endpoints)
│
├── store/
│   └── index.ts                 # Zustand store (auth, theme, sidebar, UI state)
│
├── types/
│   └── index.ts                 # TypeScript interfaces for all data models
│
db.json                          # JSON Server database (students, reports, etc.)
```

---

## Architecture Decisions

### 1. Client-Side Authentication with Zustand + localStorage

Authentication is handled entirely on the client using Zustand store state persisted to `localStorage`. An `AuthProvider` wrapper checks for a stored user on mount and redirects unauthenticated users to `/login` via Next.js `useRouter`. This was chosen because the project uses a mock API (JSON Server) with no backend auth endpoints — a server-side auth solution would add unnecessary complexity without a real API.

### 2. Role-Based Theming via Hook (`useRoleColors`)

Instead of conditional CSS classes scattered across components, all role-dependent colors (primary, gradients, hover states, badges) are centralized in a single `useRoleColors()` hook. Components consume color tokens like `colors.primaryBg` or `colors.gradient`, making theme changes require zero component modifications.

### 3. Self-Contained Chart Components

Each chart manages its own local state (date range, dummy data) rather than receiving data via props from a parent. This was chosen because:
- Each chart has an independent date filter (7D / 30D / 12M)
- Chart data is generated client-side (no API dependency for chart visualization)
- Eliminates prop-drilling and reduces parent re-renders

### 4. Lazy Loading Charts with `next/dynamic`

The four chart components (Revenue, Orders, Enrollments, User Types) are lazy-loaded using `next/dynamic` with `ssr: false`. Recharts is a large library (~200KB), so deferring its load until the dashboard viewport prevents blocking the initial page paint.

### 5. JSON Server as Mock API

`json-server` provides a zero-configuration REST API from a single `db.json` file. All API functions in `lib/api.ts` fetch from `http://localhost:4000`. This decouples the frontend from any real backend, making it easy to swap later.

### 6. Mobile-First Responsive Sidebar

The sidebar uses a **dual-mode** approach:
- **Desktop (≥1024px)**: Persistent sidebar with collapse/expand toggle
- **Mobile (<1024px)**: Completely hidden by default; opens as full-width overlay with a blur backdrop and close button

### 7. Skeleton Loading over Spinners

Every data-driven page uses content-shaped skeleton placeholders (matching the exact layout of the data) instead of generic spinners. This reduces perceived loading time and prevents layout shift.

### 8. Centralized State with Zustand

A single Zustand store manages: user session, role, theme preference, sidebar state, date range, and loading/error flags. Zustand was chosen over Context API for its:
- No re-render cascading (component-level subscriptions)
- Minimal boilerplate compared to Redux
- Built-in persistence-friendly design

---

## Assumptions Made

1. **No real backend**: The project assumes a mock API via JSON Server. All data in `db.json` is static seed data. Authentication credentials are hardcoded in the Zustand store.

2. **Two roles only**: The system supports exactly two roles — `admin` and `manager`. Each role has a distinct color theme (indigo for admin, emerald for manager), but they share the same dashboard layout and pages.

3. **Client-side only auth**: There is no token-based authentication, session management, or server-side validation. The `AuthProvider` simply checks if a `user` object exists in `localStorage`.

4. **Chart data is dummy**: All chart components use locally generated dummy data (not fetched from the API). The per-chart date filter (7D/30D/12M) switches between pre-defined datasets, not actual time-filtered API responses.

5. **Single-user session**: The app assumes one user per browser session. There is no multi-tab sync, token refresh, or session timeout mechanism.

6. **Dark mode as default**: The app defaults to dark theme on first visit. Users can toggle between light and dark via the header.

7. **Port 4000 for API**: JSON Server runs on port 4000. All fetch functions in `lib/api.ts` target `http://localhost:4000`. If the port is occupied, the API must be manually reconfigured.

8. **Modern browser**: The app relies on modern CSS features (backdrop-filter, CSS Grid, Flexbox gap) and JavaScript APIs (ResizeObserver, localStorage). No IE11 or legacy browser support.

---

## Available Scripts

| Script          | Command                 | Description                                   |
|-----------------|-------------------------|-----------------------------------------------|
| `dev`           | `npm run dev`           | Start Next.js development server              |
| `build`         | `npm run build`         | Create optimized production build              |
| `start`         | `npm start`             | Start production server                        |
| `lint`          | `npm run lint`          | Run ESLint                                     |
| `api`           | `npm run api`           | Start JSON Server on port 4000                 |
| `dev:all`       | `npm run dev:all`       | Start both frontend and API concurrently       |

---

## Pages & Routes

| Route        | Page            | Description                                    |
|--------------|-----------------|------------------------------------------------|
| `/login`     | Login           | Glassmorphism login form with role-based auth   |
| `/`          | Dashboard       | KPI cards, 4 charts (lazy-loaded), export CSV   |
| `/students`  | Students        | Searchable/filterable student table, pagination |
| `/revenue`   | Revenue         | Financial KPIs, income chart, transactions      |
| `/reports`   | Reports         | Report cards with status, view/download actions |
| `/settings`  | Settings        | Profile, notifications, security, appearance    |
