import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style" | "type"> {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Brand-red checkbox with a large, friendly hit area.
 * Works controlled (`checked`) or uncontrolled (`defaultChecked`).
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
