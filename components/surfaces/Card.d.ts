import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  elevation?: "none" | "sm" | "md" | "lg";
  /** Lift + raise shadow on hover */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * Soft, warm-shadowed rounded container — the base surface for
 * product tiles, panels and feature blocks.
 */
export function Card(props: CardProps): JSX.Element;
