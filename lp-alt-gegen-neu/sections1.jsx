// Interliving Rehmann — LP sections (oben)

function Header() {
  const L = window.LP;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "12px var(--gutter)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "block", textDecoration: "none" }}>
          <img src={L.logos.farbig} alt="Interliving Rehmann" style={{ height: 46, display: "block" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12.5, color: "var(--text-muted)" }}>
            <I name="map-pin" size={13} color="var(--reh-red)" /> Ihr Möbelhaus in Velbert · direkt an der A44
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href={"tel:" + L.kontakt.telefonHref} style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "var(--navy-500)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, textDecoration: "none", whiteSpace: "nowrap" }}>
            <I name="phone" size={20} color="var(--reh-red)" /> <span className="hide-sm">{L.kontakt.telefon}</span>
          </a>
          <div className="hide-sm"><CTA size="md" icon="arrow-right">Prämie sichern</CTA></div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const L = window.LP;
  const tage = tageBis(L.aktion.endDatum);
  const frei = L.aktion.plaetzeFrei, ges = L.aktion.plaetzeGesamt;
  const vimeoId = (L.media && L.media.vimeoId) || "";
  const vimeoHash = (L.media && L.media.vimeoHash) || "";
  const hasVideo = !!vimeoId;
  const vimeoSrc = hasVideo
    ? `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1` + (vimeoHash ? `&h=${vimeoHash}` : "")
    : "";
  const [py, setPy] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => setPy(Math.min(window.scrollY, 700));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Mobile: Standbild statt Video (datensparend, kein Autoplay-Problem)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 620px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener("change", update) : mq.addListener(update);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", update) : mq.removeListener(update); };
  }, []);
  return (
    <section style={{ background: "linear-gradient(165deg, var(--navy-500) 0%, var(--navy-600) 60%, var(--navy-700) 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
      {hasVideo && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
          <iframe
            src={vimeoSrc} title="Drohnenflug" frameBorder="0" allow="autoplay; fullscreen"
            style={{ position: "absolute", top: "50%", left: "50%", width: "max(100%, calc(100vh * 16 / 9))", height: "max(100%, calc(100vw * 9 / 16))", transform: `translate(-50%, calc(-50% + ${py * 0.08}px))`, border: 0, pointerEvents: "none" }}
          />
          {/* Lesbarkeits-Scrim über dem Hintergrund */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,32,45,0.93) 0%, rgba(20,32,45,0.78) 42%, rgba(20,32,45,0.45) 72%, rgba(20,32,45,0.30) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,32,45,0.55) 0%, rgba(20,32,45,0) 22%, rgba(20,32,45,0) 70%, rgba(20,32,45,0.5) 100%)" }} />
        </div>
      )}
      {hasVideo && (
        <div className="hero-seal"><Seal size={148} rotate={-8} /></div>
      )}
      <div style={{ position: "relative", zIndex: 2, maxWidth: hasVideo ? 1000 : 1140, margin: "0 auto", padding: "56px var(--gutter) 72px", display: "grid", gridTemplateColumns: hasVideo ? "1fr" : "1.06fr 0.94fr", gap: 56, alignItems: "center" }} className="hero-grid">
        <div style={{ maxWidth: hasVideo ? 680 : "none" }}>
          <h1 style={{ color: "#fff", fontSize: 66, lineHeight: 1.0, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
            Alte Küche raus,<br /><span style={{ color: "var(--red-400)" }}>Traumküche</span> rein.
          </h1>
          <p style={{ fontSize: 25, lineHeight: 1.45, color: "var(--neutral-200)", margin: "0 0 14px", maxWidth: 540, fontWeight: 500 }}>
            Wir nehmen Ihre alte Küche in Zahlung und schreiben Ihnen <b style={{ color: "#fff" }}>bis zu {L.aktion.praemieMax}&thinsp;€ Tauschprämie</b> gut. Abbau, Lieferung und Montage – alles inklusive und kostenfrei.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "26px 0 32px", display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              "Bis " + L.aktion.praemieMax + " € Prämie für Ihre alte Küche",
              "Kostenloser Abbau & Mitnahme Ihrer Altküche",
              "0 % Finanzierung über " + L.aktion.finanzierungMonate + " Monate",
            ].map(t => (
              <li key={t} style={{ display: "flex", alignItems: "center", gap: 13, fontSize: 20, fontWeight: 600 }}>
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: 999, background: "var(--success)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name="check" size={20} color="#fff" stroke={3} /></span>
                {t}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <CTA size="xl">In 60 Sekunden Prämie sichern</CTA>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22, color: "var(--neutral-300)", fontSize: 16, fontWeight: 600 }}>
            <I name="shield-check" size={20} color="var(--red-300)" /> Unverbindlich & kostenlos · Antwort in ca. 20 Minuten
          </div>
        </div>

        {!hasVideo && (
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", aspectRatio: "4/5", background: "var(--navy-700)", transform: `translateY(${py * -0.06}px)`, transition: "transform 0.1s linear" }}>
            <image-slot id="lp-hero-kueche" shape="rect" fit="cover" placeholder="Küchenfoto (hochkant, hell) hier ablegen" style={{ width: "100%", height: "100%" }}></image-slot>
          </div>
          <div style={{ position: "absolute", bottom: -24, left: -24, transform: `translateY(${py * 0.08}px)`, transition: "transform 0.1s linear" }}><Seal size={150} /></div>
        </div>
        )}
      </div>
    </section>
  );
}

function TrustBar() {
  const L = window.LP;
  const items = [
    { el: <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><GoogleG size={26} /><b style={{ fontSize: 22, color: "var(--text-strong)" }}>{L.trust.googleRating}</b><Stars size={18} /></span>, sub: L.trust.googleCount + " Google-Bewertungen" },
    { icon: "landmark", big: "Seit " + L.trust.gegruendet, sub: "Über " + L.trust.jahre + " Jahre Tradition" },
    { icon: "users", big: "Familienbetrieb", sub: "Inhabergeführt in Velbert" },
    { el: <img src={L.siegelUrl} alt="Auszeichnung Küche Rehmann" style={{ height: 62, width: "auto", display: "block" }} />, sub: "" },
  ];
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "22px var(--gutter)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="trust-grid">
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", borderRight: i < 3 ? "1px solid var(--border-subtle)" : "none" }} className="trust-item">
            {it.el || <span style={{ color: "var(--reh-red)" }}><I name={it.icon} size={30} /></span>}
            {!it.el && (
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-strong)", lineHeight: 1.1 }}>{it.big}</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{it.sub}</div>
              </div>
            )}
            {it.el && <div style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "left", display: "none" }}>{it.sub}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Benefits() {
  const L = window.LP;
  const items = [
    { icon: "piggy-bank", t: "Bis " + L.aktion.praemieMax + " € Tauschprämie", s: "Wir nehmen Ihre alte Küche in Zahlung und verrechnen die Prämie direkt mit Ihrer neuen Küche.", hl: true },
    { icon: "recycle", t: "Abbau & Mitnahme gratis", s: "Wir bauen Ihre alte Küche fachgerecht ab und nehmen sie kostenlos mit. Sie müssen sich um nichts kümmern." },
    { icon: "truck", t: "Lieferung & Montage inklusive", s: "Ihre neue Küche wird geliefert und von unseren Profis montiert – komplett im Preis enthalten." },
    { icon: "percent", t: "0 % Finanzierung", s: "Bezahlen Sie bequem in bis zu " + L.aktion.finanzierungMonate + " Monatsraten – ganz ohne Zinsen und ohne Aufpreis." },
  ];
  return (
    <Section bg="var(--surface-page)" id="vorteile">
      <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
        <Eyebrow>Ihre Vorteile im Überblick</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 0" }}>Vier gute Gründe für jetzt</h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="benefit-grid">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 90} style={{ height: "100%" }}>
          <div style={{ height: "100%", boxSizing: "border-box", display: "flex", gap: 22, padding: 32, background: it.hl ? "var(--reh-red)" : "#fff", color: it.hl ? "#fff" : "inherit", borderRadius: 20, boxShadow: "var(--shadow-sm)", border: "1px solid " + (it.hl ? "var(--reh-red)" : "var(--border-subtle)") }}>
            <span style={{ flex: "none", width: 72, height: 72, borderRadius: 18, background: it.hl ? "rgba(255,255,255,0.18)" : "var(--surface-brand-soft)", color: it.hl ? "#fff" : "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center" }}><I name={it.icon} size={38} /></span>
            <div>
              <h3 style={{ fontSize: 25, margin: "2px 0 8px", color: it.hl ? "#fff" : "var(--text-strong)" }}>{it.t}</h3>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: it.hl ? "rgba(255,255,255,0.92)" : "var(--text-body)" }}>{it.s}</p>
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Steps() {
  const steps = [
    { n: "1", icon: "clipboard-list", t: "Fragen beantworten", s: "Beantworten Sie online ein paar kurze Fragen zu Ihrer alten und neuen Küche – in unter 60 Sekunden." },
    { n: "2", icon: "phone-call", t: "Wir rufen Sie an", s: "Innerhalb von ca. 20 Minuten meldet sich Ihr persönlicher Berater und sichert Ihren Aktionsplatz." },
    { n: "3", icon: "armchair", t: "In Ruhe beraten lassen", s: "Bei Ihnen zu Hause oder in unserer Ausstellung planen wir Ihre Traumküche – ehrlich und ohne Druck." },
    { n: "4", icon: "party-popper", t: "Alt raus, neu rein", s: "Wir bauen Ihre alte Küche ab, liefern und montieren die neue. Sie genießen einfach nur." },
  ];
  return (
    <Section bg="#fff" id="ablauf">
      <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
        <Eyebrow>So einfach geht's</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 14px" }}>In 4 Schritten zur neuen Küche</h2>
        <p style={{ fontSize: 20, color: "var(--text-muted)", maxWidth: 600, margin: "0 auto" }}>Entspannt von der ersten Frage bis zur fertigen Küche – wir begleiten Sie persönlich.</p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }} className="steps-grid">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 110} style={{ position: "relative", textAlign: "center", padding: "0 6px" }}>
            <div style={{ position: "relative", width: 92, height: 92, margin: "0 auto 20px" }}>
              <div style={{ width: 92, height: 92, borderRadius: 999, background: "var(--surface-brand-soft)", color: "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center" }}><I name={s.icon} size={44} /></div>
              <span style={{ position: "absolute", top: -6, right: -6, width: 34, height: 34, borderRadius: 999, background: "var(--navy-500)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff" }}>{s.n}</span>
            </div>
            <h3 style={{ fontSize: 22, margin: "0 0 8px" }}>{s.t}</h3>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--text-body)", margin: 0 }}>{s.s}</p>
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 52 }}><CTA size="lg">Jetzt Schritt 1 starten</CTA></div>
    </Section>
  );
}

function Calc() {
  const L = window.LP;
  const rows = [
    { label: "Neue Traumküche (Beispiel)", val: "12.000 €", sub: "inkl. Markengeräten", strike: false, plus: false },
    { label: "Ihre Tauschprämie", val: "– bis 3.000 €", sub: "für Ihre alte Küche", red: true },
    { label: "Abbau & Mitnahme Altküche", val: "0 €", sub: "statt ca. 400 €", free: true },
    { label: "Lieferung & Montage", val: "0 €", sub: "statt ca. 600 €", free: true },
  ];
  return (
    <Section bg="var(--surface-page)">
      <div style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 48, alignItems: "center" }} className="calc-grid">
        <Reveal>
          <Eyebrow>Was Sie wirklich sparen</Eyebrow>
          <h2 style={{ fontSize: 44, margin: "12px 0 16px" }}>Ein Rechenbeispiel, das sich sehen lässt</h2>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-body)", margin: "0 0 24px" }}>
            Die Tauschprämie ist nur der Anfang. Weil Abbau, Lieferung und Montage komplett entfallen, sparen Sie gleich mehrfach – und zahlen bequem in Raten.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--green-100)", color: "var(--success)", padding: "12px 18px", borderRadius: 12, fontWeight: 700, fontSize: 18 }}>
            <I name="badge-check" size={24} /> Bis zu 4.000 € Gesamtvorteil möglich
          </div>
        </Reveal>
        <Reveal delay={120} style={{ background: "#fff", borderRadius: 22, boxShadow: "var(--shadow-md)", padding: 34, border: "1px solid var(--border-subtle)" }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderBottom: "1px solid var(--border-subtle)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--text-strong)" }}>{r.label}</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{r.sub}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, whiteSpace: "nowrap", color: r.red ? "var(--reh-red)" : r.free ? "var(--success)" : "var(--text-strong)" }}>{r.val}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)" }}>Ihr Vorteil</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color: "var(--reh-red)" }}>bis 4.000 €</div>
          </div>
          <div style={{ marginTop: 22 }}><CTA size="md" block>Meine Prämie berechnen</CTA></div>
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-subtle)", margin: "14px 0 0" }}>Beispielrechnung. Ihr persönliches Angebot erhalten Sie im Beratungsgespräch.</p>
        </Reveal>
      </div>
    </Section>
  );
}

Object.assign(window, { Header, Hero, TrustBar, Benefits, Steps, Calc });
