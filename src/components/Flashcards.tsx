import { useState } from "react";
import type { VocabWord } from "@/lib/courses-data";
import { Volume2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function Flashcards({ words }: { words: VocabWord[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!words?.length) return null;
  const w = words[i];

  const go = (delta: number) => {
    setFlipped(false);
    setI((v) => (v + delta + words.length) % words.length);
  };

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="rounded-2xl bg-gradient-card p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" /> Hộp từ vựng
        </h3>
        <span className="text-xs font-bold text-muted-foreground">
          {i + 1}/{words.length}
        </span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[180px] rounded-2xl bg-card border-2 border-primary/30 p-6 text-left hover:border-primary transition shadow-soft group"
      >
        {!flipped ? (
          <div className="flex flex-col items-center justify-center text-center gap-2 h-full">
            <p className="font-display text-3xl font-bold text-primary">{w.word}</p>
            <p className="text-sm text-muted-foreground">{w.ipa}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(w.word);
              }}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition"
            >
              <Volume2 className="h-3.5 w-3.5" /> Nghe
            </button>
            <p className="text-xs text-muted-foreground mt-2 opacity-70 group-hover:opacity-100">
              Click để lật thẻ →
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Nghĩa</p>
              <p className="font-display text-xl font-bold">{w.meaning}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Ví dụ</p>
              <p className="text-sm italic">"{w.example}"</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(w.example);
                }}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <Volume2 className="h-3 w-3" /> Nghe ví dụ
              </button>
            </div>
          </div>
        )}
      </button>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={() => go(-1)}
          className="inline-flex h-10 items-center gap-1 rounded-xl border-2 border-border bg-card px-4 text-sm font-bold hover:border-primary transition"
        >
          <ChevronLeft className="h-4 w-4" /> Trước
        </button>
        <div className="flex-1 flex justify-center gap-1">
          {words.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-1.5 bg-muted"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="inline-flex h-10 items-center gap-1 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground hover:scale-105 transition"
        >
          Sau <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
