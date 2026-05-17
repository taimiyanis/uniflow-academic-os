# UNIFLOW — Build Plan

A premium, calm, institutional academic operating system. Visual direction locked to **Institutional Minimalism** (Plus Jakarta Sans + JetBrains Mono, blue #315EFB on #F8FAFC, soft layered cards, generous whitespace, restrained motion).

## Scope (frontend-only, no backend yet)

Static, fully designed product surfaces with mock data. No auth, no database. Built so we can wire Lovable Cloud later without refactoring.

## Routes

```
src/routes/
  __root.tsx              Shared shell, head meta, fonts
  index.tsx               Marketing landing
  platform.tsx            Product features deep-dive
  institutional.tsx       Pitch page for universities
  resources.tsx           Editorial / changelog placeholder
  app.tsx                 Student dashboard layout (sidebar + outlet)
  app.index.tsx           Dashboard home
  app.notes.tsx           Smart Notes
  app.tutor.tsx           AI Tutor
  app.quizzes.tsx         Quizzes & Flashcards
  app.planner.tsx         Planner & tasks
  app.focus.tsx           Focus mode
  app.analytics.tsx       Personal performance
  admin.tsx               Admin layout (separate sidebar)
  admin.index.tsx         Institutional analytics overview
  admin.engagement.tsx    Student engagement
  admin.content.tsx       Content moderation
  admin.adoption.tsx      Adoption tracking
```

Each route gets its own `head()` with unique title + description + og tags.

## Design system (`src/styles.css`)

Replace default tokens with the locked palette in oklch:

- `--background` #F8FAFC, `--foreground` #111827
- `--primary` #315EFB, `--primary-foreground` white
- `--accent` #EEF2FF (primary-soft)
- `--muted` #64748B, `--border` #E2E8F0
- `--radius` 1rem (medium-large)
- Fonts: Plus Jakarta Sans (display), JetBrains Mono (eyebrows/labels) loaded via `<link>` in `__root.tsx` head
- Custom shadows: soft layered (`shadow-elegant`, `shadow-card`)
- Keyframes: `fade-in-up`, `u-draw` from the prototype

## Components

```
src/components/
  brand/UniflowLogo.tsx           Structured U mark (SVG, scalable)
  marketing/
    SiteHeader.tsx                Sticky nav, blur backdrop
    SiteFooter.tsx
    Hero.tsx                      Eyebrow pill + headline + dashboard preview
    DashboardPreview.tsx          The locked hero mock
    TrustBar.tsx                  Institution wordmarks
    FeatureGrid.tsx               3-up feature cards
    FeatureSection.tsx            Alternating image+text rows for /platform
    TestimonialRow.tsx
    InstitutionalCTA.tsx          Dark CTA card
  app/
    AppSidebar.tsx                Shadcn sidebar, collapsible icon
    AppTopbar.tsx                 Breadcrumb + command-K hint + avatar
    widgets/StudySessionCard.tsx
    widgets/WeeklyGoalCard.tsx
    widgets/ExamCountdownCard.tsx
    widgets/SmartNotesList.tsx
    widgets/UpcomingList.tsx
    widgets/ProgressRing.tsx
    widgets/CourseCard.tsx
  admin/
    AdminSidebar.tsx
    widgets/EngagementChart.tsx   Recharts area chart
    widgets/AdoptionBars.tsx
    widgets/KPIStat.tsx
    widgets/CohortHeatmap.tsx     CSS grid heatmap
```

Reuse shadcn primitives (button, card, badge, tabs, table, progress, separator, tooltip). Charts via `recharts` (already shipped via `@/components/ui/chart`).

## Landing page composition (locked from prototype)

1. Sticky header — UniflowLogo, Platform / Institutional / Resources, Sign In + Get Access
2. Hero — eyebrow pill, oversized headline "Academic clarity for modern students.", subhead, primary + ghost CTA
3. Dashboard Preview — exact composition from selected prototype (sidebar + main + smart notes column)
4. Trust bar — 4 institution wordmarks, grayscale
5. Feature grid — 3 cards (AI Tutor, Smart Organization, Institutional Analytics)
6. Feature section rows — Smart Notes, Quizzes & Flashcards, Focus Mode, Performance Analytics (alternating image/text, 4 rows)
7. Testimonial row — 3 quiet quote cards
8. Institutional CTA — dark rounded panel
9. Footer — minimal, mono caps

## Student dashboard (`/app`)

- Left sidebar (Dashboard, My Courses, Notes, AI Tutor, Quizzes, Planner, Focus, Analytics) — Uniflow+ pro pill at bottom
- Topbar with breadcrumb and ⌘K
- Dashboard home: welcome line, exam countdown card, course progress ring, AI tutor promo card, this-week tasks, courses grid (replicates the uploaded screenshot's information density but in the locked institutional minimalism style)
- Each sub-route gets a real, designed page (not "coming soon") with mock data

## University admin dashboard (`/admin`)

- Separate sidebar, slightly denser
- Overview: KPI stats (active students, weekly engagement, content views, completion rate), engagement area chart, adoption bars by faculty, cohort heatmap, recent flagged content
- Enterprise tone: more data, more density, neutral palette, primary used sparingly

## Motion

- `fade-in-up` on section reveal (intersection observer hook or framer-motion `whileInView`)
- Hover: card lift `translate-y-[-2px]` + shadow deepen
- Sidebar item active state with primary-soft background
- No parallax, no scroll-jacking

## SEO

- Per-route head() with distinct title/description/og
- Single H1 per page
- Semantic landmarks (header, nav, main, footer)

## Out of scope (this build)

- Auth, Lovable Cloud, persistence
- Functional AI tutor / quiz generation
- Real charts data (mock arrays only)
- Mobile-first polish — desktop-first per brief, mobile gets a reasonable fallback

## Technical notes

- All colors via semantic tokens — no raw hex in components
- Logo: pure SVG component, animated `u-draw` on first paint
- Mock data lives in `src/data/*.ts` so swapping to real fetches later is trivial
- Add `framer-motion` for reveal animations

Click **Implement plan** to build.
