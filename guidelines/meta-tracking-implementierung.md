# Meta Pixel + Conversions API — Implementierung (Vorlage für weitere Seiten)

Stand: Juli 2026 · Referenz-Umsetzung: Landingpage „Alt gegen Neu" (Möbel Rehmann)
Pixel/Datensatz: `1397306551180465` (Onepage_Aktionsseite)

---

## Übersicht: Was passiert wo

| Ort | Ereignis an Meta | Zweck |
|---|---|---|
| Landingpage (Seitenaufruf) | `PageView` | Reichweite, Retargeting-Zielgruppen |
| Formular geöffnet | *nichts an Meta* | `InitiateCheckout` bleibt dem CRM (Angebotsphase) vorbehalten |
| Danke-Ansicht | `PageView` (mit Danke-URL) + `Lead` (mit `event_id`) | Conversion; PageView damit URL-basierte Custom Conversions greifen |
| Server (Zapier → CAPI) | `Lead` (mit **derselben** `event_id`) | Fängt Consent-Blocking/Adblocker ab, dedupliziert mit dem Browser-Event |

**Kernprinzip:** Jedes Lead-Ereignis wird **zweimal** gesendet — einmal aus dem Browser (Pixel), einmal serverseitig (CAPI) — beide mit **identischer `event_id`**. Meta erkennt das als *ein* Ereignis („dedupliziert"), zählt also nicht doppelt, verliert aber auch keine Conversion.

---

## 1. Einbau im `<head>` (Reihenfolge ist wichtig)

```html
<!-- 1. Cookiebot ZUERST (auto-blocking) -->
<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"
        data-cbid="DEINE-CBID" data-blockingmode="auto" type="text/javascript"></script>

<!-- 2. First-Party Ad-Tracking (muss VOR dem Pixel laufen) -->
<script src="tracking.js"></script>

<!-- 3. Meta Pixel -->
<script>
  window.PIXEL_ID = "1397306551180465";
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  if (window.PIXEL_ID) { try { fbq('init', window.PIXEL_ID); fbq('track', 'PageView'); } catch (e) {} }
</script>
```

---

## 2. `tracking.js` — Ad-Parameter dauerhaft festhalten

**Das Problem, das es löst:** Beim Wechsel ins Formular ändert sich die URL — `fbclid`, `utm_*` usw. wären danach verloren. Deshalb werden sie beim **ersten** Seitenaufruf in `localStorage` gesichert und später von dort gelesen.

Was das Skript macht:

1. **Liest alle Klick-/Kampagnen-Parameter** aus der URL:
   `utm_source, utm_medium, utm_campaign, utm_content, utm_term, utm_id, fbclid, gclid, gbraid, wbraid, ttclid, msclkid, li_fat_id, kampagne, adset, ad_id, campaign_id, placement …`
2. Speichert sie **zweifach**:
   - **Last-Touch** (`reh_trk_v1`) — wird bei jedem neuen Ad-Klick überschrieben
   - **First-Touch** (`reh_trk_first_v1`) — nur beim allerersten Besuch gesetzt (Erstkontakt-Attribution)
3. **Verwaltet die Meta-Identifikatoren:**
   - `_fbp` — Browser-ID. Setzt normalerweise das Pixel; wir legen einen Fallback an, falls es (noch) blockiert ist.
   - `_fbc` — wird aus `fbclid` im **Meta-Format** gebildet: `fb.1.<timestamp>.<fbclid>`. Cookie hat Vorrang, sonst wird es aus dem gespeicherten `fbclid` abgeleitet.
4. **Erzeugt eine `event_id`** pro Seiten-Session: `reh.<timestamp>.<random>` — das ist der Schlüssel zur Deduplizierung.
5. Stellt alles bereit über:
   ```js
   window.REH_TRACK.getAll()        // alle Werte als flaches Objekt
   window.REH_TRACK.leadEventId()   // stabile event_id (immer derselbe Wert)
   ```

Zusätzlich liefert `getAll()` die CAPI-Pflichtfelder:
`client_user_agent` (User-Agent) und `event_source_url` (aktuelle URL ohne Query).

> Die vollständige Datei liegt unter `lp-alt-gegen-neu/tracking.js` — sie ist projektunabhängig und kann 1:1 übernommen werden (ggf. die `STORE`/`FIRST`-Schlüsselnamen anpassen).

---

## 3. Ereignisse im Funnel feuern

```js
var evid = window.REH_TRACK ? window.REH_TRACK.leadEventId() : "";

// Für internes Tracking / Google Tag Manager
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ event: name, event_id: evid });

// Meta Pixel
if (typeof window.fbq === "function") {
  if (name === "lead_submitted") {
    // WICHTIG bei Single-Page-Apps: die URL wird nur per pushState geändert,
    // es lädt keine neue Seite -> es feuert KEIN automatischer PageView.
    // URL-basierte Custom Conversions würden sonst nie auslösen.
    window.fbq("track", "PageView");
    window.fbq("track", "Lead", { content_name: "Alt gegen Neu" }, { eventID: evid });
  }
}
```

**Reihenfolge beachten:** Erst die URL auf die Danke-Adresse setzen (`history.pushState`), **dann** die Events feuern — nur so trägt Meta die richtige `event_source_url`.

```js
history.pushState({}, "", location.origin + "/danke-formular-kueche" + location.search);
// … danach track("lead_submitted")
```

**Wichtig:** Das Lead-Event darf pro Absendung nur **einmal** feuern. Wir sichern das mit einem Flag (`firedLead`), sonst löst jeder Re-Render eine neue Conversion aus.

---

## 4. Server-Side: Webhook → Zapier → Conversions API

Beim Absenden schickt das Formular per `POST` (form-urlencoded) an den Zapier-Webhook. Enthaltene Felder:

**Meta CAPI-Pflichtfelder**
| Feld | Wert |
|---|---|
| `event_name` | `Lead` |
| `event_id` | dieselbe ID wie im Pixel (**entscheidend für Dedup**) |
| `action_source` | `website` |
| `event_source_url` | URL der Danke-Seite |
| `client_user_agent` | `navigator.userAgent` |
| `fbp` | `_fbp`-Cookie |
| `fbc` | `_fbc`-Cookie bzw. aus `fbclid` abgeleitet |

**Nutzerdaten** (Meta/Zapier hashen automatisch): `email`, `telefon`, `vorname`, `nachname`, `plz`

**Attribution**: `fbclid`, `gclid`, alle `utm_*` (Last-Touch) plus `ft_utm_*` (First-Touch), `first_landing_url`, `source_device`

### Zapier-Setup
1. Trigger: **Webhooks by Zapier → Catch Hook**
2. Aktion: **Facebook Conversions**
   - Datensatz: **derselbe** wie das Browser-Pixel (`1397306551180465`)
   - Event Name → `event_name`
   - **Event ID → `event_id`** ← ohne das keine Deduplizierung
   - Action Source → `action_source`
   - Event Source URL, Client User Agent, fbp, fbc, E-Mail, Telefon entsprechend mappen
3. Access Token: Events Manager → Datenquelle → Einstellungen → Conversions API → Token generieren.
   **Nie im Frontend-Code hinterlegen** — nur serverseitig in Zapier.

### Kein `keepalive` beim `fetch`
```js
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
  body: new URLSearchParams(fields).toString(),
  // KEIN keepalive: true  ->  hartes 64-KB-Limit, Requests mit Bild-Upload
  // werden sonst lautlos verworfen
});
```

---

## 5. Häufige Fehlerquellen (aus der Praxis)

| Symptom | Ursache | Lösung |
|---|---|---|
| Custom Conversion löst nie aus, `Lead` kommt aber an | Single-Page-App: kein PageView auf der Danke-URL | `fbq('track','PageView')` manuell feuern (siehe 3.) — oder Custom Conversion auf das Standard-Event `Lead` statt auf eine URL-Regel legen |
| Meta Pixel Helper sagt „Kein Pixel gefunden" | Consent-Tool lädt `fbevents.js` verzögert nach; die Extension scannt nur beim ersten Laden | Kein echter Fehler — im **Events Manager → Testereignisse** gegenprüfen |
| Deutlich weniger Leads in Meta als im CRM | Pixel wird bis zur Marketing-Einwilligung blockiert, Adblocker | Server-Side CAPI ergänzen (siehe 4.) |
| Leads doppelt gezählt | Browser- und Server-Event mit **verschiedenen** `event_id` | Dieselbe `event_id` übergeben; in Events Manager auf „dedupliziert" prüfen |
| 0 Conversions im Werbeanzeigenmanager, aber Events im Events Manager | Custom Conversion oder Kampagnenziel liegt auf einem **anderen** Datensatz | Pixel, Custom Conversion und Kampagnenziel auf denselben Datensatz stellen |
| Direktaufruf der Danke-URL löst Conversion aus | Kein Schutz gegen Direktaufrufe | Bei Direktaufruf das Lead-Flag vorbelegen, damit kein Event feuert |
| Danke-URL wirft 404 | SPA ohne Server-Fallback | `vercel.json`: alle Pfade auf `/index.html` umschreiben |

---

## 6. Checkliste für eine neue Seite

- [ ] Cookiebot als erstes Script im `<head>`
- [ ] `tracking.js` vor dem Pixel einbinden
- [ ] Pixel-ID gesetzt, `PageView` beim Laden
- [ ] Vor dem Lead-Event: URL per `pushState` auf die Danke-Adresse setzen
- [ ] Auf der Danke-Ansicht: `PageView` **und** `Lead` mit `eventID` feuern
- [ ] Lead-Event genau einmal pro Absendung (Flag)
- [ ] Webhook sendet alle CAPI-Felder inkl. `event_id`, `fbp`, `fbc`
- [ ] Zapier: Facebook-Conversions-Schritt auf denselben Datensatz, `event_id` gemappt
- [ ] Custom Conversion + Kampagnenziel auf demselben Datensatz
- [ ] SPA-Fallback auf dem Server (keine 404 auf Danke-URL)
- [ ] Testlead live absenden → Events Manager: `PageView` + `Lead`, Quelle „Browser und Server", Status „dedupliziert"
