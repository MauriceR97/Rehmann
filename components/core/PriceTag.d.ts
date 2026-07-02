import * as React from "react";

export interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current price — number (formatted de-DE) or preformatted string */
  value: number | string;
  /** Optional struck-through previous price */
  was?: number | string | null;
  /** Eyebrow above the price, e.g. "Voll-Service-Preis" */
  prefix?: React.ReactNode;
  /** Caption below, e.g. "inkl. Lieferung & Montage" */
  note?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  currency?: string;
  align?: "left" | "right";
}

/**
 * Bold red price lockup in the Rehmann promotional style
 * ("Sie zahlen nur …"). German number formatting, tabular figures.
 */
export function PriceTag(props: PriceTagProps): JSX.Element;
