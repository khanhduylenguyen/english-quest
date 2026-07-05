import { getProgress } from "./progress";
import { COURSES } from "./courses-data";

export type Badge = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  check: (ctx: BadgeContext) => boolean;
};

type BadgeContext = {
  completedLessonsCount: number;
  quizzesTakenCount: number;
  perfectQuizzesCount: number;
  completedCourses: number;
  streak: number;
};

export const BADGES: Badge[] = [
  {
    id: "first-lesson",
    title: "Bước đầu tiên",
    description: "Hoàn thành bài học đầu tiên",
    emoji: "🎯",
    check: (c) => c.completedLessonsCount >= 1,
  },
  {
    id: "quiz-master",
    title: "Chiến binh Quiz",
    description: "Hoàn thành 5 bài Quiz",
    emoji: "⚔️",
    check: (c) => c.quizzesTakenCount >= 5,
  },
  {
    id: "perfect-score",
    title: "Điểm tuyệt đối",
    description: "Đạt 100% một bài Quiz",
    emoji: "💯",
    check: (c) => c.perfectQuizzesCount >= 1,
  },
  {
    id: "perfect-x3",
    title: "Vô đối",
    description: "3 bài Quiz đạt 100%",
    emoji: "🌟",
    check: (c) => c.perfectQuizzesCount >= 3,
  },
  {
    id: "streak-7",
    title: "Kiên trì 7 ngày",
    description: "Giữ streak 7 ngày liên tục",
    emoji: "🔥",
    check: (c) => c.streak >= 7,
  },
  {
    id: "course-complete",
    title: "Nhà thám hiểm",
    description: "Hoàn thành trọn một khoá học",
    emoji: "🏆",
    check: (c) => c.completedCourses >= 1,
  },
];

export function getBadgeContext(streak = 0): BadgeContext {
  const p = getProgress();
  const completedLessonsCount = Object.keys(p.completedLessons).length;
  const scores = Object.values(p.quizScores);
  const quizzesTakenCount = scores.length;
  const perfectQuizzesCount = scores.filter((s) => s.correct === s.total && s.total > 0).length;

  let completedCourses = 0;
  for (const course of COURSES) {
    const done = course.lessons.every((l) => p.completedLessons[`${course.id}:${l.id}`]);
    if (done) completedCourses += 1;
  }

  return { completedLessonsCount, quizzesTakenCount, perfectQuizzesCount, completedCourses, streak };
}

export function getEarnedBadges(streak = 0) {
  const ctx = getBadgeContext(streak);
  return BADGES.map((b) => ({ ...b, earned: b.check(ctx) }));
}
