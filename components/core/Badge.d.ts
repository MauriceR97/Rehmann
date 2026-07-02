import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `promo` = the loud red sale flash; `soft` = quiet red tint. */
  variant?: "neutral" | "promo" | "navy" | "success" | "warning" | "soft";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

/**
 * Compact uppercase pill for status, categories and promo flashes
 * ("NEU", "−30%", "VIP"). Use `promo` for sale callouts.
 */
export function Badge(props: BadgeProps): JSX.Element;
