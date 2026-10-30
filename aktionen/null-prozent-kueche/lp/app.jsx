// Interliving Rehmann — "0 % · 60 Monate" App-Shell
function App() {
  const [funnelOpen, setFunnelOpen] = React.useState(false);
  const [startView, setStartView] = React.useState(null);
  const open = () => { setStartView(null); setFunnelOpen(true); };
  React.useEffect(() => { window.openFunnel = open; }, []);

  // Direktaufruf der Funnel-URLs → Funnel öffnen (kein 404)
  React.useEffect(() => {
    try {
      const L = window.LP || {};
      const r = L.routes || {};
      const basis = (L.basis || "").replace(/^\/+|\/+$/g, "");
      let path = location.pathname.replace(/^\/+|\/+$/g, "");
      if (basis && path.indexOf(basis + "/") === 0) path = path.slice(basis.length + 1);
      if (path === r.danke) { setStartView("danke"); setFunnelOpen(true); }
      else if (path === r.formular) { setStartView(null); setFunnelOpen(true); }
    } catch (e) {}
  }, []);

  return (
    <div>
      <Header />
      <HeroNP />
      <ProblemNP />
      <Angebot />
      <MarkenNP />
      <KuechenRaten />
      <VergleichNP />
      <HausGalerieNP />
      <KuechenweltNP />
      <Kontingent />
      <WegZumTermin />
      <Referenzen />
      <VideoNP />
      <SocialProof />
      <AboutNP />
      <TeamNP />
      <FAQ />
      <Footer />
      <StickyNP onOpen={open} />
      <Funnel open={funnelOpen} startView={startView} onClose={() => setFunnelOpen(false)} />
    </div>
  );
}
window.LPApp = App;
