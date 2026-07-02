// Interliving Rehmann — "Alt gegen Neu" Quiz-Funnel (Overlay)

function ProgressBar({ current, total }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, maxWidth: 460 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--text-muted)" }}>
        <span>{current <= total ? `Frage ${current} von ${total}` : "Fast geschafft!"}</span>
        <span style={{ color: "var(--reh-red)" }}>{Math.round((Math.min(current, total + 1) / (total + 1)) * 100)} %</span>
      </div>
      <div style={{ height: 10, borderRadius: 999, background: "var(--neutral-200)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(Math.min(current, total + 1) / (total + 1)) * 100}%`, background: "linear-gradient(90deg, var(--red-400), var(--reh-red))", borderRadius: 999, transition: "width var(--dur-slow) var(--ease-out)" }} />
      </div>
    </div>
  );
}

function OptionCard({ label, icon, selected, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: 18, width: "100%", textAlign: "left",
        padding: "20px 22px", borderRadius: 16, cursor: "pointer",
        background: selected ? "var(--surface-brand-soft)" : "#fff",
        border: "2px solid " + (selected ? "var(--reh-red)" : h ? "var(--neutral-300)" : "var(--border-default)"),
        boxShadow: h && !selected ? "var(--shadow-sm)" : "none",
        transition: "all var(--dur-fast) var(--ease-standard)",
      }}>
      {icon && (
        <span style={{ flex: "none", width: 52, height: 52, borderRadius: 13, background: selected ? "var(--reh-red)" : "var(--surface-sunken)", color: selected ? "#fff" : "var(--navy-500)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I name={icon} size={28} />
        </span>
      )}
      <span style={{ flex: 1, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, color: "var(--text-strong)" }}>{label}</span>
      <span style={{ flex: "none", width: 28, height: 28, borderRadius: 999, border: "2px solid " + (selected ? "var(--reh-red)" : "var(--border-strong)"), background: selected ? "var(--reh-red)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {selected && <I name="check" size={18} color="#fff" stroke={3} />}
      </span>
    </button>
  );
}

function QuestionStep({ frage, value, onPick, onNext }) {
  const isMulti = frage.type === "multi";
  const arr = value || (isMulti ? [] : null);
  const picked = (label) => isMulti ? arr.includes(label) : arr === label;
  const toggle = (label) => {
    if (isMulti) {
      const next = arr.includes(label) ? arr.filter(x => x !== label) : [...arr, label];
      onPick(next);
    } else {
      onPick(label);
      setTimeout(onNext, 240);
    }
  };
  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease-out) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <span style={{ flex: "none", width: 46, height: 46, borderRadius: 12, background: "var(--surface-brand-soft)", color: "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center" }}><I name={frage.icon} size={26} /></span>
      </div>
      <h2 style={{ fontSize: 34, lineHeight: 1.15, margin: "0 0 8px" }}>{frage.titel}</h2>
      <p style={{ fontSize: 18, color: "var(--text-muted)", margin: "0 0 26px" }}>{frage.hinweis}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        {frage.optionen.map(o => (
          <OptionCard key={o.label} label={o.label} icon={o.icon} selected={picked(o.label)} onClick={() => toggle(o.label)} />
        ))}
      </div>
      {isMulti && (
        <button onClick={onNext} disabled={arr.length === 0}
          style={{ marginTop: 24, width: "100%", padding: 20, borderRadius: 16, border: "none", cursor: arr.length ? "pointer" : "not-allowed",
            background: arr.length ? "var(--reh-red)" : "var(--neutral-300)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: arr.length ? "0 12px 28px rgba(227,6,19,0.34)" : "none" }}>
          Weiter <I name="arrow-right" size={24} />
        </button>
      )}
    </div>
  );
}

function LeadForm({ onSubmit }) {
  const L = window.LP;
  const [f, setF] = React.useState({ name: "", tel: "", email: "", ort: "", consent: false });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const valid = f.name.trim() && f.tel.trim() && f.ort.trim() && f.consent;
  const field = { width: "100%", padding: "16px 18px", fontSize: 19, fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text-body)", background: "#fff", border: "2px solid var(--border-default)", borderRadius: 13, outline: "none", boxSizing: "border-box" };
  const lab = { fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 7, display: "block" };
  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease-out) both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--green-100)", border: "1px solid #bcdcc6", borderRadius: 16, padding: "18px 20px", marginBottom: 26 }}>
        <span style={{ flex: "none", color: "var(--success)" }}><I name="badge-check" size={38} /></span>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, color: "var(--text-strong)" }}>Ihre Tauschprämie: bis zu {L.aktion.praemieMax} €</div>
          <div style={{ fontSize: 16, color: "var(--text-body)" }}>Nur noch Ihre Kontaktdaten – dann sichern wir Ihren Aktionsplatz.</div>
        </div>
      </div>
      <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Aktionsplatz sichern</h2>
      <p style={{ fontSize: 18, color: "var(--text-muted)", margin: "0 0 24px" }}>Wir rufen Sie in ca. 20 Minuten persönlich an (zu unseren Öffnungszeiten).</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-grid">
        <div style={{ gridColumn: "1 / -1" }}><label style={lab}>Ihr Name *</label><input style={field} value={f.name} onChange={set("name")} placeholder="Vor- und Nachname" /></div>
        <div><label style={lab}>Telefon *</label><input style={field} value={f.tel} onChange={set("tel")} placeholder="für unseren Rückruf" inputMode="tel" /></div>
        <div><label style={lab}>PLZ / Wohnort *</label><input style={field} value={f.ort} onChange={set("ort")} placeholder="z. B. 42549 Velbert" /></div>
        <div style={{ gridColumn: "1 / -1" }}><label style={lab}>E-Mail (optional)</label><input style={field} value={f.email} onChange={set("email")} placeholder="name@beispiel.de" inputMode="email" /></div>
      </div>
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "20px 0 26px", cursor: "pointer" }}>
        <input type="checkbox" checked={f.consent} onChange={set("consent")} style={{ width: 24, height: 24, marginTop: 2, accentColor: "var(--reh-red)", flex: "none" }} />
        <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--text-body)" }}>Ja, Interliving Rehmann darf mich telefonisch zu meiner Anfrage kontaktieren. Meine Daten werden vertraulich behandelt und nicht weitergegeben.</span>
      </label>
      <button onClick={() => valid && onSubmit(f)} disabled={!valid}
        style={{ width: "100%", padding: 22, borderRadius: 16, border: "none", cursor: valid ? "pointer" : "not-allowed",
          background: valid ? "var(--reh-red)" : "var(--neutral-300)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 23,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: valid ? "0 14px 32px rgba(227,6,19,0.36)" : "none" }}>
        <I name="lock" size={22} /> Jetzt Aktionsplatz sichern
      </button>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 18, fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I name="shield-check" size={16} color="var(--success)" /> SSL-verschlüsselt</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I name="x-circle" size={16} color="var(--success)" /> Unverbindlich</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I name="euro" size={16} color="var(--success)" /> Kostenlos</span>
      </div>
    </div>
  );
}

function ThankYou({ data, onClose }) {
  const L = window.LP;
  return (
    <div style={{ textAlign: "center", padding: "20px 0", animation: "fadeUp 0.35s var(--ease-out) both" }}>
      <div style={{ width: 104, height: 104, borderRadius: 999, background: "var(--green-100)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 26px" }}>
        <I name="check" size={60} stroke={2.5} />
      </div>
      <h2 style={{ fontSize: 38, margin: "0 0 14px" }}>Vielen Dank{data && data.name ? ", " + data.name.split(" ")[0] : ""}!</h2>
      <p style={{ fontSize: 21, lineHeight: 1.55, color: "var(--text-body)", maxWidth: 520, margin: "0 auto 28px" }}>
        Ihr Aktionsplatz ist reserviert. Wir rufen Sie <b>innerhalb von ca. 20 Minuten</b> persönlich an (zu unseren Öffnungszeiten {L.kontakt.oeffnung}).
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 12, background: "var(--surface-page)", borderRadius: 16, padding: "22px 28px", marginBottom: 30, textAlign: "left" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-strong)" }}>Lieber sofort sprechen?</div>
        <a href={"tel:" + L.kontakt.telefonHref} style={{ display: "inline-flex", alignItems: "center", gap: 12, color: "var(--reh-red)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, textDecoration: "none", whiteSpace: "nowrap" }}>
          <I name="phone" size={26} /> {L.kontakt.telefon}
        </a>
      </div>
      <div><button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 17, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Zurück zur Seite</button></div>
    </div>
  );
}

function Funnel({ open, onClose }) {
  const L = window.LP;
  const fragen = L.fragen;
  const [step, setStep] = React.useState(0); // 0..n-1 questions, n = form, n+1 = thanks
  const [answers, setAnswers] = React.useState({});
  const [lead, setLead] = React.useState(null);
  const nQ = fragen.length;
  const scrollRef = React.useRef(null);
  const baseUrl = React.useRef(null);
  const firedOpen = React.useRef(false);
  const firedLead = React.useRef(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open, step]);

  // --- URL-Routing + Analytics für Werbeauswertung ---
  // Öffnet Funnel  -> /formular-kueche
  // Danke-Seite    -> /danke-formular-kueche
  React.useEffect(() => {
    const routes = (L.routes) || { formular: "formular-kueche", danke: "danke-formular-kueche" };
    const track = (name, extra) => {
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: name }, extra || {}));
      } catch (e) {}
      // Optional: virtueller Seitenaufruf für GA4 (falls gtag vorhanden)
      try { if (typeof window.gtag === "function") window.gtag("event", "page_view", { page_path: location.pathname }); } catch (e) {}
      // Meta Pixel (falls vorhanden): Lead-Event auf Danke-Seite
      try { if (name === "lead_submitted" && typeof window.fbq === "function") window.fbq("track", "Lead"); } catch (e) {}
    };
    const setPath = (slug) => {
      const target = location.origin + "/" + slug + location.search;
      if (location.pathname !== "/" + slug) {
        try { history.pushState({ funnel: slug }, "", target); } catch (e) {}
      }
    };
    if (open) {
      if (baseUrl.current === null) baseUrl.current = location.pathname + location.search;
      const isThanks = step === nQ + 1;
      if (isThanks) {
        setPath(routes.danke);
        if (!firedLead.current) { firedLead.current = true; track("lead_submitted", { conversion: true }); }
      } else {
        setPath(routes.formular);
        if (!firedOpen.current) { firedOpen.current = true; track("funnel_open"); }
      }
    } else if (baseUrl.current !== null) {
      // Funnel geschlossen -> Original-URL wiederherstellen
      try { history.pushState({}, "", baseUrl.current); } catch (e) {}
      baseUrl.current = null;
      firedOpen.current = false;
      firedLead.current = false;
    }
  }, [open, step, nQ]);

  // Zurück-Taste des Browsers schließt den Funnel
  React.useEffect(() => {
    if (!open) return;
    const onPop = () => onClose();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [open, onClose]);

  if (!open) return null;

  const isQuestion = step < nQ;
  const isForm = step === nQ;
  const isThanks = step === nQ + 1;
  const back = () => setStep(s => Math.max(0, s - 1));

  // Lead-Daten an Zapier senden (mit allen Funnel-Antworten + UTM-Parametern)
  const sendLead = (d) => {
    const url = L.zapierWebhook;
    if (!url) return;
    const q = {};
    try { new URLSearchParams(location.search).forEach((v, k) => { q[k] = v; }); } catch (e) {}
    const frageMap = {};
    fragen.forEach((f) => { frageMap[f.titel] = answers[f.key]; });
    const payload = Object.assign({
      name: d.name,
      telefon: d.tel,
      email: d.email,
      plz_ort: d.ort,
      einwilligung: !!d.consent,
      aktion: "Alt gegen Neu",
      // Funnel-Antworten (per key)
      objekt: answers.objekt,
      kuechen_alter: answers.alter,
      kuechen_zustand: answers.zustand,
      kuechen_groesse: answers.groesse,
      wichtig: Array.isArray(answers.wichtig) ? answers.wichtig.join(", ") : answers.wichtig,
      zeitrahmen: answers.zeit,
      budget: answers.budget,
      // Kontext
      zeitstempel: new Date().toISOString(),
      seite: location.origin + location.pathname,
      utm_source: q.utm_source || "",
      utm_medium: q.utm_medium || "",
      utm_campaign: q.utm_campaign || "",
      utm_content: q.utm_content || "",
      utm_term: q.utm_term || "",
      gclid: q.gclid || "",
      fbclid: q.fbclid || "",
    }, { fragen_klartext: frageMap });
    try {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Fallback ohne Preflight, falls CORS blockt — Zapier empfängt trotzdem
        try { fetch(url, { method: "POST", mode: "no-cors", body: JSON.stringify(payload), keepalive: true }); } catch (e) {}
      });
    } catch (e) {}
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ flex: "none", background: "#fff", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "14px var(--gutter)", display: "flex", alignItems: "center", gap: 18 }}>
          {(isQuestion && step > 0) ? (
            <button onClick={back} aria-label="Zurück" style={{ flex: "none", width: 44, height: 44, borderRadius: 999, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-strong)" }}><I name="arrow-left" size={22} /></button>
          ) : (
            <img src={L.logos.farbig} alt="Rehmann" style={{ height: 36, flex: "none" }} />
          )}
          {!isThanks && <ProgressBar current={step + 1} total={nQ} />}
          <button onClick={onClose} aria-label="Schließen" style={{ flex: "none", marginLeft: "auto", width: 44, height: 44, borderRadius: 999, border: "none", background: "var(--surface-sunken)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-strong)" }}><I name="x" size={24} /></button>
        </div>
      </div>

      {/* Body */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px var(--gutter) 56px" }}>
          {isQuestion && (
            <QuestionStep
              frage={fragen[step]}
              value={answers[fragen[step].key]}
              onPick={(v) => setAnswers(a => ({ ...a, [fragen[step].key]: v }))}
              onNext={() => setStep(s => s + 1)}
            />
          )}
          {isForm && <LeadForm onSubmit={(d) => { sendLead(d); setLead(d); setStep(s => s + 1); window.scrollTo(0,0); }} />}
          {isThanks && <ThankYou data={lead} onClose={onClose} />}
        </div>
      </div>

      {/* Reassurance footer */}
      {!isThanks && (
        <div style={{ flex: "none", background: "#fff", borderTop: "1px solid var(--border-subtle)", padding: "12px var(--gutter)" }}>
          <div style={{ maxWidth: 620, margin: "0 auto", display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><I name="landmark" size={16} color="var(--reh-red)" /> Seit {L.trust.gegruendet}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><I name="shield-check" size={16} color="var(--reh-red)" /> Unverbindlich & kostenlos</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><GoogleG size={15} /> {L.trust.googleRating} / 5</span>
          </div>
        </div>
      )}
    </div>
  );
}

window.Funnel = Funnel;
