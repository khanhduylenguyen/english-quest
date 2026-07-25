import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { QuickQuiz } from "@/components/QuickQuiz";
import { Roadmap } from "@/components/Roadmap";
import { Leaderboard } from "@/components/Leaderboard";
import { BookOpen, Headphones, MessagesSquare, Zap, Flame, Users } from "lucide-react";
import heroImg from "@/assets/hero-mascot.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EngQuest — Học tiếng Anh vui cho học sinh cấp 2" },
      {
        name: "description",
        content:
          "Nền tảng học tiếng Anh tương tác cho học sinh lớp 6–9. Lộ trình rõ ràng, bài tập sinh động, bảng xếp hạng và phần thưởng mỗi ngày.",
      },
      { property: "og:title", content: "EngQuest — Học tiếng Anh vui cho học sinh cấp 2" },
      {
        property: "og:description",
        content:
          "Chinh phục tiếng Anh với lộ trình bản đồ kho báu, mascot đồng hành và bài kiểm tra thông minh.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-pop-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-4 py-1.5 text-xs font-bold text-accent-foreground">
                <Flame className="h-3.5 w-3.5" /> Dành cho học sinh lớp 6 – 9
              </span>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Chinh phục Tiếng Anh,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  mở cửa tương lai
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-lg">
                Học tiếng Anh qua trò chơi, bản đồ phiêu lưu và mascot đồng hành. Mỗi ngày 15 phút —
                giỏi tiếng Anh không khó!
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="inline-flex h-12 items-center rounded-2xl bg-gradient-accent px-7 font-bold text-accent-foreground shadow-pop-accent hover:translate-y-1 hover:shadow-none transition-all"
                >
                  🚀 Bắt đầu miễn phí
                </Link>
                <a
                  href="#try"
                  className="inline-flex h-12 items-center rounded-2xl bg-card border-2 border-border px-7 font-bold text-foreground hover:border-primary hover:-translate-y-0.5 transition-all"
                >
                  Thử ngay 3 câu
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>
                    <b className="text-foreground">12,500+</b>{" "}
                    <span className="text-muted-foreground">học sinh</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-warning" />
                  <span>
                    <b className="text-foreground">98%</b>{" "}
                    <span className="text-muted-foreground">yêu thích</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-hero rounded-[3rem] blur-2xl opacity-60" />
              <img
                src={heroImg}
                alt="Linh vật EngQuest cùng các bé học tiếng Anh"
                width={1280}
                height={1024}
                className="relative rounded-[2.5rem] shadow-glow animate-float w-full"
              />
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-card p-3 shadow-pop animate-wiggle border border-border">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🔥</div>
                  <div>
                    <p className="text-xs text-muted-foreground">Streak</p>
                    <p className="font-display font-bold">14 ngày</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-2 rounded-2xl bg-card p-3 shadow-pop-accent border border-border">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <p className="text-xs text-muted-foreground">XP hôm nay</p>
                    <p className="font-display font-bold">+120</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: BookOpen,
              title: "Từ vựng vui",
              desc: "Học qua flashcard & game",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Headphones,
              title: "Luyện nghe",
              desc: "Hội thoại đời thường",
              color: "bg-accent/15 text-accent-foreground",
            },
            {
              icon: MessagesSquare,
              title: "Luyện nói",
              desc: "AI chấm phát âm",
              color: "bg-success/15 text-success-foreground",
            },
            {
              icon: Zap,
              title: "Ngữ pháp",
              desc: "Bài tập thông minh",
              color: "bg-warning/15 text-warning-foreground",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-gradient-card p-5 border border-border/50 shadow-soft hover:-translate-y-1 transition-transform"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.color} mb-3`}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary mb-3">
            🗺️ Bản đồ học tập
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Lộ trình từ Lớp 6 đến Lớp 9
          </h2>
          <p className="mt-3 text-muted-foreground">
            Mỗi cấp độ là một trạm dừng chân — vượt qua thử thách để mở khóa kho báu tiếp theo.
          </p>
        </div>
        <Roadmap />
      </section>

      {/* QUIZ + LEADERBOARD */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div id="try">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1 text-xs font-bold text-accent-foreground mb-3">
              ⚡ Thử ngay
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Làm thử 3 câu — Không cần đăng nhập
            </h2>
            <p className="text-muted-foreground mb-6">
              Kiểm tra trình độ trong 30 giây và xem bạn ở cấp độ nào.
            </p>
            <QuickQuiz />
          </div>
          <div id="leaderboard">
            <span className="inline-block rounded-full bg-warning/20 px-4 py-1 text-xs font-bold text-warning-foreground mb-3">
              🏆 Vinh danh
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Bảng xếp hạng tuần</h2>
            <p className="text-muted-foreground mb-6">
              Học chăm — leo top — nhận huy hiệu siêu sao!
            </p>
            <Leaderboard />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-[2.5rem] bg-gradient-hero p-10 md:p-16 text-center shadow-glow relative overflow-hidden">
          <div className="absolute top-6 left-10 text-5xl animate-float">📚</div>
          <div className="absolute bottom-8 right-12 text-5xl animate-wiggle">🎯</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Sẵn sàng cho cuộc phiêu lưu?
          </h2>
          <p className="mt-3 text-foreground/80 max-w-xl mx-auto">
            Tham gia cùng hàng nghìn học sinh đang chinh phục tiếng Anh mỗi ngày.
          </p>
          <Link
            to="/signup"
            className="mt-7 inline-flex h-14 items-center rounded-2xl bg-foreground px-8 text-base font-bold text-background shadow-pop hover:translate-y-1 hover:shadow-none transition-all"
          >
            Tạo tài khoản miễn phí →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
