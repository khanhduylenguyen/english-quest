import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLesson, type Lesson, type QuizQuestion } from "@/lib/courses-data";
import { isLessonComplete, markLessonComplete } from "@/lib/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Menu,
  X,
  BookOpen,
  Trophy,
} from "lucide-react";
import { Flashcards } from "@/components/Flashcards";

export const Route = createFileRoute("/learn/$courseId/$lessonId")({
  loader: ({ params }) => {
    const data = getLesson(params.courseId, params.lessonId);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.lesson.title ?? "Bài học"} — EngQuest` }],
  }),
  component: LearningPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Link to="/courses" className="text-primary font-bold">
        ← Quay lại
      </Link>
    </div>
  ),
});

function LearningPage() {
  const { course, lesson, index, next, prev } = Route.useLoaderData();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const h = () => setTick((t) => t + 1);
    window.addEventListener("engquest-progress", h);
    setTick(1);
    return () => window.removeEventListener("engquest-progress", h);
  }, []);

  const handleComplete = () => {
    markLessonComplete(course.id, lesson.id);
    navigate({
      to: "/learn/$courseId/$lessonId/quiz",
      params: { courseId: course.id, lessonId: lesson.id },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" key={tick}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border/50">
        <div className="flex h-14 items-center px-4 gap-3">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link
            to="/courses/$courseId"
            params={{ courseId: course.id }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">{course.title}</span>
            <span className="sm:hidden">Quay lại</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 text-xs font-bold text-muted-foreground">
            Bài {index + 1}/{course.lessons.length}
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-14 left-0 z-20 w-72 h-[calc(100vh-3.5rem)] bg-card border-r border-border/50 overflow-y-auto transition-transform`}
        >
          <div className="p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
              {course.grade}
            </p>
            <h2 className="font-display font-bold leading-tight">{course.title}</h2>
          </div>
          <nav className="p-2 space-y-1">
            {course.lessons.map((l: Lesson, i: number) => {
              const done = isLessonComplete(course.id, l.id);
              const active = l.id === lesson.id;
              return (
                <Link
                  key={l.id}
                  to="/learn/$courseId/$lessonId"
                  params={{ courseId: course.id, lessonId: l.id }}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl p-3 text-sm transition ${
                    active
                      ? "bg-primary text-primary-foreground font-bold shadow-soft"
                      : "hover:bg-muted"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg shrink-0 ${
                      active ? "bg-white/25" : done ? "bg-success/20" : "bg-muted"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <span
                        className={`text-xs font-bold ${active ? "text-primary-foreground" : "text-muted-foreground"}`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{l.title}</p>
                    <p
                      className={`text-xs truncate ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {l.duration}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 top-14 z-10 bg-foreground/40"
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 md:p-8 max-w-4xl mx-auto w-full">
          {/* Video */}
          <div className="rounded-2xl overflow-hidden bg-foreground shadow-glow aspect-video">
            <video
              key={lesson.id}
              src={lesson.videoUrl}
              controls
              poster=""
              className="w-full h-full object-cover"
            >
              Trình duyệt không hỗ trợ video.
            </video>
          </div>

          {/* Title */}
          <div className="mt-6">
            <p className="text-xs font-bold text-primary uppercase tracking-wide">
              Bài {index + 1} · {lesson.duration}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{lesson.title}</h1>
            <p className="text-muted-foreground mt-2">{lesson.description}</p>
          </div>

          {/* Flashcards */}
          {lesson.vocabulary?.length > 0 && (
            <div className="mt-6">
              <Flashcards words={lesson.vocabulary} />
            </div>
          )}

          {/* Notes */}
          <div className="mt-6 rounded-2xl bg-gradient-card p-6 border border-border/50">
            <h3 className="font-display text-lg font-bold flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" /> Ghi chú bài học
            </h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li className="flex gap-2">
                <span className="text-primary">•</span> Xem video kỹ và lặp lại các từ mới.
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span> Lật thẻ từ vựng ở trên và bấm 🔊 để luyện
                phát âm.
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span> Hoàn thành quiz cuối bài để mở khoá danh
                hiệu.
              </li>
            </ul>
          </div>

          {/* Action */}
          <div className="mt-8 rounded-2xl bg-gradient-primary p-6 text-center shadow-glow">
            <Trophy className="h-10 w-10 text-primary-foreground mx-auto mb-2" />
            <p className="font-display text-xl font-bold text-primary-foreground">
              Sẵn sàng làm quiz?
            </p>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Trả lời {lesson.quiz.length} câu hỏi để hoàn thành bài học.
            </p>
            <button
              onClick={handleComplete}
              className="mt-4 inline-flex h-12 items-center gap-2 rounded-2xl bg-foreground px-7 font-bold text-background shadow-pop hover:translate-y-1 hover:shadow-none transition-all"
            >
              Làm quiz <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {prev ? (
              <Link
                to="/learn/$courseId/$lessonId"
                params={{ courseId: course.id, lessonId: prev.id }}
                className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-border bg-card px-5 font-bold text-sm hover:border-primary transition"
              >
                <ArrowLeft className="h-4 w-4" /> Bài trước
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to="/learn/$courseId/$lessonId"
                params={{ courseId: course.id, lessonId: next.id }}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-bold text-sm text-primary-foreground hover:scale-105 transition"
              >
                Bài tiếp theo <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                to="/courses/$courseId"
                params={{ courseId: course.id }}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-success px-5 font-bold text-sm text-success-foreground hover:scale-105 transition"
              >
                <PlayCircle className="h-4 w-4" /> Hoàn thành khóa học
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
