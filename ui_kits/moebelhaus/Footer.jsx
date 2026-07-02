// Interliving Rehmann — storefront Footer
const SOCIAL_PATHS = {
  facebook: "M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z",
  instagram: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.88 4.88 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.88 4.88 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2m0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6",
};
function Social({ name }) {
  const fill = name === "facebook";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}
function Footer() {
  const cols = [
    { h: "Sortiment", items: ["Wohnen", "Schlafen", "Küchen", "Garten", "Boxspring", "Angebote"] },
    { h: "Service", items: ["Küchenplanung", "Lieferung & Montage", "Finanzierung", "Bestpreisgarantie", "Kundendienst"] },
    { h: "Unternehmen", items: ["Über Rehmann", "Seit 1887", "Jobs & Karriere", "Filiale Velbert", "Kontakt"] },
  ];
  return (
    <footer style={{ background: "var(--navy-500)", color: "var(--neutral-200)", marginTop: "var(--space-9)" }}>
      <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-8) var(--gutter) var(--space-6)", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "var(--space-7)" }}>
        <div>
          <img src="../../assets/logos/rehmann-weiss.svg" alt="Interliving Rehmann" style={{ height: 56, marginBottom: 18 }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", lineHeight: 1.6, color: "var(--neutral-300)", margin: 0, maxWidth: 280 }}>
            Inhabergeführtes Möbelhaus in Velbert seit 1887. Möbel für dich gemacht — mit persönlicher Beratung und bewährter Qualität.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {["facebook", "instagram"].map((s) => (
              <span key={s} style={{ width: 38, height: 38, borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <Social name={s} />
              </span>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <h6 style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)", textTransform: "none", letterSpacing: 0, margin: "0 0 14px" }}>{col.h}</h6>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {col.items.map((it) => (
                <li key={it}><a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--neutral-300)", textDecoration: "none", fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)" }}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "16px var(--gutter)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontFamily: "var(--font-sans)", fontSize: "var(--fs-xs)", color: "var(--neutral-400)" }}>
          <span>© {new Date().getFullYear()} Rehmann &amp; Söhne GmbH · moebel-rehmann.de · kuechen-rehmann.de</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--neutral-400)", textDecoration: "none" }}>Impressum</a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--neutral-400)", textDecoration: "none" }}>Datenschutz</a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--neutral-400)", textDecoration: "none" }}>AGB</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
