
# UNIFLOW — full feature upgrade plan

Sequenced in 4 phases. Admin upgrades ship first (your priority), then student-side power features, then polish, then nice-to-haves. Everything stays in the current TanStack Start + mock-data architecture — no backend yet.

---

## Phase 1 — Admin upgrades (ship first)

Goal: make the institutional side feel like a real decision-making tool, not just dashboards.

### 1.1 Cohort comparison
Side-by-side compare of two faculties/programs on readiness, engagement, at-risk %, content coverage.
- New route: `src/routes/admin.compare.tsx` with two faculty pickers and a diff table + paired sparklines.
- Data: extend `src/data/admin.ts` with `cohortMetrics` (deterministic per facultyId).

### 1.2 Content health dashboard
"Which lessons are hurting students?" — lessons sorted by lowest quiz pass rate, highest drop-off, most "ask tutor" hits. Action: flag for review (toast).
- New route: `src/routes/admin.content-health.tsx`.
- Data: add `contentSignals` to `admin.ts` joining `notes.ts` + `quizzes.ts`.

### 1.3 Intervention workflow
Turn the existing at-risk list into a queue: assign advisor, log outreach note, mark resolved. Local state only.
- Edit `src/routes/admin.atrisk.tsx`: add row drawer with status (`new` → `contacted` → `resolved`), advisor select, note textarea.
- Persist to `localStorage` under `uniflow.interventions`.

### 1.4 Admin polish
- Adoption page: add YoY delta chips.
- Sidebar: add Compare + Content Health entries to `AdminSidebar`.
- Global export button (CSV) in admin topbar — already wired via sonner toast, generalize it.

---

## Phase 2 — Student-side core (Tier 1)

### 2.1 Per-exam readiness model
Single 0–100 score per exam = `0.4*coverage + 0.3*recall + 0.3*practice`.
- New `src/lib/readiness.ts` pure selectors over `courses.ts` / `decks.ts` / `mock-exams.ts`.
- Surface: big number on `app.exam.$examId.tsx`, replace ring values on Dashboard zone 3.

### 2.2 Mock exam runtime
Make mock exams runnable end-to-end.
- New routes: `app.practice.mock-exams.$id.run.tsx` (timer, section nav, flag, submit) and `app.practice.mock-exams.$id.result.tsx` (score, section breakdown, weakest topics → links into Library/Practice).
- Extend `mock-exams.ts` with a `questions` array (reuse `QuizQuestion` shape).
- Store attempts in `localStorage` → feeds `lastScore` + readiness.

### 2.3 Unified review queue
A single "Due today" inbox merging due flashcards, missed quiz items, and exercises flagged for review.
- New `src/data/review-queue.ts` derived selector.
- New route `src/routes/app.review.tsx` — single-card focused UI, ⌘+Enter to grade.
- Dashboard "Next 90 minutes" card primary action becomes "Review N items".

### 2.4 Adaptive study plan
"Plan my week" modal: hours/week + which exams → generates day-by-day blocks.
- New: `src/lib/plan-generator.ts` (deterministic), modal in `app.planner.tsx`.
- Output written to `localStorage`, read by Dashboard zone 2 and Planner calendar.

### 2.5 Tutor grounded in current lesson
"Ask the tutor about this" button (already in `app.library.$code.$lessonId.tsx`) → opens Tutor with a pinned context pill + 3 suggested questions.
- Edit `app.tutor.tsx` to read `?lesson=…&code=…` search params; canned response references the passage.

---

## Phase 3 — Polish & engagement (Tier 2)

### 3.1 Highlight + bookmark in Library reader
Selection-based highlights stored in `localStorage`, listed in a side drawer per lesson. Read-only — lesson body stays Uniflow's.

### 3.2 Library full-text search in ⌘K
Extend `CommandPalette.tsx` to fuzzy-match lesson bodies (not just titles) with snippet preview.

### 3.3 Keyboard-first practice UI
Standardize shortcuts across Flashcards / Quizzes / Exercises: `Space` flip, `1-4` grade, `J/K` nav, `?` shows overlay.

### 3.4 Quiet streak
Topbar pill: "4 / 5 study days". No fireworks. Derived from review-queue completions in `localStorage`.

### 3.5 Printable study sheet
Per chapter: `/app/library/$code/$lessonId/print` route with a print stylesheet — definitions + 10 questions on one page.

---

## Phase 4 — Nice-to-haves (Tier 4)

- Focus mode ↔ Planner: starting a pomodoro tied to a block auto-marks it on complete.
- Dark mode audit (rings, sparklines, charts).
- Onboarding completion checklist card on Dashboard for first 7 days.
- `.ics` calendar export for generated study plan (client-side blob).

---

## Technical section

**New files**
```text
src/lib/readiness.ts
src/lib/plan-generator.ts
src/lib/storage.ts                # typed localStorage helpers
src/data/review-queue.ts
src/routes/admin.compare.tsx
src/routes/admin.content-health.tsx
src/routes/app.review.tsx
src/routes/app.practice.mock-exams.$id.run.tsx
src/routes/app.practice.mock-exams.$id.result.tsx
src/routes/app.library.$code.$lessonId.print.tsx
src/components/admin/CompareTable.tsx
src/components/admin/InterventionDrawer.tsx
src/components/app/PlanWizard.tsx
src/components/app/HighlightDrawer.tsx
src/components/app/ReadinessScore.tsx
```

**Edited files**
```text
src/components/admin/AdminSidebar.tsx
src/components/app/AppSidebar.tsx       # add "Review" entry
src/components/app/AppTopbar.tsx        # quiet streak pill
src/components/app/CommandPalette.tsx   # full-text search
src/routes/admin.atrisk.tsx             # intervention drawer
src/routes/admin.adoption.tsx           # YoY chips
src/routes/app.index.tsx                # readiness + plan blocks + review CTA
src/routes/app.exam.$examId.tsx         # big readiness number
src/routes/app.tutor.tsx                # grounded context
src/routes/app.library.$code.$lessonId.tsx  # highlights + print link
src/routes/app.planner.tsx              # plan wizard
src/data/mock-exams.ts                  # add questions
src/data/admin.ts                       # cohortMetrics + contentSignals
```

**Architectural notes**
- All persistence is `localStorage` via a typed `src/lib/storage.ts` wrapper (single source of truth for keys: `uniflow.interventions`, `uniflow.plan`, `uniflow.attempts`, `uniflow.highlights`, `uniflow.streak`). Swappable for Lovable Cloud later.
- Readiness + review-queue are **pure derived selectors** — no duplicated state.
- No new dependencies needed. Reuse `framer-motion`, `sonner`, `lucide-react`, shadcn primitives already in the project.
- Mock exam timer uses `useEffect` interval + `Date.now()` deadline; resilient to tab blur.
- Keep design tokens — no raw color classes.

**Out of scope**
- Real backend / auth / Lovable Cloud.
- Real AI streaming (tutor stays canned-mock with the new grounding).
- Mobile-first redesign (responsive only).
- Real CMS for Uniflow content authors.

**Sequencing**
Phase 1 → Phase 2 → Phase 3 → Phase 4, each phase shippable on its own. I'll pause after each phase so you can review before continuing.

