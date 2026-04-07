type LogoTextProps = {
  variant?: "header" | "footer";
  className?: string;
};

export default function LogoText({ variant = "header", className = "" }: LogoTextProps) {
  const isCompact = variant === "header";

  if (isCompact) {
    return (
      <span className={`inline-flex items-baseline gap-2 ${className}`}>
        <span
          className="text-2xl text-[var(--accent-rose-deep)] md:text-3xl"
          style={{ fontFamily: "var(--font-great-vibes), cursive" }}
        >
          CP
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--accent-rose-deep)] md:text-sm">
            Camila Palacios
          </span>
          <span className="font-sans text-[10px] font-medium text-[var(--accent-rose)]/90 md:text-xs">
            Makeup Studio
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span
        className="text-3xl text-[var(--accent-rose-deep)]"
        style={{ fontFamily: "var(--font-great-vibes), cursive" }}
      >
        CP
      </span>
      <span className="mt-1 font-sans text-xs font-bold uppercase tracking-widest text-[var(--accent-rose-deep)]">
        Camila Palacios
      </span>
      <span className="font-sans text-[11px] font-medium normal-case tracking-wide text-[var(--accent-rose)]/90">
        Makeup Studio
      </span>
    </span>
  );
}
