// Möbel Rehmann — Räumungsverkauf — App
const { useState, useEffect, useMemo } = React;
const RV = window.RVLP;
const eur = (n) => n.toLocaleString("de-DE") + " €";
const rabatt = (a, n) => Math.round((1 - n / a) * 100);

// Reservierungen lokal merken (Demo) — später serverseitig/CRM
function loadRes() { try { return JSON.parse(localStorage.getItem("rv_status") || "{}"); } catch (e) { return {}; } }
function saveRes(o) { try { localStorage.setItem("rv_status", JSON.stringify(o)); } catch (e) {} }

function Header() {
  const k = RV.kontakt;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)" }}><img src="assets/logo.png" alt="Möbel Rehmann" style={{ height: 44, display: "block" }} /></div>
        <a href={"tel:" + k.telefonHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--reh-red)", color: "#fff", textDecoration: "none", fontWeight: 700, padding: "10px 18px", borderRadius: 10, fontSize: 15 }}>☏ {k.telefon}</a>
      </div>
    </header>
  );
}

function Ticker() { return null; }

function Hero() {
  const a = RV.aktion;
  return (
    <section style={{ position: "relative", color: "#fff", padding: "120px 24px", overflow: "hidden", textAlign: "center" }}>
      <img src="assets/moebelhaus-luftbild.jpg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,20,36,0.55), rgba(11,20,36,0.45))" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", color: "rgba(255,229,0,0.16)", fontFamily: "var(--font-display)", fontWeight: 800 }}>
        {[["6%", "8%", 120, -18], ["82%", "10%", 96, 12], ["24%", "68%", 80, -10], ["70%", "72%", 130, 16], ["46%", "24%", 70, -8], ["90%", "48%", 78, -14], ["12%", "38%", 66, 10], ["38%", "82%", 88, 14], ["58%", "6%", 60, -12], ["94%", "82%", 74, 8], ["4%", "70%", 92, -16], ["50%", "56%", 56, 6], ["30%", "6%", 68, 20], ["76%", "36%", 62, -6]].map(([l, t, s, r], i) => (
          <span key={i} style={{ position: "absolute", left: l, top: t, fontSize: s, transform: "rotate(" + r + "deg)" }}>%</span>
        ))}
      </div>
      <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 96, lineHeight: 1.0, margin: "0 0 8px", letterSpacing: "-0.5px", textTransform: "uppercase", color: "#FFE500", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>GROẞER UMBAU</h1>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, color: "#fff", marginBottom: 22, textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>bei Möbel Rehmann</div>
        <div style={{ display: "inline-block", border: "1px solid #FFE500", color: "#FFE500", fontWeight: 700, fontSize: 22, letterSpacing: "1px", textTransform: "uppercase", padding: "12px 28px", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>Wir brauchen Platz</div>
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  if (status === "verkauft") return <span style={{ position: "absolute", top: 16, right: 16, background: "var(--neutral-800)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 12px" }}>Verkauft</span>;
  if (status === "reserviert") return <span style={{ position: "absolute", top: 16, right: 16, background: "var(--gold-500)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 12px" }}>Reserviert</span>;
  return null;
}

function ArtikelCard({ a, onReserve }) {
  const sold = a.status === "verkauft";
  const reserved = a.status === "reserviert";
  const dim = sold || reserved;
  return (
    <div style={{ background: "var(--surface-page)", display: "flex", flexDirection: "column", opacity: sold ? 0.6 : 1, cursor: dim ? "default" : "pointer" }} onClick={() => !dim && onReserve(a)}>
      <div style={{ position: "relative", aspectRatio: "1/1", background: "#F4F3F1", filter: dim ? "grayscale(0.8)" : "none" }}>
        {a.img
          ? <img src={a.img} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", mixBlendMode: "multiply" }} />
          : a.link
            ? <a href={a.link} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none" }}><span style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontSize: 14 }}>Fotos ansehen</span><span style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontSize: 12, color: "var(--reh-red)", textDecoration: "underline" }}>auf Kleinanzeigen ↗</span></a>
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-subtle)", fontSize: 14 }}>Foto folgt</div>}
        {a.alt > a.neu && <span style={{ position: "absolute", top: 16, left: 16, background: "#1A1A1A", color: "#FFE500", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, padding: "5px 12px" }}>−{rabatt(a.alt, a.neu)}%</span>}
        <StatusBadge status={a.status} />
      </div>
      <div style={{ padding: "18px 4px 8px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 16, color: "var(--text-strong)", textDecoration: "underline", textUnderlineOffset: "3px", lineHeight: 1.35 }}>{a.name}</div>
        {a.alt > a.neu && <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 14, color: "var(--text-muted)" }}>UVP*: <span style={{ textDecoration: "line-through" }}>{eur(a.alt)}</span></div>}
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-strong)" }}>{eur(a.neu)}</div>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 13.5, color: "var(--text-muted)", marginTop: 4 }}>{a.verfuegbarkeit === "versand" ? "Filiale & Versand möglich" : "Nur in der Filiale erhältlich"}</div>
        <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 400, fontSize: 14, color: sold ? "var(--text-subtle)" : reserved ? "var(--gold-500)" : "#2F8A4E" }}>{sold ? "Verkauft" : reserved ? "Reserviert" : "Verfügbar"}</div>
        {!dim && (
          <button onClick={(e) => { e.stopPropagation(); onReserve(a); }} style={{ marginTop: "auto", width: "100%", padding: "11px", border: "1px solid var(--reh-red)", background: "transparent", color: "var(--reh-red)", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", borderRadius: 8 }}>Anfragen</button>
        )}
      </div>
    </div>
  );
}

function ReserveModal({ artikel, onClose, onConfirm }) {
  const [f, setF] = useState({ name: "", tel: "", email: "" });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid = f.name.trim() && f.tel.trim();
  const field = { width: "100%", padding: "14px 16px", fontSize: 16, border: "2px solid var(--border-default)", borderRadius: 10, outline: "none", boxSizing: "border-box", marginBottom: 12 };
  const waText = encodeURIComponent("Hallo, ich interessiere mich für: " + artikel.name + " (" + eur(artikel.neu) + "). Ist der Artikel noch verfügbar?");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,32,45,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, maxWidth: 440, width: "100%", padding: 28 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)", marginBottom: 4 }}>Verfügbarkeit anfragen</div>
        <div style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 18 }}>{artikel.name} · <b style={{ color: "var(--reh-red)" }}>{eur(artikel.neu)}</b> — wir prüfen die Verfügbarkeit und melden uns.</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <a href={"tel:" + RV.kontakt.telefonHref} style={{ flex: 1, textAlign: "center", padding: "13px", borderRadius: 10, background: "var(--reh-red)", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>☎ Anrufen</a>
          <a href={"https://wa.me/" + RV.kontakt.whatsapp + "?text=" + waText} target="_blank" rel="noopener" style={{ flex: 1, textAlign: "center", padding: "13px", borderRadius: 10, background: "#25D366", color: "#fff", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>✆ WhatsApp</a>
        </div>
        <div style={{ textAlign: "center", fontSize: 13, color: "var(--text-subtle)", margin: "0 0 14px" }}>oder Rückruf anfragen:</div>
        <input style={field} placeholder="Ihr Name *" value={f.name} onChange={set("name")} />
        <input style={field} placeholder="Telefon *" value={f.tel} onChange={set("tel")} inputMode="tel" />
        <input style={field} placeholder="E-Mail (optional)" value={f.email} onChange={set("email")} inputMode="email" />
        <button onClick={() => { if (valid && !sending) { setSending(true); onConfirm(f); } }} disabled={!valid || sending} style={{ width: "100%", padding: 16, borderRadius: 12, border: "none", background: (valid && !sending) ? "var(--reh-red)" : "var(--neutral-300)", color: "#fff", fontWeight: 800, fontSize: 17, cursor: (valid && !sending) ? "pointer" : "not-allowed", marginTop: 4 }}>{sending ? "Wird gesendet…" : "Rückruf anfragen"}</button>
        <button onClick={onClose} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "transparent", color: "var(--text-muted)", fontWeight: 600, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Abbrechen</button>
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

function App() {
  const [filter, setFilter] = useState("Alle");
  const [modal, setModal] = useState(null);
  const [res, setRes] = useState(loadRes);
  const [toast, setToast] = useState("");

  const artikel = useMemo(() => RV.artikel.map((a) => ({ ...a, status: res[a.id] || a.status })), [res]);
  const gefiltert = filter === "Alle" ? artikel : artikel.filter((a) => a.abteilung === filter);

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
        name: form.name,
        telefon: form.tel,
        email: form.email || "",
        seite: location.origin + location.pathname,
        zeitstempel: new Date().toISOString(),
      };
      try {
        fetch(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: new URLSearchParams(fields).toString() }).catch(function () {});
      } catch (e) {}
    }
    setModal(null);
    setToast("Anfrage für „" + art.name + "“ gesendet – wir melden uns telefonisch!");
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div>
      <Header />
      <Hero />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 64px" }}>
        {/* Kategorien mit Icons */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--text-strong)", margin: "0 0 14px" }}>Möbel Abverkauf</h2>
          <div style={{ fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>Aufgrund unseres großen Umbaus geben wir Ausstellungsstücke aus allen Abteilungen mit hohen Preisvorteilen ab. Fragen Sie Ihren Favoriten unverbindlich an – telefonisch, per WhatsApp oder Rückruf.</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", margin: "10px 0 44px" }} className="rv-cats">
          {RV.abteilungen.map((ab) => {
            const active = filter === ab;
            return (
              <button key={ab} onClick={() => setFilter(ab)} style={{ background: active ? "var(--reh-red)" : "#fff", color: active ? "#fff" : "var(--text-strong)", border: "1px solid " + (active ? "var(--reh-red)" : "var(--border-subtle)"), borderRadius: 999, padding: "10px 20px", fontFamily: "'Fira Sans', Arial, sans-serif", fontWeight: 300, fontSize: 15, cursor: "pointer", transition: "background .15s, color .15s" }}>{ab}</button>
            );
          })}
        </div>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 22 }}>
          {gefiltert.map((a) => <ArtikelCard key={a.id} a={a} onReserve={setModal} />)}
        </div>
        {gefiltert.length === 0 && <div style={{ textAlign: "center", color: "var(--text-muted)", padding: 60 }}>Keine Artikel in dieser Abteilung.</div>}
      </div>

      <section style={{ background: "#fff", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
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

      <footer style={{ background: "var(--navy-500)", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 28px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }} className="rv-foot">
          <div>
            <img src="assets/logo-weiss.png" alt="Möbel Rehmann" style={{ height: 46, display: "block", marginBottom: 16 }} />
            <div style={{ color: "var(--neutral-200)", fontSize: 15, lineHeight: 1.8 }}>
              {RV.kontakt.ort}<br />{RV.kontakt.oeffnung}<br />
              <a href={"tel:" + RV.kontakt.telefonHref} style={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}>☏ {RV.kontakt.telefon}</a>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[["Facebook", "f", "https://www.facebook.com/moebelrehmann"], ["Instagram", "◉", "https://www.instagram.com/moebel_rehmann"], ["WhatsApp", "✆", "https://wa.me/49205196400"]].map(([lab, ic, url]) => (
                <a key={lab} href={url} target="_blank" rel="noopener" aria-label={lab} style={{ width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.12)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontWeight: 800, fontSize: 16 }}>{ic}</a>
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
            © 2026 Rehmann &amp; Söhne GmbH · {RV.kontakt.ort}
          </div>
        </div>
      </footer>

      {modal && <ReserveModal artikel={modal} onClose={() => setModal(null)} onConfirm={confirm} />}
      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 200, background: "var(--success)", color: "#fff", padding: "14px 22px", borderRadius: 12, fontWeight: 600, boxShadow: "var(--shadow-md)", maxWidth: "90vw" }}>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
