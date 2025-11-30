🚀 AOI (Area of Interest) Definition Tool

A modular React + Leaflet application for drawing, managing, and reviewing Areas of Interest as per the provided Figma designs.

This project demonstrates:

Functional map interactions

Clean modular architecture

A maintainable UI workflow

End-to-end Playwright testing

Thoughtful engineering tradeoffs & decisions

📸 Demo Preview

A short 3–5 minute demo video showcasing search, AOI creation, drawing, deleting, and workflow navigation.


📦 Features Implemented

✔ Matches the Figma-provided UI design

✔ Search for regions and instantly create AOIs
✔ Click-to-draw AOI polygons
✔ Double-click to finalize polygon
✔ Sidebar AOI list
✔ Delete AOIs
✔ Toast notifications
✔ Scope definition workflow
✔ 2 of 3 Playwright tests passing (test suite demonstrates approach & thinking)

🏗️ Tech Stack
| Layer                  | Technology                  |
| ---------------------- | --------------------------- |
| **Frontend Framework** | React + TypeScript          |
| **Map Engine**         | Leaflet (via react-leaflet) |
| **Build Tool**         | Vite                        |
| **State Management**   | Local React state           |
| **End-to-End Tests**   | Playwright                  |
| **Styling**            | TailwindCSS                 |

📁 Project Structure
src/
 ├─ components/
 │   ├─ map/              # Map rendering + polygon drawing
 │   ├─ sidebar/          # AOI list + UI interactions
 │   └─ workflow/         # Flow steps & modal
 │
 ├─ layout/               # AppLayout + screen structure
 ├─ types/                # AOI and LatLng interfaces
 ├─ App.tsx
 └─ main.tsx

tests/
 ├─ aoi-draw.spec.ts      # Drawing polygons test
 ├─ aoi-search.spec.ts    # Creating AOI via search
 └─ aoi-actions.spec.ts   # Visibility/delete test (partially passing)

playwright.config.ts
README.md

📥 Setup & Installation
1️⃣ Clone Repo
git clone <repo-url>
cd aoi-app

2️⃣ Install Dependencies
npm install

3️⃣ Run Application
npm run dev


App will start at:

http://localhost:5173

4️⃣ Run Playwright Tests

Install browser binaries (first time only):

npx playwright install


Run tests:

npx playwright test --headed

🌍 Map Library Choice — Why Leaflet?
✔ Why Leaflet was chosen

Lightweight & open-source

No API keys required

Fast to integrate

Perfect for polygon drawing + AOI workflows

Great React compatibility via react-leaflet

✔ Alternatives considered
Map Library	Pros	Cons
Mapbox	Beautiful visuals	Requires API key, pricing concerns
Google Maps JS API	Reliable, rich ecosystem	Paid quota, more complex
OpenLayers	High performance, geospatial heavy	More complex API
ArcGIS JS	Enterprise GIS capabilities	Not necessary for simple AOIs

Leaflet provided the fastest development path without cost or complexity.

🧱 Architecture Decisions
✔ 1. Modular Components

Each major feature is isolated:

AoiMap.tsx handles map rendering + polygon interactions

AoiList.tsx manages AOI listing

AppLayout.tsx controls main screen structure

DrawingLayer isolates map event logic

This keeps each file simple and easy to maintain.

✔ 2. Clear Upward Data Flow

Drawing events update vertices →
Parent component constructs AOI →
AoiList renders items →
AoiMap consumes them.

No complex state management library needed.

✔ 3. Declarative Map Rendering

Leaflet polygons are drawn using React data, not direct Leaflet mutations.
This supports scalability & clarity.

🗄️ Simple Schema / ER Diagram

Even though the project is frontend-only, AOIs follow a clean schema:

AOI
-----------------------
id: string (UUID)
name: string
vertices: LatLng[]
visible: boolean
createdAt: Date?


And:

LatLng
--------------------
lat: number
lng: number


ER Diagram (ASCII):

+-----------------+           1 : N            +------------------+
|       AOI       | -------------------------> |      LatLng      |
+-----------------+                            +------------------+
| id              |                            | id               |
| name            |                            | lat              |
| visible         |                            | lng              |
+-----------------+                            | name             |
                                               | visible          |
                                               +------------------+

🔌 API Documentation (Future-Ready)

This project is frontend-only, but a future backend would expose routes like:

POST /aois

Create new AOI
Response:

{
  "id": "123",
  "name": "Area 1",
  "vertices": [...],
  "visible": true
}

GET /aois

Retrieve all AOIs

DELETE /aois/:id

Delete specific AOI

These align with typical GIS/AOI backend designs.

🧪 Testing Strategy
✔ What was tested
Test	Purpose
Drawing AOI	Ensures click/double-click polygon creation works
Search AOI	Ensures UI preset AOI creation works
Actions (delete/hide)	Ensures list handling & polygon deletion works
✔ Why these tests?

They cover:

Core user flows

Map interactions

UI reactivity

Sidebar-map synchronization

✔ What would be added with more time?

Mocked visibility toggle state

Edit-vertices workflow tests

Multi-AOI interactions

Stress tests with 100+ polygons

Page Object Model refactor

CI integration (GitHub Actions)

⚡ Performance Considerations
✔ Rendering tens of polygons

Leaflet handles this easily.

✔ Scaling to thousands of polygons

Would add:

Canvas renderer (L.canvas())

Clustering (supercluster)

Virtualized list for sidebar

Debounced map updates

Lazy-loaded AOI layers

Architecture is built to support these upgrades later.

🔧 Tradeoffs Made
Tradeoff	Reason
Incomplete visibility toggle	Limited time, focus on core flows
No backend	Assignment scope focused on UI + testing
No heavy GIS processing	Overkill for this project’s requirements
Basic state management	React local state is enough here

These tradeoffs were intentional and aligned with the timeline.

🔐 Production Readiness

To prepare for production:

Add backend (REST or GraphQL)

Persist AOIs to DB (PostGIS / MongoDB GeoJSON)

Add authentication

Add error boundaries

Add schema validation (Zod)

Add map performance optimization

Add loading states

Add CI/CD with GitHub Actions

⏱️ Time Spent
Task	Hours
Map setup + Leaflet integration	2 hrs
AOI drawing logic	3 hrs
UI & sidebar implementation	3 hrs
State management + wiring	2 hrs
Debugging interactions	2 hrs
Testing (Playwright)	2 hrs
Documentation	1 hr
Total	15 hrs