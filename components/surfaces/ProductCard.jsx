import React from "react";
import { Badge } from "../core/Badge.jsx";
import { PriceTag } from "../core/PriceTag.jsx";
import { IconButton } from "../core/IconButton.jsx";

/**
 * Interliving Rehmann — ProductCard
 * The storefront tile: photo on a warm-white field, navy title in the
 * brand voice, red price, optional promo badge and merkliste heart.
 */
export function ProductCard({
  image,
  imageAlt = "",
  title,
  subtitle,
  brand,
  price,
  was = null,
  priceNote = "inkl. Lieferung & Montage",
  badge = null,
  badgeVariant = "promo",
  onAdd,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {/* Image area */}
      <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--neutral-100)", overflow: "hidden" }}>
        {image ? (
          <img src={image} alt={imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform var(--dur-slow) var(--ease-out)" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-subtle)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "var(--ls-wide)" }}>
            Produktfoto
          </div>
        )}
        {badge && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge variant={badgeVariant} size="md">{badge}</Badge>
          </div>
        )}
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton
            icon="heart"
            label={saved ? "Von Merkliste entfernen" : "Auf Merkliste"}
            variant="subtle"
            size="sm"
            onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}
            style={saved ? { background: "var(--surface-brand-soft)", color: "var(--reh-red)" } : { background: "rgba(255,255,255,0.9)" }}
          />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-3)", flex: 1 }}>
        <div style={{ flex: 1 }}>
          {brand && (
            <div style={{ fontSize: "var(--fs-2xs)", fontWeight: "var(--fw-bold)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "var(--ls-wide)", marginBottom: 4 }}>
              {brand}
            </div>
          )}
          <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-lg)", color: "var(--text-strong)", lineHeight: 1.2 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 4, lineHeight: 1.45 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-3)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-3)" }}>
          <PriceTag value={price} was={was} note={priceNote} size="sm" />
          <IconButton icon="shopping-cart" label="In den Warenkorb" variant="solid" size="md" onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }} />
        </div>
      </div>
    </div>
  );
}
