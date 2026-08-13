// Möbel Rehmann — Räumungsverkauf Landingpage — Konfiguration
// Artikel hier pflegen. status: "verfuegbar" | "reserviert" | "verkauft"
// Bilder später eintragen (img: "raeumungsverkauf/assets/<datei>").
window.RVLP = {
  aktion: {
    titel: "Großer Räumungsverkauf",
    subtitel: "Wir bauen um – alles muss raus",
    hinweis: "Aufgrund unseres großen Umbaus geben wir Ausstellungsstücke aus allen Abteilungen mit hohen Preisvorteilen ab. Reservieren Sie Ihren Favoriten 24 Stunden unverbindlich – oder rufen Sie uns direkt an.",
    endeDatum: "2026-09-30",
  },
  siegelUrl: "https://onecdn.io/media/8fcf1df0-50ac-4adc-8369-c8210d1bc53d/xlg",
  zapierWebhook: "https://hooks.zapier.com/hooks/catch/18583379/42v7xyd/",
  kontakt: {
    telefon: "02051 9640-0",
    telefonHref: "+49205196400",
    whatsapp: "49205196400",
    ort: "Flandersbacher Weg 2 · 42551 Velbert",
    oeffnung: "Mo–Sa 10–19 Uhr",
  },
  // Icon je Abteilung (Lucide)
  abteilungIcons: {
    "Polstermöbel": "sofa",
    "Esszimmer": "utensils",
    "Schlafzimmer": "bed-double",
    "Wohnwände": "tv",
    "Küchen": "cooking-pot",
    "Gartenmöbel": "umbrella",
    "Kleinmöbel": "lamp-desk",
    "Boxspringbetten": "bed",
    "Kinderzimmer": "baby",
  },
  // Abteilungen (Filter)
  abteilungen: [
    "Alle", "Polstermöbel", "Esszimmer", "Schlafzimmer", "Wohnwände",
    "Küchen", "Gartenmöbel", "Kleinmöbel", "Boxspringbetten", "Kinderzimmer",
  ],
  // Artikel — Quelle: Kleinanzeigen-Profil Interliving Rehmann (Ausstellungsverkauf)
  // Bilder folgen (img leer = "Foto folgt"). alt = Hersteller-Listenpreis, neu = SALE-Preis.
  artikel: [
    { id: "rv-001", name: "Nachtkonsole von Panthel", abteilung: "Schlafzimmer", marke: "Panthel", alt: 478, neu: 150, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/nachtkonsole-von-panthel/2929812043-81-1750" },
    { id: "rv-002", name: "Modul Master Kommode", abteilung: "Kleinmöbel", marke: "Master", alt: 1997, neu: 1198, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/modul-master-kommode/2556822091-87-1750" },
    { id: "rv-003", name: "Schlafzimmer Kernbuche Massivholz Wöstmann", abteilung: "Schlafzimmer", marke: "Wöstmann", alt: 0, neu: 5599, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/schlafzimmer-kernbuche-massivholz-woestmann/2868235531-81-1750" },
    { id: "rv-004", name: "TV-Board Maja Serie Trend", abteilung: "Wohnwände", marke: "Maja", alt: 862, neu: 399, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/tv-board-der-firma-maja-serie-trend/2582807591-88-1750" },
    { id: "rv-005", name: "Jugendzimmer Z1 von Rudolf", abteilung: "Kinderzimmer", marke: "Rudolf", alt: 12783, neu: 4999, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/jugendzimmer-z1-vom-rudolf/3348133388-20-1750" },
    { id: "rv-006", name: "Jugendzimmer Sten der Marke Paidi", abteilung: "Kinderzimmer", marke: "Paidi", alt: 7378, neu: 2599, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/jugendzimmer-sten-der-marke-paidi/3347688907-20-1750" },
    { id: "rv-007", name: "Jugendzimmer Loop der Firma Rudolf", abteilung: "Kinderzimmer", marke: "Rudolf", alt: 11208, neu: 4599, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/jugendzimmer-loop-der-firma-rudolf/3345392504-20-1750" },
    { id: "rv-008", name: "Jugendzimmer Max I der Firma Rudolf", abteilung: "Kinderzimmer", marke: "Rudolf", alt: 10041, neu: 4499, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/jugendzimmer-max-i-der-firma-rudolf/3345381283-20-1750" },
    { id: "rv-009", name: "Garderobe Voss Modell Loveno", abteilung: "Kleinmöbel", marke: "Voss", alt: 3772, neu: 1299, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/garderobe-voss-modell-loveno/3026526734-87-1750" },
    { id: "rv-010", name: "Lowboard Xooon Modell Halmstadt", abteilung: "Wohnwände", marke: "Xooon", alt: 999, neu: 699, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/lowboard-xooon-modell-halmstadt/3026452281-88-1750" },
    { id: "rv-011", name: "Lowboard Xooon Modell Modali", abteilung: "Wohnwände", marke: "Xooon", alt: 1249, neu: 699, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/lowboard-xooon-modell-modali/3026420795-88-1750" },
    { id: "rv-012", name: "Jugendzimmer Next 1 der Firma Rudolf", abteilung: "Kinderzimmer", marke: "Rudolf", alt: 8562, neu: 3899, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/jugendzimmer-next-1-der-firma-rudolf/3345404000-20-1750" },
    { id: "rv-013", name: "Garderobe Skalik Modell Loft", abteilung: "Kleinmöbel", marke: "Skalik", alt: 4477, neu: 2799, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/garderobe-skalik-modell-loft/3026545096-87-1750" },
    { id: "rv-014", name: "Sideboard mit Regalaufsatz Xooon Halmstadt", abteilung: "Wohnwände", marke: "Xooon", alt: 2096, neu: 1285, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/sideboard-mit-regalaufsatz-xooon-modell-halmstadt/3026458008-88-1750" },
    { id: "rv-015", name: "Highboard Xooon Modell Halmstadt", abteilung: "Wohnwände", marke: "Xooon", alt: 1599, neu: 1099, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/highboard-xooon-modellhalmstadt/3026454757-88-1750" },
    { id: "rv-016", name: "Tischgruppe Xooon Modell Halmstad und Zeno", abteilung: "Esszimmer", marke: "Xooon", alt: 2413, neu: 1699, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/tischgruppe-xooon-modell-halmstad-und-zeno/3026445930-86-1750" },
    { id: "rv-017", name: "Badezimmermöbel mit Waschtisch & Armatur von Nobilia", abteilung: "Kleinmöbel", marke: "nobilia", alt: 0, neu: 1798, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/badezimmermoebel-mit-waschtisch-armatur-von-nobilia/3317318213-91-1750" },
    { id: "rv-018", name: "Schwarz-Goldene Grifflos Küche von Nobilia", abteilung: "Küchen", marke: "nobilia", alt: 0, neu: 4398, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/schwarz-goldene-grifflos-kueche-von-nobilia/3314833677-86-1750" },
    { id: "rv-019", name: "Nobilia Küche mit SMEG Standherd", abteilung: "Küchen", marke: "nobilia", alt: 0, neu: 6998, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/nobilia-kueche-mit-einem-smeg-standherd/3314906294-86-1750" },
    { id: "rv-020", name: "Winkelküche mit Waschautomat", abteilung: "Küchen", marke: "nobilia", alt: 0, neu: 3998, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/winkelkueche-mit-waschautomat/3314912414-86-1750" },
    { id: "rv-021", name: "Wohnlandschaft Candy Modell Camp", abteilung: "Polstermöbel", marke: "Candy", alt: 2949, neu: 1599, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/wohnlandschaft-der-firma-candy-modell-camp-listenpreis-2949-/2833732520-88-1750" },
    { id: "rv-022", name: "Taupegraue Küche von Nobilia mit Weinkühler", abteilung: "Küchen", marke: "nobilia", alt: 0, neu: 11998, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/taupegraue-kueche-von-nobilia-mit-weinkuehler/3314856953-86-1750" },
    { id: "rv-023", name: "Schlafzimmer von Möbelwerke Mastershausen", abteilung: "Schlafzimmer", marke: "Mastershausen", alt: 6966, neu: 2999, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/schlafzimmer-von-moebelwerke-mastershausen/2915166619-81-1750" },
    { id: "rv-024", name: "Landhausküche von Express", abteilung: "Küchen", marke: "Express", alt: 0, neu: 6498, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/landhauskueche-von-express/3421613987-86-1750" },
    { id: "rv-025", name: "Graue Winkelküche von Express", abteilung: "Küchen", marke: "Express", alt: 0, neu: 3580, status: "verfuegbar", img: "", link: "https://www.kleinanzeigen.de/s-anzeige/graue-winkelkueche-von-express/3421610243-86-1750" },
  ],
};
