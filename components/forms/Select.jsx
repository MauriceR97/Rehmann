import React from "react";

/**
 * Interliving Rehmann — Select
 * Styled native select for reliable behaviour; red focus ring.
 */
export function Select({ label, hint, error, id, options = [], children, style = {}, ...rest }) {
  const selId = id || React.useId();
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focused ? "var(--reh-red)" : "var(--border-default)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)", ...style }}>
      {label && (
        <label htmlFor={selId} style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)" }}>
          {label}
        </label>
      )}
      <div
        style={{
          position: "relative",
          background: "var(--surface-card)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focused ? "0 0 0 3px var(--red-100)" : "none",
          transition: "border-color var(--dur-base), box-shadow var(--dur-base)",
        }}
      >
        <select
          id={selId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontWeight: "var(--fw-medium)",
            fontSize: "var(--fs-sm)",
            color: "var(--text-body)",
            padding: "13px 42px 13px 14px",
            minHeight: 48,
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
          }}
          {...rest}
        >
          {options.map((o) =>
            typeof o === "string"
              ? <option key={o} value={o}>{o}</option>
              : <option key={o.value} value={o.value}>{o.label}</option>
          )}
          {children}
        </select>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {(hint || error) && (
        <span style={{ fontSize: "var(--fs-2xs)", color: error ? "var(--danger)" : "var(--text-muted)" }}>{error || hint}</span>
      )}
    </div>
  );
}
