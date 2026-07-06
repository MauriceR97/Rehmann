// Interliving Rehmann — "Alt gegen Neu" App-Shell
function StickyCTA({ onOpen }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
      transform: show ? "translateY(0)" : "translateY(110%)",
      transition: "transform var(--dur-slow) var(--ease-out)",
      background: "#fff", borderTop: "1px solid var(--border-subtle)", boxShadow: "0 -8px 24px rgba(0,0,0,0.1)",
      padding: "12px var(--gutter)",
    }} className="sticky-cta">
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Seal size={56} rotate={-6} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", lineHeight: 1.1 }}>Bis 3.000 € für Ihre alte Küche</div>
            <div style={{ fontSize: 15, color: "var(--text-muted)" }}>Unverbindlich · Antwort in ca. 20 Min.</div>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 420, marginLeft: "auto" }}><CTA size="md" block onClick={onOpen}>Jetzt Prämie sichern</CTA></div>
      </div>
    </div>
  );
}

function App() {
  const [funnelOpen, setFunnelOpen] = React.useState(false);
  const open = () => setFunnelOpen(true);
  React.useEffect(() => { window.openFunnel = open; }, []);

  // Direktaufruf der Funnel-URLs (z. B. /formular-kueche) → Funnel öffnen (kein 404)
  React.useEffect(() => {
    try {
      const L = window.LP || {};
      const r = L.routes || { formular: "formular-kueche", danke: "danke-formular-kueche" };
      const path = location.pathname.replace(/^\/+|\/+$/g, "");
      if (path === r.formular || path === r.danke) setFunnelOpen(true);
    } catch (e) {}
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <TrustBar />
      <Problem />
      <Verwandlung />
      <Benefits />
      <Beispielkuechen />
      <Marken />
      <Calc />
      <Plaetze />
      <Vergleich />
      <Steps />
      <Prozess />
      <VideoTestimonial />
      <Referenzen />
      <SocialProof />
      <Garantie />
      <Finanzierung />
      <Team />
      <About />
      <FAQ />
      <FinalCTA />
      <Kleingedrucktes />
      <Footer />
      <StickyCTA onOpen={open} />
      <Funnel open={funnelOpen} onClose={() => setFunnelOpen(false)} />
    </div>
  );
}
window.LPApp = App;
