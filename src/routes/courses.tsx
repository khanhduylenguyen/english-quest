import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { COURSES } from "@/lib/courses-data";
import { getCourseProgress } from "@/lib/progress";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Khóa học — EngQuest" },
      {
        name: "description",
        content: "Danh sách khóa học tiếng Anh cho học sinh cấp 2 từ lớp 6 đến lớp 9.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("engquest-progress", handler);
    setTick(1);
    return () => window.removeEventListener("engquest-progress", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container mx-auto px-4 py-10 flex-1">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4">
            <Sparkles className="h-4 w-4" /> Khóa học theo khối lớp
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Chọn khóa học của bạn</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Mỗi khóa học gồm video bài giảng, bài quiz và theo dõi tiến độ tự động.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6" key={tick}>
          {COURSES.map((c) => {
            const p = getCourseProgress(c.id, c.lessons.length);
            return (
              <Link
                key={c.id}
                to="/courses/$courseId"
                params={{ courseId: c.id }}
                className="group rounded-3xl bg-gradient-card p-6 border border-border/50 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-3xl shadow-pop shrink-0`}
                  >
                    {c.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-bold">
                        {c.grade}
                      </span>
                      <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-xs font-bold">
                        {c.level}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-bold mt-2">{c.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> {c.lessons.length} bài học
                  </span>
                  <span>
                    {p.done}/{p.total} hoàn thành · {p.percent}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-success transition-all"
                    style={{ width: `${p.percent}%` }}
                  />
                </div>

                <div className="mt-5 flex items-center justify-end text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  Vào học{" "}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
