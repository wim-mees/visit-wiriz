# DESIGN.md – Visit WiRiZ

De stijlafspraken van deze site, in gewone taal. Elke wijziging aan de site volgt deze afspraken.
De waarden staan als tokens in `site/css/style.css` (blok `:root`). Wijzig je hier iets, pas dan ook de css aan (en omgekeerd).

**Basis:** Untitled UI. Merkkleur "Moss" (groen), neutraal "Gray".
**Sfeer:** rustig, natuur, het hoge Noorden. Plat (geen schaduwen), veel witruimte, zachte groene accenten, foto's als grote blikvangers.
**Teksten:** de teksten komen van de originele WordPress-pagina en blijven ongewijzigd.

## Kleuren

| Token | Waarde | Gebruik |
|---|---|---|
| `--text` | #042221 | alle tekst (bewuste keuze: één tekstkleur, hiërarchie via grootte en gewicht) |
| `--bg-primary` / `--white` | #FFFFFF | achtergrond, kaarten |
| `--bg-secondary` | gray-50 #F9FAFB | getinte secties |
| `--tint` | #D2E6CC | lichtgroene vlakken: notes, callouts, icoontjes |
| `--brand-50` / `--brand-200` | #F5FBEE / #CEEAB0 | badges, genummerde bolletjes |
| `--brand-500` | #669F2A | onderlijn van links op wit |
| `--brand-600` | #4F7A21 | accenticonen, actieve tab (onderlijn) |
| `--brand-700` | #3F621A | focusring (`--focus-ring`), onderlijn van links op --tint |
| `--brand-950` | #1A280B | donker winterblok, achter de welkomstfoto |
| `--border-secondary` | gray-200 | randen van kaarten en lijsten |
| `--warning-25 / -300 / -600` | | waarschuwingsblok ("Opgelet!") |

## Typografie

- **Titels:** Fraunces 700 (zelf gehost in `site/fonts`).
- **Tekst:** Figtree 400/500/600 (zelf gehost).
- **Lettergroottes in em** (basis 16px). Interlinie en letterspatiëring in px.

| Niveau | Token | Grootte | Interlinie |
|---|---|---|---|
| Hoofdtitel (h1) | `--fs-hero` | 3em = 48px (mobiel 36px) | 56px (mobiel 44px) |
| Sectietitel (h2) | `--display-md` | 2.25em = 36px (mobiel 30px) | 44px (mobiel 38px) |
| Kleine titels (h3/h4) | `--fs-title` | 1.2em = 19.2px | 1.7 |
| Tekst | `--fs-body` | 1em = 16px | 1.7 |

Regel: de hoofdtitel is altijd de grootste titel op de pagina.
Tekstblokken en sectiekoppen zijn max. 46ch breed en links uitgelijnd (bewuste keuze, zoals de e-learning landingspagina).

## Spacing

Untitled UI-schaal: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px.
Secties: 96px boven/onder (mobiel 64px). Ruimte links/rechts: `--gutter` (20–96px, schaalt mee).
Geen tussenwaarden zoals 18px of 22px. Een uitzondering mag alleen als ze afgeleid is (bv. 72px = icoon 48px + 24px) en in de css uitgelegd staat.

## Hoeken (radius)

Vier hoek-tokens, op basis van wat het element is:

| Token | Waarde | Gebruik |
|---|---|---|
| `--radius-media` | 24px | foto's, kaarten en blokken met beeld |
| `--radius-container` | 12px | containers zonder beeld: groene blokken, welkomstkaart, tabbalk, alert |
| `--radius-control` | 8px | knoppen, tabs, icoonvlakken (tabbalk 12 = tab 8 + padding 4) |
| `--radius-badge` | 6px | badges en labels, geen pilvorm |

Ronde elementen (de pijl op fotokaarten) zijn 50%.

## Schaduwen

Geen. De stijl is plat. Diepte komt van randen (`--border-secondary`), achtergrondtinten en witruimte.
Kaarten krijgen bij hover een donkerdere rand en schuiven 2px omhoog.

## Componenten

- **Links:** tekstkleur, vet, onderlijn 2px in brand-500 (op brand-tint: brand-700, in het winterblok: lichtgroen). Bij hover wordt de lijn donker. Externe links krijgen een pijltje en de verborgen tekst "(opent in nieuw venster)".
- **Kaarten met link:** de hele kaart is klikbaar, zonder schaduw. Pijl rechtsboven in gray-500, bij hover groen. De focusring komt rond de hele kaart.
- **Tabs (Sleep/Shop/Eat):** de actieve tab is wit met een dunne rand en een groene onderlijn van 2px. Te bedienen met de pijltjestoetsen.
- **Badges:** badge-color, 6px hoeken.
- **Notes en callouts:** --tint als achtergrond, `--radius-container`, padding 32/40px.
- **Focus:** effen ring van 2px in brand-700 met 2px afstand. Op donkere achtergrond wit.

## Beweging

- Duur: 150–400ms. De reveal bij het scrollen duurt 0,4s.
- Uitzondering (bewuste sfeer): de welkomstfoto stelt eenmalig scherp bij het laden (2–3s).
- De wolk achter de foto's beweegt alleen mee met het scrollen. Geen eindeloze animaties.
- Met "beperk beweging" aan staat alles stil.

## Toegankelijkheid (WCAG 2.2 AA)

- Tekst minstens 4,5:1. Nu 16,7:1 op wit en 12,7:1 op --tint.
- Randen, iconen, focusring en de actieve tab minstens 3:1.
- Zweedse zinnen krijgen `lang="sv"`.
- Afbeeldingen met inhoud krijgen een alt-tekst, decoratieve een lege alt.
- Werkt op 320px breed zonder horizontaal scrollen.

## Niet doen

- Geen losse kleurcodes in de css: altijd een token.
- Geen pilvormige badges.
- Geen schaduwen.
- Geen fonts van Google laden (privacy). Alles zelf hosten.
- Geen tekst aanpassen zonder akkoord van Wim.
