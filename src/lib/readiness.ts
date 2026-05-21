import { courses } from "@/data/courses";
import { decks } from "@/data/decks";
import { mockExams } from "@/data/mock-exams";
import { exams } from "@/data/exams";
import { readStorage, StorageKeys } from "@/lib/storage";

export interface MockAttempt {
  examId: string;
  score: number;
  takenAt: number;
  sectionScores?: { name: string; score: number }[];
  weakTopics?: string[];
}

export type AttemptsMap = Record<string, MockAttempt[]>;

// Pure derived readiness: 0-100
// 40% coverage (course progress) + 30% recall (deck mastery) + 30% practice (mock exam avg)
export function readinessForExam(examCode: string, attempts?: AttemptsMap): number {
  const course = courses.find((c) => c.code === examCode);
  const coverage = course?.progress ?? 0;

  const courseDecks = decks.filter((d) => d.code === examCode);
  const recall = courseDecks.length
    ? Math.round(
        courseDecks.reduce((s, d) => {
          const total = d.mastered + d.cards.length;
          return s + (total ? (d.mastered / total) * 100 : 0);
        }, 0) / courseDecks.length
      )
    : 0;

  const examMocks = mockExams.filter((m) => m.code === examCode);
  const a = attempts ?? readStorage<AttemptsMap>(StorageKeys.attempts, {});
  const mockScores = examMocks.flatMap((m) => {
    const stored = a[m.id]?.map((x) => x.score) ?? [];
    if (stored.length) return stored;
    return m.lastScore !== null ? [m.lastScore] : [];
  });
  const practice = mockScores.length
    ? Math.round(mockScores.reduce((s, x) => s + x, 0) / mockScores.length)
    : 0;

  return Math.round(0.4 * coverage + 0.3 * recall + 0.3 * practice);
}

export function readinessBreakdown(examCode: string, attempts?: AttemptsMap) {
  const course = courses.find((c) => c.code === examCode);
  const coverage = course?.progress ?? 0;
  const courseDecks = decks.filter((d) => d.code === examCode);
  const recall = courseDecks.length
    ? Math.round(
        courseDecks.reduce((s, d) => {
          const total = d.mastered + d.cards.length;
          return s + (total ? (d.mastered / total) * 100 : 0);
        }, 0) / courseDecks.length
      )
    : 0;
  const examMocks = mockExams.filter((m) => m.code === examCode);
  const a = attempts ?? readStorage<AttemptsMap>(StorageKeys.attempts, {});
  const mockScores = examMocks.flatMap((m) => {
    const stored = a[m.id]?.map((x) => x.score) ?? [];
    if (stored.length) return stored;
    return m.lastScore !== null ? [m.lastScore] : [];
  });
  const practice = mockScores.length
    ? Math.round(mockScores.reduce((s, x) => s + x, 0) / mockScores.length)
    : 0;
  return { coverage, recall, practice, total: Math.round(0.4 * coverage + 0.3 * recall + 0.3 * practice) };
}

export function liveExamReadiness() {
  return exams.map((e) => ({ ...e, readiness: readinessForExam(e.code) || e.readiness }));
}
