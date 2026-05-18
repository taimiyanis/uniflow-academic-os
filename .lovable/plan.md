# UNIFLOW — Full Upgrade Plan

A complete pass that turns the current shell into a demo-ready academic OS. All work stays frontend-only with mock data, in the locked Institutional Minimalism direction.

## A. Design polish

1. **Global ⌘K command palette** (`src/components/app/CommandPalette.tsx`) — built on shadcn `command` + `dialog`. Opens with ⌘K / Ctrl+K. Sections: Navigate, Create (note, deck, focus session, exam plan), Recent notes, Switch course, Ask AI tutor. Mounted in `app.tsx` layout.
2. **Dashboard home redesign** (`app.index.tsx`) — replace generic grid with a "Today" narrative:
   - Hero "next action" card (one decision, one CTA, contextual reason)
   - Exam countdown strip (3 closest exams, horizontal)
   - 3 modules: Today's plan · Recall queue · Recent notes
3. **Motion pass** (`src/lib/motion.ts`) — shared variants. Staggered list reveals, KPI count-up hook (`useCountUp`), sliding sidebar active indicator (framer-motion `layoutId`).
4. **Empty/loading states** — skeleton shimmer component (`src/components/ui/skeleton-card.tsx`) used in Notes, Quizzes, Analytics. Each empty surface gets an illustration block + one CTA.
5. **Inline sparklines** (`src/components/charts/Sparkline.tsx`) — pure SVG. Used in sidebar courses, KPI stat cards, course detail.
6. **Dark mode** — extend `src/styles.css` with `.dark` tokens. Toggle in topbar (sun/moon). Persisted via `localStorage` + `prefers-color-scheme` fallback.

## B. New flagship features

7. **Exam Prep mode** (`app.exam.tsx` + `app.exam.$examId.tsx`) — list of upcoming exams with predicted readiness ring; detail view shows day-by-day study plan (mixed lectures review, flashcard sets, mock quiz), weak-topic radar, "start today's session" CTA.
8. **SRS Flashcards** (upgrade `app.quizzes.tsx` + new `app.quizzes.$deckId.tsx`) — deck library page + dedicated review session UI: front/back card flip (framer-motion), "Again / Hard / Good / Easy" buttons, queue progress bar, session summary screen with streak.
9. **Smart Notes editor** (`app.notes.$noteId.tsx`) — two-pane layout: contenteditable markdown-style editor left, AI side-panel right with actions (Summarize, Generate flashcards, Find related, Ask about selection). Backlinks footer.
10. **Course detail hub** (`app.courses.$code.tsx`) — per-course page: syllabus accordion, linked notes, decks, upcoming deadlines, performance mini-charts, course-scoped tutor entry.
11. **AI Tutor conversational UI** (rebuild `app.tutor.tsx`) — left rail thread list, center message thread with role bubbles, citations to user's notes, action chips ("Turn into flashcards", "Add to plan"). Mocked streaming via setTimeout token append.
12. **Onboarding flow** (`onboarding.tsx`, layout-less) — 4 steps: School → Program → Courses → Syllabus upload. Progress bar, framer-motion step transitions, finishes by routing to `/app`.

## C. Institutional admin depth

13. **Cohort drill-down** (`admin.cohort.$facultyId.tsx`) — click adoption bar → faculty page with student list table, at-risk segment, intervention queue.
14. **At-risk module** (`admin.atrisk.tsx`) — segmented list: declining engagement, low recall, missed deadlines. Each row: student, signals, recommended action.
15. **Export buttons** — header action on each admin route (PDF / CSV). Mocked via toast confirmation.

## D. Marketing site upgrades

16. **Interactive product tour** on `/platform` — tabbed switcher (Notes / Tutor / Quizzes / Analytics) with animated mock previews.
17. **Pricing page** (`pricing.tsx`) — Student (free) / Student+ / Institution tiers with feature matrix.
18. **Resources/changelog** — populate `/resources` with 5 dated entries (semantic article markup).

## Routing summary (new files)

```
src/routes/
  onboarding.tsx
  pricing.tsx
  app.exam.tsx
  app.exam.$examId.tsx
  app.quizzes.$deckId.tsx
  app.notes.$noteId.tsx
  app.courses.$code.tsx
  admin.atrisk.tsx
  admin.cohort.$facultyId.tsx
```

Plus sidebar updates to surface Exam, Courses; admin sidebar updates to surface At-risk.

## New components

```
src/components/
  app/CommandPalette.tsx
  app/widgets/NextActionCard.tsx
  app/widgets/ExamCountdownStrip.tsx
  app/widgets/RecallQueueCard.tsx
  app/widgets/TodayPlanCard.tsx
  app/widgets/ReadinessRing.tsx
  app/widgets/WeakTopicRadar.tsx
  app/flashcards/ReviewSession.tsx
  app/flashcards/Flashcard.tsx
  app/notes/NoteEditor.tsx
  app/notes/AISidePanel.tsx
  app/tutor/ThreadList.tsx
  app/tutor/MessageThread.tsx
  charts/Sparkline.tsx
  charts/CountUp.tsx
  ui/skeleton-card.tsx
  ui/theme-toggle.tsx
  marketing/ProductTour.tsx
  marketing/PricingTable.tsx
  admin/widgets/AtRiskTable.tsx
```

## Mock data

Create `src/data/` with `courses.ts`, `notes.ts`, `decks.ts`, `exams.ts`, `tutor-threads.ts`, `admin.ts`. All UI reads from these so swapping to real fetches later is trivial.

## Technical details

- **Theme tokens**: `src/styles.css` gains `.dark` with shifted oklch lightness (`--background` ≈ `oklch(0.16 0.02 264)`, `--card` slightly lighter, primary kept saturated). All components already use semantic tokens, so no component edits needed.
- **Command palette**: `cmdk` is shipped with shadcn `command.tsx`. Global keyboard listener registered in `app.tsx` via `useEffect`.
- **Motion**: `framer-motion` already installed. Centralize variants in `src/lib/motion.ts`.
- **Editor**: plain `contentEditable` div with basic markdown shortcuts — no heavyweight editor lib. Keep it visual.
- **Tutor streaming**: simulate token-by-token append via `setInterval` over a canned response string.
- **Sparkline**: SVG `<polyline>`, no chart lib needed.
- **SEO**: every new route gets distinct `head()` with title/description/og.

## Out of scope

- Auth, Lovable Cloud, persistence
- Real AI calls (all tutor/summarize responses are canned)
- Real file upload in onboarding (preview UI only)
- Mobile-first polish — desktop-first per brief

## Order of build

1. Tokens + dark mode + motion lib + skeleton + sparkline
2. Command palette + dashboard redesign + sidebar/topbar polish
3. SRS flashcards + Notes editor + Course detail
4. Exam Prep + AI Tutor rebuild + Onboarding
5. Admin at-risk + cohort + exports
6. Marketing: product tour + pricing + resources

Click **Implement plan** to build.
