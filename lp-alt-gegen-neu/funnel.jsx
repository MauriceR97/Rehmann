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

// Bildkachel (Küchenform / Küchenstil). Fällt auf Icon zurück, wenn kein Bild.
function ImageCard({ label, img, icon, selected, onClick }) {
  const [h, setH] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const showImg = img && !failed;
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative", display: "flex", flexDirection: "column", width: "100%", padding: 0, cursor: "pointer",
        borderRadius: 16, overflow: "hidden", textAlign: "left",
        background: "#fff",
        border: "2px solid " + (selected ? "var(--reh-red)" : h ? "var(--neutral-300)" : "var(--border-default)"),
        boxShadow: selected ? "0 10px 24px rgba(227,6,19,0.22)" : (h ? "var(--shadow-sm)" : "none"),
        transition: "all var(--dur-fast) var(--ease-standard)",
      }}>
      <span style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", flex: "none", background: "var(--surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {showImg
          ? <img src={img} alt={label} loading="lazy" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <I name={icon || "circle-help"} size={46} color="var(--neutral-400)" />}
        {selected && (
          <span style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: 999, background: "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>
            <I name="check" size={20} color="#fff" stroke={3} />
          </span>
        )}
      </span>
      <span style={{ padding: "12px 12px", minHeight: 58, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, lineHeight: 1.2, color: selected ? "var(--reh-red)" : "var(--text-strong)" }}>{label}</span>
    </button>
  );
}

// Farbkachel (Farbstil)
function SwatchCard({ label, swatch, icon, selected, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: "relative", display: "flex", flexDirection: "column", width: "100%", padding: 0, cursor: "pointer",
        borderRadius: 16, overflow: "hidden", textAlign: "left", background: "#fff",
        border: "2px solid " + (selected ? "var(--reh-red)" : h ? "var(--neutral-300)" : "var(--border-default)"),
        boxShadow: selected ? "0 10px 24px rgba(227,6,19,0.22)" : (h ? "var(--shadow-sm)" : "none"),
        transition: "all var(--dur-fast) var(--ease-standard)",
      }}>
      <span style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", flex: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", background: "var(--surface-sunken)" }}>
        {swatch
          ? swatch.slice(0, 4).map((c, i) => <span key={i} style={{ background: c }} />)
          : <span style={{ gridColumn: "1 / -1", gridRow: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center" }}><I name={icon || "circle-help"} size={40} color="var(--neutral-400)" /></span>}
        {selected && (
          <span style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: 999, background: "var(--reh-red)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>
            <I name="check" size={20} color="#fff" stroke={3} />
          </span>
        )}
      </span>
      <span style={{ padding: "12px 12px", minHeight: 58, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, lineHeight: 1.2, color: selected ? "var(--reh-red)" : "var(--text-strong)" }}>{label}</span>
    </button>
  );
}

function QuestionStep({ frage, value, onPick, onNext, onBack, canBack }) {
  const isMulti = frage.type === "multi";
  const arr = value || (isMulti ? [] : null);
  const picked = (label) => isMulti ? arr.includes(label) : arr === label;
  const toggle = (label) => {
    if (isMulti) {
      const next = arr.includes(label) ? arr.filter(x => x !== label) : [...arr, label];
      onPick(next);
    } else {
      onPick(label);
      setTimeout(onNext, 260);
    }
  };
  const layout = frage.layout || "list";
  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease-out) both" }}>
      <h2 style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 8px", textAlign: "center" }}>{frage.titel}</h2>
      <p style={{ fontSize: 17, color: "var(--text-muted)", margin: "0 0 26px", textAlign: "center" }}>{frage.hinweis}</p>

      {layout === "grid" && (
        <div className="funnel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {frage.optionen.map(o => (
            <ImageCard key={o.label} label={o.label} img={o.img} icon={o.icon} selected={picked(o.label)} onClick={() => toggle(o.label)} />
          ))}
        </div>
      )}
      {layout === "swatch" && (
        <div className="funnel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {frage.optionen.map(o => (
            <SwatchCard key={o.label} label={o.label} swatch={o.swatch} icon={o.icon} selected={picked(o.label)} onClick={() => toggle(o.label)} />
          ))}
        </div>
      )}
      {layout === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 13, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
          {frage.optionen.map(o => (
            <OptionCard key={o.label} label={o.label} icon={o.icon} selected={picked(o.label)} onClick={() => toggle(o.label)} />
          ))}
        </div>
      )}

      {/* Navigation: Zurück immer sichtbar (außer bei Schritt 1); Weiter nur bei Mehrfachauswahl */}
      {(canBack || isMulti) && (
        <div style={{ display: "flex", gap: 12, marginTop: 24, alignItems: "center" }}>
          {canBack && (
            <button onClick={onBack} style={{ flex: isMulti ? "none" : "0 0 auto", padding: "14px 20px", borderRadius: 14, border: "2px solid var(--border-default)", background: "#fff", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, display: "inline-flex", alignItems: "center", gap: 7 }}>
              <I name="arrow-left" size={18} /> Zurück
            </button>
          )}
          {isMulti && (
            <button onClick={onNext} disabled={arr.length === 0}
              style={{ flex: 1, padding: 20, borderRadius: 16, border: "none", cursor: arr.length ? "pointer" : "not-allowed",
                background: arr.length ? "var(--reh-red)" : "var(--neutral-300)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: arr.length ? "0 12px 28px rgba(227,6,19,0.34)" : "none" }}>
              Weiter <I name="arrow-right" size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Bild-Upload der alten Küche (Vorschau + komprimiert für den Webhook)
function AlteKuecheUpload({ data, onChange }) {
  const inputRef = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const set = (obj) => onChange(Object.assign({}, data, obj));

  const handleFile = (file) => {
    if (!file || !/^image\//.test(file.type)) return;
    setBusy(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 1400;
        const s = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * s), h = Math.round(img.height * s);
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = c.toDataURL("image/jpeg", 0.72);
        set({ ak_bild_name: file.name, ak_bild_data: dataUrl, ak_bild_url: "" });
        // Echter Upload zu Cloudinary (falls konfiguriert) → feste URL
        const up = (window.LP && window.LP.upload) || {};
        if (up.cloudName && up.uploadPreset) {
          c.toBlob((blob) => {
            if (!blob) { setBusy(false); return; }
            const fd = new FormData();
            fd.append("file", blob, (file.name || "kueche") + ".jpg");
            fd.append("upload_preset", up.uploadPreset);
            if (up.folder) fd.append("folder", up.folder);
            fetch("https://api.cloudinary.com/v1_1/" + up.cloudName + "/image/upload", { method: "POST", body: fd })
              .then((r) => r.json())
              .then((j) => { set({ ak_bild_name: file.name, ak_bild_data: dataUrl, ak_bild_url: (j && (j.secure_url || j.url)) || "" }); setBusy(false); })
              .catch(() => setBusy(false));
          }, "image/jpeg", 0.72);
        } else {
          setBusy(false);
        }
      };
      img.onerror = () => setBusy(false);
      img.src = e.target.result;
    };
    reader.onerror = () => setBusy(false);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files && e.dataTransfer.files[0]); };
  const hasImg = !!data.ak_bild_data;

  return (
    <div>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginBottom: 8 }}>Foto Ihrer aktuellen Küche (optional)</div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files && e.target.files[0])} />
      {hasImg ? (
        <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "2px solid var(--border-default)", borderRadius: 14, padding: 14 }}>
          <img src={data.ak_bild_data} alt="Vorschau" style={{ width: 76, height: 76, objectFit: "cover", borderRadius: 10, flex: "none" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.ak_bild_name || "Bild"}</div>
            <div style={{ fontSize: 14, color: "var(--success)", display: "inline-flex", alignItems: "center", gap: 6 }}><I name="check-circle" size={16} /> hochgeladen</div>
          </div>
          <button onClick={() => set({ ak_bild_name: "", ak_bild_data: "", ak_bild_url: "" })} aria-label="Entfernen" style={{ flex: "none", width: 38, height: 38, borderRadius: 999, border: "none", background: "var(--surface-sunken)", cursor: "pointer", color: "var(--text-strong)", display: "flex", alignItems: "center", justifyContent: "center" }}><I name="trash-2" size={18} /></button>
        </div>
      ) : (
        <button onClick={() => inputRef.current && inputRef.current.click()} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}
          style={{ width: "100%", padding: "26px 18px", borderRadius: 14, border: "2px dashed var(--border-strong)", background: "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--text-muted)" }}>
          <I name={busy ? "loader" : "upload"} size={30} color="var(--reh-red)" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-strong)" }}>{busy ? "Wird verarbeitet…" : "Bild auswählen oder hierher ziehen"}</span>
          <span style={{ fontSize: 13 }}>JPG oder PNG · hilft uns bei der Prämien-Einschätzung</span>
        </button>
      )}
    </div>
  );
}

// Detailschritt „Ihre alte Küche" (nur wenn Tauschprämie = Ja)
function AlteKuecheStep({ data, onChange, onNext, onBack, canBack }) {
  const L = window.LP;
  const cfg = L.altkueche;
  const field = { width: "100%", padding: "15px 18px", fontSize: 18, fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text-body)", background: "#fff", border: "2px solid var(--border-default)", borderRadius: 13, outline: "none", boxSizing: "border-box", appearance: "none", cursor: "pointer" };
  const set = (k, v) => onChange(Object.assign({}, data, { [k]: v }));
  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease-out) both" }}>
      <h2 style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 8px", textAlign: "center" }}>{cfg.titel}</h2>
      <p style={{ fontSize: 17, color: "var(--text-muted)", margin: "0 0 26px", textAlign: "center" }}>{cfg.hinweis}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cfg.felder.map((f) => (
          <div key={f.key} style={{ position: "relative" }}>
            <select value={data[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} style={Object.assign({}, field, { color: data[f.key] ? "var(--text-body)" : "var(--text-subtle)" })}>
              <option value="" disabled>{f.label}</option>
              {f.optionen.map((o) => <option key={o} value={o} style={{ color: "var(--text-body)" }}>{o}</option>)}
            </select>
            <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }}><I name="chevron-down" size={20} /></span>
          </div>
        ))}
        <textarea value={data.ak_besonderheiten || ""} onChange={(e) => set("ak_besonderheiten", e.target.value)} placeholder={cfg.besonderheiten} rows={3}
          style={{ width: "100%", padding: "15px 18px", fontSize: 18, fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--text-body)", background: "#fff", border: "2px solid var(--border-default)", borderRadius: 13, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
        <AlteKuecheUpload data={data} onChange={onChange} />
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        {canBack && (
          <button onClick={onBack} style={{ flex: "none", padding: "14px 20px", borderRadius: 14, border: "2px solid var(--border-default)", background: "#fff", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, display: "inline-flex", alignItems: "center", gap: 7 }}>
            <I name="arrow-left" size={18} /> Zurück
          </button>
        )}
        <button onClick={onNext}
          style={{ flex: 1, padding: 20, borderRadius: 16, border: "none", cursor: "pointer",
            background: "var(--reh-red)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 12px 28px rgba(227,6,19,0.34)" }}>
          Weiter <I name="arrow-right" size={24} />
        </button>
      </div>
    </div>
  );
}

function LeadForm({ onSubmit }) {
  const L = window.LP;
  const [f, setF] = React.useState({ vorname: "", nachname: "", email: "", telefon: "", plz: "", consent: false });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const valid = f.telefon.trim() && f.consent;
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
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        {["100 % kostenfrei", "Unverbindlich", "In 60 Sek. erledigt"].map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--green-100)", color: "var(--success)", border: "1px solid #bcdcc6", padding: "8px 14px", borderRadius: 999, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15 }}>
            <I name="check" size={17} stroke={3} /> {t}
          </span>
        ))}
      </div>
      <h2 style={{ fontSize: 32, margin: "0 0 6px" }}>Aktionsplatz sichern</h2>
      <p style={{ fontSize: 18, color: "var(--text-muted)", margin: "0 0 24px" }}>Wir rufen Sie in ca. 20 Minuten persönlich an (zu unseren Öffnungszeiten).</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-grid">
        <div><label style={lab}>Vorname</label><input style={field} value={f.vorname} onChange={set("vorname")} placeholder="Vorname" autoComplete="given-name" /></div>
        <div><label style={lab}>Nachname</label><input style={field} value={f.nachname} onChange={set("nachname")} placeholder="Nachname" autoComplete="family-name" /></div>
        <div><label style={lab}>Telefon *</label><input style={field} value={f.telefon} onChange={set("telefon")} placeholder="für unseren Rückruf" inputMode="tel" autoComplete="tel" /></div>
        <div><label style={lab}>PLZ</label><input style={field} value={f.plz} onChange={set("plz")} placeholder="z. B. 42549" inputMode="numeric" autoComplete="postal-code" /></div>
        <div style={{ gridColumn: "1 / -1" }}><label style={lab}>E-Mail</label><input style={field} value={f.email} onChange={set("email")} placeholder="name@beispiel.de" inputMode="email" autoComplete="email" /></div>
      </div>
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "20px 0 26px", cursor: "pointer" }}>
        <input type="checkbox" checked={f.consent} onChange={set("consent")} style={{ width: 24, height: 24, marginTop: 2, accentColor: "var(--reh-red)", flex: "none" }} />
        <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--text-body)" }}>Ja, Interliving Rehmann darf mich telefonisch zu meiner Anfrage kontaktieren. Meine Daten werden vertraulich behandelt und nicht weitergegeben. *</span>
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
  const yt = (L.media && L.media.dankeYoutubeId) || "";
  const schritte = [
    { icon: "check", t: "Anfrage abgeschickt", s: "Ihr Aktionsplatz ist reserviert.", done: true },
    { icon: "phone-call", t: "Wir rufen Sie an", s: "In ca. 20 Min. persönlich (zu Öffnungszeiten).", current: true },
    { icon: "armchair", t: "Beratung & Planung", s: "Kostenlos – bei Ihnen oder in der Ausstellung." },
    { icon: "party-popper", t: "Alt raus, neu rein", s: "Abbau, Lieferung & Montage inklusive." },
  ];
  return (
    <div style={{ textAlign: "center", padding: "20px 0", animation: "fadeUp 0.35s var(--ease-out) both" }}>
      <div style={{ width: 104, height: 104, borderRadius: 999, background: "var(--green-100)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 26px" }}>
        <I name="check" size={60} stroke={2.5} />
      </div>
      <h2 style={{ fontSize: 38, margin: "0 0 14px" }}>Vielen Dank{data && data.vorname ? ", " + data.vorname : ""}!</h2>
      <p style={{ fontSize: 21, lineHeight: 1.55, color: "var(--text-body)", maxWidth: 520, margin: "0 auto 28px" }}>
        Ihr Aktionsplatz ist reserviert. Wir rufen Sie <b>innerhalb von ca. 20 Minuten</b> persönlich an (zu unseren Öffnungszeiten {L.kontakt.oeffnung}).
      </p>

      {/* Nächste Schritte – wo der Nutzer gerade steht */}
      <div style={{ textAlign: "left", maxWidth: 560, margin: "0 auto 30px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-strong)", marginBottom: 16, textAlign: "center" }}>So geht es jetzt weiter</div>
        {schritte.map((s, i) => {
          const active = s.done || s.current;
          return (
            <div key={s.t} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i < schritte.length - 1 ? 18 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                <span style={{ width: 44, height: 44, borderRadius: 999, background: s.done ? "var(--success)" : (s.current ? "var(--reh-red)" : "#fff"), color: active ? "#fff" : "var(--text-subtle)", border: "2px solid " + (s.done ? "var(--success)" : (s.current ? "var(--reh-red)" : "var(--border-default)")), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: s.current ? "0 8px 20px rgba(227,6,19,0.34)" : "none" }}><I name={s.icon} size={22} /></span>
                {i < schritte.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 22, background: s.done ? "var(--success)" : "var(--border-default)", marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-strong)" }}>{s.t}</span>
                  {s.current && <span style={{ background: "var(--surface-brand-soft)", color: "var(--reh-red)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", padding: "3px 9px", borderRadius: 999 }}>Sie sind hier</span>}
                  {s.done && <span style={{ color: "var(--success)", display: "inline-flex", alignItems: "center" }}><I name="check-circle" size={16} /></span>}
                </div>
                <div style={{ fontSize: 15.5, color: "var(--text-muted)", marginTop: 2 }}>{s.s}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video der Küchenabteilung */}
      {yt && (
        <div style={{ maxWidth: 620, margin: "0 auto 30px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "var(--text-strong)", marginBottom: 14 }}>Lernen Sie uns schon jetzt kennen</div>
          <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 18, overflow: "hidden", background: "var(--navy-700)", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
            <iframe src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0`} title="Unsere Küchenabteilung" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}></iframe>
          </div>
        </div>
      )}

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

function Funnel({ open, onClose, startView }) {
  const L = window.LP;
  const fragen = L.fragen;
  const nQ0 = fragen.length;
  // Direktaufruf /danke-formular-kueche → direkt die Danke-Ansicht zeigen (kein Sprung ins Formular)
  const [step, setStep] = React.useState(() => (startView === "danke" ? nQ0 + 1 : 0));
  const [answers, setAnswers] = React.useState({});
  const [altData, setAltData] = React.useState({});
  const [lead, setLead] = React.useState(null);
  const nQ = fragen.length;
  // Bedingter Detailschritt zur alten Küche, wenn Tauschprämie = Ja
  const showAlt = answers.tausch === "Ja";
  // Ansichten-Sequenz: Fragen → (alte Küche) → Formular → Danke
  const views = fragen.map((_, i) => ({ kind: "q", i })).concat(
    showAlt ? [{ kind: "alt" }] : [],
    [{ kind: "form" }, { kind: "thanks" }]
  );
  const view = views[step] || views[views.length - 1];
  const totalSteps = nQ + (showAlt ? 1 : 0);
  const scrollRef = React.useRef(null);
  const baseUrl = React.useRef(null);
  const firedOpen = React.useRef(false);
  // Bei Direktaufruf der Danke-Seite KEIN falsches Conversion-Event feuern
  const firedLead = React.useRef(startView === "danke");

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open, step]);

  // Direktaufruf /danke-formular-kueche → Danke-Ansicht erzwingen (Startview kommt nach dem Mount an)
  React.useEffect(() => {
    if (open && startView === "danke") setStep(nQ + 1);
  }, [open, startView]);

  // --- URL-Routing + Analytics für Werbeauswertung ---
  // Öffnet Funnel  -> /formular-kueche
  // Danke-Seite    -> /danke-formular-kueche
  React.useEffect(() => {
    const routes = (L.routes) || { formular: "formular-kueche", danke: "danke-formular-kueche" };
    const track = (name, extra) => {
      var evid = "";
      try { evid = window.REH_TRACK ? window.REH_TRACK.leadEventId() : ""; } catch (e) {}
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: name, event_id: evid }, extra || {}));
      } catch (e) {}
      // Optional: virtueller Seitenaufruf für GA4 (falls gtag vorhanden)
      try { if (typeof window.gtag === "function") window.gtag("event", "page_view", { page_path: location.pathname }); } catch (e) {}
      // Meta Pixel — nur Lead an Facebook (InitiateCheckout bleibt dem CRM/Angebot vorbehalten)
      try {
        if (typeof window.fbq === "function") {
          if (name === "lead_submitted") window.fbq("track", "Lead", { content_name: "Alt gegen Neu" }, { eventID: evid });
        }
      } catch (e) {}
    };
    const setPath = (slug) => {
      const target = location.origin + "/" + slug + location.search;
      if (location.pathname !== "/" + slug) {
        try { history.pushState({ funnel: slug }, "", target); } catch (e) {}
      }
    };
    if (open) {
      if (baseUrl.current === null) baseUrl.current = location.pathname + location.search;
      if (view.kind === "thanks") {
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

  const isQuestion = view.kind === "q";
  const isAlt = view.kind === "alt";
  const isForm = view.kind === "form";
  const isThanks = view.kind === "thanks";
  const back = () => setStep(s => Math.max(0, s - 1));

  // Lead-Daten an Zapier senden (form-urlencoded = kein CORS-Preflight, Zapier mappt Felder nativ)
  const sendLead = (d) => {
    const url = L.zapierWebhook;
    if (!url) return;
    const q = {};
    try { new URLSearchParams(location.search).forEach((v, k) => { q[k] = v; }); } catch (e) {}
    // Dauerhaft gespeicherte Ad-/Klick-Daten (bleiben auch nach URL-Wechsel erhalten)
    var T = {};
    try { T = window.REH_TRACK ? window.REH_TRACK.getAll() : {}; } catch (e) {}
    const pick = (k) => T[k] || q[k] || "";
    const routes = (L.routes) || {};
    let device = "desktop";
    try {
      const w = window.innerWidth;
      const ua = navigator.userAgent || "";
      if (/Mobi|Android|iPhone/i.test(ua) || w <= 620) device = "mobil";
      else if (/iPad|Tablet/i.test(ua) || w <= 980) device = "tablet";
    } catch (e) {}
    let eventid = "reh-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    try { if (window.REH_TRACK) eventid = window.REH_TRACK.leadEventId(); } catch (e) {}
    const fields = {
      // Kontaktdaten
      anrede: "",
      vorname: d.vorname || "",
      nachname: d.nachname || "",
      email: d.email || "",
      telefon: d.telefon || "",
      plz: d.plz || "",
      datenschutz_ok: d.consent ? "ja" : "nein",
      // Neue Küche
      nk_starttermin: answers.zeit || "",
      nk_form: answers.kform || "",
      nk_stil: answers.kstil || "",
      nk_farbe: answers.kfarbe || "",
      nk_finanzierung: answers.finanzierung || "",
      nk_budget: answers.budget || "",
      // Alte Küche
      ak_vorhanden: answers.tausch === "Ja" ? "ja" : (answers.tausch === "Nein" ? "nein" : (/keine/i.test(answers.tausch || "") ? "nein" : "")),
      ak_in_zahlung: answers.tausch || "",
      ak_zustand: altData.ak_zustand || "",
      ak_form: altData.ak_form || "",
      ak_egeraete_abgeben: altData.ak_egeraete_abgeben || "",
      ak_besonderheiten: altData.ak_besonderheiten || "",
      alte_kueche_bild: altData.ak_bild_name || "",
      alte_kueche_bild_url: altData.ak_bild_url || "",
      alte_kueche_bild_data: (!altData.ak_bild_url && altData.ak_bild_data && altData.ak_bild_data.length < 300000) ? altData.ak_bild_data : "",
      // Kampagne / Tracking (dauerhaft über REH_TRACK)
      kategorie: "Küche",
      kampagne: pick("kampagne") || pick("utm_campaign"),
      utm_source: pick("utm_source"),
      utm_medium: pick("utm_medium"),
      utm_campaign: pick("utm_campaign"),
      utm_content: pick("utm_content"),
      utm_term: pick("utm_term"),
      utm_id: pick("utm_id"),
      // First-Touch (Erstkontakt-Attribution)
      ft_utm_source: T.ft_utm_source || "",
      ft_utm_medium: T.ft_utm_medium || "",
      ft_utm_campaign: T.ft_utm_campaign || "",
      first_landing_url: T.first_landing_url || "",
      first_referrer: T.first_referrer || "",
      first_seen: T.first_seen || "",
      source_device: device,
      // Meta Conversions API (CAPI) — Zapier hasht E-Mail/Telefon und sendet serverseitig
      event_name: "Lead",
      event_id: eventid,
      action_source: "website",
      event_source_url: T.event_source_url || (location.origin + location.pathname),
      client_user_agent: T.client_user_agent || (navigator.userAgent || ""),
      fbp: T.fbp || "",
      fbc: T.fbc || "",
      fbclid: pick("fbclid"),
      gclid: pick("gclid"),
      gbraid: pick("gbraid"),
      wbraid: pick("wbraid"),
      ttclid: pick("ttclid"),
      msclkid: pick("msclkid"),
      eventid: eventid,
      danke_url: location.origin + "/" + (routes.danke || "danke-formular-kueche"),
      // Kontext
      aktion: "Alt gegen Neu",
      zeitstempel: new Date().toISOString(),
      seite: location.origin + location.pathname,
    };
    const body = new URLSearchParams(fields).toString();
    // KEIN keepalive (64 KB-Limit) — der Body kann mit Küchenfoto größer sein.
    try {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: body,
      }).catch(function () {});
    } catch (e) {}
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--surface-page)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ flex: "none", background: "#fff", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "12px var(--gutter) 10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {(step > 0 && !isThanks) && (
              <button onClick={back} aria-label="Zurück" style={{ flex: "none", width: 40, height: 40, borderRadius: 999, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-strong)" }}><I name="arrow-left" size={20} /></button>
            )}
            <a href={location.pathname} onClick={(e) => { e.preventDefault(); onClose(); }} aria-label="Zurück zur Startseite" style={{ flex: "none", display: "block", cursor: "pointer" }}>
              <img src={L.logos.farbig} alt="Interliving Rehmann" style={{ height: 34, display: "block" }} />
            </a>
            {!isThanks && <ProgressBar current={step + 1} total={totalSteps} />}
            <button onClick={onClose} aria-label="Schließen" style={{ flex: "none", marginLeft: "auto", width: 40, height: 40, borderRadius: 999, border: "none", background: "var(--surface-sunken)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-strong)" }}><I name="x" size={22} /></button>
          </div>
          {/* Google-Bewertungen — schmale Leiste, durchgehend sichtbar */}
          <a href={L.trust.googleUrl || "#"} onClick={(e) => { if (!L.trust.googleUrl) e.preventDefault(); }} target={L.trust.googleUrl ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, textDecoration: "none", color: "var(--text-muted)" }}>
            <GoogleG size={16} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--text-strong)" }}>{L.trust.googleRating}</span>
            <Stars size={14} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>· {L.trust.googleCount} Google-Bewertungen</span>
          </a>
        </div>
      </div>

      {/* Body */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px var(--gutter) 56px" }}>
          {isQuestion && (
            <QuestionStep
              frage={fragen[view.i]}
              value={answers[fragen[view.i].key]}
              onPick={(v) => setAnswers(a => ({ ...a, [fragen[view.i].key]: v }))}
              onNext={() => setStep(s => s + 1)}
              onBack={back}
              canBack={step > 0}
            />
          )}
          {isAlt && (
            <AlteKuecheStep data={altData} onChange={setAltData} onNext={() => setStep(s => s + 1)} onBack={back} canBack={step > 0} />
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
