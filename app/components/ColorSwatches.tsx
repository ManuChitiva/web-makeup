"use client";

import { useState } from "react";

type ColorSwatchesProps = {
  colors: string[];
  /** Cantidad extra de tonos (ej. "+8") */
  moreCount?: number;
  className?: string;
  /** Modo controlado: índice seleccionado */
  selectedIndex?: number | null;
  /** Modo controlado: callback al elegir color */
  onSelect?: (index: number) => void;
};

/** Muestras de color circulares seleccionables (mock), estilo catálogo profesional */
export default function ColorSwatches({
  colors,
  moreCount,
  className = "",
  selectedIndex: controlledIndex,
  onSelect,
}: ColorSwatchesProps) {
  const [internalIndex, setInternalIndex] = useState<number | null>(null);
  const isControlled = controlledIndex !== undefined;
  const selectedIndex = isControlled ? controlledIndex ?? null : internalIndex;
  const setSelectedIndex = (i: number) => {
    if (!isControlled) setInternalIndex(i);
    onSelect?.(i);
  };

  if (!colors.length && moreCount == null) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-2.5 rounded-xl border border-[var(--accent-champagne)]/60 bg-[var(--accent-champagne)]/15 px-3 py-3 ${className}`}
      aria-label="Colores disponibles"
    >
      <span className="sr-only">
        {selectedIndex != null
          ? `Color ${selectedIndex + 1} seleccionado`
          : "Elige un color"}
      </span>
      {colors.slice(0, 6).map((color, i) => {
        const isSelected = selectedIndex === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedIndex(i)}
            className={`relative h-6 w-6 shrink-0 rounded-full border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-rose)] focus-visible:ring-offset-2 ${
              isSelected
                ? "border-[var(--accent-rose-deep)] ring-2 ring-[var(--accent-rose)] ring-offset-2 scale-110"
                : "border-[var(--foreground)]/15 hover:border-[var(--accent-rose)]/40 hover:scale-105"
            }`}
            style={{ backgroundColor: color }}
            title={isSelected ? "Color seleccionado" : "Seleccionar color"}
            aria-pressed={isSelected}
            aria-label={`Color ${i + 1}${isSelected ? ", seleccionado" : ""}`}
          />
        );
      })}
      {moreCount != null && moreCount > 0 && (
        <span className="text-xs font-medium text-[var(--foreground)]/50">
          +{moreCount}
        </span>
      )}
    </div>
  );
}
