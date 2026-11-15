# DESIGN.md – Visit WiRiZ

De stijlafspraken van deze site, in gewone taal. Elke wijziging aan de site volgt deze afspraken.
De waarden staan als tokens in `site/css/style.css` (blok `:root`). Wijzig je hier iets, pas dan ook de css aan (en omgekeerd).
Laatst bijgewerkt: 15 november 2026 (avond).

**Basis:** Untitled UI. Merkkleur "Moss" (groen), neutraal "Gray".
**Sfeer:** rustig, natuur, het hoge Noorden. Veel witruimte, zachte groene accenten, foto's en kaarten als grote blikvangers. Grotendeels plat: enkel witte containers krijgen een zachte schaduw (zie Schaduwen).
**Teksten:** de teksten komen van de originele WordPress-pagina. Ze veranderen alleen met akkoord van Wim.

## Kleuren

| Token | Waarde | Gebruik |
|---|---|---|
| `--text` | #042221 | alle tekst (bewuste keuze: één tekstkleur, hiërarchie via grootte en gewicht), lijnen op de kaarten |
| `--bg-primary` / `--white` | #FFFFFF | achtergrond, kaarten |
| `--bg-secondary` | gray-50 #F9FAFB | getinte secties |
| `--tint` | #D2E6CC | lichtgroene vlakken: notes en callouts |
| `--brand-50` | #F5FBEE | icoonvakken (praktische zaken, route-opties, regio's), badges |
| `--brand-200` | #CEEAB0 | badges, genummerde bolletjes |
| `--brand-600` | #4F7A21 | rand van een open of gehoverde route-optie, accenticonen |
| `--brand-700` | #3F621A | focusring (`--focus-ring`) |
| `--brand-800` | #335015 | rand van de pins op de kaarten, gevuld huisje |
| `--brand-950` | #1A280B | donker winterblok, achter de welkomstfoto |
| `--border-secondary` | gray-200 | randen van kaarten en lijsten |
| `--warning-25 / -300 / -600` | | waarschuwingsblok ("Opgelet!") |

Kaartkleuren (in de svg's): water #77B8C9 / #BCDBE4, buurlanden (Noorwegen) #DAEBF0, Jämtland #BDD142 / #BCD793, Höga Kusten #E2E5CF.

## Typografie

- **Titels:** Fraunces (zelf gehost in `site/fonts`). Hoofd- en sectietitels 700, kaarttitels en route-opties 600.
- **Tekst:** Figtree 400/500/600 (zelf gehost).
- **Lettergroottes in em** (basis 16px, `body` op 100%, zodat de site meeschaalt met de lettergrootte van de bezoeker).
- **Interlinie zonder eenheid:** titels `--lh-title` 1.3, tekst `--lh-body` 1.7.
- **Kleine Fraunces-tekst** (kaartlabels): optische grootte vast op 19 (`font-variation-settings: "opsz" 19`). Onder 18 wisselt Fraunces automatisch naar andere vormen van &, h, m, n en s; zo blijven ze gelijk aan de titels.

| Niveau | Token | Grootte |
|---|---|---|
| Hoofdtitel (h1) | `--fs-hero` | 3em = 48px (mobiel 36px) |
| Sectietitel (h2) | `--display-md` | 2.25em = 36px (mobiel 30px) |
| Tussentitel (h3, "Zo geraak je bij ons…", "Drie wandelingen…") | `--fs-subtitle` | 1.5em = 24px |
| Kaarttitels (h3/h4) | `--fs-title` | 1.2em = 19.2px |
| Tekst | `--fs-body` | 1em = 16px |
| Kleine lettertjes (opmerking onder de route-opties) | | 0.875em = 14px |

Regel: de hoofdtitel is altijd de grootste titel op de pagina.
Tekstblokken en sectiekoppen zijn max. 46ch breed en links uitgelijnd. Uitzonderingen: een korte zin die op één lijn moet (de opmerking onder de route-opties) en de regiotekst in een open regio (69ch, naast de knop "Officiële website").

## Spacing

Untitled UI-schaal: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px.
Secties: 96px boven/onder (mobiel 64px). Ruimte links/rechts: `--gutter` (20–96px, schaalt mee).
Containers hebben rondom dezelfde binnenruimte, met de bovenkant als referentie: route-opties en regio-blokken 24px (mobiel 20px).
Lijnen tussen rijen in een kaart (reisstappen) lopen over de volle breedte; de rij zelf heeft 20px boven en onder.
Geen tussenwaarden zoals 18px of 22px. Een uitzondering mag alleen als ze afgeleid is en in de css uitgelegd staat (bv. 3px/11px rond een icoon dat precies 2 tekstregels beslaat).
Het menu is 64px hoog (`--nav-h`): ankers en blokken die blijven staan (sticky) houden daar rekening mee.

## Hoeken (radius)

| Token | Waarde | Gebruik |
|---|---|---|
| `--radius-media` | 24px | foto's, kaarten, route-opties, regio-kaarten, landkaarten |
| `--radius-container` | 12px | containers zonder beeld: groene blokken, tabbalk, alert |
| `--radius-control` | 8px | knoppen, tabs, menu-items, icoonvakken |
| `--radius-badge` | 6px | badges, labels, plaatsnamen op de kaarten, links in lopende tekst; geen pilvorm |

Ronde elementen (de pijl op fotokaarten) zijn 50%.

## Schaduwen

| Token | Waarde | Gebruik |
|---|---|---|
| `--shadow-lg` | Untitled UI shadow-lg | alle witte containers: kaarten, bezienswaardigheden, route-opties, regio-kaarten |
| `--shadow-brand` | 0 24px 96px -8px en 0 8px 40px -4px, #BAD497 op 20% | route-optie bij hover en als ze open staat |

Geen andere schaduwen. Blokken zonder kader (praktische zaken, spots) krijgen er geen.
Fotokaarten krijgen bij hover een donkerdere rand en schuiven 2px omhoog.

## Componenten

- **Welkomstfoto:** noorderlicht, 88% schermhoogte zodat het volgende blok al piept. Start als afgeronde container (24px hoeken; desktop 48px breder dan de inhoud, mobiel 16px rand) en groeit tijdens de eerste 40% schermhoogte scrollen naar de volle breedte; daarna schuift hij onder het menu weg. Tekst wit in een donkere container linksonder (zie **Tekst op een foto**). Bij "beperk beweging" blijft de afgeronde versie staan.
- **Krimpende foto (Onze omgeving):** het omgekeerde van de welkomstfoto. Start op volle schermbreedte (min. 80% schermhoogte) en krimpt terwijl de bovenkant van 60% van het scherm tot net onder het menu schuift, naar 48px breder dan de inhoud, 24px hoeken en 48px lucht erboven (mobiel 16px rand, 24px erboven). Titel en een korte zin op de foto, de rest van de tekst eronder. Bij "beperk beweging" meteen de gekrompen versie.
- **Tekst op een foto:** geen verloop over de foto, maar een container linksonder: `--text` op 65% met blur (16px), 24px hoeken, padding 32/40px (mobiel 24px), zo breed als de tekst (max. 640px). 48px lucht tot de rand van de foto. Wit haalt daarop > 5:1; zonder blur-ondersteuning 85% dekking.
- **Gradientwolk achter foto's:** naar steep.app: een grote, zachte gloed in noorderlichtkleuren (vier vlekken, 96px blur, 40%, ongeveer een derde groter dan de foto) met een fijne korrel erover (svg-ruis, 180px tegel, mengmodus overlay, 50%, zacht uitlopend masker). Willekeurige posities per paginaload, schuift licht mee bij scrollen, blijft binnen de sectie.
- **Menu:** vast bovenaan, wit 72% met blur (16px). Items in het Nederlands (Reis, Natuur, Omgeving, Slapen, Winkelen, Eten); bij hover of toetsenbordfocus verschijnt het Zweedse woord (Resa, Natur, Området, Sova, Handla, Äta) als taalweetje, `lang="sv"` en verborgen voor schermlezers; de knop is zo breed als het langste woord. Figtree 600, padding 8/36px, 4px ertussen. Actief item: wit 80% (bewuste keuze van Wim: op een witte sectie is die markering nauwelijks zichtbaar en haalt ze geen 3:1, WCAG 1.4.11; schermlezers krijgen wel `aria-current`). Het actieve item volgt de sectie die op 40% van de schermhoogte ligt. Een fijn randje alleen voor wie "meer contrast" of een hoog-contrastmodus gebruikt. Slapen/Winkelen/Eten openen meteen het juiste tabblad. Op mobiel schuift de rij horizontaal en schuift het actieve item in beeld.
- **Links in lopende tekst:** witte badge (6px), niet vet, padding 3/10px, met een pijltje rechts; geen onderlijn. Externe links krijgen de verborgen tekst "(opent in nieuw venster)".
- **Knoppen:** secundaire knop (wit, rand) met pijltje voor externe links, bv. "Officiële website ↗".
- **Eerst en vooral:** foto en tekst elk 50% (96px ertussen); de foto blijft staan tijdens het scrollen. Mobiel onder elkaar.
- **Inline icoon (praktische zaken):** icoonvak 64px in `--brand-50`, icoon 24px, beslaat precies 3 tekstregels, 16px rechts en onder.
- **Route-verkenner:** één kaart links (blijft staan tijdens scrollen), rechts de opties. Optie: icoonvak 48px (`--brand-50`) met één icoon dat bij de titel past, titel Fraunces 600, tijdbadge met klokje (14px, gray-500, 12px tussenruimte), pijltje. Er staat altijd maar één optie open; hij groeit vloeiend open. Hover en open: rand `--brand-600` en `--shadow-brand`, achtergrond blijft wit. Zonder keuze toont de kaart de weg Stockholm–Wim & Iris met het label "Hoe wil je reizen?".
- **Regio's:** zelfde component als de route-opties: drie kaarten onder elkaar (16px ertussen), de kop is de knop (icoonvak 48px `--brand-50`, titel Fraunces 600 1.2em, pijltje). De inhoud klapt open in de kaart; één tegelijk open; hover en open: rand `--brand-600` en `--shadow-brand`. Bij openen scrolt de pagina enkel naar de bovenkant van de kaart als die verstopt zit onder het menu of onderaan buiten beeld valt. In de open kaart (rondom 24px, mobiel 20px):
  - regiotekst (uitzondering: max. 69ch) met "Officiële website ↗" rechts (mobiel eronder), daaronder een fijne grijze lijn over de volle breedte;
  - kop "Onze tips" met lampje in een lichtgroen vak (40px), zonder inleiding;
  - elke tip een rij: foto 240px (3:2, hoeken 8px), 40px ertussen, titel Fraunces + tekst, rechts "Meer info ↗" (of "Coördinaten": Google Maps-link). Rijen gescheiden door fijne grijze lijnen over de volle breedte (geen lijn boven de eerste). Mobiel: foto over de volle breedte, knop onder de tekst.
  - Nog geen tips: één gestippeld fotovak met een uitnodigende tekst om later terug te kijken.
- **Tertiaire knop:** lichtgrijs vlak (`--gray-100`, hover `--gray-200`); Figtree 600, pijltje 16px.
- **Kaarten (landkaarten):**
  - Pins: Untitled UI marker-pin, wit met een rand in `--brand-800` (1.5px, schaalt niet mee). Jullie huis: grotere pin met een gevuld huisje.
  - Lijnen in `--text`: trein doorlopend, auto streepjes, vliegtuig puntjes. Streepjes en puntjes zijn zo verdeeld dat elk uiteinde precies in de punt van een pin valt.
  - Plaatsnamen: html-labels naast de pins (Fraunces 700, wit 60% met blur, 6px hoeken, padding 4/10px). Gebiedsnamen (Noorwegen, Hoge kusten) staan in de svg, zonder label.
  - Grote kaart en regiokaart zoomen in tijdens het scrollen; op de grote kaart rijdt een autootje mee.
- **Tabs (Sleep/Shop/Eat):** de actieve tab is wit met een dunne rand en een groene onderlijn van 2px. Te bedienen met de pijltjestoetsen.
- **Badges:** badge-color, 6px hoeken.
- **Notes en callouts:** `--tint` als achtergrond, `--radius-container`, padding 32/40px.
- **Focus:** effen ring van 2px in brand-700 met 2px afstand. Op donkere achtergrond wit.

## Beweging

- Duur: 150–400ms. De reveal bij het scrollen duurt 0,4s; een route-optie of regio klapt open in 0,35s.
- Eén verschijn-animatie voor alle blokken (`.reveal`: 16px omhoog + infaden). Elk blok dat binnenkomt bij het scrollen gebruikt ze; ze heeft voorrang op hover-overgangen van een blok.
- Gekoppeld aan scrollen (geen eindeloze animaties): inzoomen van de grote kaart en de regiokaart, het autootje, het label "Hoe wil je reizen?" dat licht over de weg schuift.
- Uitzondering (bewuste sfeer): de welkomstfoto stelt eenmalig scherp bij het laden (2–3s).
- Met "beperk beweging" aan staat alles stil: de kaarten tonen meteen hun eindbeeld, het label staat in het midden.

## Toegankelijkheid (WCAG 2.2 AA)

- Tekst minstens 4,5:1. Nu 16,7:1 op wit en 12,7:1 op --tint.
- Randen, iconen, focusring en de actieve tab minstens 3:1.
- Zweedse woorden en zinnen krijgen `lang="sv"`.
- Afbeeldingen met inhoud krijgen een alt-tekst, decoratieve een lege alt. De routekaart is decoratief: alle info staat ook in de tekst.
- Route-opties zijn echte knoppen met `aria-expanded`; menu-items krijgen `aria-current` voor de huidige sectie.
- Werkt op 320px breed zonder horizontaal scrollen.

## Niet doen

- Geen losse kleurcodes in de css: altijd een token. (Uitzondering: transparant wit voor labels en het menu.)
- Geen pilvormige badges.
- Geen andere schaduwen dan `--shadow-lg` en `--shadow-brand`.
- Geen fonts van Google laden (privacy). Alles zelf hosten.
- Geen tekst aanpassen zonder akkoord van Wim.
