import * as React from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "style"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  /** Convenience: array of strings or {value,label} */
  options?: (string | SelectOption)[];
  style?: React.CSSProperties;
}

/**
 * Styled native select with custom chevron and red focus ring.
 * Pass `options` or `<option>` children.
 */
export function Select(props: SelectProps): JSX.Element;
