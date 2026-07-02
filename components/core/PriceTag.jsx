import React from "react";

/**
 * Interliving Rehmann — PriceTag
 * The brand sets prices boldly in signal red. German number format.
 * `was` shows a struck-through previous price; `note` for "Voll-Service-Preis" etc.
 */
export function PriceTag({
  value,
  was = null,
  note = null,
  prefix = null,
  size = "md",
  currency = "€",
  align = "left",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: "1.5rem" },
    md: { fontSize: "2.25rem" },
    lg: { fontSize: "3.25rem" },
  };
  const fmt = (n) =>
    typeof n === "number"
      ? n.toLocaleString("de-DE", { minimumFractionDigits: 0 })
      : n;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "right" ? "flex-end" : "flex-start",
        fontFamily: "var(--font-display)",
        ...style,
      }}
      {...rest}
    >
      {prefix && (
        <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-bold)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "var(--ls-wide)" }}>
          {prefix}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        {was != null && (
          <span style={{ fontSize: "0.9rem", fontWeight: "var(--fw-medium)", color: "var(--text-subtle)", textDecoration: "line-through" }}>
            {fmt(was)} {currency}
          </span>
        )}
        <span style={{ fontWeight: "var(--fw-extra)", color: "var(--text-price)", lineHeight: 1, fontFeatureSettings: '"tnum" 1', ...sizes[size] }}>
          {fmt(value)}<span style={{ fontSize: "0.6em", marginLeft: "0.1em" }}>&thinsp;{currency}</span>
        </span>
      </div>
      {note && (
        <span style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)", color: "var(--text-muted)", marginTop: 2 }}>
          {note}
        </span>
      )}
    </div>
  );
}
