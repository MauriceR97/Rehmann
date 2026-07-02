// Interliving Rehmann — Home screen
const { Button: RButton, Badge: RBadge, ProductCard: RProductCard, Card: RCard } = window.InterlivingRehmannDesignSystem_89c457;

function Hero({ onCategory }) {
  return (
    <section style={{ background: "var(--navy-500)", color: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--gutter)", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "var(--space-7)", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", marginBottom: 18 }}>
            <RBadge variant="promo" size="lg">Marken Aktions-Tage · nur kurze Zeit</RBadge>
          </div>
          <h1 style={{ color: "#fff", fontSize: "var(--fs-5xl)", lineHeight: 1.0, margin: "0 0 18px" }}>
            Wohnträume,<br />die zu Ihnen<br /><span style={{ color: "var(--red-400)" }}>passen.</span>
          </h1>
          <p style={{ fontSize: "var(--fs-lg)", color: "var(--neutral-200)", maxWidth: 460, margin: "0 0 28px", lineHeight: 1.5 }}>
            Über 130 Jahre Erfahrung, ein facettenreiches Vollsortiment und persönliche Beratung — mitten in Velbert. Möbel für dich gemacht.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <RButton variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={20} />} onClick={() => onCategory("wohnen")}>Sortiment entdecken</RButton>
            <RButton variant="outline" size="lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => onCategory("kuechen")}>Küchenplanung</RButton>
          </div>
          <div style={{ display: "flex", gap: "var(--space-6)", marginTop: "var(--space-7)" }}>
            {[["Bestpreis","garantie"],["0 %","Finanzierung"],["Voll-Service","Lieferung & Montage"]].map(([a,b]) => (
              <div key={a} style={{ fontFamily: "var(--font-sans)" }}>
                <div style={{ fontWeight: "var(--fw-extra)", fontSize: "var(--fs-lg)", color: "#fff" }}>{a}</div>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--neutral-300)" }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Photo icon="sofa" ratio="5 / 4" radius="var(--radius-xl)" label="Lifestyle-Foto" style={{ boxShadow: "var(--shadow-lg)" }} />
        </div>
      </div>
    </section>
  );
}

function CategoryTiles({ onCategory }) {
  const cats = window.REH_DATA.categories;
  return (
    <section style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--gutter) 0" }}>
      <SectionHeading eyebrow="Wohnwelten" title="Stöbern Sie nach Bereich" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "var(--space-4)" }}>
        {cats.map((c) => (
          <a key={c.id} href="#" onClick={(e) => { e.preventDefault(); onCategory(c.id); }}
            style={{ textDecoration: "none", textAlign: "center" }}>
            <RCard interactive elevation="sm" padding="md" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <span style={{ width: 64, height: 64, borderRadius: "var(--radius-pill)", background: "var(--surface-brand-soft)", color: "var(--reh-red)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={c.icon} size={30} />
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)", fontSize: "var(--fs-md)" }}>{c.label}</div>
              <div style={{ fontSize: "var(--fs-2xs)", color: "var(--text-muted)" }}>{c.blurb}</div>
            </RCard>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ onProduct, onAdd, title, eyebrow, items }) {
  return (
    <section style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--gutter) 0" }}>
      <SectionHeading eyebrow={eyebrow} title={title}
        action={<a href="#" onClick={(e)=>e.preventDefault()} style={{ fontFamily:"var(--font-sans)", fontWeight:"var(--fw-bold)", color:"var(--text-brand)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>Alle ansehen <Icon name="arrow-right" size={16} /></a>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-5)" }}>
        {items.map((p) => (
          <div key={p.id} onClick={() => onProduct(p.id)} style={{ cursor: "pointer" }}>
            <RProductCard brand={p.brand} title={p.title} subtitle={p.spec} price={p.price} was={p.was}
              badge={p.badge} badgeVariant={p.badgeVariant} onAdd={() => onAdd(p)}
              image={undefined} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: "truck", h: "Lieferung & Montage", t: "Voll-Service bis zu Ihnen nach Hause" },
    { icon: "badge-percent", h: "Bestpreisgarantie", t: "Günstiger gesehen? Wir ziehen mit." },
    { icon: "credit-card", h: "0 % Finanzierung", t: "Bis zu 48 Monate, ohne Anzahlung" },
    { icon: "users", h: "Persönliche Beratung", t: "Erfahrene Fachberater vor Ort" },
  ];
  return (
    <section style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--gutter) 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-4)" }}>
        {items.map((it) => (
          <div key={it.h} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "var(--space-4)" }}>
            <span style={{ color: "var(--reh-red)", flex: "none", marginTop: 2 }}><Icon name={it.icon} size={30} /></span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)", fontSize: "var(--fs-md)" }}>{it.h}</div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", lineHeight: 1.5 }}>{it.t}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function KitchenCTA({ onCategory }) {
  return (
    <section style={{ maxWidth: "var(--container-xl)", margin: "var(--space-8) auto 0", padding: "0 var(--gutter)" }}>
      <div style={{ background: "var(--reh-red)", borderRadius: "var(--radius-xl)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", color: "#fff" }}>
        <div style={{ padding: "var(--space-8)" }}>
          <div className="reh-eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>Küchenwelt</div>
          <h2 style={{ color: "#fff", fontSize: "var(--fs-3xl)", margin: "8px 0 14px" }}>Ihre Traumküche wartet</h2>
          <p style={{ fontSize: "var(--fs-md)", color: "rgba(255,255,255,0.92)", maxWidth: 420, margin: "0 0 24px", lineHeight: 1.55 }}>
            Über 100 Musterküchen zum Erleben. Unsere Fachberater planen Ihre Küche individuell — inkl. Aufmaß, Lieferung und Montage.
          </p>
          <RButton variant="secondary" size="lg" onClick={() => onCategory("kuechen")} iconRight={<Icon name="arrow-right" size={20} />}>Beratungstermin sichern</RButton>
        </div>
        <div style={{ padding: "var(--space-6)" }}>
          <Photo icon="chef-hat" ratio="16 / 10" radius="var(--radius-lg)" label="Küchen-Foto" />
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ onCategory, onProduct, onAdd }) {
  const all = window.REH_DATA.products;
  return (
    <div>
      <Hero onCategory={onCategory} />
      <CategoryTiles onCategory={onCategory} />
      <ProductGrid eyebrow="Marken Aktions-Tage" title="Aktuelle Angebote" items={all.slice(0, 4)} onProduct={onProduct} onAdd={onAdd} />
      <TrustStrip />
      <KitchenCTA onCategory={onCategory} />
    </div>
  );
}
window.HomeScreen = HomeScreen;
