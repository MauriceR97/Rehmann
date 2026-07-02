// Interliving Rehmann — Product detail screen
const { Button: PButton, Badge: PBadge, PriceTag: PPriceTag, Card: PCard } = window.InterlivingRehmannDesignSystem_89c457;

function Swatch({ color, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: "var(--radius-pill)", background: color,
      border: active ? "3px solid var(--reh-red)" : "2px solid var(--border-default)",
      cursor: "pointer", padding: 0, outline: active ? "2px solid var(--surface-card)" : "none", outlineOffset: -4,
    }} aria-label="Bezug wählen" />
  );
}

function ProductScreen({ productId, onAdd, onCategory }) {
  const p = window.REH_DATA.products.find((x) => x.id === productId) || window.REH_DATA.products[0];
  const cat = window.REH_DATA.categories.find((c) => c.id === p.cat);
  const [bezug, setBezug] = React.useState(0);
  const [thumb, setThumb] = React.useState(0);
  const colors = ["#7d8a76", "#8a5a3c", "#2f3a47", "#9c2b2b"];

  return (
    <div style={{ maxWidth: "var(--container-lg)", margin: "0 auto", padding: "var(--space-6) var(--gutter) 0" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: "var(--space-5)" }}>
        Startseite <span style={{ margin: "0 6px" }}>/</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onCategory(p.cat); }} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{cat?.label}</a>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--text-strong)", fontWeight: "var(--fw-bold)" }}>{p.title}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "var(--space-7)", alignItems: "start" }}>
        {/* Gallery */}
        <div>
          <Photo icon={p.icon} ratio="4 / 3" radius="var(--radius-xl)" label="Produktfoto" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
            {[0,1,2,3].map((i) => (
              <button key={i} onClick={() => setThumb(i)} style={{ border: thumb===i ? "2px solid var(--reh-red)" : "2px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 0, background: "none", cursor: "pointer", overflow: "hidden" }}>
                <Photo icon={p.icon} ratio="1 / 1" radius="0" label="" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="reh-eyebrow" style={{ marginBottom: 6 }}>{p.brand}</div>
          <h1 style={{ margin: "0 0 12px", fontSize: "var(--fs-2xl)" }}>{p.title}</h1>
          {p.badge && <div style={{ marginBottom: 16 }}><PBadge variant={p.badgeVariant}>{p.badge}</PBadge></div>}
          <p style={{ color: "var(--text-body)", fontSize: "var(--fs-md)", lineHeight: 1.6, margin: "0 0 22px" }}>{p.spec}</p>

          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)", color: "var(--text-strong)", marginBottom: 10 }}>
              Bezug & Farbe <span style={{ color: "var(--text-muted)", fontWeight: "var(--fw-medium)" }}>· große Stoff- & Lederauswahl</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {colors.map((c, i) => <Swatch key={c} color={c} active={bezug===i} onClick={() => setBezug(i)} />)}
            </div>
          </div>

          <PCard elevation="sm" padding="lg" style={{ marginBottom: 18 }}>
            <PPriceTag prefix="Voll-Service-Preis · Sie zahlen nur" value={p.price} was={p.was} note="inkl. Lieferung, Montage & Anschluss" size="lg" />
            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-5)" }}>
              <PButton variant="primary" size="lg" block iconLeft={<Icon name="shopping-cart" size={20} />} onClick={() => onAdd(p)}>In den Warenkorb</PButton>
              <PButton variant="outline" size="lg" iconLeft={<Icon name="heart" size={20} />} aria-label="Merken"></PButton>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, color: "var(--success)", fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-bold)" }}>
              <Icon name="check-circle" size={18} /> Sofort verfügbar · Lieferung in 2–3 Wochen
            </div>
          </PCard>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["truck","Kostenlose Lieferung & Montage"],["badge-percent","Bestpreisgarantie"],["credit-card","0 % Finanzierung möglich"],["phone","Beratung: 02051 96400"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", color: "var(--text-body)" }}>
                <span style={{ color: "var(--reh-red)" }}><Icon name={ic} size={20} /></span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
window.ProductScreen = ProductScreen;
