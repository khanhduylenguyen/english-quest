import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";

const QUESTIONS = [
  {
    q: "She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    answer: 1,
  },
  {
    q: "Choose the correct word: I have ___ apple.",
    options: ["a", "an", "the", "some"],
    answer: 1,
  },
  {
    q: "What is the past tense of 'run'?",
    options: ["runned", "ran", "runs", "running"],
    answer: 1,
  },
];

export function QuickQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  if (step >= QUESTIONS.length) {
    return (
      <div className="rounded-3xl bg-gradient-card p-8 text-center shadow-glow border border-border/50 animate-pop-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-accent shadow-pop-accent">
          <Sparkles className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="font-display text-2xl font-bold">Tuyệt vời!</h3>
        <p className="mt-2 text-muted-foreground">
          Bạn đúng{" "}
          <span className="font-bold text-primary">
            {score}/{QUESTIONS.length}
          </span>{" "}
          câu.
        </p>
        <button
          onClick={() => {
            setStep(0);
            setScore(0);
            setPicked(null);
          }}
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-gradient-primary px-6 font-bold text-primary-foreground shadow-pop hover:translate-y-0.5 hover:shadow-none transition-all"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const current = QUESTIONS[step];

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      setStep((s) => s + 1);
    }, 900);
  };

  return (
    <div className="rounded-3xl bg-gradient-card p-6 sm:p-8 shadow-glow border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          Câu {step + 1}/{QUESTIONS.length}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">⚡ Quick Quiz</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-primary transition-all duration-500"
          style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
        />
      </div>
      <p className="font-display text-xl font-semibold mb-5">{current.q}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {current.options.map((opt, i) => {
          const isCorrect = picked !== null && i === current.answer;
          const isWrong = picked === i && i !== current.answer;
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left font-semibold transition-all ${
                isCorrect
                  ? "border-success bg-success/15 text-success-foreground"
                  : isWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-card hover:border-primary hover:-translate-y-0.5"
              }`}
            >
              <span>{opt}</span>
              {isCorrect && <Check className="h-5 w-5" />}
              {isWrong && <X className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
