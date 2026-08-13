// Interliving Rehmann — First-Party Ad-Tracking
// Hält Kampagnen-/Klick-Parameter dauerhaft fest (localStorage), auch wenn die URL
// beim Wechsel in den Funnel wechselt. Verwaltet Meta _fbp/_fbc und liefert alles
// gebündelt für den Zapier-Webhook (→ Meta Conversions API).
(function () {
  var STORE = "reh_trk_v1";       // last-touch (überschreibt sich bei neuem Klick)
  var FIRST = "reh_trk_first_v1"; // first-touch (nur einmal gesetzt)
  var AD_KEYS = [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
    "fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid", "li_fat_id", "twclid",
    "kampagne", "adset", "adset_id", "ad", "ad_id", "campaign_id", "placement", "site_source_name"
  ];

  function nowMs() { return Date.now(); }
  function nowSec() { return Math.floor(Date.now() / 1000); }
  function readCookie(n) {
    try { var m = document.cookie.match("(^|;)\\s*" + n + "\\s*=\\s*([^;]+)"); return m ? decodeURIComponent(m.pop()) : ""; }
    catch (e) { return ""; }
  }
  function setCookie(n, v, days) {
    try {
      var d = new Date(); d.setTime(d.getTime() + days * 86400000);
      document.cookie = n + "=" + encodeURIComponent(v) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
    } catch (e) {}
  }
  function parseQuery() {
    var o = {};
    try { new URLSearchParams(location.search).forEach(function (v, k) { o[k.toLowerCase()] = v; }); } catch (e) {}
    return o;
  }
  function load(key) { try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { return {}; } }
  function save(key, obj) { try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {} }

  var q = parseQuery();

  // ---- Last-Touch: aktuelle Ad-Parameter über gespeicherte legen ----
  var last = load(STORE);
  AD_KEYS.forEach(function (k) { if (q[k]) last[k] = q[k]; });
  last.last_url = location.href;
  if (document.referrer && document.referrer.indexOf(location.host) === -1) last.last_referrer = document.referrer;
  last.updated = nowSec();
  save(STORE, last);

  // ---- First-Touch: nur einmal beim allerersten Besuch ----
  var first = load(FIRST);
  if (!first.first_seen) {
    first = {};
    AD_KEYS.forEach(function (k) { if (q[k]) first[k] = q[k]; });
    first.landing_url = location.href;
    first.referrer = document.referrer || "";
    first.first_seen = nowSec();
    save(FIRST, first);
  }

  // ---- Meta _fbp / _fbc ----
  // _fbp: Browser-ID (setzt normalerweise das Pixel; wir legen einen Fallback an).
  var fbp = readCookie("_fbp");
  if (!fbp) { fbp = "fb.1." + nowMs() + "." + Math.floor(Math.random() * 1e10); setCookie("_fbp", fbp, 90); }
  // _fbc: aus fbclid ableiten (Meta-Format: fb.1.<timestamp>.<fbclid>)
  var fbc = readCookie("_fbc");
  var fbclid = q.fbclid || last.fbclid || first.fbclid || "";
  if (!fbc && fbclid) { fbc = "fb.1." + nowMs() + "." + fbclid; setCookie("_fbc", fbc, 90); }

  // stabile Event-ID pro Seiten-Session (für Pixel↔CAPI-Deduplizierung)
  var evid = "reh." + nowMs() + "." + Math.random().toString(36).slice(2, 10);

  function getAll() {
    var f = load(FIRST), l = load(STORE);
    var out = {};
    // Last-Touch als Hauptwerte
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
     "fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid", "li_fat_id",
     "kampagne", "adset", "adset_id", "ad", "ad_id", "campaign_id", "placement", "site_source_name"
    ].forEach(function (k) { out[k] = l[k] || ""; });
    // First-Touch zusätzlich (Erstkontakt-Attribution)
    out.ft_utm_source = f.utm_source || "";
    out.ft_utm_medium = f.utm_medium || "";
    out.ft_utm_campaign = f.utm_campaign || "";
    out.ft_utm_content = f.utm_content || "";
    out.first_landing_url = f.landing_url || "";
    out.first_referrer = f.referrer || "";
    out.first_seen = f.first_seen || "";
    out.last_referrer = l.last_referrer || "";
    // Meta-Identifikatoren
    out.fbp = readCookie("_fbp") || fbp || "";
    out.fbclid = l.fbclid || f.fbclid || fbclid || "";
    // _fbc: Cookie bevorzugen, sonst aus fbclid ableiten (Meta-Format)
    out.fbc = readCookie("_fbc") || fbc || (out.fbclid ? ("fb.1." + nowMs() + "." + out.fbclid) : "");
    out.gclid = l.gclid || "";
    // Für Conversions API
    out.client_user_agent = navigator.userAgent || "";
    out.event_source_url = location.origin + location.pathname;
    return out;
  }

  window.REH_TRACK = {
    getAll: getAll,
    get: function (k) { return getAll()[k] || ""; },
    leadEventId: function () { return evid; },        // stabil – für Lead-Dedup
    newEventId: function () { evid = "reh." + nowMs() + "." + Math.random().toString(36).slice(2, 10); return evid; }
  };
})();
