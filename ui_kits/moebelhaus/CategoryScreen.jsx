// Interliving Rehmann — Category listing screen
const { ProductCard: CProductCard, Checkbox: CCheckbox, Select: CSelect, Badge: CBadge } = window.InterlivingRehmannDesignSystem_89c457;

function FilterGroup({ title, children }) {
  return (
    <div style={{ paddingBottom: "var(--space-5)", marginBottom: "var(--space-5)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)", color: "var(--text-strong)", marginBottom: 14 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>{children}</div>
    </div>
  );
}

function CategoryScreen({ catId, onProduct, onAdd }) {
  const cat = window.REH_DATA.categories.find((c) => c.id === catId) || window.REH_DATA.categories[0];
  let items = window.REH_DATA.products.filter((p) => p.cat === catId);
  if (items.length < 4) items = window.REH_DATA.products; // demo fallback for sparse cats

  return (
    <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-6) var(--gutter) 0" }}>
      {/* Breadcrumb + title */}
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginBottom: 10 }}>
        Startseite <span style={{ margin: "0 6px" }}>/</span> <span style={{ color: "var(--text-strong)", fontWeight: "var(--fw-bold)" }}>{cat.label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "var(--space-6)" }}>
        <span style={{ width: 56, height: 56, borderRadius: "var(--radius-pill)", background: "var(--surface-brand-soft)", color: "var(--reh-red)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={cat.icon} size={28} />
        </span>
        <div>
          <h1 style={{ margin: 0, fontSize: "var(--fs-3xl)" }}>{cat.label}</h1>
          <div style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>{items.length} Artikel · {cat.blurb}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "248px 1fr", gap: "var(--space-7)", alignItems: "start" }}>
        {/* Filters */}
        <aside style={{ position: "sticky", top: 150 }}>
          <FilterGroup title="Preis">
            <CCheckbox label="bis 1.000 €" />
            <CCheckbox label="1.000 – 2.500 €" defaultChecked />
            <CCheckbox label="2.500 – 5.000 €" />
            <CCheckbox label="ab 5.000 €" />
          </FilterGroup>
          <FilterGroup title="Material">
            <CCheckbox label="Stoff" defaultChecked />
            <CCheckbox label="Leder" />
            <CCheckbox label="Holz massiv" />
          </FilterGroup>
          <FilterGroup title="Verfügbarkeit">
            <CCheckbox label="Sofort lieferbar" />
            <CCheckbox label="Ausstellungsstück" />
          </FilterGroup>
        </aside>

        {/* Results */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <CBadge variant="soft">Stoff ×</CBadge>
              <CBadge variant="soft">1.000–2.500 € ×</CBadge>
            </div>
            <div style={{ width: 220 }}>
              <CSelect aria-label="Sortierung" options={["Beliebteste zuerst", "Preis aufsteigend", "Preis absteigend", "Neuheiten"]} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-5)" }}>
            {items.map((p) => (
              <div key={p.id} onClick={() => onProduct(p.id)} style={{ cursor: "pointer" }}>
                <CProductCard brand={p.brand} title={p.title} subtitle={p.spec} price={p.price} was={p.was}
                  badge={p.badge} badgeVariant={p.badgeVariant} onAdd={() => onAdd(p)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
window.CategoryScreen = CategoryScreen;
