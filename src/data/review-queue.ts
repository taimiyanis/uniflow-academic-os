import { decks } from "@/data/decks";
import { exercises } from "@/data/exercises";

export type ReviewItemKind = "flashcard" | "quiz-miss" | "exercise";

export interface ReviewItem {
  id: string;
  kind: ReviewItemKind;
  code: string;
  prompt: string;
  answer: string;
  source: string; // human-readable origin
  estSeconds: number;
}

// Pure derived: assemble today's review session from existing mock data.
export function getReviewQueue(): ReviewItem[] {
  const items: ReviewItem[] = [];

  for (const deck of decks) {
    // Take "due" cards from the front
    deck.cards.slice(0, Math.min(deck.due, deck.cards.length)).forEach((c, i) => {
      items.push({
        id: `${deck.id}-${i}`,
        kind: "flashcard",
        code: deck.code,
        prompt: c.front,
        answer: c.back,
        source: deck.title,
        estSeconds: 25,
      });
    });
  }

  // Pull exercises with low mastery as "review"
  exercises
    .filter((e) => e.mastery < 70)
    .slice(0, 3)
    .forEach((e) => {
      items.push({
        id: `ex-${e.id}`,
        kind: "exercise",
        code: e.code,
        prompt: e.prompt,
        answer: e.steps.map((s) => `${s.prompt} → ${s.reveal}`).join("\n"),
        source: `${e.chapter} · exercise`,
        estSeconds: 90,
      });
    });

  return items;
}
