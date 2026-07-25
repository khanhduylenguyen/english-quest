export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/60 mt-20">
      <div className="container mx-auto px-4 py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-base font-semibold text-foreground">EngQuest 🚀</p>
        <p className="mt-2">Học tiếng Anh vui — Chinh phục tương lai</p>
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} EngQuest. Made with 💙 for học sinh cấp 2.
        </p>
      </div>
    </footer>
  );
}
