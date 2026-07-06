// Interliving Rehmann — LP sections (unten)

function SocialProof() {
  const L = window.LP;
  return (
    <Section bg="#fff" id="stimmen">
      <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="sp-google-head" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <GoogleG size={30} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-strong)" }}>Google Bewertungen</span>
          <Stars size={24} />
        </div>
        <h2 style={{ fontSize: 44, margin: "0 0 10px" }}>Das sagen unsere Kundinnen & Kunden</h2>
        <p style={{ fontSize: 19, color: "var(--text-muted)", margin: 0 }}>Echte Bewertungen aus Velbert und der Region</p>
      </Reveal>
      <Reveal style={{ minHeight: 220 }}>
        <div className="elfsight-app-1ae3809d-2ad6-4141-972d-706d69101f93" data-elfsight-app-lazy=""></div>
      </Reveal>
    </Section>
  );
}

function About() {
  const L = window.LP;
  return (
    <Section bg="var(--navy-500)" style={{ color: "#fff" }}>
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 52, alignItems: "center" }} className="about-grid">
        <Reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "3/4", background: "var(--navy-700)", gridRow: "span 2" }}>
            <img src={L.haus.gebaeude} alt="Küchen-Centrum Interliving Rehmann in Velbert" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "1/1", background: "var(--navy-700)" }}>
            <img src={L.haus.ausstellung1} alt="Küchenausstellung" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "1/1", background: "var(--navy-700)" }}>
            <img src={L.haus.ausstellung2} alt="Küchenausstellung" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow color="var(--red-300)">Ihr Möbelhaus in Velbert</Eyebrow>
          <h2 style={{ color: "#fff", fontSize: 44, margin: "12px 0 20px" }}>Seit {L.trust.gegruendet} ein Versprechen: ehrliche Beratung</h2>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "var(--neutral-200)", margin: "0 0 18px" }}>
            Als inhabergeführter Familienbetrieb stehen wir seit über {L.trust.jahre} Jahren mit unserem Namen für Qualität. Bei uns sind Sie keine Nummer – wir nehmen uns Zeit, hören zu und planen Ihre Küche so, wie sie zu Ihrem Leben passt.
          </p>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "var(--neutral-200)", margin: "0 0 28px" }}>
            Über {L.trust.musterkuechen} Musterküchen zum Anfassen, eigene Monteure und ein Service, der auch nach dem Kauf für Sie da ist. Das ist unser Verständnis von Möbeln, die für Sie gemacht sind.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={L.inhaberFoto} alt="Marc Rehmann" loading="lazy" style={{ width: 72, height: 72, borderRadius: 999, objectFit: "cover", flex: "none", border: "2px solid rgba(255,255,255,0.3)" }} />
            <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: 30, color: "#fff", fontStyle: "italic" }}>Marc Rehmann</div>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.25)" }} />
            <div style={{ fontSize: 16, color: "var(--neutral-300)" }}>Inhaber &<br />Geschäftsführer</div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 26, background: "#fff", borderRadius: 14, padding: "12px 18px" }}>
            <img src={L.siegelUrl} alt="Auszeichnung: Herausragendes Möbelhaus 2025" loading="lazy" style={{ height: 60, width: "auto", display: "block" }} />
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "var(--text-strong)", lineHeight: 1.3 }}>Ausgezeichnet:<br /><span style={{ color: "var(--reh-red)" }}>Herausragendes Möbelhaus 2025</span></div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function FAQItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "26px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-strong)" }}>{q}</span>
        <span style={{ flex: "none", width: 40, height: 40, borderRadius: 999, background: open ? "var(--reh-red)" : "var(--surface-brand-soft)", color: open ? "#fff" : "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all var(--dur-base)" }}>
          <I name={open ? "minus" : "plus"} size={24} stroke={2.4} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 280 : 0, overflow: "hidden", transition: "max-height var(--dur-slow) var(--ease-standard)" }}>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--text-body)", margin: "0 4px 26px", maxWidth: 820 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const L = window.LP;
  const [open, setOpen] = useState(0);
  return (
    <Section bg="#fff" id="faq" pad="88px">
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <Eyebrow>Gut zu wissen</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 0" }}>Häufige Fragen</h2>
      </Reveal>
      <Reveal style={{ maxWidth: 920, margin: "0 auto" }}>
        {L.faq.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
        ))}
      </Reveal>
      <div style={{ textAlign: "center", marginTop: 44 }}>
        <p style={{ fontSize: 19, color: "var(--text-muted)", margin: "0 0 18px" }}>Ihre Frage ist nicht dabei? Wir beraten Sie gern persönlich.</p>
        <CTA size="lg">Jetzt unverbindlich anfragen</CTA>
      </div>
    </Section>
  );
}

function FinalCTA() {
  const L = window.LP;
  const tage = tageBis(L.aktion.endDatum);
  return (
    <section style={{ background: "linear-gradient(160deg, var(--reh-red), var(--red-600))", color: "#fff", padding: "84px var(--gutter)", textAlign: "center" }}>
      <Reveal style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.16)", padding: "9px 18px", borderRadius: 999, fontWeight: 800, fontSize: 16, marginBottom: 24 }}>
          <I name="users" size={18} /> Nur noch {L.aktion.plaetzeFrei} von {L.aktion.plaetzeGesamt} Plätzen · Aktion bis {L.aktion.endDatumText}
        </div>
        <h2 style={{ color: "#fff", fontSize: 54, lineHeight: 1.05, margin: "0 0 20px" }}>Sichern Sie sich jetzt Ihre Tauschprämie</h2>
        <p style={{ fontSize: 23, lineHeight: 1.5, color: "rgba(255,255,255,0.94)", margin: "0 0 36px" }}>
          Beantworten Sie ein paar kurze Fragen und sichern Sie sich Ihren Aktionsplatz. Wir melden uns in ca. 20 Minuten persönlich bei Ihnen – unverbindlich und kostenlos.
        </p>
        <CTA size="xl" variant="white">In 60 Sekunden Prämie sichern</CTA>
        <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginTop: 34, fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
          {["Unverbindlich & kostenlos", "Keine versteckten Kosten", "Persönliche Beratung"].map(t => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><I name="check-circle" size={20} /> {t}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const L = window.LP;
  return (
    <footer style={{ background: "var(--navy-700)", color: "var(--neutral-300)", padding: "56px var(--gutter) 28px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }} className="footer-grid">
        <div>
          <img src={L.logos.weiss} alt="Interliving Rehmann" style={{ height: 50, marginBottom: 16 }} />
          <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>Inhabergeführtes Möbelhaus in Velbert seit {L.trust.gegruendet}. Möbel für dich gemacht.</p>
        </div>
        <div>
          <h6 style={{ color: "#fff", fontSize: 15, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>Kontakt</h6>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 16 }}>
            <a href={"tel:" + L.kontakt.telefonHref} style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9, fontWeight: 700 }}><I name="phone" size={18} color="var(--red-300)" /> {L.kontakt.telefon}</a>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><I name="map-pin" size={18} color="var(--red-300)" /> {L.kontakt.adresse}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><I name="clock" size={18} color="var(--red-300)" /> {L.kontakt.oeffnung}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><I name="globe" size={18} color="var(--red-300)" /> {L.kontakt.web}</span>
          </div>
        </div>
        <div>
          <h6 style={{ color: "#fff", fontSize: 15, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>Aktion</h6>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 16 }}>
            <span>Tauschprämie bis {L.aktion.praemieMax} €</span>
            <span>Abbau & Mitnahme gratis</span>
            <span>Lieferung & Montage inklusive</span>
            <span>0 % Finanzierung, {L.aktion.finanzierungMonate} Monate</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1140, margin: "36px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 14, color: "var(--neutral-400)" }}>
        <span>© {new Date().getFullYear()} Rehmann &amp; Söhne GmbH · Velbert</span>
        <span style={{ display: "flex", gap: 18 }}>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--neutral-400)", textDecoration: "none" }}>Impressum</a>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--neutral-400)", textDecoration: "none" }}>Datenschutz</a>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--neutral-400)", textDecoration: "none" }}>AGB</a>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { SocialProof, About, FAQ, FinalCTA, Footer });
