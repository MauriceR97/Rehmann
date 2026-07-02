// Interliving Rehmann — "Alt gegen Neu" — Zusatz-Sektionen
const _eur = (n) => n.toLocaleString("de-DE");

// "Kennen Sie das?" — Problem / Pain Points
function Problem() {
  const L = window.LP;
  return (
    <Section bg="var(--surface-page)" id="problem" pad="64px">
      <Reveal style={{ textAlign: "center", marginBottom: 36, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
        <Eyebrow>Kennen Sie das?</Eyebrow>
        <h2 style={{ fontSize: 40, margin: "10px 0 10px" }}>Ihre Küche macht nicht mehr mit?</h2>
        <p style={{ fontSize: 19, color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
          Diese Sorgen müssen Sie beim Küchenwechsel nicht haben:
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="problem-grid">
        {L.probleme.map((p, i) => (
          <Reveal key={p.t} delay={i * 70} style={{ height: "100%" }}>
            <div className="problem-card" style={{ height: "100%", boxSizing: "border-box", background: "#fff", borderRadius: 16, padding: 20, border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-xs)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
              <span style={{ flex: "none", width: 52, height: 52, borderRadius: 13, background: "var(--neutral-100)", color: "var(--neutral-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I name={p.icon} size={28} /></span>
              <div className="problem-txt">
                <h3 style={{ fontSize: 18, margin: "0 0 5px" }}>{p.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, color: "var(--text-body)" }}>{p.s}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <AltNeuToggle />
        <Reveal scaleFrom={0.8} y={16} dur={620}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "var(--text-strong)" }}>
            Mit „Alt gegen Neu" lösen wir all das für Sie.
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// Beispielküchen inkl. Rechenbeispiel mit Tauschprämie
function Beispielkuechen() {
  const L = window.LP;
  return (
    <Section bg="#fff" id="beispiele">
      <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
        <Eyebrow>Beispielküchen & Ihr Vorteil</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 14px" }}>So viel ist Ihre alte Küche wert</h2>
        <p style={{ fontSize: 20, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>
          Drei beliebte Küchen-Varianten – jeweils mit angerechneter Tauschprämie. Ihr persönliches Angebot erstellen wir im Beratungsgespräch.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }} className="stimmen-grid">
        {L.beispielkuechen.map((k, i) => {
          const aktion = k.regulaer - k.praemie;
          return (
            <Reveal key={k.name} delay={i * 110} style={{ height: "100%" }}>
              <div style={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", background: "var(--surface-page)", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--navy-700)" }}>
                  {k.img
                    ? <img src={k.img} alt={k.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    : <image-slot id={"lp-kueche-" + i} shape="rect" fit="cover" placeholder={"Foto " + k.name} style={{ width: "100%", height: "100%" }}></image-slot>}
                  <span style={{ position: "absolute", top: 12, left: 12, background: "var(--navy-500)", color: "#fff", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 12px", borderRadius: 999 }}>{k.badge}</span>
                </div>
                <div style={{ padding: 26, display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: 23, margin: "0 0 4px" }}>{k.name}</h3>
                  <p style={{ fontSize: 15, color: "var(--text-muted)", margin: "0 0 18px" }}>{k.stil}</p>
                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10, fontSize: 15.5, color: "var(--text-body)", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span>Regulärer Preis</span><span style={{ textDecoration: "line-through", color: "var(--text-subtle)" }}>{_eur(k.regulaer)} €</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, color: "var(--reh-red)", fontWeight: 700 }}><span>Tauschprämie</span><span>– {_eur(k.praemie)} €</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, color: "var(--success)", fontWeight: 700 }}><span>Lieferung &amp; Montage</span><span>0 €</span></div>
                  </div>
                  <div style={{ borderTop: "2px solid var(--border-subtle)", marginTop: 14, paddingTop: 14, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-strong)" }}>Aktionspreis ab</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--reh-red)" }}>{_eur(aktion)} €</span>
                  </div>
                  <div style={{ marginTop: 16 }}><CTA size="md" block>Mein Angebot sichern</CTA></div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal style={{ textAlign: "center", marginTop: 26 }}>
        <p style={{ fontSize: 14, color: "var(--text-subtle)", margin: 0 }}>Beispielpreise inkl. Lieferung & Montage. Tauschprämie als Gutschrift, abhängig vom Wert der neuen Küche. Mindestauftragswert {L.aktion.mindestauftrag} €.</p>
      </Reveal>
    </Section>
  );
}

// Verknappung: begrenzte Plätze (hauseigenes Montageteam)
function Plaetze() {
  const L = window.LP;
  const frei = L.aktion.plaetzeFrei, ges = L.aktion.plaetzeGesamt;
  const pct = Math.round(((ges - frei) / ges) * 100);
  return (
    <Section bg="var(--surface-page)" pad="56px">
      <Reveal style={{ marginBottom: 20, borderRadius: 22, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <img src={L.monteurFoto} alt="Unsere Monteure beim Küchenaufbau" loading="lazy" style={{ width: "100%", height: "auto", maxHeight: 360, objectFit: "cover", display: "block" }} />
      </Reveal>
      <Reveal style={{ background: "var(--navy-500)", borderRadius: 22, padding: "38px 40px", color: "#fff", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }} className="calc-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12, color: "var(--red-300)", fontWeight: 800, fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <I name="users" size={20} /> Eigenes Montageteam · begrenzte Kapazität
          </div>
          <h2 style={{ color: "#fff", fontSize: 34, margin: "0 0 10px" }}>Nur 30 Aktionsplätze – und sie füllen sich</h2>
          <p style={{ fontSize: 18, color: "var(--neutral-200)", margin: "0 0 18px", maxWidth: 560, lineHeight: 1.5 }}>
            Weil Abbau, Lieferung und Montage komplett kostenfrei durch unser eigenes Team laufen, können wir die Aktion nur begrenzt anbieten. Sichern Sie sich rechtzeitig Ihren Platz.
          </p>
          <div style={{ height: 14, borderRadius: 999, background: "rgba(255,255,255,0.18)", overflow: "hidden", maxWidth: 460 }}>
            <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg, var(--red-400), var(--reh-red))", borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 15, color: "var(--neutral-300)", marginTop: 8 }}>{ges - frei} von {ges} Plätzen bereits vergeben</div>
        </div>
        <div style={{ textAlign: "center", flex: "none" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 76, lineHeight: 1, color: "var(--red-400)" }}>{frei}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Plätze frei</div>
          <CTA size="md" variant="primary">Platz sichern</CTA>
        </div>
      </Reveal>
    </Section>
  );
}

// Vergleich: Renovieren vs. Neue Küche mit Aktion
function Vergleich() {
  const L = window.LP;
  const v = L.vergleich;
  return (
    <Section bg="#fff" id="vergleich">
      <Reveal style={{ textAlign: "center", marginBottom: 50 }}>
        <Eyebrow>Der ehrliche Vergleich</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 14px" }}>Alte Küche renovieren oder neu planen?</h2>
        <p style={{ fontSize: 20, color: "var(--text-muted)", maxWidth: 640, margin: "0 auto" }}>
          Flickwerk an der alten Küche kostet oft mehr Nerven und Geld, als viele denken. So sieht der Unterschied aus:
        </p>
      </Reveal>
      <Reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, marginBottom: 30 }} className="calc-grid">
        {[{ id: "lp-vorher", lab: "Vorher", icon: "image", note: "Ihre alte Küche", neg: true }, { id: "lp-nachher", lab: "Nachher", icon: "sparkles", note: "Ihre neue Traumküche", neg: false }].map((b) => (
          <div key={b.id} style={{ position: "relative", borderRadius: 18, overflow: "hidden", aspectRatio: "16/11", background: "var(--neutral-150)", border: b.neg ? "1px solid var(--border-subtle)" : "2px solid var(--reh-red)" }}>
            <image-slot id={b.id} shape="rect" fit="cover" placeholder={"Foto: " + b.note} style={{ width: "100%", height: "100%" }}></image-slot>
            <span style={{ position: "absolute", top: 14, left: 14, display: "inline-flex", alignItems: "center", gap: 7, background: b.neg ? "var(--navy-600)" : "var(--reh-red)", color: "#fff", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", padding: "7px 13px", borderRadius: 999 }}><I name={b.icon} size={16} /> {b.lab}</span>
          </div>
        ))}
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }} className="calc-grid">
        <Reveal style={{ height: "100%" }}>
          <div style={{ height: "100%", boxSizing: "border-box", background: "var(--surface-page)", borderRadius: 20, padding: 34, border: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: "var(--neutral-200)", color: "var(--neutral-600)", display: "flex", alignItems: "center", justifyContent: "center" }}><I name="hammer" size={26} /></span>
              <h3 style={{ fontSize: 24, margin: 0, color: "var(--text-muted)" }}>Alte Küche renovieren</h3>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {v.renovieren.map((it) => (
                <li key={it.t} style={{ display: "flex", gap: 13, alignItems: "flex-start", fontSize: 17, color: "var(--text-body)" }}>
                  <span style={{ flex: "none", width: 24, height: 24, borderRadius: 999, background: "var(--neutral-200)", color: "var(--neutral-600)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}><I name="x" size={16} stroke={3} /></span>
                  {it.t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120} style={{ height: "100%" }}>
          <div style={{ height: "100%", boxSizing: "border-box", background: "var(--navy-500)", color: "#fff", borderRadius: 20, padding: 34, border: "2px solid var(--reh-red)", position: "relative", boxShadow: "var(--shadow-md)" }}>
            <span style={{ position: "absolute", top: -14, right: 24, background: "var(--reh-red)", color: "#fff", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", padding: "6px 14px", borderRadius: 999 }}>Empfohlen</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: "var(--reh-red)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I name="sparkles" size={26} /></span>
              <h3 style={{ fontSize: 24, margin: 0, color: "#fff" }}>Neue Küche mit „Alt gegen Neu"</h3>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {v.neu.map((it) => (
                <li key={it.t} style={{ display: "flex", gap: 13, alignItems: "flex-start", fontSize: 17, color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>
                  <span style={{ flex: "none", width: 24, height: 24, borderRadius: 999, background: "var(--success)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}><I name="check" size={16} stroke={3} /></span>
                  {it.t}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 26 }}><CTA size="md" block variant="primary">Jetzt neue Küche sichern</CTA></div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// Prozess: alles kostenlos + flexible Lieferung
function Prozess() {
  const L = window.LP;
  const steps = [
    { icon: "phone-call", t: "Kostenloses Beratungsgespräch", s: "Wir rufen Sie an, hören zu und beantworten Ihre Fragen – unverbindlich.", free: true },
    { icon: "pencil-ruler", t: "Kostenlose Küchenplanung", s: "Wir planen Ihre Wunschküche individuell, mit 3D-Visualisierung.", free: true },
    { icon: "ruler", t: "Kostenloser Aufmaß-Termin", s: "Wir messen bei Ihnen zu Hause exakt nach – damit später alles passt.", free: true },
    { icon: "truck", t: "Abbau Ihrer alten Küche", s: "Zum Wunschtermin bauen wir Ihre alte Küche ab und nehmen sie kostenlos mit.", free: false },
    { icon: "calendar-heart", t: "Sie bestimmen den Zeitpunkt", s: "Neue Küche sofort oder später? Viele renovieren erst noch Boden oder Wände – Sie entscheiden, ob nach 2 Wochen oder 2 Monaten geliefert wird.", free: false, hl: true },
    { icon: "party-popper", t: "Lieferung & Montage", s: "Unser eigenes Team montiert Ihre neue Traumküche – fix und fertig.", free: false },
  ];
  return (
    <Section bg="var(--surface-page)" id="prozess">
      <Reveal style={{ textAlign: "center", marginBottom: 16 }}>
        <Eyebrow>Ihr Weg zur neuen Küche</Eyebrow>
        <h2 style={{ fontSize: 46, margin: "12px 0 14px" }}>Entspannt, kostenlos & in Ihrem Tempo</h2>
        <p style={{ fontSize: 20, color: "var(--text-muted)", maxWidth: 660, margin: "0 auto" }}>
          Beratung, Planung und Aufmaß sind bei uns immer kostenlos. Und das Beste: Sie bestimmen selbst, wann Ihre neue Küche kommt.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 46, alignItems: "start", marginTop: 44, maxWidth: 1040, marginLeft: "auto", marginRight: "auto" }} className="calc-grid">
        <Reveal style={{ position: "sticky", top: 90 }}>
          <img src={L.monteurBild} alt="Hauseigenes Montageteam baut die neue Küche auf und nimmt die alte mit" style={{ width: "100%", height: "auto", display: "block" }} />
        </Reveal>
        <div>
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 70}>
            <div style={{ display: "flex", gap: 22, alignItems: "flex-start", paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                <span style={{ width: 60, height: 60, borderRadius: 999, background: s.hl ? "var(--reh-red)" : "#fff", color: s.hl ? "#fff" : "var(--reh-red)", border: "2px solid " + (s.hl ? "var(--reh-red)" : "var(--border-default)"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-xs)" }}><I name={s.icon} size={30} /></span>
                {i < steps.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 28, background: "var(--border-default)", marginTop: 6 }} />}
              </div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 23, margin: 0 }}>{s.t}</h3>
                  {s.free && <span style={{ background: "var(--green-100)", color: "var(--success)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", padding: "4px 10px", borderRadius: 999 }}>kostenlos</span>}
                  {s.hl && <span style={{ background: "var(--surface-brand-soft)", color: "var(--reh-red)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", padding: "4px 10px", borderRadius: 999 }}>flexibel</span>}
                </div>
                <p style={{ fontSize: 17.5, lineHeight: 1.55, color: "var(--text-body)", margin: "7px 0 0" }}>{s.s}</p>
              </div>
            </div>
          </Reveal>
        ))}
        </div>
      </div>
    </Section>
  );
}

// Testimonial-Video
function VideoTestimonial() {
  const L = window.LP;
  const vid = (L.media && L.media.testimonialVimeoId) || "";
  const [playing, setPlaying] = React.useState(false);
  return (
    <Section bg="var(--navy-500)" style={{ color: "#fff" }} id="video">
      <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
        <Eyebrow color="var(--red-300)">Echte Stimmen</Eyebrow>
        <h2 style={{ color: "#fff", fontSize: 44, margin: "12px 0 12px" }}>Familie erzählt von ihrer neuen Küche</h2>
        <p style={{ fontSize: 19, color: "var(--neutral-200)", maxWidth: 620, margin: "0 auto" }}>
          Sehen Sie selbst, wie unsere Kundinnen und Kunden den Wechsel mit „Alt gegen Neu" erlebt haben.
        </p>
      </Reveal>
      <Reveal style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 22, overflow: "hidden", background: "var(--navy-700)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", cursor: playing ? "default" : "pointer" }}
          onClick={() => vid && setPlaying(true)}>
          {playing ? (
            <iframe
              src={`https://player.vimeo.com/video/${vid}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
              title="Kundeninterview" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          ) : (
            <React.Fragment>
              <image-slot id="lp-video-poster" shape="rect" fit="cover" placeholder="Video-Vorschaubild (Poster) hier ablegen" style={{ width: "100%", height: "100%" }}></image-slot>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,32,45,0.1), rgba(20,32,45,0.55))", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <span style={{ width: 96, height: 96, borderRadius: 999, background: "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 34px rgba(227,6,19,0.5)" }}>
                  <I name="play" size={42} color="#fff" stroke={2} style={{ marginLeft: 6 }} />
                </span>
              </div>
              <div style={{ position: "absolute", bottom: 18, left: 22, right: 22, display: "flex", alignItems: "center", justifyContent: "space-between", pointerEvents: "none" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#fff" }}>Videointerview · ca. 2 Min.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--neutral-200)" }}><I name="badge-check" size={18} color="var(--red-300)" /> Echte Kunden</span>
              </div>
            </React.Fragment>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

// FunktionsGarantie 2 -> 10 Jahre
function Garantie() {
  const L = window.LP;
  const g = L.garantie;
  return (
    <Section bg="#fff" id="garantie">
      <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "center" }} className="calc-grid">
        <Reveal>
          <Eyebrow>Sicherheit nach dem Kauf</Eyebrow>
          <h2 style={{ fontSize: 44, margin: "12px 0 16px" }}>Aus 2 Jahren werden <span style={{ color: "var(--reh-red)" }}>10 Jahre</span> Garantie</h2>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-body)", margin: "0 0 22px" }}>
            Aktuell verlängern wir Ihre Funktionsgarantie auf mechanische und elektronische Beschläge von 2 auf ganze <b>10 Jahre</b> – damit Sie lange Freude an Ihrer Küche haben.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, background: "var(--surface-brand-soft)", borderRadius: 16, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--text-subtle)", textDecoration: "line-through" }}>{g.vonJahre}</span>
              <I name="arrow-right" size={26} color="var(--reh-red)" />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 52, color: "var(--reh-red)", lineHeight: 1 }}>{g.bisJahre}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-strong)" }}>Jahre Funktions&shy;garantie auf alle Beschläge</div>
          </div>
        </Reveal>
        <Reveal delay={120} style={{ background: "var(--surface-page)", borderRadius: 22, padding: 34, border: "1px solid var(--border-subtle)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-strong)", marginBottom: 18 }}>Abgedeckte Beschläge & Systeme:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px" }} className="form-grid">
            {g.punkte.map((p) => (
              <div key={p} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16.5, color: "var(--text-body)" }}>
                <span style={{ flex: "none", color: "var(--success)", marginTop: 1 }}><I name="check-circle" size={20} /></span>{p}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-subtle)", margin: "22px 0 0", lineHeight: 1.5 }}>{g.hinweis}</p>
        </Reveal>
      </div>
    </Section>
  );
}

// 0 % Finanzierung
function Finanzierung() {
  const L = window.LP;
  const f = L.finanzierung;
  return (
    <Section bg="var(--surface-page)" id="finanzierung">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="calc-grid">
        <Reveal>
          <Eyebrow>Bequem bezahlen</Eyebrow>
          <h2 style={{ fontSize: 46, margin: "12px 0 16px" }}>0 % Finanzierung – ganz ohne Zinsen</h2>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-body)", margin: "0 0 24px" }}>
            Gönnen Sie sich Ihre Traumküche jetzt und zahlen Sie bequem in monatlichen Raten – ohne Zinsen, ohne Aufpreis, ohne Anzahlung.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
            {["0,00 % effektiver Jahreszins", "Keine Anzahlung nötig", "Flexible Laufzeiten bis " + L.aktion.finanzierungMonate + " Monate", "Faire Konditionen über unseren Partner"].map((t) => (
              <li key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, fontWeight: 500, color: "var(--text-body)" }}>
                <span style={{ flex: "none", width: 28, height: 28, borderRadius: 999, background: "var(--success)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I name="check" size={18} stroke={3} /></span>{t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} style={{ background: "#fff", borderRadius: 22, padding: 36, border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <I name="calculator" size={22} color="var(--reh-red)" />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text-strong)" }}>Finanzierungsbeispiel</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 18 }}>Beispielküche · Kaufpreis {f.beispielPreis} €</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 18 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 50, color: "var(--reh-red)", lineHeight: 1 }}>{f.beispielRate} €</span>
            <span style={{ fontSize: 18, color: "var(--text-muted)", marginBottom: 6 }}>/ Monat</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", fontSize: 15 }}>
            {[["Laufzeit", f.monate + " Monate"], ["Sollzins p. a.", f.sollzins + " %"], ["Eff. Jahreszins", f.effektiv + " %"], ["Anzahlung", "0 €"]].map(([k, val]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                <span style={{ color: "var(--text-muted)" }}>{k}</span><span style={{ fontWeight: 700, color: "var(--text-strong)" }}>{val}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-subtle)", margin: "18px 0 0", lineHeight: 1.5 }}>
            Repräsentatives Beispiel (2/3 gem. § 6a Abs. 4 PAngV): Nobilia Küche, Barzahlungspreis {f.barzahlung} €, Nettodarlehensbetrag {f.barzahlung} €, {f.laufzeit} Monatsraten à {f.rate} €, Sollzins {f.sollzins} % p. a., effektiver Jahreszins {f.effektiv} % p. a. Bonität vorausgesetzt. Partner: {f.partner}. Gilt ab 500 € Einkaufswert (Mindest-Monatsrate 15 €).
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

// Kleingedrucktes / rechtliche Hinweise
function Kleingedrucktes() {
  const L = window.LP;
  return (
    <Section bg="var(--surface-page)" pad="56px" id="hinweise">
      <details style={{ maxWidth: 980, margin: "0 auto", background: "#fff", borderRadius: 16, border: "1px solid var(--border-subtle)", padding: "4px 26px" }}>
        <summary style={{ cursor: "pointer", padding: "18px 0", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-strong)", listStyle: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <I name="info" size={20} color="var(--reh-red)" /> Rechtliche Hinweise & Teilnahmebedingungen
        </summary>
        <div style={{ paddingBottom: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          {L.kleingedrucktes.map((k) => (
            <div key={k.titel}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text-strong)", marginBottom: 5 }}>{k.titel}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>{k.text}</p>
            </div>
          ))}
        </div>
      </details>
    </Section>
  );
}

Object.assign(window, { Problem, Beispielkuechen, Plaetze, Vergleich, Prozess, VideoTestimonial, Garantie, Finanzierung, Kleingedrucktes, Marken, Verwandlung, Referenzen });

// Gamifizierter Alt→Neu Toggle (Auto-Loop + klickbar)
function AltNeuToggle() {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const t = setInterval(() => setOn((v) => !v), 2300);
    return () => clearInterval(t);
  }, []);
  const segW = 104;
  const spring = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
      <div onClick={() => setOn((v) => !v)} role="button" aria-label="Alt gegen Neu umschalten"
        style={{ position: "relative", display: "inline-flex", padding: 7, borderRadius: 999, background: "var(--neutral-150)", boxShadow: "inset 0 2px 7px rgba(35,34,33,0.13)", cursor: "pointer", userSelect: "none" }}>
        <div style={{ position: "absolute", top: 7, bottom: 7, left: 7, width: segW, borderRadius: 999, background: "radial-gradient(circle at 35% 28%, #ff2a38, var(--reh-red) 72%)", boxShadow: "0 8px 22px rgba(227,6,19,0.45)", transform: `translateX(${on ? segW : 0}px)`, transition: `transform 0.55s ${spring}` }} />
        <div style={{ position: "absolute", top: -7, left: 7 + segW - 12, color: "var(--gold-500)", transform: `scale(${on ? 1 : 0}) rotate(${on ? 0 : -50}deg)`, transition: `transform 0.5s ${spring} 0.12s`, pointerEvents: "none" }}><I name="sparkles" size={26} /></div>
        {["Alt", "Neu"].map((t, i) => {
          const active = (i === 1) === on;
          return (
            <span key={t} style={{ position: "relative", zIndex: 2, width: segW, textAlign: "center", padding: "13px 0", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 23, letterSpacing: "0.02em", color: active ? "#fff" : "var(--text-muted)", textDecoration: i === 0 && on ? "line-through" : "none", textDecorationThickness: "2px", transition: "color 0.35s" }}>{t}</span>
          );
        })}
      </div>
    </div>
  );
}

// Echte Kundenreferenzen — interaktives Karussell
function Referenzen() {
  const L = window.LP;
  const items = L.referenzen || [];
  const [idx, setIdx] = React.useState(0);
  const [perView, setPerView] = React.useState(3);
  React.useEffect(() => {
    const calc = () => setPerView(window.innerWidth <= 620 ? 1 : window.innerWidth <= 980 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const gap = 20;
  const max = Math.max(0, items.length - perView);
  const at = Math.min(idx, max);
  React.useEffect(() => { if (idx > max) setIdx(max); }, [perView]);
  const arrow = (dir, disabled, onClick) => (
    <button onClick={onClick} disabled={disabled} aria-label={dir < 0 ? "Zurück" : "Weiter"}
      style={{ width: 52, height: 52, borderRadius: 999, border: "none", background: disabled ? "var(--neutral-200)" : "var(--reh-red)", color: "#fff", cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: disabled ? "none" : "var(--shadow-md)", opacity: disabled ? 0.5 : 1, flex: "none", transition: "all var(--dur-base)" }}>
      <I name={dir < 0 ? "chevron-left" : "chevron-right"} size={28} />
    </button>
  );
  return (
    <Section bg="#fff" id="referenzen">
      <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
        <div>
          <Eyebrow>Echte Kundenküchen</Eyebrow>
          <h2 style={{ fontSize: 42, margin: "12px 0 8px" }}>Über {items.length > 15 ? "20" : items.length} umgesetzte Referenzen</h2>
          <p style={{ fontSize: 18, color: "var(--text-muted)", margin: 0, maxWidth: 560 }}>Echte Küchen, echte Kundinnen und Kunden aus Velbert und der Region. Wischen oder klicken Sie sich durch.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }} className="hide-sm">
          {arrow(-1, at <= 0, () => setIdx(Math.max(0, at - 1)))}
          {arrow(1, at >= max, () => setIdx(Math.min(max, at + 1)))}
        </div>
      </Reveal>
      <Reveal>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: gap, transform: `translateX(calc(-${at} * ((100% - ${(perView - 1) * gap}px) / ${perView} + ${gap}px)))`, transition: "transform 0.5s var(--ease-out)" }}>
            {items.map((r, i) => (
              <div key={i} style={{ flex: `0 0 calc((100% - ${(perView - 1) * gap}px) / ${perView})` }}>
                <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 18, overflow: "hidden", background: "var(--neutral-150)", boxShadow: "var(--shadow-sm)" }}>
                  {r.img
                    ? <img src={r.img} alt={"Kundenküche " + (r.ort || "")} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    : <image-slot id={"lp-ref-" + i} shape="rect" fit="cover" placeholder={"Kundenküche " + (r.ort || (i + 1))} style={{ width: "100%", height: "100%" }}></image-slot>}
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 16px 14px", background: "linear-gradient(180deg, transparent, rgba(20,32,45,0.72))", display: "flex", alignItems: "center", gap: 7, color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>
                    <I name="map-pin" size={15} color="var(--red-300)" /> {r.ort ? "Kundenküche · " + r.ort : "Kundenküche"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Fortschritt + Pfeile (mobil) */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 22 }}>
          <span className="show-sm" style={{ display: "none" }}>{arrow(-1, at <= 0, () => setIdx(Math.max(0, at - 1)))}</span>
          <div style={{ display: "flex", gap: 7 }}>
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={"Zu Position " + (i + 1)}
                style={{ width: i === at ? 26 : 9, height: 9, borderRadius: 999, border: "none", background: i === at ? "var(--reh-red)" : "var(--neutral-300)", cursor: "pointer", padding: 0, transition: "all var(--dur-base)" }} />
            ))}
          </div>
          <span className="show-sm" style={{ display: "none" }}>{arrow(1, at >= max, () => setIdx(Math.min(max, at + 1)))}</span>
        </div>
      </Reveal>
    </Section>
  );
}

// Alt → Neu: interaktiver Vorher/Nachher-Regler, der beim Scrollen automatisch „verwandelt"
function Verwandlung() {
  const wrapRef = React.useRef(null);
  const barRef = React.useRef(null);
  const [prog, setProg] = React.useState(0);
  const [drag, setDrag] = React.useState(false);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    let raf;
    const animate = (to, dur) => {
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        setProg(to * (0.5 - 0.5 * Math.cos(k * Math.PI)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const trigger = () => { if (started.current) return; started.current = true; animate(1, 1700); };
    const inView = () => { const r = el.getBoundingClientRect(); const vh = window.innerHeight || 800; return r.top < vh * 0.72 && r.bottom > vh * 0.28; };
    if (inView()) trigger();
    let io;
    if ("IntersectionObserver" in window) { io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) trigger(); }), { threshold: 0.35 }); io.observe(el); }
    const onScroll = () => { if (inView()) trigger(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const ft = setTimeout(() => { if (window.__dsIO === false) trigger(); }, 900);
    return () => { if (io) io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); clearTimeout(ft); };
  }, []);

  const setFromX = (cx) => { const b = barRef.current; if (!b) return; const r = b.getBoundingClientRect(); setProg(Math.max(0, Math.min(1, (cx - r.left) / r.width))); };
  React.useEffect(() => {
    if (!drag) return;
    const move = (e) => { const cx = e.touches ? e.touches[0].clientX : e.clientX; setFromX(cx); };
    const up = () => setDrag(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [drag]);

  const pct = Math.round(prog * 100);
  const label = (text, side, active) => (
    <span style={{ position: "absolute", bottom: 16, [side]: 16, background: active ? "var(--reh-red)" : "rgba(20,32,45,0.78)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", padding: "7px 14px", borderRadius: 999, transition: "background var(--dur-base)" }}>{text}</span>
  );

  return (
    <Section bg="var(--navy-500)" style={{ color: "#fff" }} id="verwandlung">
      <Reveal style={{ textAlign: "center", marginBottom: 34 }}>
        <Eyebrow color="var(--red-300)">Aus Alt wird Neu</Eyebrow>
        <h2 style={{ color: "#fff", fontSize: 44, margin: "12px 0 12px" }}>Erleben Sie die Verwandlung</h2>
        <p style={{ fontSize: 19, color: "var(--neutral-200)", maxWidth: 640, margin: "0 auto" }}>
          Scrollen Sie – oder ziehen Sie den Regler – und sehen Sie, wie aus einer alten Küche eine neue Traumküche wird.
        </p>
      </Reveal>
      <Reveal style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div ref={wrapRef}>
          <div ref={barRef} style={{ position: "relative", aspectRatio: "16/10", borderRadius: 22, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.45)", userSelect: "none" }}>
            {/* ALT – Vollbild darunter */}
            <div style={{ position: "absolute", inset: 0, background: "var(--navy-700)" }}>
              <image-slot id="lp-tf-alt" shape="rect" fit="cover" placeholder="Foto: ALTE Küche (gleicher Bildausschnitt)" style={{ width: "100%", height: "100%" }}></image-slot>
              {label("Vorher", "right", false)}
            </div>
            {/* NEU – von links eingeblendet */}
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pct}% 0 0)`, background: "var(--navy-600)" }}>
              <image-slot id="lp-tf-neu" shape="rect" fit="cover" placeholder="Foto: NEUE Küche (gleicher Bildausschnitt)" style={{ width: "100%", height: "100%" }}></image-slot>
              {label("Nachher", "left", true)}
            </div>
            {/* Trennlinie + Griff */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pct}%`, width: 3, background: "#fff", transform: "translateX(-1.5px)", pointerEvents: "none", boxShadow: "0 0 8px rgba(0,0,0,0.3)" }} />
            <button aria-label="Regler ziehen" onPointerDown={(e) => { e.preventDefault(); setDrag(true); }}
              style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%, -50%)", width: 52, height: 52, borderRadius: 999, background: "var(--reh-red)", border: "3px solid #fff", cursor: "ew-resize", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", touchAction: "none" }}>
              <I name="chevrons-left-right" size={26} color="#fff" />
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <CTA size="lg" variant="primary">Meine Verwandlung starten</CTA>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// Marken & Beispielküchen verschiedener Hersteller
function Marken() {
  const L = window.LP;
  const [h, setH] = React.useState(-1);
  return (
    <Section bg="#fff" id="marken" pad="72px">
      <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
        <Eyebrow>Top-Marken unter einem Dach</Eyebrow>
        <h2 style={{ fontSize: 40, margin: "12px 0 10px" }}>Küchen von Marken, denen Sie vertrauen</h2>
        <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 620, margin: "0 auto" }}>
          Von Interliving über Nobilia bis Xpress Küchen – kompetent geplant, fair im Preis.
        </p>
      </Reveal>
      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "30px 48px", maxWidth: 880, margin: "0 auto" }}>
          {L.markenLogos.map((src, i) => (
            <img key={i} src={src} alt="Küchenmarke" loading="lazy"
              onMouseEnter={() => setH(i)} onMouseLeave={() => setH(-1)}
              style={{ height: "clamp(26px, 4.4vw, 40px)", width: "auto", maxWidth: 130, objectFit: "contain", filter: h === i ? "none" : "grayscale(1)", opacity: h === i ? 1 : 0.72, transition: "filter var(--dur-base), opacity var(--dur-base)" }} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
