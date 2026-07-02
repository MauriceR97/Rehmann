import * as React from "react";

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product photo URL. Omit to show a "Produktfoto" placeholder. */
  image?: string;
  imageAlt?: string;
  title: React.ReactNode;
  /** Short spec line, e.g. "Bezug Stoff Impression grün-grau" */
  subtitle?: React.ReactNode;
  /** Manufacturer / brand eyebrow */
  brand?: React.ReactNode;
  price: number | string;
  /** Struck previous price */
  was?: number | string | null;
  /** Caption under the price (default "inkl. Lieferung & Montage") */
  priceNote?: React.ReactNode;
  /** Promo flash text, e.g. "−30%" or "NEU" */
  badge?: React.ReactNode;
  badgeVariant?: "promo" | "navy" | "soft" | "success";
  onAdd?: () => void;
}

/**
 * The storefront product tile: photo, navy title, red price, promo
 * badge and merkliste heart. Composes Badge, PriceTag and IconButton.
 *
 * @startingPoint section="Commerce" subtitle="Product tile in the Rehmann storefront style" viewport="360x440"
 */
export function ProductCard(props: ProductCardProps): JSX.Element;
