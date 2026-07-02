import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = brand red, `secondary` = navy. */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Full-width button */
  block?: boolean;
  disabled?: boolean;
  /** Element rendered before the label (e.g. a Lucide icon) */
  iconLeft?: React.ReactNode;
  /** Element rendered after the label */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * The primary call-to-action for Interliving Rehmann surfaces.
 * Use `primary` (red) for the single most important action per view;
 * `secondary` (navy), `outline`, and `ghost` for supporting actions.
 *
 * @startingPoint section="Core" subtitle="Brand buttons — red primary, navy secondary" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
