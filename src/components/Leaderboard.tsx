import { Trophy, Medal, Award } from "lucide-react";

const PLAYERS = [
  { rank: 1, name: "Minh Anh", grade: "Lớp 9", points: 2840, avatar: "🦊" },
  { rank: 2, name: "Bảo Long", grade: "Lớp 8", points: 2615, avatar: "🐼" },
  { rank: 3, name: "Linh Chi", grade: "Lớp 7", points: 2450, avatar: "🐱" },
  { rank: 4, name: "Quang Huy", grade: "Lớp 9", points: 2210, avatar: "🦉" },
  { rank: 5, name: "Thu Hà", grade: "Lớp 6", points: 1980, avatar: "🐨" },
];

const ICONS = [Trophy, Medal, Award];
const COLORS = ["text-warning", "text-muted-foreground", "text-accent"];

export function Leaderboard() {
  return (
    <div className="rounded-3xl bg-gradient-card p-6 shadow-soft border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-xl font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" /> Top tuần này
        </h3>
        <span className="text-xs font-semibold text-muted-foreground">🔥 Live</span>
      </div>
      <ul className="space-y-2">
        {PLAYERS.map((p) => {
          const Icon = p.rank <= 3 ? ICONS[p.rank - 1] : null;
          return (
            <li
              key={p.rank}
              className={`flex items-center gap-3 rounded-2xl p-3 transition ${
                p.rank === 1 ? "bg-gradient-accent/20 border-2 border-accent/40" : "hover:bg-muted"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card font-display font-bold text-sm shadow-soft">
                {Icon ? <Icon className={`h-4 w-4 ${COLORS[p.rank - 1]}`} /> : p.rank}
              </div>
              <div className="text-2xl">{p.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.grade}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-base font-bold text-primary">{p.points.toLocaleString()}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">XP</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
