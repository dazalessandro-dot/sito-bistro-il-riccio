# Riccio Bistro / Il Riccio

Sito statico per un piccolo progetto universitario nato intorno a schiscette vegetariane, menu settimanali e ricette.

## Avvio

```bash
cd "/Users/alessandrodaz/Desktop/DEV/sito bistro il riccio"
npm install
npm start
```

Il sito gira su:

```txt
http://localhost:4173
```

## Comandi

```bash
npm run extract:menus
npm run capture:graza
npm run verify
```

- `extract:menus` legge `_chat 2.txt` e rigenera `src/data/menus.json`, `src/data/menus.md`, `src/data/menu-extraction-notes.md`.
- `capture:graza` usa Playwright per salvare screenshot e osservazioni Graza in `references/graza-screens/`.
- `verify` usa Playwright sul sito locale e salva screenshot in `references/riccio-screens/`.

## Struttura

```txt
index.html
src/
  app.js
  styles.css
  data/
    menus.json
    menus.md
    menu-extraction-notes.md
public/
  assets/
    branding/
references/
  graza-analysis.md
  graza-screens/
  riccio-screens/
scripts/
  capture-graza.js
  extract-whatsapp-menus.js
  serve.js
  verify-site.js
asset-inventory.md
design-direction.md
```

## Note Di Design

La landing e una copertina `100svh` non scrollabile. Il menu principale e un overlay grafico a card, non un hamburger generico. Le pagine interne sono scrollabili e organizzate come archivio/brand site.

La reference Graza e stata usata solo per capire energia visiva, ritmo, bottoni, menu e tono. Asset, testi, codice e layout proprietari non sono stati copiati.

## Privacy Chat

La chat WhatsApp non viene pubblicata grezza. Lo script rimuove numeri, ignora risposte, prenotazioni, logistica privata e messaggi non pertinenti. Nel sito appaiono solo menu e ingredienti in forma curatoriale.
