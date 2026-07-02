---
name: rehmann-design
description: Use this skill to generate well-branded interfaces and assets for Interliving Rehmann (Möbel Rehmann, Velbert), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

This is the **Interliving Rehmann** design system — a 130+ year, family-run furniture house in Velbert. Tagline: *Möbel für dich gemacht.* Core brand colors: signal red `#E30613`, navy `#273A50`, warm gray `#4A4A49`, white. Typeface: **Fira Sans** (Bold headlines, Medium body). Tone: warm, inviting, high-quality, regional; formal *Sie* in marketing (the *du* tagline is the one exception); no emoji.

Key files:
- `readme.md` — full brand guide: company context, CONTENT FUNDAMENTALS (voice), VISUAL FOUNDATIONS, ICONOGRAPHY, and the file index.
- `styles.css` — the single global stylesheet to link; it `@import`s all tokens (`tokens/`) and the Fira Sans webfont.
- `assets/logos/` — brand logos (`rehmann-farbig` color, `rehmann-grau` mono, `rehmann-weiss` reversed; SVG + PNG).
- `components/` — React UI primitives (Button, IconButton, Badge, PriceTag, Icon, Input, Select, Checkbox, Card, ProductCard).
- `ui_kits/moebelhaus/` — an interactive storefront recreation composing those primitives.
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Link `styles.css`, use the CSS custom properties (e.g. `var(--reh-red)`, `var(--text-strong)`, `var(--font-display)`), and pull in the real logos. Icons: Lucide (stroke, currentColor) — the documented brand substitution. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
