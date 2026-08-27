// Möbel Rehmann — Räumungsverkauf — App
const { useState, useEffect, useMemo } = React;
const RV = window.RVLP;
const eur = (n) => (!n || n <= 0) ? "Preis auf Anfrage" : n.toLocaleString("de-DE") + " €";
const rabatt = (a, n) => Math.round((1 - n / a) * 100);

// Reservierungen lokal merken (Demo) — später serverseitig/CRM
function loadRes() { try { return JSON.parse(localStorage.getItem("rv_status") || "{}"); } catch (e) { return {}; } }
function saveRes(o) { try { localStorage.setItem("rv_status", JSON.stringify(o)); } catch (e) {} }
function loadFav() { try { return JSON.parse(localStorage.getItem("rv_fav") || "[]"); } catch (e) { return []; } }
function saveFav(a) { try { localStorage.setItem("rv_fav", JSON.stringify(a)); } catch (e) {} }

function Header({ favCount, favActive, onToggleFav, suche, setSuche }) {
  const k = RV.kontakt;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)" }}><a href="/" style={{ display: "block" }}><img src="assets/logo.png" alt="Möbel Rehmann" style={{ height: 44, display: "block" }} /></a></div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onToggleFav} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, background: favActive ? "var(--reh-red)" : "#fff", color: favActive ? "#fff" : "var(--text-strong)", border: "1px solid " + (favActive ? "var(--reh-red)" : "var(--border-subtle)"), cursor: "pointer", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, padding: "10px 16px", borderRadius: 10, fontSize: 15 }} className="rv-fav">
            <span style={{ fontSize: 16 }}>{favActive ? "♥" : "♡"}</span><span className="fav-label"> Favoriten</span>
            {favCount > 0 && <span style={{ background: favActive ? "#fff" : "var(--reh-red)", color: favActive ? "var(--reh-red)" : "#fff", fontWeight: 700, fontSize: 12, minWidth: 20, height: 20, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{favCount}</span>}
          </button>
          <a href={"tel:" + k.telefonHref} className="rv-callbtn" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--reh-red)", color: "#fff", textDecoration: "none", fontWeight: 700, padding: "9px 14px", borderRadius: 10, fontSize: 13.5, whiteSpace: "nowrap", flex: "0 0 auto" }} className="rv-tel">☏ {k.telefon}</a>
        </div>
      </div>
    </header>
  );
}

function Ticker() { return null; }

function Hero() {
  const a = RV.aktion;
  const stripes = "repeating-linear-gradient(135deg, #1A1A1A 0 22px, #FFE500 22px 44px)";
  const deals = [
    { kicker: "bis zu", num: "70%", label: "Rabatt", sub: "auf Ausstellungsstücke", light: false },
    { kicker: "bis zu", num: "35%", label: "Nachlass", sub: "auf alle Neubestellungen", light: false },
    { kicker: "bis zu", num: "80%", label: "Rabatt", sub: "in der Teppich-Abteilung", light: true },
  ];
  return (
    <section style={{ background: "#FFE500", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ height: 14, background: stripes }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", color: "rgba(0,0,0,0.05)", fontFamily: "var(--font-display)", fontWeight: 800 }}>
        {[["4%", "12%", 150, -16], ["84%", "6%", 110, 14], ["18%", "70%", 90, -8], ["72%", "76%", 140, 12], ["48%", "26%", 76, -6], ["92%", "52%", 84, -12]].map(([l, t, sz, r], i) => (
          <span key={i} style={{ position: "absolute", left: l, top: t, fontSize: sz, transform: "rotate(" + r + "deg)" }}>%</span>
        ))}
      </div>
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "64px 24px 68px", textAlign: "center" }} className="hero-wrap">
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(0,0,0,0.6)", marginBottom: 14 }} className="hero-kicker">bei Möbel Rehmann in Velbert</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px, 9vw, 118px)", lineHeight: 0.92, margin: 0, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#1A1A1A" }}>GROẞER UMBAU</h1>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#FFE504", color: "#000", border: "3px solid #000", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px, 2.4vw, 28px)", letterSpacing: "0.06em", textTransform: "uppercase", padding: "14px 32px", marginTop: 22 }}>
          Wir brauchen Platz
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 44, textAlign: "left" }} className="hero-deals">
          {deals.map((d) => (
            <div key={d.num} className="deal-box" style={{ background: "#1A1A1A", padding: "26px 26px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 210, borderTop: "6px solid " + (d.light ? "#fff" : "#FFE500") }}>
              <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)" }}>{d.kicker}</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(52px, 6vw, 76px)", lineHeight: 0.86, color: d.light ? "#fff" : "#FFE500" }}>{d.num}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(20px, 2.2vw, 30px)", lineHeight: 1.1, textTransform: "uppercase", color: d.light ? "#fff" : "#FFE500", paddingBottom: 4 }}>{d.label}</span>
              </div>
              <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, color: "#fff", marginTop: 10, lineHeight: 1.4 }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" style={{ height: 14, background: stripes }} />
    </section>
  );
}

function StatusBadge({ status }) {
  if (status === "verkauft") return <span style={{ position: "absolute", top: 16, right: 16, background: "var(--neutral-800)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 12px" }}>Verkauft</span>;
  if (status === "reserviert") return <span style={{ position: "absolute", top: 16, right: 16, background: "var(--gold-500)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 12px" }}>Reserviert</span>;
  return null;
}

function ArtikelCard({ a, onDetail, onReserve, isFav, onToggleFav }) {
  const sold = a.status === "verkauft";
  const reserved = a.status === "reserviert";
  const dim = sold || reserved;
  const anzahl = (a.bilder && a.bilder.length) || (a.img ? 1 : 0);
  return (
    <div style={{ background: "var(--surface-page)", display: "flex", flexDirection: "column", opacity: sold ? 0.6 : 1, cursor: "pointer" }} onClick={() => onDetail(a)}>
      <div style={{ position: "relative", aspectRatio: "3/4", background: "#F4F3F1", overflow: "hidden", filter: dim ? "grayscale(0.8)" : "none" }}>
        {a.img
          ? <img src={a.img + "?v=7"} alt={a.name} loading="lazy" decoding="async" width="600" height="800" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-subtle)", fontSize: 14 }}>Foto folgt</div>}
        {a.alt > a.neu && <span style={{ position: "absolute", top: 0, left: 0, background: "#FFE500", color: "#1A1A1A", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, lineHeight: 1, padding: "9px 13px 10px", letterSpacing: "-0.01em", boxShadow: "0 4px 14px rgba(0,0,0,0.28)" }}>−{rabatt(a.alt, a.neu)}%</span>}
        <button onClick={(e) => { e.stopPropagation(); onToggleFav(a.id); }} aria-label="Merken" title="Zu Favoriten" style={{ position: "absolute", top: 12, right: 12, width: 38, height: 38, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.92)", color: isFav ? "var(--reh-red)" : "var(--text-muted)", fontSize: 19, cursor: "pointer", boxShadow: "var(--shadow-sm)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{isFav ? "♥" : "♡"}</button>
        {anzahl > 1 && <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(20,32,45,0.82)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 12.5, padding: "4px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 5 }}>▣ {anzahl} Fotos</span>}
        <StatusBadge status={a.status} />
      </div>
      <div style={{ padding: "18px 4px 8px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 16, color: "var(--text-strong)", textDecoration: "underline", textUnderlineOffset: "3px", lineHeight: 1.35, minHeight: "2.7em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.name}</div>
        {a.alt > a.neu
          ? <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 14, color: "var(--reh-red)" }}>UVP*: <span style={{ textDecoration: "line-through" }}>{eur(a.alt)}</span></div>
          : <div style={{ fontSize: 14, minHeight: "1.2em" }}>&nbsp;</div>}
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-strong)" }}>{eur(a.neu)}</div>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 13.5, color: "var(--text-muted)", marginTop: 4 }}>{a.verfuegbarkeit === "versand" ? "Filiale & Versand möglich" : "Nur in der Filiale erhältlich"}</div>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 14, color: sold ? "var(--text-subtle)" : reserved ? "var(--gold-500)" : "#2F8A4E" }}>{sold ? "Verkauft" : reserved ? "Reserviert" : "Verfügbar"}</div>
        {!dim && (
          <button onClick={(e) => { e.stopPropagation(); onDetail(a); }} style={{ marginTop: "auto", width: "100%", padding: "11px", border: "1px solid var(--reh-red)", background: "transparent", color: "var(--reh-red)", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", borderRadius: 8 }}>Anfragen</button>
        )}
      </div>
    </div>
  );
}

function DetailModal({ artikel, onClose, onReserve }) {
  const bilder = (artikel.bilder && artikel.bilder.length) ? artikel.bilder : (artikel.img ? [artikel.img] : []);
  const [idx, setIdx] = useState(0);
  const sold = artikel.status === "verkauft";
  const reserved = artikel.status === "reserviert";
  const go = (d) => setIdx((i) => (i + d + bilder.length) % bilder.length);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,32,45,0.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="rv-modal rv-detail rv-modal-shell" style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 1120, height: "min(700px, 92vh)", overflow: "hidden", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 0, boxShadow: "0 30px 80px rgba(0,0,0,0.32)" }}>
        <div className="rv-modal-img" style={{ background: "#F4F3F1", position: "relative", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ position: "relative", flex: 1, minHeight: 0, background: "#F4F3F1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {bilder[idx] && <img src={bilder[idx] + "?v=3"} alt={artikel.name} decoding="async" fetchpriority="high" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }} />}
            {bilder.length > 1 && <React.Fragment>
              <button onClick={() => go(-1)} aria-label="Zurück" style={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", width: 42, height: 42, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.92)", color: "var(--text-strong)", fontSize: 20, cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>‹</button>
              <button onClick={() => go(1)} aria-label="Weiter" style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", width: 42, height: 42, borderRadius: 999, border: "none", background: "rgba(255,255,255,0.92)", color: "var(--text-strong)", fontSize: 20, cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>›</button>
              <span style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(20,32,45,0.8)", color: "#fff", fontSize: 12.5, padding: "3px 10px", borderRadius: 999 }}>{idx + 1} / {bilder.length}</span>
            </React.Fragment>}
          </div>
          {bilder.length > 1 && <div style={{ display: "flex", gap: 8, padding: 12, overflowX: "auto" }}>
            {bilder.map((b, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ flex: "none", width: 60, height: 60, padding: 0, border: "2px solid " + (i === idx ? "var(--reh-red)" : "transparent"), borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "#fff" }}>
                <img src={b + "?v=3"} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>}
        </div>
        <div className="rv-modal-body" style={{ padding: "26px 34px 30px", gap: 2, display: "flex", flexDirection: "column", minHeight: 0, overflow: "auto" }}>
          <button onClick={onClose} aria-label="Schließen" className="rv-close" style={{ alignSelf: "flex-end", width: 34, height: 34, borderRadius: 999, border: "none", background: "var(--reh-red)", color: "#fff", fontWeight: 700, fontSize: 18, cursor: "pointer", marginBottom: 6 }}>×</button>
          {artikel.marke && <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-subtle)", marginBottom: 4 }}>{artikel.marke}</div>}
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 23, color: "var(--text-strong)", margin: "0 0 6px", lineHeight: 1.2 }}>{artikel.name}</h3>
          {artikel.artikelnummer && <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 13.5, color: "var(--text-muted)", marginBottom: 14 }}>Artikelnummer: {artikel.artikelnummer}</div>}

          {artikel.alt > artikel.neu && <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 15, color: "var(--reh-red)", marginBottom: 6 }}><span style={{ textDecoration: "line-through" }}>{eur(artikel.alt)}</span> UVP*</div>}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ background: "#FFE500", color: "#1A1A1A", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, padding: "5px 10px", lineHeight: 1 }}>{eur(artikel.neu)}</span>
            {artikel.alt > artikel.neu && <span style={{ border: "1.5px solid var(--reh-red)", color: "var(--reh-red)", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 13, padding: "5px 10px", borderRadius: 6 }}>− {rabatt(artikel.alt, artikel.neu)}% gegenüber UVP</span>}
          </div>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--reh-red)", marginBottom: 10 }}>Abholpreis</div>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.55, color: "var(--text-muted)", marginBottom: 16 }}>Abholpreis ohne Montage. Alle etwaigen Rabatte bereits abgezogen. Inkl. MwSt.</div>

          {artikel.details && (
            <div style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-strong)", marginBottom: 8 }}>Ausführung & Maße</div>
              <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 14.5, lineHeight: 1.55, color: "var(--text-body)" }}>{artikel.details}</div>
            </div>
          )}

          {artikel.enthalten && artikel.enthalten.length > 0 && (
            <div style={{ background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--text-strong)", marginBottom: 10 }}>Im Set enthalten</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 7 }}>
                {artikel.enthalten.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 9, fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 14.5, lineHeight: 1.45, color: "var(--text-body)" }}>
                    <span style={{ color: "var(--reh-red)", fontWeight: 700 }}>✓</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ borderTop: "1px solid var(--border-subtle)", padding: "14px 0", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: "var(--text-body)", display: "flex", gap: 10 }}>
            <span style={{ color: "var(--reh-red)" }}>•</span>
            <span>Ausstellungsstück aus unserer {artikel.abteilung}-Abteilung – original wie ausgestellt.</span>
          </div>

          {!(sold || reserved) && (
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--text-strong)", marginBottom: 10 }}>Artikel jetzt anfragen</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={() => onReserve(artikel)} style={{ flex: "1 1 150px", padding: "12px 14px", borderRadius: 10, border: "none", background: "var(--reh-red)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 14.5, cursor: "pointer" }}>Anfrage senden</button>
                <a href={"https://api.whatsapp.com/send/?phone=" + RV.kontakt.whatsapp + "&text=" + encodeURIComponent("Hallo, ich interessiere mich für: " + artikel.name + " (" + artikel.id + ")")} target="_blank" rel="noopener" style={{ flex: "1 1 130px", textAlign: "center", padding: "12px 14px", borderRadius: 10, background: "#25D366", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}>WhatsApp</a>
                <a href={"tel:" + RV.kontakt.telefonHref} style={{ flex: "1 1 130px", textAlign: "center", padding: "12px 14px", borderRadius: 10, background: "#1A1A1A", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}>☎ Anrufen</a>
              </div>
            </div>
          )}

          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 16, marginBottom: 6, display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-strong)" }}>
            <span style={{ fontSize: 22 }}>📦</span> Verfügbarkeit
          </div>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 15, color: sold ? "var(--text-subtle)" : reserved ? "var(--gold-500)" : "#2F8A4E", marginBottom: 4, display: "flex", gap: 8 }}>
            <span>•</span> {sold ? "Bereits verkauft" : reserved ? "Aktuell reserviert" : "Sofort verfügbar – nur dieses eine Stück"}
          </div>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>{artikel.verfuegbarkeit === "versand" ? "Abholung in Velbert oder Versand möglich" : "Abholung in unserer Filiale in Velbert"}</div>

          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 16, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 12.5, lineHeight: 1.6, color: "var(--text-muted)" }}>
              <p style={{ margin: "0 0 10px" }}><strong style={{ fontWeight: 600, color: "var(--text-body)" }}>Bitte beachten Sie:</strong> Der Verkauf erfolgt erst nach gemeinsamer Ansicht und Beratung bezüglich des Produktes! Danach verpacken wir Ihre Möbel fachgerecht und Sie können diese mit nach Hause nehmen. Bei den angegebenen Preisen handelt es sich um Abholpreise. Gerne liefern und montieren wir Ihnen Ihre Möbel auch gegen einen geringen Mehrpreis, im Umkreis von 50 Kilometern um unser Einrichtungshaus.</p>
              <p style={{ margin: "0 0 10px" }}>Professionelle Herstellerbilder können von der tatsächlich im Möbelhaus ausgestellten Ware leicht abweichen, z. B. in Farbe. Achten Sie daher bitte unbedingt auf weitere Bilder, den Produkttext und den Preis, die sich auf die im Möbelhaus ausgestellte Ware beziehen.</p>
              <p style={{ margin: 0 }}>Es gelten die AGB und die Datenschutzerklärung der Rehmann &amp; Söhne GmbH:<br />
                <a href="https://www.moebel-rehmann.de/informationen/impressum/" target="_blank" rel="noopener" style={{ color: "var(--reh-red)" }}>Impressum</a> · <a href="https://www.moebel-rehmann.de/informationen/datenschutz/" target="_blank" rel="noopener" style={{ color: "var(--reh-red)" }}>Datenschutz</a> · <a href="https://www.moebel-rehmann.de/informationen/agb/" target="_blank" rel="noopener" style={{ color: "var(--reh-red)" }}>AGB</a></p>
            </div>
          </div>

          {(sold || reserved)
            ? <div className="rv-modal-cta" style={{ marginTop: "auto", width: "100%", padding: 16, textAlign: "center", background: "var(--neutral-200)", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{sold ? "Bereits verkauft" : "Aktuell reserviert"}</div>
            : <button className="rv-modal-cta" onClick={() => onReserve(artikel)} style={{ marginTop: "auto", width: "100%", padding: 16, borderRadius: 12, border: "none", background: "var(--reh-red)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, cursor: "pointer" }}>Anfrage senden</button>}
        </div>
      </div>
    </div>
  );
}

function ReserveModal({ artikel, onClose, onConfirm }) {
  const [f, setF] = useState({ vorname: "", nachname: "", tel: "", email: "", consent: false });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const valid = f.vorname.trim() && f.nachname.trim() && f.tel.trim() && f.email.trim() && f.consent;
  const field = { width: "100%", padding: "14px 16px", fontSize: 16, border: "2px solid var(--border-default)", borderRadius: 10, outline: "none", boxSizing: "border-box", marginBottom: 12 };
  const waText = encodeURIComponent("Hallo, ich interessiere mich für: " + artikel.name + " (" + eur(artikel.neu) + "). Ist der Artikel noch verfügbar?");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,32,45,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, maxWidth: 440, width: "100%", padding: 28, position: "relative", maxHeight: "88vh", overflow: "auto" }}>
        <button onClick={onClose} aria-label="Schließen" style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: 999, border: "none", background: "var(--reh-red)", color: "#fff", fontSize: 20, lineHeight: 1, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>✕</button>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--reh-red)", marginBottom: 6 }}>Anfrage zu diesem Artikel</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", background: "var(--surface-page)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: 12, marginBottom: 16 }}>
          {artikel.img && <img src={artikel.img} alt="" style={{ width: 58, height: 58, objectFit: "cover", borderRadius: 8, flex: "0 0 auto" }} />}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16.5, color: "var(--text-strong)", lineHeight: 1.25 }}>{artikel.name}</div>
            <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--reh-red)", marginTop: 2 }}>{eur(artikel.neu)}</div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>Wir prüfen die Verfügbarkeit und melden uns direkt bei Ihnen.</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <a href={"tel:" + RV.kontakt.telefonHref} style={{ flex: 1, textAlign: "center", padding: "13px", borderRadius: 10, background: "#1A1A1A", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>☎ Anrufen</a>
          <a href={"https://wa.me/" + RV.kontakt.whatsapp + "?text=" + waText} target="_blank" rel="noopener" style={{ flex: 1, textAlign: "center", padding: "13px", borderRadius: 10, background: "#25D366", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>✆ WhatsApp</a>
        </div>
        <div style={{ textAlign: "center", fontSize: 13, color: "var(--text-subtle)", margin: "0 0 14px" }}>oder Anfrage senden – wir melden uns direkt:</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input style={field} placeholder="Vorname *" value={f.vorname} onChange={set("vorname")} autoComplete="given-name" />
          <input style={field} placeholder="Nachname *" value={f.nachname} onChange={set("nachname")} autoComplete="family-name" />
        </div>
        <input style={field} placeholder="Telefon *" value={f.tel} onChange={set("tel")} inputMode="tel" autoComplete="tel" />
        <input style={field} placeholder="E-Mail *" value={f.email} onChange={set("email")} inputMode="email" autoComplete="email" />
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "2px 0 14px", cursor: "pointer" }}>
          <input type="checkbox" checked={f.consent} onChange={set("consent")} style={{ width: 20, height: 20, marginTop: 2, accentColor: "var(--reh-red)", flex: "none" }} />
          <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--text-body)" }}>Ich habe die <a href="https://www.moebel-rehmann.de/informationen/datenschutz/" target="_blank" rel="noopener" style={{ color: "var(--reh-red)" }}>Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *</span>
        </label>
        <button onClick={() => { if (valid && !sending) { setSending(true); onConfirm(f); } }} disabled={!valid || sending} style={{ width: "100%", padding: 16, borderRadius: 12, border: "none", background: (valid && !sending) ? "var(--reh-red)" : "var(--neutral-300)", color: "#fff", fontWeight: 800, fontSize: 17, cursor: (valid && !sending) ? "pointer" : "not-allowed", marginTop: 4 }}>{sending ? "Wird gesendet…" : "Anfrage senden"}</button>
        <button onClick={onClose} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "transparent", color: "var(--text-muted)", fontWeight: 600, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Abbrechen</button>
        <div style={{ marginTop: 10, paddingTop: 14, borderTop: "1px solid var(--border-subtle)", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 13.5, lineHeight: 1.55, color: "var(--text-muted)", textAlign: "center" }}>Oder einfach vorbeikommen: {RV.kontakt.ort} · {RV.kontakt.oeffnung}. Unser Team berät Sie gerne direkt vor Ort.</div>
      </div>
    </div>
  );
}

function LucideIcon({ name, size = 32, color = "currentColor" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (el && window.lucide && window.lucide.icons) {
      const key = name.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
      const ic = window.lucide.icons[key];
      if (ic) el.innerHTML = window.lucide.createElement(ic).outerHTML;
    }
  }, [name]);
  return <span ref={ref} style={{ width: size, height: size, display: "inline-flex" }} data-icon={name} aria-hidden="true"></span>;
}

function Faq() {
  const [open, setOpen] = useState(0);
  const items = [
    ["Kann ich Artikel online kaufen oder reservieren?", "Die Artikel aus dem Räumungsverkauf verkaufen wir ausschließlich vor Ort in unserem Möbelhaus. Über die Anfrage-Funktion prüfen wir gerne die Verfügbarkeit für Sie und melden uns direkt bei Ihnen – telefonisch, per WhatsApp oder per Anfrage."],
    ["Liefern und montieren Sie auch?", "Ja, gerne liefern und montieren wir Ihre Möbel gegen einen geringen Mehrpreis."],
    ["Kann ich in Raten zahlen?", "Ja, eine Finanzierung ist möglich. Sprechen Sie uns einfach direkt vor Ort oder telefonisch an – wir beraten Sie zu den Möglichkeiten."],
    ["Sind die Möbel neu oder gebraucht?", "Es handelt sich um Ausstellungsstücke aus unserem Möbelhaus – also gepflegte Markenware, die bei uns ausgestellt war. Kleine Gebrauchsspuren sind möglich; wir zeigen Ihnen jedes Stück vor dem Kauf ganz genau."],
    ["Weichen die Bilder von der Ware ab?", "Professionelle Herstellerbilder können von der tatsächlich ausgestellten Ware leicht abweichen, z. B. in der Farbe. Achten Sie daher bitte auf die weiteren Bilder, den Produkttext und den Preis, die sich auf die ausgestellte Ware beziehen."],
  ];
  return (
    <div>
      {items.map((it, i) => {
        const aktiv = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <button onClick={() => setOpen(aktiv ? -1 : i)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left", background: "transparent", border: "none", padding: "20px 4px", cursor: "pointer", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 17, color: "var(--text-strong)" }}>
              {it[0]}
              <span style={{ flex: "none", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--reh-red)", lineHeight: 1 }}>{aktiv ? "−" : "+"}</span>
            </button>
            {aktiv && <div style={{ padding: "0 4px 22px", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16.5, lineHeight: 1.7, color: "var(--text-body)" }}>{it[1]}</div>}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("Alle");
  const [modal, setModal] = useState(null);
  const [detail, setDetail] = useState(null);
  const [res, setRes] = useState(loadRes);
  const [toast, setToast] = useState("");
  const [fav, setFav] = useState(loadFav);
  const [showFav, setShowFav] = useState(false);
  const [seite, setSeite] = useState(1);
  const [suche, setSuche] = useState("");
  const [sort, setSort] = useState("standard");
  const proSeite = 16;
  const toggleFav = (id) => setFav((cur) => { const n = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]; saveFav(n); return n; });

  const artikel = useMemo(() => RV.artikel.map((a) => ({ ...a, status: res[a.id] || a.status })), [res]);
  const nachAbteilung = filter === "Alle" ? artikel : artikel.filter((a) => a.abteilung === filter);
  const basis = showFav ? artikel.filter((a) => fav.includes(a.id)) : nachAbteilung;
  const q = suche.trim().toLowerCase();
  const nachSuche = q ? basis.filter((a) => (a.name + " " + (a.marke || "") + " " + a.abteilung).toLowerCase().includes(q)) : basis;
  const nachPreis = nachSuche;
  const gefiltert = React.useMemo(() => {
    const list = nachPreis.slice();
    if (sort === "preis-auf") list.sort((x, y) => x.neu - y.neu);
    else if (sort === "preis-ab") list.sort((x, y) => y.neu - x.neu);
    else if (sort === "rabatt") list.sort((x, y) => rabatt(y.alt, y.neu) - rabatt(x.alt, x.neu));
    return list;
  }, [nachPreis.length, sort, filter, suche, showFav, res]);
  const seiten = Math.max(1, Math.ceil(gefiltert.length / proSeite));
  const seiteAkt = Math.min(seite, seiten);
  const sichtbar = gefiltert.slice((seiteAkt - 1) * proSeite, seiteAkt * proSeite);
  useEffect(() => { setSeite(1); }, [filter, showFav, suche, sort]);
  const zuSeite = (n) => {
    setSeite(n);
    const el = document.getElementById("artikel");
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top: top, behavior: "smooth" });
      setTimeout(function () { if (Math.abs(window.scrollY - top) > 4) window.scrollTo(0, top); }, 350);
    }
  };

  const confirm = (form) => {
    const art = modal;
    const url = RV.zapierWebhook;
    if (url) {
      const fields = {
        anfrage_typ: "Räumungsverkauf – Verfügbarkeitsanfrage",
        artikel: art.name,
        artikel_id: art.id,
        artikel_preis: eur(art.neu),
        artikel_abteilung: art.abteilung,
        vorname: form.vorname,
        nachname: form.nachname,
        name: (form.vorname + " " + form.nachname).trim(),
        telefon: form.tel,
        email: form.email,
        datenschutz_ok: form.consent ? "ja" : "nein",
        seite: location.origin + location.pathname,
        zeitstempel: new Date().toISOString(),
      };
      try {
        fetch(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: new URLSearchParams(fields).toString() }).catch(function () {});
      } catch (e) {}
    }
    setModal(null);
    setToast("Anfrage für „" + art.name + "“ gesendet – wir melden uns direkt bei Ihnen!");
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div>
      <Header favCount={fav.length} favActive={showFav} onToggleFav={() => setShowFav((v) => !v)} suche={suche} setSuche={setSuche} />
      <Hero />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 64px" }}>
        {/* Kategorien mit Icons */}
        <div style={{ textAlign: "center", marginBottom: 22, marginTop: 40 }}>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--reh-red)", marginBottom: 6 }}>Möbel Abverkauf</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 42, textTransform: "uppercase", color: "var(--text-strong)", margin: "0 0 14px" }}>Alles muss raus</h2>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>Aufgrund unseres großen Umbaus geben wir Ausstellungsstücke aus allen Abteilungen mit hohen Preisvorteilen ab. Fragen Sie Ihren Favoriten unverbindlich an – telefonisch, per WhatsApp oder per Anfrage – wir melden uns direkt bei Ihnen.</div>
        </div>
        {!showFav && <div className="rv-cats-wrap" style={{ position: "relative", margin: "10px 0 44px" }}><div style={{ display: "flex", flexWrap: "nowrap", gap: 20, justifyContent: "center", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", paddingBottom: 4 }} className="rv-cats">
          {RV.abteilungen.map((ab) => {
            const active = filter === ab;
            const bild = (RV.kategorieBilder || {})[ab] || "";
            return (
              <button key={ab} onClick={() => setFilter(ab)} title={ab} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 108 }} className="rv-cat">
                <span style={{ width: 88, height: 88, borderRadius: 999, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: bild ? "#F4F3F1" : "#FBEC48", boxShadow: active ? "0 0 0 3px #FFFFFF" : "0 0 0 1px var(--border-subtle)", transition: "box-shadow .15s" }} className="rv-cat-img">
                  {bild
                    ? <img src={bild} alt={ab} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: active ? "none" : "saturate(0.85)" }} />
                    : <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "#000000" }}>{ab.slice(0, 1)}</span>}
                </span>
                <span style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: active ? 600 : 300, fontSize: 14, lineHeight: 1.25, textAlign: "center", color: "#000000" }}>{ab}</span>
              </button>
            );
          })}
        </div></div>}
        {showFav && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "10px 0 32px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)" }}>Meine Favoriten</span>
          <button onClick={() => setShowFav(false)} style={{ background: "transparent", border: "1px solid var(--border-subtle)", borderRadius: 999, padding: "7px 16px", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", color: "var(--text-strong)" }}>← Alle Artikel</button>
        </div>}
        {/* Sortierung */}
        <div className="rv-tools" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, marginBottom: 26, flexWrap: "wrap" }}>
        <div className="rv-hsearch" style={{ position: "relative", flex: "1 1 340px", maxWidth: 420, minWidth: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" strokeWidth="2" strokeLinecap="round" aria-hidden="true"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Artikel oder Marke suchen…"
            style={{ width: "100%", boxSizing: "border-box", padding: "11px 38px 11px 42px", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 15, color: "var(--text-strong)", border: "1px solid " + (suche ? "var(--reh-red)" : "var(--border-default)"), background: "var(--surface-page)", borderRadius: 999, outline: "none", transition: "border-color .15s" }} />
          {suche && <button onClick={() => setSuche("")} aria-label="Suche löschen"
            style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 26, height: 26, borderRadius: 999, border: "none", background: "var(--neutral-150)", color: "var(--text-muted)", fontSize: 15, cursor: "pointer", lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>×</button>}
        </div>
          <div style={{ position: "relative", flex: "0 0 auto" }}>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sortierung"
              style={{ appearance: "none", WebkitAppearance: "none", padding: "13px 40px 13px 18px", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 15, color: "var(--text-strong)", border: "1px solid " + (sort !== "standard" ? "var(--reh-red)" : "var(--border-default)"), background: "#fff", borderRadius: 999, cursor: "pointer", outline: "none" }}>
              <option value="standard">Sortieren</option>
              <option value="preis-auf">Preis ↑ günstigste zuerst</option>
              <option value="preis-ab">Preis ↓ teuerste zuerst</option>
              <option value="rabatt">Höchster Rabatt</option>
            </select>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>
        {gefiltert.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 17, color: "var(--text-muted)" }}>
            Keine Artikel gefunden. <button onClick={() => setSuche("")} style={{ background: "none", border: "none", color: "var(--reh-red)", fontSize: 17, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>Filter zurücksetzen</button>
          </div>
        )}
        {/* Grid */}
        <div id="artikel" className="rv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 22 }}>
          {sichtbar.map((a, i) => {
            const card = <ArtikelCard key={a.id} a={a} onDetail={setDetail} onReserve={setModal} isFav={fav.includes(a.id)} onToggleFav={toggleFav} />;
            if (i !== 3) return card;
            return [
              card,
              <a key="rv-banner" href={"tel:" + RV.kontakt.telefonHref} className="rv-banner" style={{ display: "block", gridColumn: "span 2", alignSelf: "stretch", overflow: "hidden", borderRadius: 12 }}>
                <img src="assets/banner-70.jpg" alt="Wir brauchen Platz – in allen Abteilungen bis zu 70 % Rabatt" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>,
            ];
          })}
        </div>
        {seiten > 1 && (
          <div className="rv-pager" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 40 }}>
            <button onClick={() => zuSeite(Math.max(1, seiteAkt - 1))} disabled={seiteAkt === 1}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 15, padding: "10px 16px", background: "#fff", border: "1px solid var(--border-default)", color: seiteAkt === 1 ? "var(--text-subtle)" : "var(--text-strong)", cursor: seiteAkt === 1 ? "default" : "pointer", borderRadius: 2 }}>Zurück</button>
            {(() => {
              const win = [];
              const push = (n) => { if (!win.includes(n)) win.push(n); };
              push(1);
              for (let n = seiteAkt - 1; n <= seiteAkt + 1; n++) if (n > 1 && n < seiten) push(n);
              push(seiten);
              win.sort((x, y) => x - y);
              const out = [];
              win.forEach((n, i) => {
                if (i > 0 && n - win[i - 1] > 1) out.push({ gap: true, key: "g" + n });
                out.push({ n: n, key: "p" + n });
              });
              return out.map((it) => it.gap
                ? <span key={it.key} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 15, color: "var(--text-subtle)", padding: "0 4px" }}>…</span>
                : (() => { const n = it.n, akt = n === seiteAkt; return (
                    <button key={it.key} onClick={() => zuSeite(n)}
                      style={{ fontFamily: "var(--font-sans)", fontWeight: akt ? 700 : 400, fontSize: 15, minWidth: 40, padding: "10px 12px", background: akt ? "var(--reh-red)" : "#fff", color: akt ? "#fff" : "var(--text-strong)", border: "1px solid " + (akt ? "var(--reh-red)" : "var(--border-default)"), cursor: "pointer" }}>{n}</button>
                  ); })()
              );
            })()}
            <button onClick={() => zuSeite(Math.min(seiten, seiteAkt + 1))} disabled={seiteAkt === seiten}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 15, padding: "10px 16px", background: "#fff", border: "1px solid var(--border-default)", color: seiteAkt === seiten ? "var(--text-subtle)" : "var(--text-strong)", cursor: seiteAkt === seiten ? "default" : "pointer", borderRadius: 2 }}>Weiter</button>
          </div>
        )}
        {gefiltert.length === 0 && <div style={{ textAlign: "center", color: "var(--text-muted)", padding: 60 }}>{showFav ? "Noch keine Favoriten – tippen Sie bei einem Artikel auf das Herz ♡." : "Keine Artikel in dieser Abteilung."}</div>}
      </div>

      <section style={{ background: "#fff", borderTop: "1px solid var(--border-subtle)" }}>
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="vorteil-grid">
          {[
            { t: "Riesige Auswahl", s: "Besuchen Sie uns spontan und überzeugen Sie sich von unserer riesigen Auswahl vor Ort.", icon: <path d="M4 21V10l8-6 8 6v11M4 21h16M9 21v-6h6v6" /> },
            { t: "Schnäppchenpreise", s: "Hunderte Produkte aus allen Abteilungen zu absoluten Schnäppchenpreisen.", icon: <g><path d="M20.6 13.4 13 21a1.4 1.4 0 0 1-2 0l-8-8V4h9l8.6 8.6a1.4 1.4 0 0 1 0 .8Z" /><circle cx="7.5" cy="7.5" r="1.5" /></g> },
            { t: "Finanzierung möglich", s: "Bequem in Raten zahlen – sprechen Sie uns einfach darauf an.", icon: <g><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></g> },
          ].map((v) => (
            <div key={v.t} style={{ background: "#FFF6C2", borderRadius: 16, padding: "34px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, color: "var(--text-strong)" }}>
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--reh-red)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21 }}>{v.t}</span>
              <span style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.55, color: "var(--text-body)" }}>{v.s}</span>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 48px" }}>
          <div style={{ background: "#4D8F2F", color: "#fff", borderRadius: 16, padding: "26px 30px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFE500" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}><path d="M12 22V12M12 12c0-4 2-7 6-8 0 4-2 7-6 8ZM12 12c0-4-2-7-6-8 0 4 2 7 6 8ZM5 22h14" /></svg>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, color: "#FFE500" }}>Auch Gartenmöbel im Abverkauf</div>
              <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.55, marginTop: 4 }}>Zusätzlich geben wir aktuell unsere Gartenmöbel stark reduziert ab – diese Stücke sind hier noch nicht abgebildet. Kommen Sie gerne vorbei oder rufen Sie uns an.</div>
            </div>
            
          </div>
        </div>
      </section>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }} className="rv-sec">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, lineHeight: 1.15, color: "var(--text-strong)", margin: "0 0 8px" }}>Abverkauf &amp; Restposten bei Möbel Rehmann</h2>
          <div style={{ fontSize: 19, fontWeight: 600, color: "var(--reh-red)", marginBottom: 22 }}>Sichern Sie sich Top-Angebote auf Möbel und Wohnaccessoires</div>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "var(--text-body)", display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ margin: 0 }}>Willkommen beim großen Räumungsverkauf von Möbel Rehmann! Weil wir unsere Ausstellung umbauen und neu gestalten, geben wir eine breite Auswahl an stark reduzierten Ausstellungsstücken und Restposten ab – aber nur solange der Vorrat reicht. Jetzt ist die perfekte Gelegenheit zum Sparen: Entdecken Sie hochwertige Möbel und stilvolle Wohnaccessoires aus allen Abteilungen unseres Sortiments zu besonders günstigen Preisen.</p>
            <p style={{ margin: 0 }}>Profitieren Sie von attraktiven Rabatten auf Möbel für jeden Raum. Ob ein gemütliches Sofa fürs Wohnzimmer, ein modernes Boxspringbett fürs Schlafzimmer oder praktische Möbel für mehr Stauraum im Flur – bei unserem Räumungsverkauf ist für jeden Stil und jede Einrichtung das Passende dabei. Auch Deko-Artikel, Accessoires und praktische Helfer für Küche und Garten finden Sie stark reduziert.</p>
            <p style={{ margin: 0 }}>Ihre Favoriten können Sie hier ganz bequem 24 Stunden unverbindlich reservieren oder uns direkt anrufen – wir legen Ihr Wunschstück zurück, bis Sie bei uns vorbeischauen. Verpassen Sie nicht Ihre Chance, hochwertige Möbel und Accessoires zu unschlagbaren Preisen zu ergattern.</p>
          </div>
          <div style={{ marginTop: 28, padding: "22px 24px", background: "var(--surface-brand-soft)", borderRadius: 14 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", marginBottom: 6 }}>Abverkauf vor Ort</div>
            <p style={{ margin: 0, fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: "var(--text-body)" }}>Noch mehr Schnäppchen finden Sie direkt in unserem Möbelhaus in Velbert. Auslaufmodelle, Retouren-Artikel und Ausstellungsstücke gibt es hier für einen Bruchteil des ursprünglichen Preises. Ob Neukunde oder Stammkunde – bei Möbel Rehmann haben Sie immer die Chance auf Top-Angebote.</p>
          </div>
        </div>
      </section>

      {/* Google-Bewertungen */}
      <section style={{ background: "var(--surface-page)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }} className="rv-sec">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--reh-red)", marginBottom: 6 }}>Kundenstimmen</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, textTransform: "uppercase", color: "var(--text-strong)", margin: 0 }}>Das sagen unsere Kunden</h2>
          </div>
          <div className="elfsight-app-1ae3809d-2ad6-4141-972d-706d69101f93" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* Öffnungszeiten & Anfahrt */}
      <section style={{ background: "#fff", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }} className="rv-visit">
          <div>
            <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--reh-red)", marginBottom: 6 }}>Besuchen Sie uns</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, textTransform: "uppercase", color: "var(--text-strong)", margin: "0 0 22px" }}>Öffnungszeiten &amp; Anfahrt</h2>
            <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16.5, lineHeight: 1.9, color: "var(--text-body)" }}>
              <b style={{ fontWeight: 600 }}>Möbel Rehmann</b><br />
              Flandersbacher Weg 2<br />42551 Velbert
            </div>
            <div style={{ marginTop: 20, borderTop: "1px solid var(--border-subtle)", paddingTop: 18, fontFamily: "'Fira Sans', Arial, sans-serif", fontSize: 16, color: "var(--text-body)" }}>
              {[["Montag – Freitag", "10:00 – 19:00 Uhr"], ["Samstag", "10:00 – 19:00 Uhr"], ["Sonntag", "geschlossen"]].map((r) => (
                <div key={r[0]} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "7px 0", fontWeight: 300 }}>
                  <span>{r[0]}</span><span style={{ fontWeight: 600, color: r[1] === "geschlossen" ? "var(--text-subtle)" : "var(--text-strong)" }}>{r[1]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
              <a href={"tel:" + RV.kontakt.telefonHref} style={{ padding: "13px 22px", background: "var(--reh-red)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none", borderRadius: 8 }}>☏ {RV.kontakt.telefon}</a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Flandersbacher+Weg+2%2C+42551+Velbert" target="_blank" rel="noopener" style={{ padding: "13px 22px", background: "transparent", border: "1px solid var(--reh-red)", color: "var(--reh-red)", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none", borderRadius: 8 }}>Route planen</a>
            </div>
          </div>
          <iframe title="Anfahrt Möbel Rehmann" loading="lazy" allowFullScreen
            src="https://www.google.com/maps?q=Flandersbacher%20Weg%202,%2042551%20Velbert&output=embed"
            style={{ width: "100%", height: 380, border: 0, display: "block", borderRadius: 8 }} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--surface-page)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px" }} className="rv-sec">
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--reh-red)", marginBottom: 6 }}>Gut zu wissen</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, textTransform: "uppercase", color: "var(--text-strong)", margin: 0 }}>Häufige Fragen</h2>
          </div>
          <Faq />
        </div>
      </section>

      <footer style={{ background: "var(--navy-500)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 28px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }} className="rv-foot">
          <div>
            <img src="assets/logo-weiss.png" alt="Möbel Rehmann" style={{ height: 46, display: "block", marginBottom: 16 }} />
            <div style={{ color: "var(--neutral-200)", fontSize: 15, lineHeight: 1.8 }}>
              {RV.kontakt.ort}<br />{RV.kontakt.oeffnung}<br />
              <a href={"tel:" + RV.kontakt.telefonHref} style={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}>☏ {RV.kontakt.telefon}</a>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[
                ["Facebook", "https://www.facebook.com/InterlivingRehmann/", "M15 8h-2.2c-.4 0-.8.4-.8 1v2h3l-.5 3H12v7H9v-7H7v-3h2V8.6C9 6 10.6 4.5 13 4.5c1.1 0 2 .1 2 .1V8Z"],
                ["Instagram", "https://www.instagram.com/moebel_rehmann", "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.9-11.3a1.6 1.6 0 1 1-3.1 0 1.6 1.6 0 0 1 3.1 0Z"],
                ["WhatsApp", "https://api.whatsapp.com/send/?phone=4915758080106&text&type=phone_number&app_absent=0", "M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.2c.1.2.1.4 0 .6l-.4.5-.3.4c-.1.1-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.2 2 1.3.3.1.5.1.6 0l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.4Z"],
              ].map(([lab, url, d]) => (
                <a key={lab} href={url} target="_blank" rel="noopener" aria-label={lab} style={{ width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.12)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>Öffnungszeiten</div>
            <div style={{ color: "var(--neutral-200)", fontSize: 15, lineHeight: 1.9 }}>Mo–Fr: 10–19 Uhr<br />Sa: 10–18 Uhr<br />So: geschlossen</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>Ausgezeichnet</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <img src={RV.siegelUrl} alt="Auszeichnung Möbel Rehmann" style={{ height: 64, background: "#fff", borderRadius: 10, padding: 6 }} />
              <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, background: "#fff", borderRadius: 10, padding: "10px 14px", color: "var(--text-strong)" }}>
                <span style={{ color: "#EAB308", fontSize: 16, letterSpacing: "1px" }}>★★★★★</span>
                <span style={{ fontWeight: 800, fontSize: 14 }}>4,8 / 5 · Google</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", color: "var(--neutral-300)", fontSize: 12.5, lineHeight: 1.6 }}>
            Alle Preise inkl. gesetzl. Mehrwertsteuer zzgl. Versandkosten und ggf. Nachnahmegebühren, wenn nicht anders angegeben.<br />
            <span style={{ display: "inline-flex", gap: 14, flexWrap: "wrap", margin: "8px 0" }}>
              <a href="https://www.moebel-rehmann.de/informationen/impressum/" target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "underline" }}>Impressum</a>
              <a href="https://www.moebel-rehmann.de/informationen/datenschutz/" target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "underline" }}>Datenschutz</a>
              <a href="https://www.moebel-rehmann.de/informationen/agb/" target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "underline" }}>AGB</a>
              <a href="https://www.moebel-rehmann.de/versandoptionen/" target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "underline" }}>Versandoptionen</a>
            </span><br />
            © 2026 Rehmann &amp; Söhne GmbH · {RV.kontakt.ort}
          </div>
        </div>
      </footer>

      {detail && <DetailModal artikel={detail} onClose={() => setDetail(null)} onReserve={(a) => { setDetail(null); setModal(a); }} />}
      {modal && <ReserveModal artikel={modal} onClose={() => setModal(null)} onConfirm={confirm} />}
      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 200, background: "var(--success)", color: "#fff", padding: "14px 22px", borderRadius: 12, fontWeight: 600, boxShadow: "var(--shadow-md)", maxWidth: "90vw" }}>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
