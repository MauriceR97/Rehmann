import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: React.ReactNode;
  /** Helper text below the field */
  hint?: React.ReactNode;
  /** Error message — turns the field red and replaces the hint */
  error?: React.ReactNode;
  /** Leading icon element */
  iconLeft?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Labelled text input with red focus ring, hint and error states.
 */
export function Input(props: InputProps): JSX.Element;
