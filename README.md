# Visit WiRiZ

Gids voor wie Wim en Iris komt bezoeken in Zweden. Live op **https://wiriz.wimmees.com** (Combell, subsite van wimmees.com).

## Wat staat waar

| Map / bestand | Wat |
|---|---|
| `site/` | de website zelf (HTML, CSS, JS, afbeeldingen, fonts). Alleen deze map gaat online. |
| `DESIGN.md` | de stijlafspraken (kleuren, typografie, spacing, componenten, WCAG) |
| `.github/workflows/publiceer.yml` | zet `site/` automatisch op de server |

## Publiceren

- Elke wijziging in `site/` op de tak `main` staat binnen een minuut online (`subsites/wiriz.wimmees.com/`).
- Er wordt nooit automatisch iets op de server verwijderd. Andere sites op de hosting worden niet aangeraakt.
- Een oud bestand weghalen (alleen na akkoord van Wim): **Actions > Publiceer Visit WiRiZ > Run workflow**, vul bij "verwijder" de paden in (relatief tegenover `site/`, bv. `img/oud.webp`) en zet "proefrit" uit. Alleen losse bestanden die niet meer in `site/` staan; met proefrit aan zie je eerst wat er zou verdwijnen.
- Handmatig starten kan onder **Actions > Publiceer Visit WiRiZ > Run workflow**. Standaard staat "proefrit" aan: dan zie je alleen wat er zou veranderen.
- Nodig: het geheim `SSH_PASSWORD` (Settings > Secrets and variables > Actions), hetzelfde als in `wim-mees/elearnings`.
- Bestaat de subsite nog niet in Combell, dan stopt de publicatie zonder iets te doen.

## Afspraken

- Geen externe diensten: fonts staan in `site/fonts/` (OFL-licenties erbij), geen Google Fonts, geen analytics, geen cookies.
- De site staat niet in Google (`noindex`): wie de link heeft, kan hem openen.
- De teksten komen van de oude WordPress-pagina en blijven ongewijzigd zonder akkoord van Wim.

© Design Studio Wim Mees
