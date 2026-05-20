
# Repositioning Uniflow: from "student notebook" to "curated academic library"

The current product treats the student as the author (Smart Notes editor, AI side-panel for writing, backlinks). That contradicts the real model: **the university licenses Uniflow, and Uniflow's team authors the course material**. The student consumes, practices, and gets coached — they don't write notes from scratch.

This plan deletes what doesn't fit, restructures navigation around the real value (Library → Practice → Coach → Progress), and rebuilds a calmer, more focused dashboard.

---

## 1. Remove / retire

- **Smart Notes top-level section** → delete from sidebar, command palette, marketing.
  - Delete `src/routes/app.notes.tsx`, `src/routes/app.notes.$noteId.tsx`.
  - Remove `NotebookPen` items from `AppSidebar`, `CommandPalette`, `AppTopbar` labels.
  - Remove the "Smart Notes" feature card from the marketing `FeatureGrid` / Hero copy.
- **The "create" shortcuts** in the command palette ("New note", "New flashcard deck") — students don't author content, so these go.
- **Dashboard clutter** — the current `/app` mixes too many widgets. Cut from ~6 cards to a 3-zone layout (see §4).

## 2. Rename & restructure the sidebar

New "Workspace" nav (top to bottom):

```text
Dashboard          — today's plan, exam countdown, next action
Library            — courses with Uniflow-authored lessons/readings (replaces "Smart Notes")
Practice           — flashcards, quizzes, exercises, mock exams (single hub)
Exam Prep          — per-exam readiness, weak topics, plan
AI Tutor           — conversational coach grounded in the Library
Planner            — calendar + study blocks
Focus              — pomodoro / deep work
Progress           — analytics (renamed from "Analytics" to feel less corporate)
```

Courses list stays below as a quick-jump section.

## 3. New "Practice" hub (replaces standalone `/app/quizzes`)

Single page at `/app/practice` with four tabs powered by Uniflow-authored content:

| Tab | Content type | Existing scaffold to reuse |
|---|---|---|
| Flashcards | SRS decks per chapter | `app.quizzes.$deckId.tsx` (rename route to `practice.flashcards.$deckId`) |
| Quizzes | Timed MCQ sets | new |
| Exercises | Worked problems w/ step reveals + AI hint | new |
| Mock Exams | Full timed past-paper simulations w/ grading rubric | new |

Each item shows: difficulty, est. time, last attempt, mastery %.

New data files: `src/data/exercises.ts`, `src/data/mock-exams.ts`. Existing `decks.ts` stays.

## 4. Library (replaces Smart Notes)

`/app/library` — browse Uniflow-authored material by course → chapter → lesson.

- Reuse `src/data/notes.ts` as **lessons** (rename concept, keep data shape).
- Read-only reader view: clean typography, chapter ToC sidebar, "Practice this chapter" CTA at the end (links into the Practice hub filtered to that chapter), "Ask the tutor about this" button (opens AI Tutor with context preloaded).
- Delete the contentEditable editor + AI writing side-panel from `app.notes.$noteId.tsx` — keep only the reader, backlinks, and the two action CTAs.

## 5. Dashboard redesign (`/app/index.tsx`)

Current page has ~6 stacked widgets. New layout — **3 zones, generous whitespace, institutional minimalism**:

```text
┌─────────────────────────────────────────────────────────┐
│  Greeting + today's date            [Exam in 12 days ▸] │  ← thin status strip
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ZONE 1  — "Your next 90 minutes"                      │
│   One large card: the single recommended action         │
│   (e.g. "Review 24 cards · EC22 ch.4")  [Start ▸]      │
│                                                         │
├──────────────────────────┬──────────────────────────────┤
│ ZONE 2 — Today's plan    │  ZONE 3 — Readiness          │
│ 3 timeboxed blocks       │  Per-course readiness rings  │
│ (lesson · practice · review)│  + 1-line weakest topic   │
└──────────────────────────┴──────────────────────────────┘
```

What gets cut from the current dashboard: the standalone KPI stat row, the "recent notes" list, the duplicate sparklines (already in sidebar).

## 6. Marketing alignment

- Hero subhead: emphasize **"curated by your faculty + Uniflow"** rather than "your notes, smarter".
- `FeatureGrid`: replace the "Smart Notes" tile with **"Practice that mirrors the exam"** (exercises + mock exams).
- Pricing: clarify that institutions license per-student; individual tier disabled or labeled "Coming soon".

## 7. Visual polish pass (lightweight, no library swaps)

- Tighter dashboard rhythm: one type scale up for the "next action", smaller everything else.
- Replace the loud `Crown` upgrade card in the sidebar with a quieter "Institution: ESCP · contact support" footer block (since the student isn't the buyer).
- Mute the primary color on non-CTA surfaces; reserve it for the single "Start" action per screen.
- Add an empty-state pattern for Practice tabs (engraved icon + one-line explainer + CTA).

---

## Technical section

**Routes to delete**
- `src/routes/app.notes.tsx`
- `src/routes/app.notes.$noteId.tsx`

**Routes to add**
- `src/routes/app.library.tsx` (course → chapter index)
- `src/routes/app.library.$code.tsx` (chapter list for a course)
- `src/routes/app.library.$code.$lessonId.tsx` (reader)
- `src/routes/app.practice.tsx` (tabs layout)
- `src/routes/app.practice.flashcards.tsx` + `.flashcards.$deckId.tsx` (move existing quiz route)
- `src/routes/app.practice.quizzes.tsx`
- `src/routes/app.practice.exercises.tsx`
- `src/routes/app.practice.mock-exams.tsx`

**Routes to edit**
- `src/routes/app.index.tsx` — 3-zone redesign
- `src/components/app/AppSidebar.tsx` — new nav + remove upgrade card
- `src/components/app/CommandPalette.tsx` — remove "Smart Notes" and "Create" group
- `src/components/app/AppTopbar.tsx` — update label map
- `src/components/marketing/FeatureGrid.tsx`, `Hero.tsx` — repositioning copy
- `src/routeTree.gen.ts` is auto-generated — don't touch

**Data**
- Keep `notes.ts` (rename concept to "lessons" in UI only), `decks.ts`, `courses.ts`, `exams.ts`.
- Add `src/data/exercises.ts`, `src/data/mock-exams.ts`, `src/data/quizzes.ts`.

**Out of scope**
- Backend / Lovable Cloud / real auth
- Real content authoring tools (Uniflow team would use a separate CMS)
- Mobile layout pass

---

## Open questions before I build

1. **Library reader**: keep the AI side-panel as a **read-only "explain this passage"** helper, or remove it entirely and route all AI through `/app/tutor`?
2. **Practice hub**: single page with tabs, or four separate pages in the sidebar under a "Practice" group?
3. **Mock exams**: should they be timed with a forced submit (proctor-like), or self-paced?

I'll default to: (1) keep as read-only explainer, (2) single page with tabs, (3) timed with pause allowed — unless you say otherwise.
