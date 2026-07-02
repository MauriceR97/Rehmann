# Möbelhaus UI Kit — moebel-rehmann.de style storefront

An interactive, brand-faithful **reconstruction** of an Interliving Rehmann e-commerce storefront. It composes the design system's component primitives (Button, IconButton, Badge, PriceTag, Input, Select, Checkbox, Card, ProductCard) — it does not re-implement them.

> **Not production code, not a pixel capture.** No website codebase or Figma was provided for this brand, so this kit is built from the brand kit, logos and promotional materials. It demonstrates how the brand foundations come together on real screens. Product photography is shown as honest **placeholders** (warm tiles with a category glyph) — drop in real lifestyle/product photos via the `image` prop on `ProductCard` and the `<Photo>` slots.

## Run it
Open `index.html`. It loads `styles.css`, the compiled `_ds_bundle.js`, Lucide (icons) and React, then mounts the app.

## Screens & flow
- **Home** (`HomeScreen.jsx`) — navy hero with promo flash + trust stats, category tiles, an offers product grid, a service/trust strip, and a red Küchenwelt CTA band.
- **Category** (`CategoryScreen.jsx`) — breadcrumb, filter sidebar (price / material / availability), sort select, active-filter chips, 3-up product grid.
- **Product** (`ProductScreen.jsx`) — gallery + thumbnails, brand voice copy, fabric swatches, a buy box with the bold red Voll-Service price and add-to-cart, plus service guarantees.

Interactions: click categories in the nav or tiles → category listing; click any product → detail; "In den Warenkorb" increments the header cart badge and shows a confirmation toast.

## Files
- `index.html` — entry + script wiring (also a Starting Point).
- `App.jsx` — routing + cart state + Toast.
- `Header.jsx` — top bar, logo, search, account/merkliste/cart, category nav.
- `Footer.jsx` — navy footer with sitemap + legal.
- `HomeScreen.jsx`, `CategoryScreen.jsx`, `ProductScreen.jsx` — the three views.
- `Parts.jsx` — shared `<Photo>` placeholder + `<SectionHeading>`.
- `data.js` — sample categories & products (placeholder content drawn from real ad copy).
