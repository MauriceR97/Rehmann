# Möbel / Küchen Rehmann — Aktions-Repository

Ein Repository für **alle** Aktions-Landingpages. Jede Aktion hat ihren eigenen
Ordner und ihr eigenes Routing — es braucht kein zweites Repository.

## Ordnerstruktur

```
/
├─ index.html                  → Startseite (Übersicht aller laufenden Aktionen)
├─ vercel.json                 → Routing: ein Rewrite-Block pro Aktion
├─ styles.css                  → Design-System / Marken-Tokens (geteilt)
├─ image-slot.js               → geteiltes Hilfsskript
├─ favicon*.png, og-image.jpg  → geteilte Basis-Assets
│
├─ aktionen/
│   └─ alt-gegen-neu-kueche/          → URL: /aktionen/alt-gegen-neu-kueche
│       ├─ index.html                 → Einstieg dieser Aktion
│       └─ lp/                        → Code + Assets NUR dieser Aktion
│           ├─ config.js              → Texte, Preise, basis, routes
│           ├─ tracking.js            → First-Party Ad-Tracking
│           ├─ ui.jsx, sections*.jsx, funnel.jsx, app.jsx
│           └─ assets/                → Bilder, Videos, Logos dieser Aktion
│
└─ raeumungsverkauf/           → eigenständige Seite: /raeumungsverkauf
```

## Neue Aktion anlegen (z. B. `alt-gegen-neu-polster`)

1. **Ordner kopieren:** `aktionen/alt-gegen-neu-kueche/` →
   `aktionen/alt-gegen-neu-polster/`
2. **`lp/config.js` anpassen** — nur diese vier Dinge steuern das Routing:
   ```js
   basis: "/aktionen/alt-gegen-neu-polster",
   routes: {
     formular: "formular-polster",
     danke:    "danke-formular-polster",
   },
   ```
   Dazu Texte, Preise, Bilder, Zapier-Webhook und Meta-Pixel-ID der Aktion.
3. **`vercel.json` ergänzen:**
   ```json
   { "source": "/aktionen/alt-gegen-neu-polster/:slug*",
     "destination": "/aktionen/alt-gegen-neu-polster/index.html" }
   ```
4. **Startseite** (`index.html` im Root) um eine Karte für die Aktion erweitern.

Ergebnis:
- `kueche-rehmann.de/aktionen/alt-gegen-neu-polster`
- `…/aktionen/alt-gegen-neu-polster/formular-polster`
- `…/aktionen/alt-gegen-neu-polster/danke-formular-polster`

## Wichtig

- **`basis` in `config.js`** ist die einzige Stelle, an der der Aktionspfad steht.
  Funnel-URLs, Danke-Seite und CRM-Feld `danke_url` leiten sich davon ab.
- **Formular & Danke-Seite sind pro Aktion getrennt** — eigene Slugs, eigenes
  Zapier-Ziel, eigene Meta-Conversion. Kein Vermischen der Auswertung.
- **Cache-Versionen:** Nach Änderungen an `.jsx`/`config.js` die `?v=JJJJMMTT<x>`
  in der `index.html` der jeweiligen Aktion erhöhen.
- **Geteilte Dateien** (`styles.css`, `image-slot.js`, Favicons) liegen im Root und
  werden aus den Aktionen mit `../../` eingebunden — einmal pflegen, überall gültig.
- **Alte Einstiegs-URLs** bleiben per Rewrite/Redirect in `vercel.json` erreichbar,
  damit laufende Anzeigen nicht ins Leere führen.
