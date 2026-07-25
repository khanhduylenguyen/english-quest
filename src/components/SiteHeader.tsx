import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">EngQuest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
          <Link
            to="/"
            activeProps={{ className: "text-primary" }}
            activeOptions={{ exact: true }}
            className="hover:text-primary transition"
          >
            Trang chủ
          </Link>
          <Link
            to="/courses"
            activeProps={{ className: "text-primary" }}
            className="hover:text-primary transition"
          >
            Khóa học
          </Link>
          <a href="/#roadmap" className="hover:text-primary transition">
            Lộ trình
          </a>
          <Link
            to="/dashboard"
            activeProps={{ className: "text-primary" }}
            className="hover:text-primary transition"
          >
            Bàn học
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold text-foreground hover:bg-muted transition"
          >
            Đăng nhập
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-accent px-5 text-sm font-bold text-accent-foreground shadow-pop-accent hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            Bắt đầu miễn phí
          </Link>
        </div>
      </div>
    </header>
  );
}
