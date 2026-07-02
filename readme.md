# Interliving Rehmann — Design System

**Möbel für dich gemacht.**

This design system captures the brand of **Interliving Rehmann** (Möbel Rehmann / Rehmann & Söhne GmbH) — an owner-run furniture house in Velbert with 130+ years of tradition (founded 1887). It exists so design agents can produce on-brand interfaces, print/promotional layouts, decks, and assets without re-deriving the brand each time.

---

## 1. Company & product context

- **Who:** Inhabergeführtes Möbelhaus in Velbert, gegründet 1887, geführt von der Familie Rehmann (Marc Rehmann, Geschäftsführung). Member of the **Interliving** furniture cooperative — the full brand lockup is *interliving · Rehmann*.
- **Offer:** Vollsortiment Möbel — Wohnen, Schlafen, Garten — plus a large **Küchenwelt** (100+ Musterküchen, persönliche Planung). Voll-Service (Lieferung, Montage, Anschluss), Finanzierung, Bestpreisgarantie, lebenslanger Kundendienst.
- **Where:** Flandersbacher Weg 2, 42549 Velbert — direkt an der A44, Ausfahrt Velbert/Wülfrath. Öffnungszeiten Mo.–Sa. 10–19 Uhr.
- **Audience:** einrichtungsbewusste Privatkunden aus Velbert und der Region Rhein-Ruhr / Niederberg — junge Paare, Familien, anspruchsvolle Best Ager. Value quality, choice and expert advice over pure discount.
- **Positioning:** Tradition trifft Moderne. Bewährte Qualität + persönliche Beratung + aktuelle Designs & Wohntrends. Wohlfühlorte und Wohnträume schaffen.
- **Tagline:** *Möbel für dich gemacht.*

### Digital surfaces
- **moebel-rehmann.de** — Möbelhaus (Wohnen, Schlafen, Garten)
- **kuechen-rehmann.de** — Küchenwelt / Küchenplanung
- Social: facebook.com/InterlivingRehmann · instagram.com/moebel_rehmann_interliving
- Hotline: 02051 96400 · Küchen: 02051 9640-131 · info@moebel-rehmann.de

### Source materials reviewed (stored in `uploads/`)
- `Rehmann-Brandkit.pdf` — official brand kit: colors + typefaces (source of truth for foundations).
- Logo files: `Logo-farbig` (color), `Logo-grau` (mono gray), `Logo-weiss` (reversed/white), in SVG + PNG. (`Logo-grau.ai` not parsed.)
- Promotional ad PDFs (tone & layout reference): `..._Traumkueche gesucht...`, `..._Markentage...`, `..._VIP_Shopping...`, `..._Tausch-Rausch...`, `..._Gesund Sitzen...`.

> No website codebase or Figma file was provided. The UI kits in this system are faithful **brand reconstructions** of the kind of e-commerce/Möbelhaus surfaces Rehmann runs (moebel-rehmann.de style), built from the brand kit, logos and promotional materials — not copied from production code. Treat them as on-brand starting points, not pixel captures of the live site.

---

## 2. CONTENT FUNDAMENTALS — how Rehmann writes

**Language:** German throughout. Warm, einladend, hochwertig, bodenständig-regional.

**Address — formal "Sie".** Customers are addressed with the polite *Sie* in nearly all marketing ("Profitieren Sie…", "Sichern Sie sich…", "Gönnen Sie sich…", "Wir freuen uns auf Ihren Besuch!"). The **tagline is the one deliberate exception**: *"Möbel für **dich** gemacht"* uses the warm, informal *dich* as a friendly brand signature. Rule of thumb: **headline tagline = du; everything else = Sie.**

**Tone & devices:**
- Inviting and benefit-led, never clinical. Sells the *feeling* ("Möbelträume", "Wohnträume", "Wohngenuss", "Wohlfühlen", "Erleben Sie…").
- Energetic, promotional, with a sense of occasion and urgency: "JETZT", "NUR FÜR KURZE ZEIT", "Schnell sein lohnt sich", "AB SOFORT", "Seien Sie dabei!". Exclamation marks are used freely in promo headlines.
- Personal & regional: signed by *Marc Rehmann, Geschäftsführer*; references to Velbert, "direkt an der A44", family tone ("Das gesamte Rehmann-Team freut sich…").
- Trust signals woven in: *Bestpreisgarantie, Voll-Service-Preis, 0 % Finanzierung, lebenslanger Kundendienst, inkl. Lieferung & Montage.*

**Casing:**
- Promo headlines & kickers frequently in **ALL CAPS** ("MARKEN AKTIONS-TAGE!", "TRAUMKÜCHE GESUCHT!", "GESUND SITZEN", "VIP SHOPPING").
- Body copy in normal German sentence case (nouns capitalised per German orthography).
- Prices set boldly: "Sie zahlen nur **2.499,–**", "**750,–** Euro", "Voll-Service-Preis". German number format — comma decimals, "–" for round amounts, "€"/"Euro".

**Vocabulary cues (use these words):** Traumküche, Wohnträume, Möbelträume, Wohlfühlen, Voll-Service, Bestpreisgarantie, Marken-Rabatt, Musterküchen, persönliche Beratung, individuell planbar, Komfort, hochwertig, exklusiv, Aktion.

**Emoji:** Not used. Keep copy emoji-free. Emphasis comes from weight, caps, color (red) and price size — not pictographs.

**Micro-examples (verbatim from materials):**
- "Gönnen Sie sich jetzt schöne Dinge zu besonders günstigen Konditionen und erfüllen Sie sich Ihre Möbelträume."
- "Wir begleiten die Montagearbeiten Ihrer neuen Traumküche fotografisch…"
- "Erleben Sie den perfekten Wohngenuss! Modernes Design in neuer Dimension."
- "Das gesamte Rehmann-Team freut sich auf Ihren Besuch!"

---

## 3. VISUAL FOUNDATIONS

**Color.** A tight, high-contrast brand palette (from the brand kit):
- **Signal red `#E30613`** — the dominant brand color. Used for the logo wordmark, prices, primary CTAs, promo flashes/kickers, sale callouts. Red = action + price.
- **Navy `#273A50`** — headline and "premium" dark. Used for serious headlines, dark surfaces, footers, and as the grown-up counterweight to the loud red.
- **Warm gray `#4A4A49`** — body text and the secondary logo color. The neutral ramp is built warm (slightly beige off-whites like `#FAF8F6`), suiting a furniture/home context.
- **White `#FFFFFF`** — generous, airy backgrounds. The brand breathes; product photography sits on white/warm-white.
- Supportive accents (sparingly): **gold `#B9942F`** for VIP/premium, **green `#3F7A53`** for "gesund/eco" themes. These come from campaign contexts, not the core kit — use only when the topic calls for it.

**Typography.** **Fira Sans** throughout — a humanist, friendly, highly legible grotesque. Brand kit specifies **Bold** for headlines (Überschriften) and **Medium** for body (Bodytexte). Headlines are tight and confident; promo numerals can go heavy/extrabold and large. No serif, no second display face. Generous sizes — this is a welcoming, readable brand, not a fine-print one.

**Layout & composition.** Promotional materials are bold, full-bleed and photography-forward: large lifestyle/product photos with a clear focal product, big bold headline, and a prominent red price/offer flash. Web/UI translation: airy white space, strong type hierarchy, product imagery in cards, red reserved for the one thing that matters per view. Generous gutters; content centered in containers up to ~1200–1400px.

**Imagery.** Warm, inviting, real interior/lifestyle photography — sofas, kitchens, bedrooms staged as cozy "Wohlfühl" scenes. Natural warm light, lived-in but tidy. Color photography (never b&w), warm-leaning. Products shown in context. Use placeholders (`<image-slot>` or neutral warm-gray blocks labelled with what belongs) when real photography isn't available — never invent SVG furniture.

**Corner radii.** Friendly and rounded, echoing the logo's rounded-square "interliving" badge (≈22% corner). Cards `12–18px`, buttons `8–12px`, pills/badges fully rounded. Nothing razor-sharp.

**Cards.** White surface, soft warm shadow (`--shadow-sm/md`), subtle `1px` neutral border optional, rounded `--radius-lg`. Product cards: image on top (warm-white fill), title in navy, price in red, light divider. No colored-left-border cards, no purple gradients.

**Shadows.** Soft, warm-tinted, diffuse — `rgba(35,34,33,…)` at low opacity. Elevation is gentle (furniture-showroom soft light), never hard drop shadows. A special `--shadow-brand` (red-tinted) for the primary CTA only.

**Borders.** Hairline neutral (`--border-subtle`/`--border-default`). Used to delineate, not decorate. Brand-red borders only for active/selected states.

**Backgrounds.** Predominantly white / warm off-white (`--neutral-50`). Navy used for full-bleed "premium" bands (footer, feature strips). No busy patterns, no gradient meshes. Occasional flat red promo band. Photography is the texture.

**Motion.** Restrained and gentle — `--ease-out` / `--ease-standard`, `120–320ms`. Fades and small lifts (translateY 2–4px) on hover. No bounces, no parallax circus. Reduced-motion respected.

**Hover states.** Buttons darken (`--action` → `--action-hover`). Cards lift slightly (raise shadow + small translateY). Links underline. Quiet, tactile.

**Press/active states.** Slight darken further (`--action-active`) and/or 1px nudge down. No aggressive scale-down.

**Transparency & blur.** Used sparingly — e.g. a translucent navy scrim over hero photography for text legibility, or a sticky header that gains a subtle backdrop blur on scroll. Not a glassmorphism brand.

**Focus.** Visible 3px red focus ring (`--focus-ring`) offset 2px — accessibility matters for the Best-Ager audience.

---

## 4. ICONOGRAPHY

Rehmann's own materials are **photography- and type-led**; they do not ship a proprietary icon font. The brand uses a few small functional/utility marks (phone, QR code, energy-label badges, social glyphs) inside print, but no distinctive custom icon family.

**System for this design system:** **[Lucide](https://lucide.dev)** (loaded from CDN) — a clean, rounded-join, consistent-stroke (1.75–2px) open-source set whose friendly geometry matches Fira Sans and the rounded brand radii. This is a **documented substitution** (the brand had no icon set of its own); flagged for the user. Use Lucide for UI affordances: cart, search, menu, heart/merkliste, truck (Lieferung), phone, map-pin, star, chevrons.

Rules:
- Stroke icons only, consistent weight, color via `currentColor` (inherit text color — usually navy or gray; red only for active/brand affordances).
- Icon sizes: 18 / 20 / 24px in UI; 28–32px for feature bullets.
- **No emoji.** No multicolor icons. No hand-drawn SVG illustration in place of photography.
- The **logo** is the one fixed brand mark — never recolor or redraw it; use the provided files in `assets/logos/`.

Logos available (`assets/logos/`): `rehmann-farbig` (red+gray, primary, on light), `rehmann-grau` (mono, single-color contexts), `rehmann-weiss` (reversed, on red/navy/photo). SVG preferred; PNG fallback.

---

## 5. Index / manifest

**Foundations (root)**
- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- `assets/logos/` — brand logos (color / gray / white, SVG + PNG).

**Specimen cards** (Design System tab) live in `guidelines/` — Type, Colors, Spacing, Brand groups.

**Components** (`components/`, namespace `window.InterlivingRehmannDesignSystem_89c457`):
- `core/` — Button, IconButton, Badge, Tag, PriceTag
- `forms/` — Input, Select, Checkbox
- `surfaces/` — Card, ProductCard
- `navigation/` — (in kits)

**UI kits** (`ui_kits/`):
- `moebelhaus/` — moebel-rehmann.de style storefront (home, category, product detail).

**Other**
- `SKILL.md` — Agent-Skill wrapper for use in Claude Code.
- `readme.md` — this file.
