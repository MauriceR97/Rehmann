import React from "react";

/**
 * Interliving Rehmann — Input
 * Labelled text field with optional hint / error and leading icon slot.
 */
export function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  iconLeft = null,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const [focused, setFocused] = React.useState(false);
  const borderColor = error
    ? "var(--danger)"
    : focused
    ? "var(--reh-red)"
    : "var(--border-default)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)" }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--surface-card)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          padding: "0 14px",
          minHeight: 48,
          boxShadow: focused ? "0 0 0 3px var(--red-100)" : "none",
          transition: "border-color var(--dur-base), box-shadow var(--dur-base)",
        }}
      >
        {iconLeft && <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontWeight: "var(--fw-medium)",
            fontSize: "var(--fs-sm)",
            color: "var(--text-body)",
            minWidth: 0,
            padding: "12px 0",
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: "var(--fs-2xs)", color: error ? "var(--danger)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
