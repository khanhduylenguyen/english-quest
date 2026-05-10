const KEY = "engquest-progress-v1";

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

export function markLessonComplete(courseId: string, lessonId: string) {
  const p = read();
  p.completedLessons[`${courseId}:${lessonId}`] = true;
  write(p);
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
}

export function getQuizScore(courseId: string, lessonId: string) {
  return read().quizScores[`${courseId}:${lessonId}`] ?? null;
}

export function getCourseProgress(courseId: string, totalLessons: number) {
  const p = read();
  const done = Object.keys(p.completedLessons).filter((k) => k.startsWith(`${courseId}:`)).length;
  return { done, total: totalLessons, percent: totalLessons === 0 ? 0 : Math.round((done / totalLessons) * 100) };
}
