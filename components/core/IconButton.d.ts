import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name */
  icon: string;
  /** Accessible label (aria-label + title) */
  label: string;
  variant?: "ghost" | "solid" | "subtle";
  size?: "sm" | "md" | "lg";
  shape?: "round" | "square";
  /** Optional count badge (e.g. cart items) */
  badge?: React.ReactNode;
}

/**
 * Icon-only button for headers and toolbars (cart, search, merkliste).
 * Maintains a 44px hit target; optional red count badge.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
