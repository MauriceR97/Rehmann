# Projekt-Notizen (Interliving Rehmann – „Alt gegen Neu")

## Downloads / GitHub-Handoff
- **Nur geänderte oder neu hinzugefügte Dateien** zum Download geben — NICHT den ganzen Ordner. Der Nutzer lädt sonst unnötig alles neu hoch/runter.
- Nach Änderungen an `.jsx`/`config.js`: die **Cache-Version** (`?v=YYYYMMDD<buchstabe>`) in `index.html` erhöhen und `index.html` mit ins Mini-Paket legen.
- **Live-Datei ist `index.html`** (Vercel). `Alt-gegen-Neu-Landingpage.html` ist eine überflüssige Altkopie und muss nicht mehr geliefert werden.

## Technische Merkposten
- Scroll-Container-Falle: `overflow-x: hidden` auf `#root`/`html`/`body` macht sie zum Scroll-Container und bricht die Scroll-Transformation. Stattdessen `overflow-x: clip` verwenden.
- Landingpage-Code liegt in `lp-alt-gegen-neu/` (config.js, ui.jsx, sections1-3.jsx, funnel.jsx, app.jsx).
- Leads gehen per form-urlencoded POST an Zapier-Webhook; Cookiebot (auto-blocking) im `<head>`.
