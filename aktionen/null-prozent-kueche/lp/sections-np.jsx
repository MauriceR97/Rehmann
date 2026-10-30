// Interliving Rehmann — "0 % · 60 Monate" — Aate" — Aktions-Sektionen
const npEur = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const npRate = (preis) => npEur(preis / (window.LP.aktion.finanzierungMonate || 60));

// Einheitlicher CTA-Text
window.npCta = function (short) {
  const m = (window.LP && window.LP.aktion && window.LP.aktion.finanzierungMonate) || 60;
  return short ? "Jetzt Küche planen|0 % Finanzierung · " + m + " Monate" : "Jetzt Küche planen|mit 0 % Finanzierung · " + m + " Monate · ohne Anzahlung";
};

// Zinskosten eines klassischen Ratenkredits (Annuität), für Vergleich
function npZinsen(P, m, zinsPA) {
  const r = zinsPA / 100 / 12;
  if (!r) return 0;
  const rate = (P * r) / (1 - Math.pow(1 + r, -m));
  return rate * m - P;
}

// Hero: Küchenfoto + große 0 %-Botschaft
function HeroNP() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const tr = L.trust || {};
  const team = L.team || [];
  const t = team.find((x) => /Bayram/.test(x.name || "")) || team[0] || {};
  const timg = t.img || t.bild || t.foto;
  const chips = ["0 % bis zu " + m + " Monate", "Keine Anzahlung", "Keine Gebühren", "Hochwertige & unverbindliche Küchenplanung"];
  return (
    <section className="np-h2-wrap" style={{ background: "#fff", padding: "14px var(--gutter) 56px" }}>
      <div className="np-h2" style={{ position: "relative", maxWidth: 1320, margin: "0 auto", borderRadius: 28, overflow: "hidden", minHeight: 660, background: "#1B2B3D", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
        <div className="np-h2-img" style={{ position: "relative", gridColumn: 2, gridRow: 1, minHeight: 660, marginLeft: "-22%" }}>
          <img src="lp/assets/hero-np-0.webp" alt="Paar in neuer Küche mit großer roter Null" fetchpriority="high" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% 50%", display: "block" }} />
          <div className="np-h2-edge" aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "100%", background: "linear-gradient(90deg, #1B2B3D 0%, rgba(27,43,61,0.86) 10%, rgba(27,43,61,0.66) 22%, rgba(27,43,61,0.46) 36%, rgba(27,43,61,0.28) 52%, rgba(27,43,61,0.14) 68%, rgba(27,43,61,0.05) 84%, rgba(27,43,61,0) 100%)" }} />
        </div>
                
        <div className="np-h2-main" style={{ gridColumn: 1, gridRow: 1, alignSelf: "center", position: "relative", padding: "70px 60px 64px", maxWidth: 640, color: "#fff" }}>
          
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.96, fontSize: "clamp(42px, 5.6vw, 78px)", letterSpacing: "-0.01em", color: "#fff", margin: "0 0 22px" }}>
            Ihre Traumküche<br />für <span style={{ color: "#FFE500" }}>0 % Zinsen</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "rgba(255,255,255,0.88)", margin: "0 0 34px", maxWidth: 540 }}>Endlich die Küche, die Sie sich schon lange wünschen, bequem in bis zu {m} Monatsraten, ganz ohne Zinsen und Anzahlung. Ihr Erspartes bleibt, wo es ist.</p>
          <ul className="np-h-check" style={{ display: "none", listStyle: "none", padding: 0, margin: "0 0 28px", gap: 10, flexDirection: "column" }}>
            {[
              { t: <span><b style={{ color: "#FFE500" }}>0 %</b> bis zu {m} Monate</span>, big: true },
              { t: "Keine Anzahlung" },
              { t: "Keine Gebühren" },
              { t: "Bis zu " + Math.round(npZinsen(29990, m, L.aktion.vergleichZins || 7.9)).toLocaleString("de-DE") + " € Zinsen sparen*" },
            ].map((p, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: p.big ? 19 : 16.5, fontWeight: p.big ? 800 : 600, color: "#fff", lineHeight: 1.3 }}>
                <span style={{ flex: "none", width: 22, height: 22, borderRadius: 999, background: "#FFE500", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name="check" size={14} color="#1B2B3D" stroke={3.2} /></span>
                {p.t}
              </li>
            ))}
          </ul>
          <div className="np-h2-ctas" style={{ display: "flex", alignItems: "stretch", gap: 12, flexWrap: "nowrap" }}>
            <CTA size="lg">{window.npCta(true)}</CTA>
          </div>
          <a href={tr.googleUrl || "#"} onClick={(e) => { if (!tr.googleUrl) e.preventDefault(); }} target={tr.googleUrl ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 18, textDecoration: "none" }}>
            <span style={{ flex: "none", width: 46, height: 46, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}><GoogleG size={24} /></span>
            <span className="np-h-rating" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "nowrap", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1, color: "#fff" }}>{tr.googleRating || "4,8"}</span>
              <Stars size={17} />
              <span style={{ fontSize: 14, color: "#fff" }}>aus {tr.googleCount || "131"} Google-Bewertungen</span>
            </span>
          </a>
        </div>

        
        <div className="np-pills" aria-label="Ihre Vorteile">
          {[
            { t: "0 % bis zu " + m + " Monate", i: "badge-percent", pos: { top: "9%", left: "50%" }, r: -4, big: true },
            { t: "Keine Anzahlung", i: "wallet", pos: { top: "7%", right: "4%" }, r: 3 },
            { t: "Keine Gebühren", i: "ban", pos: { top: "47%", right: "2.5%" }, r: -3 },
            { t: "Bis zu " + Math.round(npZinsen(29990, m, L.aktion.vergleichZins || 7.9)).toLocaleString("de-DE") + " € Zinsen sparen*", i: "piggy-bank", pos: { bottom: "6%", right: "4%" }, r: -2, dark: true },
          ].map((p) => (
            <span key={p.t} className={"np-pill" + (p.big ? " np-pill-big" : "") + (p.dark ? " np-pill-dark" : "")} style={Object.assign({ position: "absolute", zIndex: 4, display: "inline-flex", alignItems: "center", gap: 9, padding: p.big ? "14px 26px 14px 14px" : "9px 16px 9px 9px", borderRadius: 999, background: p.dark ? "#fff" : "#FFE500", color: "#1B2B3D", fontWeight: 800, fontSize: p.big ? 21 : 14.5, whiteSpace: "nowrap", boxShadow: "0 12px 30px rgba(0,0,0,0.28)", transform: "rotate(" + p.r + "deg)" }, p.pos)}>
              <span style={{ flex: "none", width: p.big ? 40 : 28, height: p.big ? 40 : 28, borderRadius: 999, background: p.dark ? "#FFE500" : "#1B2B3D", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name={p.i} size={p.big ? 21 : 15} color={p.dark ? "#1B2B3D" : "#FFE500"} stroke={2.4} /></span>{p.t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Fahrplan: 3 Schritte, überlappt den Hero
function FahrplanNP() {
  const L = window.LP;
  const steps = [
    { t: "Heute anfragen", s: "Kostenlose Küchenplanung im Möbelhaus" },
    { t: "Bis " + L.aktion.endDatumText + " bestellen", s: "0 % Finanzierung fest gesichert" },
    { t: "Lieferung nach Wunsch", s: "Gerne auch erst 2027, ohne Aufpreis" },
  ];
  return (
    <div style={{ position: "relative", zIndex: 5, padding: "72px 0", background: "linear-gradient(rgba(27,43,61,0.55), rgba(27,43,61,0.72)), url(https://onecdn.io/media/381aefc2-aeb1-415a-88af-15d0b2a7ec61/full) center/cover no-repeat" }}>
      <div className="np-plan" style={{ maxWidth: 980, margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ background: "#fff", borderRadius: 22, boxShadow: "0 22px 60px rgba(27,43,61,0.16)", padding: "34px 40px 36px", textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--reh-red)" }}>Konditionen jetzt sichern</div>
          <h2 style={{ fontSize: 32, margin: "8px 0 20px", color: "#1B2B3D" }}>Jetzt planen. Liefern lassen, wann es passt.</h2>
          <div className="np-plan-facts" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, margin: "0 0 30px" }}>
            {[["0 %", "Zinsen"], [L.aktion.finanzierungMonate + " Monate", "Laufzeit"], ["0 €", "Anzahlung & Gebühren"]].map(([b, t]) => (
              <div key={t} style={{ display: "inline-flex", alignItems: "baseline", gap: 8, background: "#FFF6C2", border: "1px solid #F2DE6B", borderRadius: 999, padding: "10px 18px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--reh-red)", lineHeight: 1 }}>{b}</span>
                <span style={{ fontWeight: 700, fontSize: 14.5, color: "#1B2B3D" }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="np-plan-steps" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            <div className="np-plan-line" aria-hidden="true" style={{ position: "absolute", top: 22, left: "16.6%", right: "16.6%", height: 2, background: "var(--border-subtle)" }}>
              <div style={{ width: "28%", height: "100%", background: "var(--reh-red)" }} />
            </div>
            {steps.map((st, i) => (
              <div key={st.t} style={{ position: "relative" }}>
                <div style={{ width: 46, height: 46, borderRadius: 999, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, background: i === 0 ? "var(--reh-red)" : "#fff", color: i === 0 ? "#fff" : "#1B2B3D", border: i === 0 ? "none" : "2px solid var(--border-subtle)", boxShadow: i === 0 ? "0 0 0 6px rgba(227,6,19,0.14)" : "none" }}>{i + 1}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18.5, color: "#1B2B3D" }}>{st.t}</div>
                <div style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 4 }}>{st.s}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}><CTA size="lg">{window.npCta()}</CTA></div>
        </div>
      </div>
    </div>
  );
}

// Kontingent-Leiste direkt unter dem Hero
// Beratung: Form links mit Teamfoto
function BeratungNP() {
  const L = window.LP;
  const team = L.team || [];
  const t = team.find((x) => /Bayram/.test(x.name || "")) || team[0] || {};
  const img = t.img || t.bild || t.foto;
  return (
    <section style={{ position: "relative", background: "#fff", overflow: "hidden" }}>
      <div aria-hidden="true" className="np-blob2" style={{ position: "absolute", left: -170, top: 60, width: 640, height: 640, borderRadius: "42% 58% 37% 63% / 55% 45% 55% 45%", background: "linear-gradient(150deg,#FF6A2B 0%,#E30613 72%)" }} />
      <div className="np-hero np-ber" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "100px var(--gutter)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 60, alignItems: "center" }}>
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {img && <img src={img} alt={t.name || "Küchenberater"} loading="lazy" style={{ width: "min(400px, 100%)", aspectRatio: "4/5", objectFit: "cover", borderRadius: "48% 52% 44% 56% / 52% 44% 56% 48%", border: "10px solid #fff", boxShadow: "0 30px 70px rgba(27,43,61,0.3)", display: "block" }} />}
          {t.name && <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 999, padding: "10px 20px", boxShadow: "0 12px 30px rgba(27,43,61,0.2)", textAlign: "center", whiteSpace: "nowrap" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "#1B2B3D" }}>{t.name}</div>
            {t.rolle && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.rolle}</div>}
          </div>}
        </div>
        <div>
          <Eyebrow>Persönlich geplant</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: 44, lineHeight: 1.02, color: "#1B2B3D", margin: "12px 0 18px" }}>Ihre Küche plant <span style={{ color: "var(--reh-red)" }}>ein echter Profi.</span></h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#4A5560", margin: "0 0 22px", maxWidth: 500 }}>Kein Online-Konfigurator, sondern unser Küchenteam in Velbert: Wir planen mit Ihnen in 3D, messen bei Ihnen zu Hause auf und montieren mit eigenen Monteuren.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "0 0 28px" }}>
            {["Kostenlose Küchenplanung im Möbelhaus", "Aufmaß bei Ihnen zu Hause", "Montage durch unser eigenes Team"].map((x) => (
              <div key={x} style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 700, fontSize: 17, color: "#1B2B3D" }}><span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--reh-red)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><I name="check" size={16} color="#fff" stroke={3.2} /></span>{x}</div>
            ))}
          </div>
          <CTA size="lg">{window.npCta(true)}</CTA>
        </div>
      </div>
    </section>
  );
}

function Kontingent() {
  const L = window.LP;
  const frei = L.aktion.plaetzeFrei, ges = L.aktion.plaetzeGesamt;
  const r = 118, C = 2 * Math.PI * r, anteil = frei / ges;
  return (
    <section style={{ background: "#1B2B3D", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "84px var(--gutter)", textAlign: "center" }}>
        <Reveal>
          <div style={{ position: "relative", width: 272, height: 272, margin: "0 auto" }}>
            <svg width="272" height="272" viewBox="0 0 272 272" aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="136" cy="136" r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="16" />
              <circle cx="136" cy="136" r={r} fill="none" stroke="#FFE500" strokeWidth="16" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - anteil)} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Noch</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 104, lineHeight: 0.92, color: "#FFE500" }}>{frei}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21 }}>Plätze frei</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4, maxWidth: 150, textAlign: "center" }}>von {ges}</div>
            </div>
          </div>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.88)", maxWidth: 560, margin: "30px auto 28px" }}>Unser Planungsteam kann im {L.aktion.monat} nur {ges} Küchen zu diesen Konditionen begleiten, vergeben wird in der Reihenfolge der Anfragen. Die Aktion läuft bis {L.aktion.endDatumText}.</p>
          <CTA size="lg">{window.npCta()}</CTA>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", marginTop: 14 }}>In 1 Minute · kostenlos & unverbindlich</div>
        </Reveal>
      </div>
    </section>
  );
}

// Die drei Vorteile
// Problem: Alles wird teurer – nur die Küche nicht
function ProblemNP() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const z = L.aktion.vergleichZins || 7.9;
  const P = (L.beispielkuechen[1] || L.beispielkuechen[0]).preis;
  const zins = npZinsen(P, m, z);
  const fmt = (n, d) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });
  const tags = [
    { i: "fuel", t: "Tanken", s: "Jeder Weg kostet mehr", rot: -5 },
    { i: "zap", t: "Strom & Heizen", s: "Abschläge rauf statt runter", rot: 3 },
    { i: "shopping-cart", t: "Wocheneinkauf", s: "Gleicher Korb, höherer Betrag", rot: -2 },
    { i: "landmark", t: "Ratenkredit", s: "ca. " + fmt(z, 1) + " % Zinsen*", rot: 4, hot: true },
  ];
  return (
    <section style={{ position: "relative", background: "#1B2B3D", color: "#fff", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "url(https://onecdn.io/media/1dcd436b-afe6-4cb3-b2e8-c3e5be13fe5c/full) center/cover no-repeat", opacity: 0.22 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(27,43,61,0.55) 0%, rgba(27,43,61,0.82) 55%, #1B2B3D 100%)" }} />
      <div style={{ position: "relative", maxWidth: 1140, margin: "0 auto", padding: "96px var(--gutter) 90px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 54 }}>
          <Eyebrow color="#FFE500">Kennen Sie das?</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(36px, 4.6vw, 58px)", lineHeight: 0.98, color: "#fff", margin: "14px 0 18px" }}>Alles wird teurer.<br /><span style={{ color: "#FFE500" }}>Ihre neue Küche nicht.</span></h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "rgba(255,255,255,0.82)", maxWidth: 660, margin: "0 auto" }}>Tanken, Strom, Wocheneinkauf, gefühlt steigt jeden Monat etwas. Und wer seine Küche über die Bank finanziert, zahlt oft noch einmal Tausende Euro Zinsen obendrauf.</p>
        </Reveal>

        <div className="np-prob" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 22, maxWidth: 1000, margin: "0 auto" }}>
          {tags.map((t, n) => (
            <Reveal key={t.t} delay={n * 80}>
              <div style={{ position: "relative", paddingTop: 26 }}>
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", width: 2, height: 30, background: "rgba(255,255,255,0.35)" }} />
                <div style={{ position: "relative", transform: "rotate(" + t.rot + "deg)", background: t.hot ? "var(--reh-red)" : "#fff", color: t.hot ? "#fff" : "#1B2B3D", borderRadius: 16, padding: "30px 18px 22px", textAlign: "center", boxShadow: "0 18px 40px rgba(0,0,0,0.3)" }}>
                  <span aria-hidden="true" style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, borderRadius: 999, background: "#1B2B3D", boxShadow: "inset 0 0 0 3px " + (t.hot ? "var(--reh-red)" : "#fff") }} />
                  <span style={{ width: 52, height: 52, borderRadius: 999, background: t.hot ? "rgba(255,255,255,0.16)" : "#F4F6F9", display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: 6 }}><I name={t.i} size={26} color={t.hot ? "#fff" : "#1B2B3D"} stroke={2} /></span>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, margin: "12px 0 4px" }}>{t.t}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.4, opacity: t.hot ? 0.92 : 0.7, minHeight: 40 }}>{t.s}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, background: t.hot ? "#FFE500" : "rgba(227,6,19,0.1)", color: t.hot ? "#1B2B3D" : "var(--reh-red)", borderRadius: 999, padding: "6px 12px", fontWeight: 800, fontSize: 13.5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    <I name="trending-up" size={15} color={t.hot ? "#1B2B3D" : "var(--reh-red)"} stroke={2.8} />{t.hot ? "≈ " + fmt(zins, 0) + " €" : "teurer"}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", margin: "46px 0 26px" }}>
            <span style={{ width: 54, height: 54, borderRadius: 999, background: "#FFE500", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 28px rgba(255,229,0,0.35)" }}><I name="arrow-down" size={26} color="#1B2B3D" stroke={3} /></span>
          </div>
          <div className="np-prob-pivot" style={{ maxWidth: 880, margin: "0 auto", background: "#fff", color: "#1B2B3D", borderRadius: 24, padding: "30px 34px", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)", alignItems: "center", gap: 26, boxShadow: "0 26px 60px rgba(0,0,0,0.3)" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A94A3" }}>Küche für {fmt(P, 0)} € · Bankkredit</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, lineHeight: 1.05, color: "#8A94A3", textDecoration: "line-through", textDecorationColor: "var(--reh-red)", textDecorationThickness: 4 }}>{fmt(zins, 0)} € Zinsen*</div>
            </div>
            <div className="np-prob-vs" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--reh-red)" }}>→</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, lineHeight: 1.15, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--reh-red)", marginBottom: 6 }}>Bei Interliving Rehmann</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 64, lineHeight: 0.95, color: "var(--reh-red)" }}>0 €</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Zinsen</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <CTA size="lg">{window.npCta()}</CTA>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", maxWidth: 640, margin: "16px auto 0" }}>* Beispielrechnung: Ratenkredit über {fmt(P, 0)} € mit {fmt(z, 1)} % effektivem Jahreszins und {m} Monaten Laufzeit. Allgemeine Preisentwicklung ohne konkrete Zahlenangabe.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Kennzahlen-Leiste
function StatsNP() {
  const L = window.LP;
  const tr = L.trust || {};
  const items = [
    { i: "landmark", big: "1887", s: "Familienbetrieb seit" },
    { i: "chef-hat", big: "100+", s: "Ausstellungsküchen auf 2.500 qm" },
    { i: "star", big: (tr.googleRating || "4,8"), s: (tr.googleCount || "131") + " Google-Bewertungen", stars: true },
    { i: "calendar-check", big: String(L.aktion.plaetzeGesamt), s: "Plätze im " + L.aktion.monat },
  ];
  return (
    <div style={{ background: "#fff", padding: "40px var(--gutter) 8px" }}>
      <div className="np-stats" style={{ maxWidth: 1100, margin: "0 auto", background: "#F4F6F9", borderRadius: 22, padding: "26px 30px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 10 }}>
        {items.map((it, n) => (
          <div key={it.s} style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 10px", borderLeft: n ? "1px solid #DDE3EA" : "none" }} className="np-stat">
            <span style={{ flex: "none", width: 52, height: 52, borderRadius: 999, background: n % 2 ? "#1B2B3D" : "var(--reh-red)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name={it.i} size={24} color="#fff" stroke={2.2} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, lineHeight: 1, color: "#1B2B3D" }}>{it.big}</div>
              {it.stars && <div style={{ color: "#F5B301", fontSize: 13, letterSpacing: 1, lineHeight: 1, marginTop: 4 }}>★★★★★</div>}
              <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.3 }}>{it.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Angebot() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const z = L.aktion.vergleichZins || 7.9;
  const Pp = (L.beispielkuechen[1] || L.beispielkuechen[0]).preis;
  const zins = npZinsen(Pp, m, z);
  const fmt = (n, d) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });
  const cards = [
    { big: "0 %", t: "Zinsen, bis zu " + m + " Monate", s: "Sie zahlen exakt den Küchenpreis, verteilt auf bis zu " + m + " gleiche Monatsraten. Kein Cent mehr.", chip: "Ca. " + fmt(zins, 0) + " € Zinsen gespart*", i: "badge-percent", hero: true },
    { big: "0 €", t: "Anzahlung", s: "Ihr Erspartes bleibt auf dem Konto, für den nächsten Urlaub, die Kinder und Enkel oder einfach als gutes Gefühl.", chip: "Geld bleibt verfügbar", i: "wallet" },
    { big: "1", t: "Ansprechpartner für alles", s: "Küchenplanung im Möbelhaus, Aufmaß bei Ihnen zu Hause, Lieferung und Montage durch unser eigenes Team.", chip: "Kein Handwerker\u2011Chaos", i: "users" },
  ];
  return (
    <section id="angebot" style={{ position: "relative", background: "#F4F3F1" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 var(--gutter) 100px" }}>
        <Reveal style={{ textAlign: "center", margin: "0 0 50px", paddingTop: 64 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: "clamp(34px, 4.4vw, 54px)", lineHeight: 1, margin: "0 0 16px", color: "#1B2B3D" }}>So wird Ihre Traumküche<br /><span style={{ color: "var(--reh-red)" }}>entspannt bezahlbar.</span></h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>Während draußen alles teurer wird, drehen wir den Spieß um: Bei uns zahlen Sie nur die Küche, sonst nichts.</p>
        </Reveal>
        <div className="np-angebot" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr) minmax(0,1fr)", gap: 22, alignItems: "stretch" }}>
          {cards.map((c, n) => (
            <Reveal key={c.t} delay={n * 90}>
              <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", borderRadius: 24, padding: c.hero ? "34px 32px 30px" : "30px 28px 28px", background: c.hero ? "#1B2B3D" : "#fff", color: c.hero ? "#fff" : "#1B2B3D", border: c.hero ? "none" : "2px solid #1B2B3D", boxShadow: c.hero ? "0 26px 60px rgba(27,43,61,0.28)" : "none", overflow: "hidden" }}>
                <span aria-hidden="true" style={{ position: "absolute", right: -18, bottom: -30, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 150, lineHeight: 1, whiteSpace: "nowrap", color: c.hero ? "rgba(255,255,255,0.05)" : "rgba(27,43,61,0.05)", pointerEvents: "none" }}>{c.big}</span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: c.hero ? 86 : 72, lineHeight: 0.9, letterSpacing: "-0.03em", color: c.hero ? "#FFE500" : "var(--reh-red)" }}>{c.big}</span>
                  <span style={{ width: 48, height: 48, borderRadius: 999, background: c.hero ? "rgba(255,255,255,0.1)" : "#F4F3F1", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><I name={c.i} size={23} color={c.hero ? "#fff" : "#1B2B3D"} stroke={2} /></span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: 22, lineHeight: 1.1, margin: "18px 0 10px" }}>{c.t}</div>
                <p style={{ fontSize: 16.5, lineHeight: 1.6, color: c.hero ? "rgba(255,255,255,0.82)" : "var(--text-body)", margin: "0 0 22px", position: "relative" }}>{c.s}</p>
                <div style={{ marginTop: "auto", position: "relative" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 13px", fontWeight: 800, fontSize: 13.5, whiteSpace: "nowrap", background: c.hero ? "#FFE500" : "#fff", color: "#1B2B3D", border: c.hero ? "none" : "1.5px solid rgba(27,43,61,0.12)" }}><I name="check" size={15} color={c.hero ? "#1B2B3D" : "var(--reh-red)"} stroke={3.2} />{c.chip}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ textAlign: "center", marginTop: 40 }}>
          <CTA size="lg">{window.npCta()}</CTA>
          <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "14px auto 0", maxWidth: 620 }}>* Beispielrechnung: Ratenkredit über {fmt(Pp, 0)} € mit {fmt(z, 1)} % effektivem Jahreszins und {m} Monaten Laufzeit.</p>
        </Reveal>
      </div>
    </section>
  );
}

// Vergleich: klassischer Ratenkredit vs. Rehmann 0 %
function VergleichNP() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const z = L.aktion.vergleichZins || 7.9;
  const P = (L.beispielkuechen[1] || L.beispielkuechen[0]).preis;
  const zins = npZinsen(P, m, z);
  const fmt = (n, d) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });
  const rows = [
    { l: "Effektiver Jahreszins", a: "oft 5 bis 9 %", b: "0,00 %" },
    { l: "Laufzeit", a: "meist 24 bis 48 Monate", b: "bis zu " + m + " Monate" },
    { l: "Anzahlung", a: "häufig 10 bis 20 %", b: "0 €" },
    { l: "Bearbeitungsgebühr", a: "teilweise ja", b: "keine" },
    { l: "Zinskosten bei " + fmt(P, 0) + " €", a: "ca. " + fmt(zins, 0) + " €*", b: "0 €" },
    { l: "Monatsrate bei " + fmt(P, 0) + " €", a: fmt((P + zins) / m, 2) + " €*", b: fmt(P / m, 2) + " €" },
    { l: "Ansprechpartner", a: "Bank-Hotline", b: "persönlich in Velbert" },
  ];
  const X = () => <span style={{ flex: "none", width: 22, height: 22, borderRadius: 999, background: "#E4E7EC", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#8A94A3", fontWeight: 800, fontSize: 13 }}>✕</span>;
  const OK = () => <span style={{ flex: "none", width: 22, height: 22, borderRadius: 999, background: "#FFE500", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name="check" size={13} color="#1B2B3D" stroke={3.4} /></span>;
  return (
    <Section bg="#fff" id="vergleich">
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <Eyebrow>Der ehrliche Vergleich</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: 44, lineHeight: 1.02, margin: "12px 0 14px", color: "#1B2B3D" }}>Ratenkredit woanders <span style={{ color: "var(--reh-red)" }}>vs.</span> 0 % bei Rehmann</h2>
        <p style={{ fontSize: 19, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>Gleiche Küche, gleiche Laufzeit, der Unterschied steckt in den Zinsen.</p>
      </Reveal>
      <Reveal>
        <div className="np-vgl" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr) minmax(0,1fr)", alignItems: "stretch" }}>
          <div className="np-vgl-lab" style={{ paddingTop: 92 }}>
            {rows.map((r) => <div key={r.l} style={{ height: 58, display: "flex", alignItems: "center", fontWeight: 700, fontSize: 16, color: "#1B2B3D", borderBottom: "1px solid var(--border-subtle)" }}>{r.l}</div>)}
          </div>
          <div style={{ background: "#F4F6F9", borderRadius: "20px 0 0 20px", padding: "0 22px 22px", margin: "14px 0" }}>
            <div style={{ height: 78, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A94A3" }}>Andere Anbieter</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#5B6573" }}>Klassischer Ratenkredit</div>
            </div>
            {rows.map((r) => <div key={r.l} style={{ height: 58, display: "flex", alignItems: "center", gap: 10, fontSize: 15.5, color: "#5B6573", borderBottom: "1px solid #E1E5EB" }}><X /><span><span className="np-vgl-m" style={{ display: "none", fontWeight: 700, color: "#1B2B3D" }}>{r.l}: </span>{r.a}</span></div>)}
          </div>
          <div style={{ position: "relative", background: "#1B2B3D", color: "#fff", borderRadius: 22, padding: "0 22px 26px", boxShadow: "0 26px 60px rgba(27,43,61,0.32)" }}>
            <div style={{ height: 92, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFE500" }}>Interliving Rehmann</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>0 % Finanzierung</div>
            </div>
            {rows.map((r) => <div key={r.l} style={{ height: 58, display: "flex", alignItems: "center", gap: 10, fontSize: 16.5, fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.12)" }}><OK /><span><span className="np-vgl-m" style={{ display: "none", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{r.l}: </span>{r.b}</span></div>)}
            <div style={{ marginTop: 22 }}><CTA size="sm" block>Jetzt Küche planen</CTA></div>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div style={{ maxWidth: 1000, margin: "34px auto 0", background: "#FFE500", borderRadius: 18, padding: "20px 26px", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap", textAlign: "center" }}>
          <I name="piggy-bank" size={30} color="#1B2B3D" stroke={2.2} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "#1B2B3D" }}>Bei einer Küche für {fmt(P, 0)} € sparen Sie ca. <span style={{ color: "var(--reh-red)" }}>{fmt(zins, 0)} € Zinsen*</span></span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", maxWidth: 820, margin: "16px auto 0" }}>* Beispielrechnung: Ratenkredit über {fmt(P, 0)} € mit {fmt(z, 1)} % effektivem Jahreszins und {m} Monaten Laufzeit. Die Angaben zu anderen Anbietern beschreiben typische Marktkonditionen und können im Einzelfall abweichen.</p>
      </Reveal>
    </Section>
  );
}

// Interaktiver Ratenrechner mit Beleg
function RechnerNP() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const presets = L.beispielkuechen.map((k) => ({ label: k.badge, preis: k.preis }));
  const [preis, setPreis] = React.useState(presets[1] ? presets[1].preis : 15990);
  const z = L.aktion.vergleichZins || 7.9;
  const bankZins = npZinsen(preis, m, z);
  const rate = preis / m;
  const eur = (n, d) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });
  const [eu, ct] = eur(rate, 2).split(",");
  const pct = ((preis - 8000) / (40000 - 8000)) * 100;
  const Line = ({ l, r, hl, strike }) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 14, fontFamily: "ui-monospace,'SF Mono',Menlo,Consolas,monospace", fontSize: 14.5, padding: "7px 0", color: hl ? "var(--reh-red)" : "#2B2F36", fontWeight: hl ? 700 : 400 }}>
      <span>{l}</span><span style={{ textAlign: "right" }}>{strike && <s style={{ color: "#9A948C", fontWeight: 400, marginRight: 8 }}>{strike}</s>}{r}</span>
    </div>
  );
  return (
    <Section bg="#F3EEE6" id="rechner">
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <Eyebrow>Ratenrechner</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 14px" }}>Was kostet Ihre Traumküche <span style={{ color: "var(--reh-red)" }}>im Monat?</span></h2>
        <p style={{ fontSize: 19, color: "var(--text-muted)", maxWidth: 620, margin: "0 auto" }}>Schieben Sie den Regler auf Ihr Küchenbudget, wir rechnen live mit 0 % auf {m} Monate.</p>
      </Reveal>
      <div className="np-rechner" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: 40, alignItems: "center", maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Ihr Küchenbudget</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 64, lineHeight: 1, color: "#1B2B3D", margin: "8px 0 22px", letterSpacing: "-0.02em" }}>{eur(preis, 0)} €</div>
          <div style={{ position: "relative", height: 44 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 8, borderRadius: 999, background: "rgba(27,43,61,0.12)" }} />
            <div style={{ position: "absolute", left: 0, width: pct + "%", top: 18, height: 8, borderRadius: 999, background: "var(--reh-red)" }} />
            <input type="range" min="8000" max="40000" step="10" value={preis} onChange={(e) => setPreis(+e.target.value)} aria-label="Küchenbudget" style={{ position: "absolute", inset: 0, width: "100%", margin: 0, opacity: 0, cursor: "pointer" }} />
            <div style={{ position: "absolute", left: "calc(" + pct + "% - 16px)", top: 6, width: 32, height: 32, borderRadius: 999, background: "#fff", border: "4px solid var(--reh-red)", boxShadow: "0 4px 12px rgba(227,6,19,0.35)", pointerEvents: "none" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "var(--text-muted)", marginTop: 4 }}><span>8.000 €</span><span>40.000 €</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
            {presets.map((p) => {
              const on = p.preis === preis;
              return <button key={p.label} onClick={() => setPreis(p.preis)} style={{ border: on ? "2px solid var(--reh-red)" : "2px solid rgba(27,43,61,0.15)", background: on ? "#fff" : "transparent", color: on ? "var(--reh-red)" : "#1B2B3D", borderRadius: 999, padding: "9px 16px", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}>{p.label} · {eur(p.preis, 0)} €</button>;
            })}
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div style={{ position: "relative", transform: "rotate(1.2deg)", filter: "drop-shadow(0 22px 40px rgba(27,43,61,0.18))" }}>
            <div style={{ background: "#fff", padding: "28px 28px 20px", borderRadius: "14px 14px 0 0" }}>
              <div style={{ textAlign: "center", borderBottom: "2px dashed #D9D3CA", paddingBottom: 14, marginBottom: 8 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "#1B2B3D", letterSpacing: "0.04em" }}>INTERLIVING REHMANN</div>
                <div style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,Consolas,monospace", fontSize: 12.5, color: "#8A8580", marginTop: 4 }}>Ihr persönlicher Beleg · 0-%-Aktion</div>
              </div>
              <Line l="Ihre Küche" r={eur(preis, 2) + " €"} />
              <Line l={"Zinsen Ratenkredit (" + eur(z, 1) + " %)*"} strike={eur(bankZins, 2) + " €"} r="0,00 €" hl />
              <Line l="Anzahlung" r="0,00 €" />
              <Line l="Zinsen & Gebühren" r="0,00 €" />
              <div style={{ borderTop: "2px dashed #D9D3CA", margin: "10px 0 14px" }} />
              <div style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,Consolas,monospace", fontSize: 13, color: "#8A8580", textAlign: "center" }}>{m} Raten à</div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", color: "var(--reh-red)", margin: "4px 0 6px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 70, lineHeight: 0.95, letterSpacing: "-0.03em" }}>{eu}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginTop: 8, marginLeft: 2 }}>,{ct} €</span>
              </div>
              <div style={{ textAlign: "center", background: "#FFE500", borderRadius: 8, padding: "8px 10px", fontWeight: 800, fontSize: 14, color: "#1B2B3D", margin: "10px 0 16px" }}>Sie sparen ca. {eur(bankZins, 0)} € Zinsen*</div>
              <CTA size="md" block>Diesen Betrag anfragen</CTA>
              <div style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,Consolas,monospace", fontSize: 11.5, color: "#9A948C", textAlign: "center", marginTop: 12 }}>Rechenbeispiel · 0 % eff. Jahreszins¹</div>
            </div>
            <div aria-hidden="true" style={{ height: 14, background: "linear-gradient(135deg, #fff 7px, transparent 0) 0 0/14px 14px repeat-x, linear-gradient(225deg, #fff 7px, transparent 0) 0 0/14px 14px repeat-x" }} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// Energielabel-Pfeil (EU-Optik)
function EekBadge({ e }) {
  if (!e) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", flex: "none" }} title={"Energieeffizienzklasse " + e.k}>
      {e.ag && <span style={{ display: "inline-flex", flexDirection: "column", justifyContent: "space-between", height: 22, width: 9, marginRight: 2, fontSize: 6.5, fontWeight: 800, lineHeight: 1, color: "#1B2B3D", border: "1px solid #1B2B3D", borderRadius: 2, padding: "1px 0", alignItems: "center" }}><span>A</span><span>G</span></span>}
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", height: 22, padding: "0 8px 0 7px", background: e.c, color: e.c === "#FFE500" || e.c === "#B5D334" ? "#1B2B3D" : "#fff", fontWeight: 800, fontSize: 13, borderRadius: "3px 0 0 3px" }}>
        {e.k}
        <span style={{ position: "absolute", right: -9, top: 0, width: 0, height: 0, borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "9px solid " + e.c }} />
      </span>
    </span>
  );
}

// Detail-Overlay einer Küche
function KuecheOverlay({ k, onClose }) {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const [idx, setIdx] = React.useState(0);
  const n = k.bilder.length;
  const go = (d) => setIdx((i) => (i + d + n) % n);
  const rate = (k.preis / m).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sparen = Math.round(npZinsen(k.preis, m, L.aktion.vergleichZins || 7.9)).toLocaleString("de-DE");
  const touch = React.useRef(null);
  React.useEffect(() => {
    const y = window.scrollY, st = document.body.style;
    const prev = { o: st.overflow, p: st.position, t: st.top, w: st.width };
    st.overflow = "hidden"; st.position = "fixed"; st.top = -y + "px"; st.width = "100%";
    const onKey = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", onKey);
    return () => { st.overflow = prev.o; st.position = prev.p; st.top = prev.t; st.width = prev.w; window.scrollTo(0, y); window.removeEventListener("keydown", onKey); };
  }, []);
  const plan = () => { onClose(); setTimeout(() => window.openFunnel && window.openFunnel(), 60); };
  const arrow = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.94)", color: "#1B2B3D", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" };
  return (
    <div className="np-ov-wrap" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(16,26,38,0.72)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="np-ov" role="dialog" aria-modal="true" aria-label={k.name} onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "#fff", borderRadius: 24, width: "100%", maxWidth: 1180, height: "min(780px, 92vh)", display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.35)" }}>
        <button onClick={onClose} aria-label="Schließen" style={{ position: "absolute", top: 14, right: 14, zIndex: 5, width: 40, height: 40, borderRadius: 999, border: "none", background: "var(--reh-red)", color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}><I name="x" size={20} color="#fff" stroke={2.6} /></button>

        <div className="np-ov-gal" style={{ position: "relative", background: "#0F1822", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}
            onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; }}>
            {k.bilder.map((b, i) => (
              <img key={b} src={b} alt={k.name + " – Bild " + (i + 1)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === idx ? 1 : 0, transition: "opacity .35s ease" }} />
            ))}
            {n > 1 && <button onClick={() => go(-1)} aria-label="Vorheriges Bild" style={{ ...arrow, left: 14 }}><I name="chevron-left" size={22} /></button>}
            {n > 1 && <button onClick={() => go(1)} aria-label="Nächstes Bild" style={{ ...arrow, right: 14 }}><I name="chevron-right" size={22} /></button>}
            <span style={{ position: "absolute", left: 16, bottom: 14, background: "rgba(16,26,38,0.72)", color: "#fff", fontSize: 13, fontWeight: 700, padding: "5px 11px", borderRadius: 999 }}>{idx + 1} / {n}</span>
          </div>
          <div className="np-ov-thumbs" style={{ display: "flex", gap: 8, padding: 10, background: "#0F1822", overflowX: "auto" }}>
            {k.bilder.map((b, i) => (
              <button key={b} onClick={() => setIdx(i)} aria-label={"Bild " + (i + 1)} style={{ flex: "0 0 auto", width: 84, height: 56, padding: 0, border: "2px solid " + (i === idx ? "#FFE500" : "transparent"), borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "none", opacity: i === idx ? 1 : 0.62 }}>
                <img src={b} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        </div>

        <div className="np-ov-body" style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain", padding: "34px 34px 24px" }}>
            {(window.LP.kuechenMarken || {})[k.marke] && <img src={window.LP.kuechenMarken[k.marke].logo} alt={window.LP.kuechenMarken[k.marke].name} style={{ height: 34, width: "auto", maxWidth: 150, objectFit: "contain", display: "block", marginBottom: 14 }} />}
            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--reh-red)" }}>{k.form} · Ausstellung Velbert</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, lineHeight: 1.12, color: "#1B2B3D", margin: "8px 44px 12px 0" }}>{k.name}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#4A5560", margin: "0 0 22px" }}>{k.text}</p>

            <div style={{ background: "linear-gradient(135deg, #1B2B3D, #2A4361)", color: "#fff", borderRadius: 18, padding: "20px 22px", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>Ihre Monatsrate</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 46, lineHeight: 1, color: "#FFE500", marginTop: 4 }}>{rate} €</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 6 }}>{m} Raten · 0 % Zinsen¹ · keine Anzahlung</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
                  <div>Kaufpreis <b style={{ color: "#fff" }}>{k.preis.toLocaleString("de-DE")} €</b></div>
                  <div>Sie sparen ca. <b style={{ color: "#FFE500" }}>{sparen} €</b>*</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1B2B3D", marginBottom: 10 }}>Ausstattung</div>
            <dl style={{ margin: "0 0 24px", display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 18, rowGap: 9, fontSize: 15 }}>
              {k.specs.map(([t, v]) => (
                <React.Fragment key={t}>
                  <dt style={{ color: "var(--text-muted)" }}>{t}</dt>
                  <dd style={{ margin: 0, color: "#1B2B3D", fontWeight: 600 }}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>

            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1B2B3D", marginBottom: 10 }}>Elektrogeräte inklusive</div>
            <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--border-subtle)", borderRadius: 14, overflow: "hidden" }}>
              {k.geraete.map((g, i) => (
                <div key={g.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "12px 16px", borderTop: i ? "1px solid var(--border-subtle)" : "none", background: i % 2 ? "#FAFBFC" : "#fff" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1B2B3D" }}>{g.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{g.modell}</div>
                  </div>
                  <span style={{ paddingRight: 9 }}><EekBadge e={g.eek} /></span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "14px 0 0", lineHeight: 1.5 }}>Ausstellungsbeispiel, inkl. MwSt. Wir planen die Küche passend für Ihren Raum. Maße, Geräte und Preis rechnen wir im Termin individuell durch.</p>
          </div>
          <div style={{ padding: "16px 34px 22px", borderTop: "1px solid var(--border-subtle)", background: "#fff" }}>
            <CTA size="md" block onClick={plan} sub="kostenfrei & unverbindlich in Velbert">Diese Küche mit 0 % planen</CTA>
          </div>
        </div>
      </div>
    </div>
  );
}

function KuechenRaten() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const fmt = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const kuechen = L.beispielkuechen;
  const [open, setOpen] = React.useState(null);
  // 6er-Raster: erste Küche groß, dann im Wechsel halb/drittel
  const SPAN = [4, 3, 3, 2, 2, 2, 6, 3, 3];
  const card = (k, i) => {
    const [eu, ct] = fmt(k.preis / m).split(",");
    const span = SPAN[i] || 2;
    const big = span >= 4;
    return (
      <Reveal key={k.id || k.name} delay={(i % 3) * 70} className={"np-k2 np-k2-s" + span} style={{ gridColumn: "span " + span }}>
        <button type="button" className="np-k2-card" onClick={() => setOpen(k)} aria-label={k.name + " – Details ansehen"}
          style={{ position: "relative", display: "block", width: "100%", height: "100%", minHeight: big ? 520 : 440, padding: 0, border: "none", borderRadius: 24, overflow: "hidden", cursor: "pointer", textAlign: "left", background: "#1B2B3D", color: "#fff", boxShadow: "0 18px 44px rgba(27,43,61,0.16)" }}>
          <img className="np-k2-img" src={k.bilder ? k.bilder[0] : k.img} alt={k.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }} />
          <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,26,38,0) 38%, rgba(16,26,38,0.55) 66%, rgba(16,26,38,0.92) 100%)" }} />
          {k.badge && <span style={{ position: "absolute", top: 18, left: 18, background: "#FFE500", color: "#1B2B3D", fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "7px 13px", borderRadius: 999 }}>{k.badge}</span>}
          {(window.LP.kuechenMarken || {})[k.marke] && <span style={{ position: "absolute", top: 16, right: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", height: 40, padding: "7px 14px", background: "#fff", borderRadius: 10, boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}><img src={window.LP.kuechenMarken[k.marke].logo} alt={window.LP.kuechenMarken[k.marke].name} style={{ height: "100%", width: "auto", maxWidth: 110, objectFit: "contain", display: "block" }} /></span>}
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: big ? "30px 32px" : "24px 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <span style={{ minWidth: 0, flex: "1 1 220px" }}>
              <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? 30 : 23, lineHeight: 1.15, margin: "0 0 12px", textWrap: "balance" }}>{k.name}</span>
              <span style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "flex-start", color: "#FFE500" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? 60 : 48, lineHeight: 0.9, letterSpacing: "-0.03em" }}>{eu}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? 22 : 19, lineHeight: 1, marginTop: 4, marginLeft: 2 }}>,{ct} €</span>
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? 20 : 17, color: "#FFE500", paddingBottom: 4 }}>/mtl.</span>
              </span>
            </span>
            <span className="np-k2-more" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: "rgba(255,255,255,0.82)", fontWeight: 700, fontSize: 13.5, padding: "6px 2px", borderBottom: "1px solid rgba(255,255,255,0.4)", flex: "none", transition: "color .2s, border-color .2s" }}>Mehr dazu <I name="arrow-right" size={14} stroke={2.2} /></span>
          </span>
        </button>
      </Reveal>
    );
  };
  const plakat = (
    <Reveal key="plakat" delay={0} className="np-k2 np-k2-s2" style={{ gridColumn: "span 2" }}>
      <div style={{ position: "relative", height: "100%", minHeight: 520, borderRadius: 24, overflow: "hidden", color: "#fff", display: "flex", flexDirection: "column", background: "linear-gradient(165deg, #2A4361 0%, #1B2B3D 55%, #14212F 100%)" }}>
        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px 28px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 112, lineHeight: 0.88, letterSpacing: "-0.04em", margin: "0 0 6px", color: "#FFE500" }}>100</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24 }}>Ausstellungsküchen</div>
          <div style={{ width: 44, height: 3, background: "#fff", opacity: 0.5, borderRadius: 2, margin: "22px auto 20px" }} />
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)" }}>Auf über</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: "-0.03em", margin: "6px 0 16px", whiteSpace: "nowrap" }}>2.500 qm</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: 0, maxWidth: 260 }}>Alle Fronten, Arbeitsplatten und Geräte zum Anfassen, in Ruhe und mit persönlicher Beratung.</p>
        </div>
      </div>
    </Reveal>
  );
  const cells = [];
  kuechen.forEach((k, i) => { cells.push(card(k, i)); if (i === 0) cells.push(plakat); });
  return (
    <Section bg="var(--surface-page)" id="kuechen">
      <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
        <Eyebrow>Beispiele aus unserer Ausstellung in Velbert</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 14px" }}>So viel kostet Ihre Küche <span style={{ color: "var(--reh-red)" }}>im Monat</span></h2>
        <p style={{ fontSize: 19, color: "var(--text-muted)", maxWidth: 680, margin: "0 auto" }}>Echte Küchen aus unserer Ausstellung, ehrlich durchgerechnet bei 0 % auf {m} Monate. Tippen Sie auf eine Küche für alle Details.</p>
      </Reveal>
      <div className="np-kuechen2" style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 22, maxWidth: 1280, margin: "0 auto" }}>
        {cells}
      </div>
      <p style={{ fontSize: 13.5, color: "var(--text-muted)", textAlign: "center", maxWidth: 760, margin: "30px auto 0" }}>Unverbindliche Ausstellungsbeispiele, Preise inkl. MwSt. Raten bei 0 % effektivem Jahreszins über {m} Monate.¹ Ihre Küche rechnen wir im Planungstermin genauso offen durch.</p>
      {open && <KuecheOverlay k={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}

// Prospekt zum Durchblättern
function ProspektNP() {
  const L = window.LP;
  const p = L.prospekt || {};
  return (
    <Section bg="#F4F6F9" id="prospekt">
      <div className="np-prosp" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 56, alignItems: "center", maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--reh-red)" }}>{p.kicker || "Unser aktueller Küchenprospekt"}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: 46, lineHeight: 1, color: "#1B2B3D", margin: "12px 0 18px" }}>Blättern Sie durch<br /><span style={{ color: "var(--reh-red)" }}>Ihre Traumküche.</span></h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#4A5560", margin: "0 0 28px", maxWidth: 470 }}>{p.text || "Ausgewählte Küchen aus unserer Ausstellung, mit Markengeräten, allen Maßen und Ihrer Monatsrate bei 0 % auf bis zu " + L.aktion.finanzierungMonate + " Monate."}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
            {p.link
              ? <a href={p.link} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1B2B3D", color: "#fff", fontWeight: 800, fontSize: 17, padding: "16px 26px", borderRadius: 14, textDecoration: "none" }}><I name="book-open" size={20} color="#fff" stroke={2.2} />Prospekt durchblättern</a>
              : <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#C9D0DA", color: "#fff", fontWeight: 800, fontSize: 17, padding: "16px 26px", borderRadius: 14 }}><I name="book-open" size={20} color="#fff" stroke={2.2} />Prospekt folgt in Kürze</span>}
            <a href="#kuechen" style={{ fontWeight: 700, fontSize: 16, color: "#1B2B3D", textDecoration: "none", borderBottom: "2px solid var(--reh-red)", paddingBottom: 2 }}>Beispielküchen ansehen →</a>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <a href={p.link || "#kuechen"} target={p.link ? "_blank" : undefined} rel="noopener" style={{ position: "relative", display: "block", maxWidth: 420, margin: "0 auto", textDecoration: "none" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "translate(18px, 14px) rotate(4deg)", background: "#fff", borderRadius: 6, boxShadow: "0 18px 40px rgba(27,43,61,0.12)" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "translate(9px, 7px) rotate(2deg)", background: "#fff", borderRadius: 6, boxShadow: "0 18px 40px rgba(27,43,61,0.12)" }} />
            <div style={{ position: "relative", aspectRatio: "3 / 4", background: "#fff", borderRadius: 6, overflow: "hidden", boxShadow: "0 30px 60px rgba(27,43,61,0.25)", transform: "rotate(-2deg)" }}>
              {p.cover
                ? <img src={p.cover} alt="Küchenprospekt Interliving Rehmann" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                : <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#fff" }}>
                    <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 12px" }}>
                      <img src={L.logos.farbig} alt="Interliving Rehmann" style={{ height: 22, width: "auto", display: "block" }} />
                      <span style={{ fontWeight: 800, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1B2B3D" }}>Küchen 2026</span>
                    </div>
                    <div style={{ position: "relative", flex: "1 1 auto", minHeight: 0, background: "#1B2B3D url(lp/assets/hero-np.webp) center/cover no-repeat" }}>
                      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(27,43,61,0) 45%, rgba(27,43,61,0.88) 100%)" }} />
                      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, color: "#fff" }}>
                        <div style={{ fontWeight: 800, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFE500" }}>Ihre Traumküche</div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 25, lineHeight: 1.02, textTransform: "uppercase", marginTop: 4 }}>Heute planen,<br />entspannt zahlen.</div>
                      </div>
                    </div>
                    <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 16px", background: "var(--reh-red)", color: "#fff" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, lineHeight: 1.1 }}>0 % Finanzierung<br /><span style={{ fontSize: 11.5, fontWeight: 700, opacity: 0.9 }}>auf {L.aktion.finanzierungMonate} Monate · ohne Anzahlung</span></span>
                      <span style={{ fontWeight: 800, fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.9, textAlign: "right" }}>Velbert<br />seit 1887</span>
                    </div>
                  </div>}
              <span style={{ position: "absolute", top: 18, right: 18, width: 104, height: 104, borderRadius: 999, background: "var(--reh-red)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(10deg)", boxShadow: "0 12px 26px rgba(227,6,19,0.4)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, lineHeight: 0.9 }}>0 %</span>
                <span style={{ fontWeight: 800, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 3 }}>bis {L.aktion.finanzierungMonate} Mon.</span>
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

// Markenleiste
function MarkenNP() {
  const names = [["interliving","Interliving"],["nolte","Nolte Küchen"],["nolteneo","nolteneo"],["ballerina","Ballerina Küchen"],["nobilia","nobilia"],["miele","Miele"],["siemens","Siemens"],["bora","BORA"],["quooker","Quooker"],["berbel","berbel"],["blanco","Blanco"],["neff","NEFF"],["aeg","AEG"],["franke","Franke"],["villeroy-boch","Villeroy & Boch"]];
  const half = Math.ceil(names.length / 2);
  const rows = [names.slice(0, half), names.slice(half)];
  const tile = ([f, n]) => (
    <div key={f} className="np-marke" title={n} style={{ flex: "1 1 0", minWidth: 0, height: 76, borderRadius: 0, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 16px" }}>
      <img src={"lp/assets/marken-np/" + f + ".png"} alt={n} loading="lazy" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", filter: "grayscale(1)", opacity: 0.65 }} />
    </div>
  );
  return (
    <div style={{ background: "#fff", overflow: "hidden" }}>
      <div style={{ padding: "48px 0 40px", textAlign: "center" }}>
        <div style={{ marginBottom: 26 }}><Eyebrow>Unsere Küchen- und Gerätemarken</Eyebrow></div>
        <div className="np-marken" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r, i) => (
            <div key={i} className="np-marken-row" style={{ display: "flex", gap: 12, padding: "0 var(--gutter)", marginLeft: i === 1 ? 70 : 0, marginRight: i === 0 ? 70 : 0 }}>
              {r.map(tile)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Weg zum Termin
function WegZumTermin() {
  const L = window.LP;
  const steps = [
    { n: "1", t: "Platz sichern", s: "1 von " + L.aktion.plaetzeGesamt + " Sonderkontingenten", tag: "Unverbindlich" },
    { n: "2", t: "Küchenplanung", s: "Im Möbelhaus Rehmann", tag: "Kostenfrei" },
    { n: "3", t: "0 %-Angebot", s: "Bis " + L.aktion.finanzierungMonate + " Monate, ohne Anzahlung", tag: "Unverbindlich" },
    { n: "4", t: "Montage", s: "Eigenes Team, ca. 12 Wochen", hi: true },
  ];
  return (
    <Section bg="#fff" id="ablauf">
      <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
        <Eyebrow>So einfach geht's</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 0" }}>In 4 Schritten zur neuen Küche</h2>
      </Reveal>
      <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 70}>
            <div style={{ height: "100%", background: s.hi ? "linear-gradient(165deg, #F2222E 0%, #D90512 100%)" : "var(--surface-page)", borderRadius: 18, padding: "26px 22px", border: s.hi ? "none" : "1px solid var(--border-subtle)", boxShadow: s.hi ? "0 18px 40px rgba(227,6,19,0.28)" : "none", color: s.hi ? "#fff" : undefined }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}><div style={{ width: 46, height: 46, borderRadius: 999, background: s.hi ? "#fff" : i === 0 ? "var(--reh-red)" : "#1B2B3D", color: s.hi ? "var(--reh-red)" : "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div></div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: s.hi ? "#fff" : "var(--text-strong)", margin: "16px 0 8px" }}>{s.t}</div>
              <div style={{ fontSize: 16, lineHeight: 1.55, color: s.hi ? "rgba(255,255,255,0.9)" : "var(--text-muted)" }}>{s.s}</div>
              {s.tag && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, color: "#1E7A3C", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}><I name="check" size={16} stroke={3} />{s.tag}</div>}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ textAlign: "center", marginTop: 34 }}><CTA size="lg">{window.npCta()}</CTA></Reveal>
    </Section>
  );
}

// Durchwischbare Bildstrecke (Scroll-Snap, Pfeile, Punkte)
function SwipeBilderNP({ bilder, alt }) {
  const ref = React.useRef(null);
  const [i, setI] = React.useState(0);
  const pause = React.useRef(false);
  const lock = React.useRef(false);
  const goTo = (n) => {
    const el = ref.current; if (!el) return;
    const slide = el.children[n]; if (!slide) return;
    const target = slide.offsetLeft;
    setI(n);
    lock.current = true;
    el.style.scrollSnapType = "none";
    el.scrollTo({ left: target, behavior: "smooth" });
    clearTimeout(goTo.t);
    goTo.t = setTimeout(() => {
      if (Math.abs(el.scrollLeft - target) > 2) el.scrollLeft = target;
      el.style.scrollSnapType = "x mandatory";
      lock.current = false;
    }, 600);
  };
  React.useEffect(() => {
    if (bilder.length < 2) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!pause.current) setI((cur) => { const n = (cur + 1) % bilder.length; goTo(n); return n; }); }, 3500);
    return () => clearInterval(t);
  }, [bilder.length]);
  const onScroll = () => { if (lock.current) return; const el = ref.current; if (!el || !el.children[0]) return; const w = el.children[0].getBoundingClientRect().width || el.clientWidth; setI(Math.max(0, Math.min(bilder.length - 1, Math.round(el.scrollLeft / w)))); };
  const hold = () => { pause.current = true; clearTimeout(hold.t); };
  const release = () => { clearTimeout(hold.t); hold.t = setTimeout(() => { pause.current = false; }, 5000); };
  return (
    <div style={{ position: "absolute", inset: 0 }} onMouseEnter={hold} onMouseLeave={release} onTouchStart={hold} onTouchEnd={release}>
      <div ref={ref} onScroll={onScroll} className="np-swipe" style={{ position: "absolute", inset: 0, display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        {bilder.map((b, n) => (
          <img key={b} src={b} alt={alt + ", Bild " + (n + 1)} loading={n ? "lazy" : undefined} draggable="false" style={{ flex: "0 0 100%", width: "100%", height: "100%", objectFit: "cover", scrollSnapAlign: "start", display: "block" }} />
        ))}
      </div>
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 3, display: "flex", gap: 5 }}>
        {bilder.map((b, n) => <span key={b} style={{ width: n === i ? 18 : 6, height: 6, borderRadius: 999, background: n === i ? "#FFE500" : "rgba(255,255,255,0.75)", transition: "width .3s" }} />)}
      </div>
    </div>
  );
}

// Bildstrecke: Möbelhaus in Szene setzen
function HausGalerieNP() {
  const tiles = [
    { src: "https://res.cloudinary.com/dusdhljtc/image/upload/v1788528177/nl-header-drohne.jpg", t: "Unser Küchenhaus in Velbert", s: "Flandersbacher Weg 2 · direkt an der A44", big: true },
    { src: "lp/assets/haus/ausstellung-09.webp", bilder: ["lp/assets/haus/ausstellung-09.webp","https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_4:3,w_1000/rv-042-1.jpg","https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_4:3,w_1000/rv-072-1.jpg","https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_4:3,w_1000/rv-029-thumb3.jpg","https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_4:3,w_1000/rv-026-thumb.avif","https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_4:3,w_1000/rv-032-thumb3.jpg","https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_4:3,w_1000/rv-033-thumb3.jpg"], t: "Über 100 Ausstellungsküchen", s: "Live erleben statt im Katalog blättern" },
    { src: "lp/assets/haus/ausstellung-03.webp", t: "Fronten & Muster zum Anfassen", s: "Farben, Griffe, Arbeitsplatten" },
    { src: "lp/assets/haus/montage.webp", t: "Eigenes Montageteam", s: "Keine Subunternehmer, alles aus einer Hand" },
  ];
  const cap = (x) => (
    <div style={{ padding: x.big ? "16px 4px 2px" : "12px 4px 2px" }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: x.big ? 21 : 17, lineHeight: 1.2, color: "var(--text-strong)" }}>{x.t}</div>
      <div style={{ fontSize: 14.5, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.4 }}>{x.s}</div>
    </div>
  );
  return (
    <Section bg="#F4F3F1" id="haus">
      <Reveal style={{ textAlign: "center", marginBottom: 34 }}>
        <Eyebrow>Seit 1887 in Velbert</Eyebrow>
        <h2 className="np-haus-h2" style={{ fontSize: 42, margin: "12px 0 10px", textWrap: "balance" }}>Ihre Küche entsteht bei uns, nicht im Internet</h2>
        <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>Kommen Sie vorbei, setzen Sie sich an unsere Kochinseln und lassen Sie sich von über 100 Ausstellungsküchen inspirieren.</p>
      </Reveal>
      <div className="np-haus" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr 1fr", gridTemplateRows: "auto auto", gap: "22px 16px" }}>
        {tiles.map((x, i) => (
          <Reveal key={x.src} delay={i * 60} className={"np-haus-tile" + (x.big ? " np-haus-big" : "")} style={{ display: "flex", flexDirection: "column", gridColumn: x.big ? "1" : undefined, gridRow: x.big ? "1 / span 2" : undefined, ...(i === 3 ? { gridColumn: "2 / span 2" } : {}) }}>
            <div className="np-haus-img" style={{ position: "relative", flex: x.big ? "1 1 auto" : "none", height: x.big ? "auto" : 210, minHeight: x.big ? 340 : 0, borderRadius: 18, overflow: "hidden", background: "#E7E2DA" }}>
              {x.bilder ? <SwipeBilderNP bilder={x.bilder} alt={x.t} /> : <img src={x.src} alt={x.t} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
            </div>
            {cap(x)}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// Vollbild-Trenner mit Gebäude
function HausBannerNP() {
  const L = window.LP;
  return (
    <div className="np-hausbanner" style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", background: "#1B2B3D url(lp/assets/haus/gebaeude.webp) center/cover no-repeat" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(16,26,38,0.88) 0%, rgba(16,26,38,0.55) 55%, rgba(16,26,38,0.15) 100%)" }} />
      <div style={{ position: "relative", maxWidth: 1180, width: "100%", margin: "0 auto", padding: "64px var(--gutter)", color: "#fff" }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFE500" }}>Inhabergeführt seit 1887</div>
          <h2 style={{ fontSize: 40, lineHeight: 1.12, margin: "12px 0 14px", color: "#fff" }}>Persönlich beraten. Fair finanziert. Sauber montiert.</h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, opacity: 0.9, margin: "0 0 26px" }}>Bei uns planen Sie mit echten Menschen, die Ihre Küche von der ersten Skizze bis zur Montage begleiten, und auch danach für Sie da sind.</p>
          <CTA size="lg">{window.npCta()}</CTA>
        </div>
      </div>
    </div>
  );
}

// Küchenwelten: gestapelte Stil-Kacheln mit Bildergalerie (vor/zurück)
const NP_WELTEN = [{"id":"kw-modern","h":"Moderne Küchen","p":"Schlägt Ihr Herz für zeitloses Design mit klaren Linien? Grifflose Fronten, matte Oberflächen und ruhige Flächen machen die Küche zum edlen Mittelpunkt Ihres Zuhauses.","li":["Grifflose Fronten in Matt oder Lack","Durchdachte Stauraumlösungen","Moderne Einbaugeräte auf Augenhöhe","Große Auswahl an Farben und Dekoren"],"img":[{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB12/leitbild","alt":"nobilia NOVALUX 512, Hochglanz, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB15/leitbild","alt":"nobilia FOCUS 467, Hochglanz, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB18/leitbild","alt":"nobilia PURA 834, Hochglanz, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB21/leitbild","alt":"nobilia LASER 416, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL08/leitbild","alt":"Interliving, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL09/leitbild","alt":"Interliving, matt, farbig"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL10/leitbild","alt":"Interliving Elegante Hochglanzküche in Dunkelgrau mit Holzrückwand und viel Stauraum, Hochglanz, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL13/leitbild","alt":"Interliving, matt, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU01/leitbild","alt":"Culineo C187, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU02/leitbild","alt":"Culineo C187, matt, hell"}]},{"id":"kw-landhaus","h":"Landhausküchen","p":"Für viele der Inbegriff von Gemütlichkeit: Kassettenfronten, warme Holztöne und Naturmaterialien, neu interpretiert mit moderner Technik und viel Komfort.","li":["Perfekter Mix aus Tradition und Moderne","Naturmaterialien und warme Holztöne","Vitrinen und offene Regale","Hochwertige, moderne Einbaugeräte"],"img":[{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB09/leitbild","alt":"nobilia FRAME 649, Landhaus, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB11/leitbild","alt":"nobilia SYLT 849, Landhaus, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB39/leitbild","alt":"nobilia NORDIC 782, Landhaus, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB40/leitbild","alt":"nobilia NORDIC 791, Landhaus, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL32/leitbild","alt":"Interliving Moderne Landhausküche in elegantem Anthrazit mit Holzarbeitsplatte und großzügiger Kochinsel, Landhaus, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL39/leitbild","alt":"Interliving Moderne Landhausküche in Schwarz mit Kücheninsel, Landhaus, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL45/leitbild","alt":"Interliving Moderne Landhausküche in Weiß mit Kassettentüren, dunkler Arbeitsplatte und stilvollen Griffen im Vintage-Look, Landhaus, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL51/leitbild","alt":"Interliving Weiße Landhausküche mit schwarzer Arbeitsplatte, Landhaus, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU25/leitbild","alt":"Culineo C684, Landhaus, farbig"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU26/leitbild","alt":"Culineo C684, Landhaus, hell"}]},{"id":"kw-single","h":"Singleküchen & Kompakt","p":"Ein kleines Raumwunder, das knappen Platz optimal nutzt. Ideal für Wohnung, Einliegerwohnung oder Ferienhaus. Klein heißt bei uns nicht Verzicht.","li":["Clevere Lösungen für wenig Raum","Küchenzeile, L- oder U-Form","Hochschränke statt verlorener Ecken","Maßgenaue Planung für Ihren Raum"],"img":[{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL19/leitbild","alt":"Interliving, kompakte Küchenzeile, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL50/leitbild","alt":"Interliving, kompakte Küchenzeile, matt, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU26/leitbild","alt":"Culineo C684, kompakte Küchenzeile, Landhaus, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU23/leitbild","alt":"Culineo C615, kompakte Küchenzeile, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL13/leitbild","alt":"Interliving, kompakte Küchenzeile, matt, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL09/leitbild","alt":"Interliving, kompakte Küchenzeile, matt, farbig"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU15/leitbild","alt":"Culineo C382, kompakte Küchenzeile, matt, dunkel"}]},{"id":"kw-insel","h":"Kochinsel & offen","p":"Kochen mitten im Raum, im Gespräch mit Familie und Gästen. Mit Insel oder Theke wird die Küche zum Treffpunkt des ganzen Hauses.","li":["Kochinsel oder Theke mit Sitzplatz","Offener Übergang zum Wohnbereich","Viel Arbeitsfläche für zwei","Kraftvolle, leise Dunstabzüge"],"img":[{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB02/leitbild","alt":"nobilia STRUCTURA 425, Holzoptik, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB06/leitbild","alt":"nobilia CADRA 746, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB07/leitbild","alt":"nobilia STRUCTURA 409, Holzoptik, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/nobilia/NB10/leitbild","alt":"nobilia SENSO 499, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL03/leitbild","alt":"Interliving, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL06/leitbild","alt":"Interliving, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL11/leitbild","alt":"Interliving, matt, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/interliving/IL14/leitbild","alt":"Interliving, Hochglanz, hell"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU13/leitbild","alt":"Culineo C382, Holzoptik, dunkel"},{"src":"https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200/hugelmann/kuechen/culineo/CU17/leitbild","alt":"Culineo C615, matt, hell"}]}];

function KwGalNP({ bilder }) {
  const tr = React.useRef(null);
  const [i, setI] = React.useState(0);
  const n = bilder.length;
  const to = (k) => { const el = tr.current; if (el) el.scrollTo({ left: k * el.clientWidth, behavior: "smooth" }); };
  const onScroll = () => { const el = tr.current; if (el) setI(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))); };
  const btn = (dir) => {
    const off = dir < 0 ? i <= 0 : i >= n - 1;
    return (
      <button type="button" aria-label={dir < 0 ? "Vorheriges Bild" : "Nächstes Bild"} onClick={() => to(i + dir)} style={{ position: "absolute", top: "50%", [dir < 0 ? "left" : "right"]: 16, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: 0, background: "rgba(255,255,255,0.95)", color: "#1B2B3D", fontSize: 26, lineHeight: 1, paddingBottom: 3, cursor: "pointer", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", opacity: off ? 0 : 1, pointerEvents: off ? "none" : "auto", transition: "opacity 160ms ease" }}>{dir < 0 ? "‹" : "›"}</button>
    );
  };
  return (
    <div className="kw9-gal" style={{ position: "relative", background: "#1B2B3D", borderRadius: 12, overflow: "hidden" }}>
      <div ref={tr} onScroll={onScroll} className="kw9-track" style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
        {bilder.map((b) => (
          <img key={b.src} src={b.src} alt={b.alt} loading="lazy" decoding="async" width="1200" height="675" style={{ flex: "0 0 100%", width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "cover", scrollSnapAlign: "center", display: "block" }} />
        ))}
      </div>
      {n > 1 && btn(-1)}
      {n > 1 && btn(1)}
      {n > 1 && <span style={{ position: "absolute", left: 16, bottom: 14, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: "rgba(16,26,38,0.6)", borderRadius: 6, padding: "4px 9px" }}>{i + 1} / {n}</span>}
    </div>
  );
}

function KuechenweltNP() {
  const L = window.LP;
  const jump = (id) => (e) => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" }); };
  const link = (id, t) => <a href={"#" + id} onClick={jump(id)} style={{ color: "var(--reh-red)", textDecoration: "none", fontWeight: 600 }}>{t}</a>;
  return (
    <Section bg="#fff" id="kuechenwelten">
      <Reveal style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 40px" }}>
        <h2 style={{ fontSize: 42, margin: 0 }}>Für jeden die <span style={{ color: "var(--reh-red)" }}>passende Küche</span></h2>
        <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.7, color: "var(--text-muted)" }}>Entdecken Sie unsere Küchenwelten: ob {link("kw-modern", "moderne Küchen")}, {link("kw-landhaus", "Landhausküchen")}, {link("kw-single", "Singleküchen")} oder {link("kw-insel", "offene Küchen mit Kochinsel")}. Alle live in unserer Ausstellung in Velbert, und die 0 %-Finanzierung gilt für jede davon.* <b style={{ color: "#1B2B3D" }}>Wer bei uns keine Küche findet, plant sie mit uns.</b></p>
      </Reveal>
      {NP_WELTEN.map((w, n) => (
        <Reveal key={w.id}>
          <article id={w.id} className={"kw9-b" + (n % 2 ? " rev" : "")} style={{ display: "grid", gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)", gap: 36, alignItems: "center", background: "#F4F3F1", borderRadius: 14, padding: 28, marginTop: n ? 28 : 0 }}>
            <div className="kw9-txt" style={{ order: n % 2 ? 2 : 0, padding: n % 2 ? "8px 10px 8px 4px" : "8px 4px 8px 10px" }}>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase", color: "#1B2B3D" }}>{w.h}</h3>
              <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "var(--text-body)" }}>{w.p}</p>
              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0 }}>
                {w.li.map((t, k) => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: k < w.li.length - 1 ? "1px solid #E2DDD5" : "none", fontSize: 15, color: "#1B2B3D" }}>
                    <span style={{ flex: "none", width: 20, height: 20, borderRadius: "50%", background: "var(--reh-red)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name="check" size={12} color="#fff" stroke={3.4} /></span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <KwGalNP bilder={w.img} />
          </article>
        </Reveal>
      ))}
      <Reveal style={{ textAlign: "center", marginTop: 40 }}>
        <CTA size="lg">{window.npCta()}</CTA>
      </Reveal>
    </Section>
  );
}

// Kundenvideo (Vimeo)
function VideoNP() {
  const L = window.LP;
  const vid = (L.media && L.media.testimonialVimeoId) || "";
  return (
    <Section bg="#1B2B3D" id="video">
      <Reveal style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
        <Eyebrow color="#FFE500">Echte Stimmen</Eyebrow>
        <h2 style={{ fontSize: 42, margin: "12px 0 14px", color: "#fff" }}>Unsere Kundin erzählt von ihrer neuen Küche</h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.8)", margin: 0 }}>Von der ersten Planung bis zur fertigen Montage, so hat sie ihr Küchenprojekt mit Rehmann erlebt.</p>
      </Reveal>
      <Reveal style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 22, overflow: "hidden", background: "#0F1A26", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }}>
          {vid ? (
            <iframe src={"https://player.vimeo.com/video/" + vid + "?title=0&byline=0&portrait=0&dnt=1"} title="Kundenvideo: Küchenprojekt mit Rehmann" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)" }}>Video folgt in Kürze</div>
          )}
        </div>
      </Reveal>
      <Reveal style={{ textAlign: "center", marginTop: 34 }}>
        <CTA size="lg" variant="white">{window.npCta()}</CTA>
      </Reveal>
    </Section>
  );
}

// Küchenteam: Küchenleiter groß, Team im Raster
function TeamNP() {
  const L = window.LP;
  const team = L.team || [];
  const lead = team.find((m) => /leiter/i.test(m.rolle)) || team[0];
  const owner = team.find((m) => /Rehmann/.test(m.name || ""));
  const rest = team.filter((m) => m !== lead && m !== owner);
  const foto = (m, big) => (
    <div className={"np-team-card" + (big ? " np-team-lead" : "")} style={Object.assign({ position: "relative", width: "100%", borderRadius: 20, overflow: "hidden", background: "#E7E2DA" }, big ? { height: "100%", minHeight: 0 } : { height: "auto", aspectRatio: "4 / 5" })}>
      <img src={m.img} alt={m.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%", display: "block" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,26,38,0) 52%, rgba(16,26,38,0.85) 100%)" }} />
      <div style={{ position: "absolute", left: big ? 28 : 16, right: big ? 28 : 16, bottom: big ? 26 : 14, color: "#fff" }}>
        {big && <div style={{ display: "inline-block", background: "#FFE500", color: "#1B2B3D", fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999, marginBottom: 12 }}>{m.rolle}</div>}
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: big ? 30 : 18, lineHeight: 1.15 }}>{m.name}</div>
        {!big && <div style={{ fontSize: 13.5, opacity: 0.85, marginTop: 2 }}>{m.rolle}</div>}
      </div>
    </div>
  );
  return (
    <Section bg="var(--surface-page)" id="team">
      <Reveal style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 40px" }}>
        <Eyebrow>Ihr Küchenteam</Eyebrow>
        <h2 style={{ fontSize: 42, margin: "12px 0 14px" }}>Menschen, die Ihre Küche planen</h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>Echte Küchenexperten aus Velbert, persönlich, ehrlich und mit viel Erfahrung. Von der ersten Idee bis zur fertigen Montage.</p>
      </Reveal>
      {owner && (
        <Reveal style={{ marginBottom: 18 }}>
          <div className="np-owner-card" style={{ display: "grid", gridTemplateColumns: "minmax(0, 300px) minmax(0, 1fr)", gap: 0, background: "#1B2B3D", borderRadius: 22, overflow: "hidden", color: "#fff" }}>
            <div className="np-owner-photo" style={{ position: "relative", aspectRatio: "4 / 5", background: "#E7E2DA" }}>
              <img src={owner.img} alt={owner.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", display: "block" }} />
            </div>
            <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
              <div style={{ display: "inline-block", alignSelf: "flex-start", background: "#FFE500", color: "#1B2B3D", fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999 }}>{owner.rolle}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, lineHeight: 1.05 }}>{owner.name}</div>
              <div style={{ fontSize: 17.5, lineHeight: 1.6, color: "rgba(255,255,255,0.82)", maxWidth: 520 }}>Familienbetrieb seit {L.trust.gegruendet}: Bei uns plant und montiert ein festes Team aus Velbert, mit dem Inhaber persönlich im Haus.</div>
              <div style={{ fontFamily: "'Brush Script MT', cursive", fontStyle: "italic", fontSize: 32, color: "#FFE500", lineHeight: 1, marginTop: 6 }}>{owner.name}</div>
            </div>
          </div>
        </Reveal>
      )}
      <div className="np-team" style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 18 }}>
        {lead && <Reveal className="np-team-leadcell" style={{ gridColumn: "span 2", gridRow: "span 2", height: "100%" }}>{foto(lead, true)}</Reveal>}
        {rest.map((m, i) => <Reveal key={m.name} delay={(i % 3) * 60}>{foto(m, false)}</Reveal>)}
      </div>
      <Reveal style={{ textAlign: "center", marginTop: 38 }}>
        <CTA size="lg">{window.npCta()}</CTA>
      </Reveal>
    </Section>
  );
}

// Über uns: Drohnenbild im Hintergrund, Küchen-Centrum links
function AboutNP() {
  const L = window.LP;
  const drohne = "https://res.cloudinary.com/dusdhljtc/image/upload/f_auto,q_auto,w_2000/nl-header-drohne.jpg";
  return (
    <section className="np-about" style={{ position: "relative", color: "#fff", overflow: "hidden", background: "#1B2B3D url(" + drohne + ") center/cover no-repeat" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(16,26,38,0.55) 0%, rgba(16,26,38,0.78) 45%, rgba(16,26,38,0.94) 100%)" }} />
      <div className="np-about-grid" style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "110px var(--gutter)", display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: 64, alignItems: "center" }}>
        <Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "4 / 5", boxShadow: "0 36px 80px rgba(0,0,0,0.45)", border: "6px solid #fff", transform: "rotate(-2deg)" }}>
              <img src={L.haus.gebaeude} alt="Küchen-Centrum Interliving Rehmann in Velbert" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ position: "absolute", left: -14, bottom: 34, background: "var(--reh-red)", color: "#fff", borderRadius: 14, padding: "14px 20px", boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }}>
              <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>Unser</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, lineHeight: 1.1 }}>Küchen-Centrum</div>
              <div style={{ fontSize: 14, opacity: 0.9, marginTop: 2 }}>Flandersbacher Weg 2 · Velbert</div>
            </div>
            <div style={{ position: "absolute", right: -10, top: 26, width: 112, height: 112, borderRadius: "50%", background: "#FFE500", color: "#1B2B3D", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxShadow: "0 18px 40px rgba(0,0,0,0.3)", transform: "rotate(8deg)" }}>
              <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>Seit</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, lineHeight: 1 }}>{L.trust.gegruendet}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow color="#FFE500">Ihr Möbelhaus in Velbert</Eyebrow>
          <h2 style={{ color: "#fff", fontSize: "clamp(34px, 3.8vw, 48px)", lineHeight: 1.08, margin: "14px 0 22px" }}>Seit {L.trust.gegruendet} ein Versprechen: <span style={{ color: "#FFE500" }}>ehrliche Beratung</span></h2>
          <p style={{ fontSize: 18.5, lineHeight: 1.65, color: "rgba(255,255,255,0.86)", margin: "0 0 16px" }}>Als inhabergeführter Familienbetrieb stehen wir seit über {L.trust.jahre} Jahren mit unserem Namen für Qualität. Bei uns sind Sie keine Nummer, wir nehmen uns Zeit, hören zu und planen Ihre Küche so, wie sie zu Ihrem Leben passt.</p>
          <p style={{ fontSize: 18.5, lineHeight: 1.65, color: "rgba(255,255,255,0.86)", margin: "0 0 30px" }}>Über {L.trust.musterkuechen} Ausstellungsküchen auf über 2.500 qm zum Anfassen, eigene Monteure und ein Service, der auch nach dem Kauf für Sie da ist.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.18)" }}>
            <img src={L.inhaberFoto} alt="Marc Rehmann" loading="lazy" className="np-owner" style={{ width: 116, height: 116, borderRadius: 999, objectFit: "cover", objectPosition: "center 22%", flex: "none", border: "3px solid #fff", boxShadow: "0 8px 22px rgba(0,0,0,0.3)" }} />
            <div>
              <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: 30, color: "#fff", fontStyle: "italic", lineHeight: 1 }}>Marc Rehmann</div>
              <div style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Inhaber & Geschäftsführer</div>
            </div>
            <div style={{ flexBasis: "100%", display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 14, padding: "12px 18px" }}>
              <img src={L.siegelUrl} alt="Auszeichnung: Herausragendes Möbelhaus 2025" loading="lazy" style={{ height: 56, width: 56, objectFit: "contain", flex: "none", display: "block" }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "var(--text-strong)", lineHeight: 1.3 }}>Ausgezeichnet als<br /><span style={{ color: "var(--reh-red)" }}>Herausragendes Möbelhaus 2025</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Abschluss-CTA
function FinalCTANP() {
  const L = window.LP;
  const m = L.aktion.finanzierungMonate;
  const k = (L.beispielkuechen || [])[3] || (L.beispielkuechen || [])[0] || {};
  return (
    <div style={{ background: "#fff", padding: "40px var(--gutter) 90px" }}>
      <Reveal>
        <div className="np-final" style={{ maxWidth: 1160, margin: "0 auto", borderRadius: 26, overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", background: "#F3EEE6", boxShadow: "0 24px 60px rgba(27,43,61,0.12)" }}>
          <div style={{ padding: "56px 54px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-muted)" }}>Bereit für Ihre neue Küche?</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", fontSize: 44, lineHeight: 1.02, color: "#1B2B3D", margin: "10px 0 16px" }}>Planungstermin<br /><span style={{ color: "var(--reh-red)" }}>heute sichern</span></h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#4A5560", margin: "0 0 26px", maxWidth: 440 }}>0 % auf {m} Monate, ohne Anzahlung und Gebühren, nur für {L.aktion.plaetzeGesamt} Kunden im {L.aktion.monat}. Wir rufen Sie in ca. 20 Minuten zurück.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <CTA size="lg">{window.npCta(true)}</CTA>
              <a href={"tel:" + L.kontakt.telefonHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 16, color: "#1B2B3D", textDecoration: "none" }}><I name="phone" size={18} color="var(--reh-red)" stroke={2.4} />{L.kontakt.telefon}</a>
            </div>
          </div>
          <div className="np-final-img" style={{ position: "relative", minHeight: 420 }}>
            {k.img && <img src={k.img} alt={k.name || "Küche"} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
            <div style={{ position: "absolute", left: 22, bottom: 22, background: "#fff", borderRadius: 16, padding: "12px 18px", boxShadow: "0 14px 36px rgba(27,43,61,0.25)" }}>
              <div style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--reh-red)" }}>Monatlich ab</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "#1B2B3D" }}>{(Math.min.apply(null, (L.beispielkuechen || [{ preis: 10990 }]).map((x) => x.preis)) / m).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}


function StickyNP({ onOpen }) {
  const L = window.LP;
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="sticky-cta" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40, transform: show ? "translateY(0)" : "translateY(110%)", transition: "transform var(--dur-slow) var(--ease-out)", background: "#fff", borderTop: "1px solid var(--border-subtle)", boxShadow: "0 -8px 24px rgba(0,0,0,0.1)", padding: "12px var(--gutter)" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Seal size={56} rotate={-6} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", lineHeight: 1.1 }}>0 % auf {L.aktion.finanzierungMonate} Monate · keine Anzahlung</div>
            <div style={{ fontSize: 15, color: "var(--text-muted)" }}>Noch {L.aktion.plaetzeFrei} von {L.aktion.plaetzeGesamt} Plätzen frei</div>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 420, marginLeft: "auto" }}><CTA size="md" block onClick={onOpen}>{window.npCta(true)}</CTA></div>
      </div>
    </div>
  );
}

Object.assign(window, { AboutNP, TeamNP, VideoNP, KuechenweltNP, KwGalNP, HausGalerieNP, HausBannerNP, HeroNP, ProspektNP, ProblemNP, StatsNP, BeratungNP, RechnerNP, FahrplanNP, MarkenNP, Kontingent, Angebot, KuechenRaten, VergleichNP, WegZumTermin, FinalCTANP, StickyNP });
