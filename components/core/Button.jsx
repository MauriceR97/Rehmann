import React from "react";

/**
 * Interliving Rehmann — Button
 * Brand-red primary, navy secondary, plus outline & ghost.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  type = "button",
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: "var(--fs-xs)", padding: "0.5rem 0.9rem", gap: "0.4rem", minHeight: 36 },
    md: { fontSize: "var(--fs-sm)", padding: "0.7rem 1.25rem", gap: "0.5rem", minHeight: 44 },
    lg: { fontSize: "var(--fs-md)", padding: "0.9rem 1.7rem", gap: "0.6rem", minHeight: 54 },
  };

  const variants = {
    primary: {
      background: "var(--action)",
      color: "var(--action-contrast)",
      border: "1px solid var(--action)",
      boxShadow: "var(--shadow-brand)",
    },
    secondary: {
      background: "var(--action-2)",
      color: "var(--text-inverse)",
      border: "1px solid var(--action-2)",
      boxShadow: "var(--shadow-sm)",
    },
    outline: {
      background: "transparent",
      color: "var(--action-2)",
      border: "1.5px solid var(--border-default)",
      boxShadow: "none",
    },
    ghost: {
      background: "transparent",
      color: "var(--action)",
      border: "1px solid transparent",
      boxShadow: "none",
    },
  };

  const base = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--fw-bold)",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const hoverBg = {
    primary: "var(--action-hover)",
    secondary: "var(--action-2-hover)",
    outline: "var(--surface-sunken)",
    ghost: "var(--surface-brand-soft)",
  }[variant];

  const onEnter = (e) => {
    if (disabled) return;
    if (variant === "primary" || variant === "secondary") e.currentTarget.style.background = hoverBg;
    else e.currentTarget.style.background = hoverBg;
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = variants[variant].background;
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={base}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
