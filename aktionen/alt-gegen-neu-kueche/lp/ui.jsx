// Interliving Rehmann — shared UI helpers
const { useState, useEffect, useRef } = React;

// Lucide icon rendered as native React SVG (no global createIcons — avoids
// reconciliation fights and per-render document scans).
function _lucideChildren(name) {
  const L = window.lucide;
  if (!L) return null;
  const pas = String(name).split("-").map((w) => (w ? w[0].toUpperCase() + w.slice(1) : "")).join("");
  let d = (L.icons && (L.icons[pas] || L.icons[name])) || L[pas] || null;
  if (!d) return null;
  let kids = Array.isArray(d) ? d : (d.children || null);
  if (!kids) return null;
  // Normalise: each child should be [tag, attrs]
  return kids.filter((c) => Array.isArray(c) && typeof c[0] === "string");
}
function I({ name, size = 24, stroke = 1.9, color = "currentColor", style = {} }) {
  const kids = _lucideChildren(name);
  if (!kids) return React.createElement("span", { style: { display: "inline-flex", width: size, height: size, ...style } });
  return React.createElement(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
      style: { display: "inline-flex", verticalAlign: "middle", flex: "none", ...style } },
    kids.map((c, i) => React.createElement(c[0], { key: i, ...c[1] }))
  );
}

// Brand CTA button — opens the funnel by default
function CTA({ children, onClick, size = "lg", variant = "primary", icon = "arrow-right", block = false, style = {} }) {
  const [h, setH] = useState(false);
  const sizes = {
    md: { fontSize: 19, padding: "16px 26px", radius: 14 },
    lg: { fontSize: 23, padding: "21px 34px", radius: 16 },
    xl: { fontSize: 27, padding: "26px 40px", radius: 18 },
  }[size];
  const variants = {
    primary: { bg: h ? "var(--action-hover)" : "var(--reh-red)", color: "#fff", border: "var(--reh-red)", shadow: "0 14px 32px rgba(227,6,19,0.38)" },
    navy: { bg: h ? "var(--navy-600)" : "var(--navy-500)", color: "#fff", border: "var(--navy-500)", shadow: "0 12px 28px rgba(39,58,80,0.3)" },
    white: { bg: h ? "var(--neutral-100)" : "#fff", color: "var(--reh-red)", border: "#fff", shadow: "0 12px 28px rgba(0,0,0,0.18)" },
  }[variant];
  return (
    <button className="lp-cta" onClick={onClick || (() => window.openFunnel && window.openFunnel())}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: block ? "flex" : "inline-flex", width: block ? "100%" : "auto",
        alignItems: "center", justifyContent: "center", gap: 12,
        fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.1,
        background: variants.bg, color: variants.color, border: "none",
        borderRadius: sizes.radius, padding: sizes.padding, fontSize: sizes.fontSize,
        cursor: "pointer", boxShadow: variants.shadow,
        transform: h ? "translateY(-2px)" : "translateY(0)",
        transition: "all var(--dur-base) var(--ease-out)", textAlign: "center",
        ...style,
      }}>
      {children}{icon && <I name={icon} size={size === "xl" ? 28 : 24} />}
    </button>
  );
}

function Stars({ size = 20, value = 5, color = "#F5A623" }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= value ? color : "none"} stroke={color} strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z"/>
    </svg>
  );
}

// Trade-in seal (reused from the ad)
function Seal({ size = 168, rotate = -8 }) {
  const L = window.LP;
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flex: "none",
      background: "radial-gradient(circle at 38% 32%, #ff2230, var(--reh-red) 55%, var(--red-600))",
      boxShadow: "0 14px 30px rgba(227,6,19,0.45), inset 0 0 0 4px rgba(255,255,255,0.92)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transform: `rotate(${rotate}deg)`, textAlign: "center", color: "#fff",
    }}>
      <div style={{ fontSize: size * 0.1, fontWeight: 700, opacity: 0.95 }}>bis zu</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size * 0.27, lineHeight: 0.9, whiteSpace: "nowrap" }}>{L.aktion.praemieMax}&thinsp;€</div>
      <div style={{ width: size * 0.42, height: 2, background: "rgba(255,255,255,0.6)", borderRadius: 2, margin: `${size*0.04}px 0` }} />
      <div style={{ fontSize: size * 0.085, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>Tauschprämie</div>
    </div>
  );
}

function Eyebrow({ children, color = "var(--reh-red)", style = {} }) {
  return <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16, letterSpacing: "0.14em", textTransform: "uppercase", color, ...style }}>{children}</div>;
}

// Section wrapper with max width
function Section({ children, bg = "transparent", pad = "96px", id, style = {} }) {
  return (
    <section className="lp-section" id={id} style={{ background: bg, padding: `${pad} var(--gutter)`, ...style }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

// days remaining helper
function tageBis(iso) {
  const end = new Date(iso + "T23:59:59");
  const diff = Math.ceil((end - new Date()) / 86400000);
  return diff > 0 ? diff : 0;
}

// Probe whether IntersectionObserver actually fires in this environment.
// (Some embedded preview iframes never fire it.) Result drives Reveal's fallback.
window.__dsIO = null;
(function probeIO() {
  try {
    if (!("IntersectionObserver" in window) || !document.body) { window.__dsIO = false; return finish(); }
    const s = document.createElement("div");
    s.style.cssText = "position:fixed;top:0;left:0;width:2px;height:2px;pointer-events:none;opacity:0;";
    document.body.appendChild(s);
    const io = new IntersectionObserver((es) => {
      if (window.__dsIO === null) { window.__dsIO = es.some((e) => e.isIntersecting); cleanup(); }
    });
    io.observe(s);
    function cleanup() { try { io.disconnect(); s.remove(); } catch (e) {} finish(); }
    setTimeout(() => { if (window.__dsIO === null) { window.__dsIO = false; cleanup(); } }, 400);
  } catch (e) { window.__dsIO = false; finish(); }
  function finish() { try { window.dispatchEvent(new Event("ds-io-result")); } catch (e) {} }
})();

// Scroll-reveal: fades children up when they enter the viewport. Where IO
// doesn't work, content is shown immediately (no effect, never hidden).
function Reveal({ children, y = 30, delay = 0, dur = 700, scaleFrom = 1, style = {}, className }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setSeen(true); return; }
    let done = false;
    const reveal = () => { if (!done) { done = true; setSeen(true); cleanup(); } };
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > 0;
    };
    const onScroll = () => { if (inView()) reveal(); };
    let io, probeTimer;
    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (probeTimer) clearTimeout(probeTimer);
      if (io) io.disconnect();
    }
    if (inView()) { reveal(); return; }
    // If the environment can't observe intersections, just show content.
    if (window.__dsIO === false) { reveal(); return; }
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) reveal(); });
      }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Race-free fallback: after the IO probe window, if IO is known broken, reveal.
    probeTimer = setTimeout(() => { if (window.__dsIO === false && !inView()) reveal(); }, 700);
    return cleanup;
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? "none" : `translateY(${y}px) scale(${scaleFrom})`,
      transition: `opacity ${dur}ms var(--ease-out), transform ${dur}ms var(--ease-out)`,
      transitionDelay: `${delay}ms`,
      willChange: "opacity, transform",
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, { I, CTA, Stars, GoogleG, Seal, Eyebrow, Section, tageBis, Reveal });
