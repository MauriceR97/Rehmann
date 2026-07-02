import React from "react";

/**
 * Interliving Rehmann — Card
 * Soft, warm-shadowed container with rounded corners. The base surface
 * for product tiles, info panels and feature blocks.
 */
export function Card({ children, padding = "lg", interactive = false, elevation = "sm", style = {}, ...rest }) {
  const pads = { none: 0, sm: "var(--space-4)", md: "var(--space-5)", lg: "var(--space-6)" };
  const shadows = { none: "none", sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" };

  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: shadows[elevation],
        padding: pads[padding],
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!interactive) return;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      }}
      onMouseLeave={(e) => {
        if (!interactive) return;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadows[elevation];
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
