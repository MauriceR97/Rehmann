import * as React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** Lucide icon name, e.g. "shopping-cart", "phone", "heart" */
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * Lucide icon (the documented brand icon set). Inherits text color
 * via currentColor. Needs the Lucide UMD script loaded on the page.
 */
export function Icon(props: IconProps): JSX.Element;
