import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * Interliving Rehmann — IconButton
 * Square/round icon-only button for toolbars, headers (cart, search,
 * merkliste). Keeps the 44px minimum hit target.
 */
export function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  shape = "round",
  badge = null,
  style = {},
  ...rest
}) {
  const dims = { sm: 36, md: 44, lg: 52 }[size];
  const iconSize = { sm: 18, md: 20, lg: 24 }[size];
  const variants = {
    ghost:   { background: "transparent", color: "var(--text-strong)" },
    solid:   { background: "var(--action)", color: "#fff" },
    subtle:  { background: "var(--surface-sunken)", color: "var(--text-strong)" },
  };
  const hover = { ghost: "var(--surface-sunken)", solid: "var(--action-hover)", subtle: "var(--neutral-150)" }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims,
        height: dims,
        border: "none",
        borderRadius: shape === "round" ? "var(--radius-pill)" : "var(--radius-md)",
        cursor: "pointer",
        transition: "background var(--dur-base) var(--ease-standard)",
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = variants[variant].background)}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
      {badge != null && (
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            borderRadius: "var(--radius-pill)",
            background: "var(--reh-red)",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: "var(--fw-bold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid var(--surface-card)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
