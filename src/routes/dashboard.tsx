import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Leaderboard } from "@/components/Leaderboard";
import { Flame, Target, BookOpen, Headphones, MessagesSquare, Lightbulb, Check, Trophy, Star } from "lucide-react";
import owl from "@/assets/mascot-owl.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Bàn học của bạn — EngQuest" },
      { name: "description", content: "Theo dõi tiến độ, streak và nhiệm vụ học tiếng Anh hằng ngày của bạn." },
    ],
  }),
  component: Dashboard,
});

const TASKS = [
  { icon: BookOpen, title: "Học 5 từ vựng mới", xp: 20, done: true },
  { icon: Headphones, title: "Nghe đoạn hội thoại 'At the cafe'", xp: 30, done: true },
  { icon: MessagesSquare, title: "Luyện nói: Self-introduction", xp: 25, done: false },
  { icon: Target, title: "Bài tập ngữ pháp: Past Simple", xp: 35, done: false },
  { icon: Trophy, title: "Thử thách tốc độ: 10 câu trong 60s", xp: 50, done: false },
];

const WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function Dashboard() {
  const completed = TASKS.filter((t) => t.done).length;
  const totalXP = TASKS.filter((t) => t.done).reduce((s, t) => s + t.xp, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Welcome */}
        <div className="rounded-3xl bg-gradient-hero p-6 md:p-8 shadow-glow flex items-center gap-4 md:gap-6 relative overflow-hidden">
          <img src={owl} alt="Mascot" width={120} height={120} className="w-20 h-20 md:w-28 md:h-28 animate-float" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground/70">Chào buổi sáng,</p>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Minh Anh ơi! ✨</h1>
            <p className="text-sm text-foreground/80 mt-1">Hôm nay bạn đã sẵn sàng chinh phục thử thách mới chưa?</p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 bg-card/70 backdrop-blur rounded-2xl px-5 py-3 border border-white/40">
            <div className="flex items-center gap-1.5">
              <Flame className="h-5 w-5 text-warning" />
              <span className="font-display text-2xl font-bold">14</span>
            </div>
            <p className="text-xs font-semibold text-muted-foreground">ngày liên tiếp</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard icon={Flame} label="Streak" value="14" sub="ngày 🔥" tone="warning" />
          <StatCard icon={Star} label="Tổng XP" value="2,450" sub="kim cương ⭐" tone="primary" />
          <StatCard icon={Trophy} label="Hạng tuần" value="#3" sub="của 12,500" tone="accent" />
          <StatCard icon={Target} label="Tiến độ Lớp 7" value="68%" sub="hoàn thành" tone="success" />
        </div>

        {/* Streak calendar */}
        <div className="mt-6 rounded-3xl bg-gradient-card p-6 border border-border/50 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Flame className="h-5 w-5 text-warning" /> Chuỗi ngày học
            </h2>
            <span className="text-xs font-semibold text-muted-foreground">Tuần này</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {WEEK.map((d, i) => {
              const active = i < 5;
              const today = i === 4;
              return (
                <div key={d} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">{d}</span>
                  <div className={`w-full aspect-square rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                    today ? "bg-gradient-accent text-accent-foreground shadow-pop-accent scale-110"
                    : active ? "bg-gradient-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    {active ? "🔥" : "·"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Daily tasks */}
          <div className="lg:col-span-2 rounded-3xl bg-gradient-card p-6 border border-border/50 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Nhiệm vụ hôm nay
              </h2>
              <span className="rounded-full bg-success/15 text-success-foreground px-3 py-1 text-xs font-bold">
                {completed}/{TASKS.length} · +{totalXP} XP
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden mb-5">
              <div className="h-full bg-gradient-success transition-all duration-500" style={{ width: `${(completed / TASKS.length) * 100}%` }} />
            </div>
            <ul className="space-y-2.5">
              {TASKS.map((t, i) => (
                <li key={i} className={`flex items-center gap-3 rounded-2xl p-3 border-2 transition ${
                  t.done ? "bg-success/10 border-success/30" : "bg-card border-border hover:border-primary hover:-translate-y-0.5"
                }`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.done ? "bg-gradient-success" : "bg-primary/10"}`}>
                    {t.done ? <Check className="h-5 w-5 text-success-foreground" /> : <t.icon className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${t.done ? "line-through opacity-70" : ""}`}>{t.title}</p>
                    <p className="text-xs text-muted-foreground">+{t.xp} XP</p>
                  </div>
                  {!t.done && (
                    <button className="rounded-xl bg-gradient-primary px-4 h-9 text-xs font-bold text-primary-foreground shadow-soft hover:scale-105 transition">
                      Bắt đầu
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Smart suggestion + Leaderboard */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-accent p-6 shadow-pop-accent relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-20">💡</div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/30 backdrop-blur">
                  <Lightbulb className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-display text-base font-bold text-accent-foreground">Gợi ý thông minh</h3>
              </div>
              <p className="text-sm text-accent-foreground/90">
                Bạn đã lâu không ôn lại <b>Thì Hiện Tại Đơn</b>. Thử bài kiểm tra nhanh 5 phút nhé?
              </p>
              <Link to="/dashboard" className="mt-4 inline-flex h-10 items-center rounded-xl bg-foreground px-4 text-sm font-bold text-background shadow-soft hover:translate-y-0.5 transition">
                Làm bài ngay →
              </Link>
            </div>

            <Leaderboard />
          </div>
        </div>

        {/* Continue learning */}
        <div className="mt-6 rounded-3xl bg-gradient-primary p-8 text-center shadow-glow">
          <p className="text-primary-foreground/80 text-sm font-semibold uppercase tracking-wide">Tiếp tục bài học</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mt-1">Unit 5: My Hobbies</h2>
          <p className="text-primary-foreground/80 mt-2">Bài 3/8 · Past Simple với động từ thường</p>
          <button className="mt-5 inline-flex h-12 items-center rounded-2xl bg-foreground px-7 font-bold text-background shadow-pop hover:translate-y-1 hover:shadow-none transition-all">
            ▶ Tiếp tục học
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, tone }: { icon: typeof Flame; label: string; value: string; sub: string; tone: "primary" | "accent" | "success" | "warning" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent-foreground",
    success: "bg-success/15 text-success-foreground",
    warning: "bg-warning/15 text-warning-foreground",
  };
  return (
    <div className="rounded-2xl bg-gradient-card p-5 border border-border/50 shadow-soft">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="font-display text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
