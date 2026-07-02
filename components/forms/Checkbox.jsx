import React from "react";

/**
 * Interliving Rehmann — Checkbox
 * Brand-red check, generous hit area for the Best-Ager audience.
 */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, id, style = {}, ...rest }) {
  const cbId = id || React.useId();
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label
      htmlFor={cbId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-medium)",
        fontSize: "var(--fs-sm)",
        color: "var(--text-body)",
        userSelect: "none",
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          width: 22,
          height: 22,
          flex: "none",
          borderRadius: "var(--radius-xs)",
          border: `2px solid ${on ? "var(--reh-red)" : "var(--border-strong)"}`,
          background: on ? "var(--reh-red)" : "var(--surface-card)",
          transition: "all var(--dur-fast) var(--ease-standard)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {on && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        <input
          id={cbId}
          type="checkbox"
          checked={on}
          disabled={disabled}
          onChange={toggle}
          style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", margin: 0, cursor: "inherit" }}
          {...rest}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
