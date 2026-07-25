import { useEffect, useState } from "react";
import { getEarnedBadges } from "@/lib/badges";
import { Award, Lock } from "lucide-react";

export function BadgesGrid({ streak = 14 }: { streak?: number }) {
  const [badges, setBadges] = useState(() =>
    getEarnedBadges(streak).map((b) => ({ ...b, earned: false })),
  );

  useEffect(() => {
    const refresh = () => setBadges(getEarnedBadges(streak));
    refresh();
    window.addEventListener("engquest-progress", refresh);
    return () => window.removeEventListener("engquest-progress", refresh);
  }, [streak]);

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="rounded-3xl bg-gradient-card p-6 border border-border/50 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <Award className="h-5 w-5 text-warning" /> Danh hiệu
        </h2>
        <span className="rounded-full bg-warning/15 text-warning-foreground px-3 py-1 text-xs font-bold">
          {earnedCount}/{badges.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`rounded-2xl p-3 text-center border-2 transition ${
              b.earned
                ? "bg-gradient-accent/20 border-accent/40 shadow-soft"
                : "bg-muted/40 border-border/50 opacity-60"
            }`}
            title={b.description}
          >
            <div className="text-3xl mb-1 relative inline-block">
              {b.earned ? (
                b.emoji
              ) : (
                <>
                  <span className="grayscale">{b.emoji}</span>
                  <Lock className="h-3 w-3 absolute -bottom-1 -right-1 text-muted-foreground" />
                </>
              )}
            </div>
            <p className="font-bold text-xs leading-tight">{b.title}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
