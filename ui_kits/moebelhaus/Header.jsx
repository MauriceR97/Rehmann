// Interliving Rehmann — storefront Header
const { IconButton, Input, Badge } = window.InterlivingRehmannDesignSystem_89c457;

function TopBar() {
  return (
    <div style={{ background: "var(--navy-500)", color: "var(--neutral-100)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--gutter)", height: 38, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-medium)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Icon name="map-pin" size={15} /> Flandersbacher Weg 2, 42549 Velbert · direkt an der A44
        </span>
        <span style={{ display: "flex", gap: 20 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={15} /> Mo.–Sa. 10–19 Uhr</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="phone" size={15} /> 02051 96400</span>
        </span>
      </div>
    </div>
  );
}

function Header({ cartCount, onHome, onCategory, onCart, activeCat }) {
  const cats = window.REH_DATA.categories;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "var(--surface-card)", boxShadow: "var(--shadow-sm)" }}>
      <TopBar />
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "16px var(--gutter)", display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }} style={{ flex: "none", display: "block" }}>
          <img src="../../assets/logos/rehmann-farbig.svg" alt="Interliving Rehmann" style={{ height: 52, display: "block" }} />
        </a>
        <div style={{ flex: 1, maxWidth: 520 }}>
          <Input iconLeft={<Icon name="search" size={18} />} placeholder="Wonach suchen Sie? z. B. Sofa, Küche, Boxspringbett" aria-label="Suche" />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <IconButton icon="user" label="Mein Konto" variant="ghost" />
          <IconButton icon="heart" label="Merkliste" variant="ghost" badge={2} />
          <IconButton icon="shopping-cart" label="Warenkorb" variant="solid" badge={cartCount || undefined} onClick={onCart} />
        </div>
      </div>
      <nav style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "0 var(--gutter)", display: "flex", gap: "var(--space-2)" }}>
          {cats.map((c) => {
            const active = c.id === activeCat;
            return (
              <a key={c.id} href="#" onClick={(e) => { e.preventDefault(); onCategory(c.id); }}
                style={{
                  fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)",
                  color: active ? "var(--reh-red)" : "var(--text-strong)", textDecoration: "none",
                  padding: "14px 16px", borderBottom: active ? "3px solid var(--reh-red)" : "3px solid transparent",
                  marginBottom: -1, transition: "color var(--dur-fast), border-color var(--dur-fast)",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--reh-red)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--text-strong)"; }}
              >
                {c.label}
              </a>
            );
          })}
          <a href="#" onClick={(e) => e.preventDefault()} style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)", color: "var(--text-brand)", textDecoration: "none", padding: "14px 16px", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="tag" size={16} /> Angebote
          </a>
        </div>
      </nav>
    </header>
  );
}
window.Header = Header;
