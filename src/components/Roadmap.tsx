import { Lock, Star, Trophy } from "lucide-react";

const STAGES = [
  {
    grade: "Lớp 6",
    title: "Khởi đầu",
    desc: "Bảng chữ cái · Chào hỏi · Thì hiện tại đơn",
    color: "from-[oklch(0.85_0.13_180)] to-[oklch(0.78_0.15_165)]",
    icon: "🌱",
    unlocked: true,
  },
  {
    grade: "Lớp 7",
    title: "Khám phá",
    desc: "Quá khứ đơn · Tương lai · 500 từ vựng",
    color: "from-[oklch(0.82_0.14_220)] to-[oklch(0.7_0.17_240)]",
    icon: "🚀",
    unlocked: true,
  },
  {
    grade: "Lớp 8",
    title: "Thử thách",
    desc: "Hiện tại hoàn thành · Bị động · Nghe nâng cao",
    color: "from-[oklch(0.85_0.14_75)] to-[oklch(0.75_0.18_55)]",
    icon: "⚡",
    unlocked: false,
  },
  {
    grade: "Lớp 9",
    title: "Chinh phục",
    desc: "Câu điều kiện · Mệnh đề · Luyện thi vào 10",
    color: "from-[oklch(0.78_0.17_25)] to-[oklch(0.68_0.21_15)]",
    icon: "👑",
    unlocked: false,
  },
];

export function Roadmap() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 hidden md:block h-full w-1 -translate-x-1/2 bg-gradient-to-b from-primary/30 via-accent/30 to-warning/30 rounded-full" />
      <div className="space-y-8 md:space-y-14">
        {STAGES.map((s, i) => (
          <div
            key={s.grade}
            className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="md:w-1/2 w-full">
              <div
                className={`group rounded-3xl bg-gradient-to-br ${s.color} p-6 text-white shadow-glow hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 backdrop-blur text-3xl">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide opacity-90">
                      {s.grade}
                    </p>
                    <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  </div>
                </div>
                <p className="text-sm opacity-95 mb-4">{s.desc}</p>
                <div className="flex items-center gap-2">
                  {s.unlocked ? (
                    <>
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-xs font-bold">Đã mở khóa</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span className="text-xs font-bold opacity-90">Sắp mở</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-pop border-4 border-background z-10">
              <Trophy className="h-5 w-5 text-accent" />
            </div>
            <div className="md:w-1/2 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
