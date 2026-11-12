type LogoTextProps = {
  variant?: "header" | "footer";
  className?: string;
};

export default function LogoText({ variant = "header", className = "" }: LogoTextProps) {
  if (variant === "header") {
    return (
      <span className={`inline-flex items-baseline gap-2 ${className}`}>
        <span
          className="text-2xl text-[#8b4352] md:text-3xl"
          style={{ fontFamily: "var(--font-great-vibes), cursive" }}
        >
          CP
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#8b4352] md:text-sm">
            Camila Palacios
          </span>
          <span className="font-sans text-[10px] font-medium text-[#b76e79] md:text-xs">
            Makeup Studio
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span
        className="text-3xl text-[#e4b8ad]"
        style={{ fontFamily: "var(--font-great-vibes), cursive" }}
      >
        CP
      </span>
      <span className="mt-1 font-sans text-xs font-bold uppercase tracking-widest text-[#fff7ef]">
        Camila Palacios
      </span>
      <span className="font-sans text-[11px] font-medium normal-case tracking-wide text-[#c9a395]">
        Makeup Studio
      </span>
    </span>
  );
}
