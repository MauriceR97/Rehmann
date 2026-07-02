// Interliving Rehmann — shared kit parts (placeholder photo, section heading)

// Honest product-photo placeholder: warm tile with a muted category glyph.
function Photo({ icon = "image", ratio = "4 / 3", radius = "var(--radius-lg)", label, style = {} }) {
  return (
    <div style={{
      position: "relative", aspectRatio: ratio, width: "100%",
      background: "linear-gradient(145deg, var(--neutral-100), var(--neutral-150))",
      borderRadius: radius, overflow: "hidden", display: "flex",
      alignItems: "center", justifyContent: "center", color: "var(--neutral-300)", ...style,
    }}>
      <Icon name={icon} size={72} strokeWidth={1.4} />
      <span style={{ position: "absolute", bottom: 10, right: 12, fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--neutral-400)" }}>
        {label || "Produktfoto"}
      </span>
    </div>
  );
}
window.Photo = Photo;

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: "var(--space-6)" }}>
      <div>
        {eyebrow && <div className="reh-eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <h2 style={{ margin: 0, fontSize: "var(--fs-2xl)" }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}
window.SectionHeading = SectionHeading;
