import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { getCourse } from "@/lib/courses-data";
import { getCourseProgress, isLessonComplete, getQuizScore } from "@/lib/progress";
import { ArrowLeft, PlayCircle, CheckCircle2, Clock, Trophy, Lock } from "lucide-react";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.title ?? "Khóa học"} — EngQuest` },
      { name: "description", content: loaderData?.course.description ?? "" },
    ],
  }),
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Không tìm thấy khóa học</h1>
        <Link to="/courses" className="text-primary font-bold mt-4 inline-block">← Quay lại danh sách</Link>
      </div>
    </div>
  ),
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("engquest-progress", handler);
    setTick(1);
    return () => window.removeEventListener("engquest-progress", handler);
  }, []);

  const progress = getCourseProgress(course.id, course.lessons.length);
  const firstIncomplete = course.lessons.find((l) => !isLessonComplete(course.id, l.id)) ?? course.lessons[0];

  return (
    <div className="min-h-screen flex flex-col" key={tick}>
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Tất cả khóa học
        </Link>

        {/* Hero */}
        <div className={`rounded-3xl bg-gradient-to-br ${course.color} p-8 text-white shadow-glow relative overflow-hidden`}>
          <div className="absolute -right-6 -bottom-6 text-[10rem] opacity-20 leading-none">{course.emoji}</div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-white/25 backdrop-blur px-3 py-1 text-xs font-bold">{course.grade}</span>
              <span className="rounded-full bg-white/25 backdrop-blur px-3 py-1 text-xs font-bold">{course.level}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-3">{course.title}</h1>
            <p className="mt-2 max-w-2xl text-white/90">{course.description}</p>

            <div className="mt-5 flex items-center gap-4 text-sm font-bold">
              <span>{course.lessons.length} bài học</span>
              <span>·</span>
              <span>{progress.percent}% hoàn thành</span>
            </div>

            <Link
              to="/learn/$courseId/$lessonId"
              params={{ courseId: course.id, lessonId: firstIncomplete.id }}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-6 font-bold text-foreground shadow-pop hover:translate-y-1 hover:shadow-none transition-all"
            >
              <PlayCircle className="h-5 w-5" />
              {progress.done > 0 ? "Tiếp tục học" : "Bắt đầu học"}
            </Link>
          </div>
        </div>

        {/* Lessons */}
        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold mb-4">Nội dung khóa học</h2>
          <ul className="space-y-3">
            {course.lessons.map((l, i) => {
              const done = isLessonComplete(course.id, l.id);
              const prevDone = i === 0 || isLessonComplete(course.id, course.lessons[i - 1].id);
              const locked = !prevDone && !done;
              const score = getQuizScore(course.id, l.id);

              const Inner = (
                <div className={`flex items-center gap-4 rounded-2xl p-4 border-2 transition ${
                  done ? "bg-success/10 border-success/30"
                    : locked ? "bg-muted/40 border-border opacity-60"
                    : "bg-card border-border hover:border-primary hover:-translate-y-0.5 hover:shadow-soft"
                }`}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                    done ? "bg-gradient-success" : locked ? "bg-muted" : "bg-primary/10"
                  }`}>
                    {done ? <CheckCircle2 className="h-6 w-6 text-success-foreground" />
                      : locked ? <Lock className="h-5 w-5 text-muted-foreground" />
                      : <PlayCircle className="h-6 w-6 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <span>Bài {i + 1}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {l.duration}</span>
                      {score && (
                        <span className="inline-flex items-center gap-1 text-success-foreground">
                          <Trophy className="h-3 w-3" /> {score.correct}/{score.total}
                        </span>
                      )}
                    </div>
                    <p className="font-bold mt-0.5 truncate">{l.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{l.description}</p>
                  </div>
                  {!locked && (
                    <span className="hidden sm:inline-flex h-9 items-center rounded-xl bg-primary/10 px-4 text-sm font-bold text-primary">
                      {done ? "Học lại" : "Bắt đầu"}
                    </span>
                  )}
                </div>
              );

              return (
                <li key={l.id}>
                  {locked ? Inner : (
                    <Link to="/learn/$courseId/$lessonId" params={{ courseId: course.id, lessonId: l.id }} className="block">
                      {Inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
