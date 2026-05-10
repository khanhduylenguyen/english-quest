import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getLesson } from "@/lib/courses-data";
import { saveQuizScore, markLessonComplete } from "@/lib/progress";
import { ArrowLeft, Check, X, Trophy, RotateCcw, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/learn/$courseId/$lessonId/quiz")({
  loader: ({ params }) => {
    const data = getLesson(params.courseId, params.lessonId);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Quiz: ${loaderData?.lesson.title ?? ""} — EngQuest` }],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { course, lesson, next } = Route.useLoaderData();
  const navigate = useNavigate();
  const questions = lesson.quiz;

  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const correctCount = answers.reduce<number>((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0);
  const allAnswered = answers.every((a) => a !== null);

  const submit = () => {
    setSubmitted(true);
    saveQuizScore(course.id, lesson.id, correctCount, questions.length);
    markLessonComplete(course.id, lesson.id);
  };

  const reset = () => {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
    setCurrent(0);
  };

  if (submitted) {
    const passed = correctCount / questions.length >= 0.6;
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
        <div className="w-full max-w-lg rounded-3xl bg-card p-8 shadow-glow text-center">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full mb-4 ${passed ? "bg-gradient-success" : "bg-warning/20"}`}>
            <Trophy className={`h-10 w-10 ${passed ? "text-success-foreground" : "text-warning-foreground"}`} />
          </div>
          <h1 className="font-display text-3xl font-bold">{passed ? "Tuyệt vời! 🎉" : "Cố gắng thêm nhé!"}</h1>
          <p className="text-muted-foreground mt-2">Bạn đã trả lời đúng</p>
          <p className="font-display text-5xl font-bold text-primary mt-3">
            {correctCount}<span className="text-muted-foreground text-3xl">/{questions.length}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">+{correctCount * 10} XP</p>

          <div className="mt-6 space-y-2 text-left">
            {questions.map((q: any, i: number) => {
              const ok = answers[i] === q.answer;
              return (
                <div key={i} className={`flex items-start gap-2 rounded-xl p-3 text-sm ${ok ? "bg-success/10" : "bg-destructive/10"}`}>
                  {ok ? <Check className="h-4 w-4 text-success mt-0.5 shrink-0" /> : <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-semibold">{q.question}</p>
                    {!ok && <p className="text-xs text-muted-foreground mt-0.5">Đáp án đúng: <b>{q.options[q.answer]}</b></p>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <button onClick={reset} className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-border bg-card font-bold hover:border-primary transition">
              <RotateCcw className="h-4 w-4" /> Làm lại
            </button>
            {next ? (
              <button
                onClick={() => navigate({ to: "/learn/$courseId/$lessonId", params: { courseId: course.id, lessonId: next.id } })}
                className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-pop hover:translate-y-0.5 transition"
              >
                Bài tiếp theo <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/dashboard"
                className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-success text-success-foreground font-bold shadow-pop hover:translate-y-0.5 transition"
              >
                Xem tiến độ <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + (answers[current] !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="bg-background/80 backdrop-blur border-b border-border/50">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            to="/learn/$courseId/$lessonId"
            params={{ courseId: course.id, lessonId: lesson.id }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại bài học
          </Link>
          <div className="ml-auto text-xs font-bold text-muted-foreground">
            Câu {current + 1}/{questions.length}
          </div>
        </div>
        <div className="h-1.5 w-full bg-muted">
          <div className="h-full bg-gradient-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl w-full flex flex-col">
        <div className="rounded-3xl bg-card p-6 md:p-8 shadow-glow flex-1">
          <p className="text-xs font-bold text-primary uppercase tracking-wide">Quiz · {lesson.title}</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-2">{q.question}</h1>

          <div className="mt-6 space-y-3">
            {q.options.map((opt: string, i: number) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers((arr) => arr.map((a, idx) => (idx === current ? i : a)))}
                  className={`w-full text-left rounded-2xl p-4 border-2 font-semibold transition ${
                    selected ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                      selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-border bg-card px-5 font-bold text-sm disabled:opacity-40 disabled:pointer-events-none hover:border-primary transition"
          >
            <ArrowLeft className="h-4 w-4" /> Câu trước
          </button>
          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              disabled={answers[current] === null}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-bold text-sm text-primary-foreground disabled:opacity-40 disabled:pointer-events-none hover:scale-105 transition"
            >
              Câu tiếp <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!allAnswered}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-success px-6 font-bold text-sm text-success-foreground shadow-pop disabled:opacity-40 disabled:pointer-events-none hover:translate-y-0.5 transition"
            >
              Nộp bài <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
