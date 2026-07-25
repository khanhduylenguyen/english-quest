import { api, getToken } from "./api";

const KEY = "engquest-progress-v1";
const SHADOW_KEY = "engquest-progress-pending";

type Progress = {
  completedLessons: Record<string, true>; // key: `${courseId}:${lessonId}`
  quizScores: Record<string, { correct: number; total: number }>; // key: `${courseId}:${lessonId}`
};

function read(): Progress {
  if (typeof window === "undefined") return { completedLessons: {}, quizScores: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completedLessons: {}, quizScores: {} };
    return JSON.parse(raw);
  } catch {
    return { completedLessons: {}, quizScores: {} };
  }
}

function write(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("engquest-progress"));
}

export function getProgress() {
  return read();
}

// Pending changes made while logged-out: replay on next login.
function readPending(): Progress {
  if (typeof window === "undefined") return { completedLessons: {}, quizScores: {} };
  try {
    const raw = localStorage.getItem(SHADOW_KEY);
    return raw ? JSON.parse(raw) : { completedLessons: {}, quizScores: {} };
  } catch {
    return { completedLessons: {}, quizScores: {} };
  }
}

function writePending(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHADOW_KEY, JSON.stringify(p));
}

function clearPending() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SHADOW_KEY);
}

function syncIfLoggedIn(payload: { type: string; courseId: string; lessonId: string; correct?: number; total?: number }) {
  if (!getToken()) {
    // Queue pending change so it can be replayed on login.
    const pending = readPending();
    if (payload.type === "complete_lesson") {
      const key = `${payload.courseId}:${payload.lessonId}`;
      pending.completedLessons[key] = true;
    } else if (payload.type === "quiz_score") {
      const key = `${payload.courseId}:${payload.lessonId}`;
      const prev = pending.quizScores[key];
      const correct = payload.correct ?? 0;
      const total = payload.total ?? 0;
      if (!prev || prev.correct < correct) {
        pending.quizScores[key] = { correct, total };
      }
    }
    writePending(pending);
    return;
  }
  // Fire-and-forget; backend is the source of truth once logged in.
  api("/api/progress", { method: "POST", body: payload }).catch((err) => {
    console.warn("[progress] sync failed:", err.message);
  });
}

export function markLessonComplete(courseId: string, lessonId: string) {
  const p = read();
  p.completedLessons[`${courseId}:${lessonId}`] = true;
  write(p);
  syncIfLoggedIn({ type: "complete_lesson", courseId, lessonId });
}

export function isLessonComplete(courseId: string, lessonId: string) {
  return !!read().completedLessons[`${courseId}:${lessonId}`];
}

export function saveQuizScore(courseId: string, lessonId: string, correct: number, total: number) {
  const p = read();
  const key = `${courseId}:${lessonId}`;
  const prev = p.quizScores[key];
  if (!prev || prev.correct < correct) {
    p.quizScores[key] = { correct, total };
  }
  write(p);
  syncIfLoggedIn({ type: "quiz_score", courseId, lessonId, correct, total });
}

export function getQuizScore(courseId: string, lessonId: string) {
  return read().quizScores[`${courseId}:${lessonId}`] ?? null;
}

export function getCourseProgress(courseId: string, totalLessons: number) {
  const p = read();
  const done = Object.keys(p.completedLessons).filter((k) => k.startsWith(`${courseId}:`)).length;
  return {
    done,
    total: totalLessons,
    percent: totalLessons === 0 ? 0 : Math.round((done / totalLessons) * 100),
  };
}

/**
 * Pull authoritative progress from the server and merge into localStorage.
 * Replays any pending changes made while logged-out.
 */
export async function syncFromServer() {
  const token = getToken();
  if (!token) return null;
  try {
    const { user } = await api("/api/progress");
    const local = read();
    const merged: Progress = {
      completedLessons: { ...user.completedLessons, ...local.completedLessons },
      quizScores: { ...user.quizScores, ...local.quizScores },
    };
    write(merged);

    // Replay pending offline changes
    const pending = readPending();
    const ops: Promise<unknown>[] = [];
    for (const key of Object.keys(pending.completedLessons)) {
      const [courseId, lessonId] = key.split(":");
      ops.push(
        api("/api/progress", {
          method: "POST",
          body: { type: "complete_lesson", courseId, lessonId },
        }).catch(() => null),
      );
    }
    for (const [key, score] of Object.entries(pending.quizScores)) {
      const [courseId, lessonId] = key.split(":");
      ops.push(
        api("/api/progress", {
          method: "POST",
          body: {
            type: "quiz_score",
            courseId,
            lessonId,
            correct: score.correct,
            total: score.total,
          },
        }).catch(() => null),
      );
    }
    if (ops.length > 0) {
      await Promise.all(ops);
      clearPending();
      // Pull again to reflect any XP/streak changes
      const fresh = await api("/api/progress");
      write({
        completedLessons: fresh.user.completedLessons,
        quizScores: fresh.user.quizScores,
      });
    }
    return user;
  } catch (err: any) {
    console.warn("[progress] sync from server failed:", err?.message ?? err);
    return null;
  }
}
