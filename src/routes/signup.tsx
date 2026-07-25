import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import owl from "@/assets/mascot-owl.png";
import fox from "@/assets/mascot-fox.png";
import panda from "@/assets/mascot-panda.png";
import cat from "@/assets/mascot-cat.png";
import { register } from "@/lib/auth";

const MASCOTS = [
  { id: "owl", name: "Cú Khôn", img: owl, desc: "Thông thái" },
  { id: "fox", name: "Cáo Lém", img: fox, desc: "Lanh lợi" },
  { id: "panda", name: "Gấu Trúc", img: panda, desc: "Chăm chỉ" },
  { id: "cat", name: "Mèo Sao", img: cat, desc: "Phép thuật" },
];

const GRADES = [6, 7, 8, 9];

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Đăng ký — EngQuest" },
      {
        name: "description",
        content: "Tạo tài khoản EngQuest miễn phí và bắt đầu cuộc phiêu lưu học tiếng Anh.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState<number | null>(null);
  const [mascot, setMascot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onCreateAccount = async () => {
    setError(null);
    setLoading(true);
    try {
      await register({
        username,
        email,
        password,
        name: username,
        grade,
        mascot,
      });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-30 -z-10" />

      <div className="w-full max-w-2xl animate-pop-in">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">EngQuest</span>
        </Link>

        <div className="rounded-3xl bg-card border border-border/60 p-6 sm:p-8 shadow-glow">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm transition ${
                    step >= n
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > n ? <Check className="h-4 w-4" /> : n}
                </div>
                {n < 3 && (
                  <div
                    className={`h-1 w-10 rounded-full ${step > n ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="mb-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {step === 1 && (
            <div>
              <h1 className="font-display text-2xl font-bold text-center">Tạo tài khoản</h1>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Bắt đầu cuộc phiêu lưu tiếng Anh nào! 🎒
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setError(null);
                  setStep(2);
                }}
                className="mt-6 space-y-4"
              >
                <Field
                  label="Tên đăng nhập"
                  placeholder="superstar2025"
                  value={username}
                  onChange={setUsername}
                />
                <Field
                  label="Email phụ huynh"
                  type="email"
                  placeholder="phuhuynh@example.com"
                  hint="Để xác thực và gửi báo cáo học tập"
                  value={email}
                  onChange={setEmail}
                />
                <Field
                  label="Mật khẩu"
                  type="password"
                  placeholder="Ít nhất 6 ký tự"
                  value={password}
                  onChange={setPassword}
                />
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-primary font-bold text-primary-foreground shadow-pop hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  Tiếp theo →
                </button>
                <button
                  type="button"
                  disabled
                  className="w-full h-12 rounded-xl border-2 border-border bg-background font-bold text-sm hover:border-primary transition flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                  title="Sắp ra mắt"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Đăng ký bằng Google
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-center">Bạn đang học lớp mấy?</h2>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Chúng tớ sẽ gợi ý bài tập phù hợp nhất.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`rounded-2xl border-2 p-4 text-center transition-all ${
                      grade === g
                        ? "border-primary bg-primary/10 -translate-y-1 shadow-pop"
                        : "border-border bg-background hover:border-primary/60 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="text-3xl mb-1">{["🌱", "🚀", "⚡", "👑"][g - 6]}</div>
                    <p className="font-display font-bold">Lớp {g}</p>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 rounded-xl border-2 border-border font-bold hover:border-primary transition"
                >
                  ← Quay lại
                </button>
                <button
                  disabled={!grade}
                  onClick={() => setStep(3)}
                  className="flex-1 h-12 rounded-xl bg-gradient-primary font-bold text-primary-foreground shadow-pop hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tiếp theo →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-center">
                Chọn người đồng hành 🐾
              </h2>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Linh vật sẽ cùng bạn vượt qua mọi thử thách!
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MASCOTS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMascot(m.id)}
                    className={`rounded-2xl border-2 p-3 transition-all ${
                      mascot === m.id
                        ? "border-accent bg-accent/15 -translate-y-1 shadow-pop-accent"
                        : "border-border bg-background hover:border-accent/60 hover:-translate-y-0.5"
                    }`}
                  >
                    <img
                      src={m.img}
                      alt={m.name}
                      width={512}
                      height={512}
                      loading="lazy"
                      className="w-full aspect-square object-contain"
                    />
                    <p className="font-display font-bold text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 rounded-xl border-2 border-border font-bold hover:border-primary transition"
                >
                  ← Quay lại
                </button>
                <button
                  disabled={!mascot || loading}
                  onClick={onCreateAccount}
                  className="flex-1 h-12 rounded-xl bg-gradient-accent font-bold text-accent-foreground shadow-pop-accent hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang tạo..." : "🚀 Bắt đầu!"}
                </button>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  hint,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-semibold mb-1.5 block">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 rounded-xl border-2 border-input bg-background px-4 text-sm font-semibold focus:border-primary focus:outline-none transition"
      />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
