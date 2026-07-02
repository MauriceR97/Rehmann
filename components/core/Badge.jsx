import React from "react";

/**
 * Interliving Rehmann — Badge
 * Small status / promo pill. `promo` = the loud red sale flash.
 */
export function Badge({ children, variant = "neutral", size = "md", style = {}, ...rest }) {
  const variants = {
    neutral: { background: "var(--surface-sunken)", color: "var(--text-body)", border: "1px solid var(--border-subtle)" },
    promo:   { background: "var(--reh-red)", color: "#fff", border: "1px solid var(--reh-red)" },
    navy:    { background: "var(--navy-500)", color: "#fff", border: "1px solid var(--navy-500)" },
    success: { background: "var(--success-bg)", color: "var(--success)", border: "1px solid transparent" },
    warning: { background: "var(--warning-bg)", color: "#7a611d", border: "1px solid transparent" },
    soft:    { background: "var(--surface-brand-soft)", color: "var(--text-brand)", border: "1px solid var(--red-100)" },
  };
  const sizes = {
    sm: { fontSize: "11px", padding: "2px 8px" },
    md: { fontSize: "var(--fs-2xs)", padding: "4px 10px" },
    lg: { fontSize: "var(--fs-xs)", padding: "6px 13px" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35em",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-bold)",
        textTransform: "uppercase",
        letterSpacing: "var(--ls-wide)",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
