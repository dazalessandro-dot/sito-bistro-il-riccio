# Design Audit

## Landing

- La landing resta una schermata `100svh`, non scrollabile.
- La landing mostra ora `Il Riccio Bistro` senza accento, come richiesto per la schermata iniziale.
- Il disegno/pannello a sinistra e stato rimosso completamente.
- La scritta principale e stata spostata verso sinistra per dare piu peso al brand.
- L'animazione SVG verde e stata ingrandita circa 2x/3x e ora funziona come elemento dominante di sfondo.
- La scritta principale resta spezzata in righe controllate; la landing ora usa `Bistro`, quindi non c'e piu interferenza visiva dell'accento con `Riccio`.
- Il pulsante `Menù della settimana` apre una finestra di prenotazione front-end, non porta piu a Ricette.
- Il pulsante `Join Us` resta collegato al link WhatsApp letto da `join us.txt`.
- Il logo/riccio in alto a sinistra e stato sostituito da un'icona casa SVG handmade, cliccabile verso la homepage.
- L'icona casa e stata impostata in nero pieno (`#000`) per maggiore leggibilita.
- Il pulsante menu a tre linee e centrato nell'header e apre l'overlay esistente.
- Il pulsante `Shop` e allineato a destra e porta a `#prodotti`.

## Font Trovati Nel Sito Attuale

- `Georgia, "Times New Roman", serif` per titoli e heading.
- `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` per body e UI.
- Residui documentati di monospace per chip/label nelle versioni precedenti.

## Font Eliminati

- Eliminato il serif di sistema come display principale.
- Eliminato il monospace dalle label e dai chip.
- Evitato qualunque uso di `_chat 2.txt` come sorgente tipografica: resta solo materiale contenutistico locale.

## Font Finali

- Display/brand: `Tomarik Display`.
- File sorgente confermato: `Tomarik Display - /Users/alessandrodaz/Desktop/DEV/sito bistro il riccio/tomarik-display.ttf`.
- Copia web usata: `public/assets/fonts/tomarik-display.ttf`.
- Body/UI: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

La regola finale e massimo due famiglie: Tomarik Display per titoli, brand, CTA e label speciali; Inter/system sans per paragrafi e interfaccia leggibile.

## Problemi Visivi Risolti

- Landing meno testuale e meno homepage standard.
- Header organizzato in tre punti: logo a sinistra, menu a tre linee al centro, Shop a destra.
- Manifesto aggiornato: ora comunica la vision `cibo funzionale per il cervello`, con pasti vegani, completi e pensati per studiare dopo pranzo.
- Logo Riccio inserito nel Manifesto come segno integrato, non come decorazione isolata.
- About us riscritto attorno a Leila, Alessandro, la community di 70 membri, l'orto condiviso del Politecnico e le schisce biodegradabili.
- Navigazione overlay aggiornata: `Manifesto`, `About us`, `Ricette`, `Archivio menù`.
- `Guida` non compare piu nel menu overlay ed e stata sostituita da `Manifesto`.
- `Prodotti` non compare piu nel menu overlay ed e stata sostituita da `Archivio menù`.
- About us arricchito con foto reali selezionate, ritagliate e compresse.
- Prodotti aggiornata con cinque fotografie prodotto da `prodotti/`, ricomposte su sfondo uniforme e con formato/prezzo visibili.
- Aggiunto `Dattero Ripieno` come quinto prodotto.
- Testi prodotto riscritti in forma breve ma piu curata, mantenendo origine, quantita e prezzo.
- Prodotto `Il Riccio Bistrò` rimosso dalla lista prodotti.
- Overlay menu senza titolo visibile `Menu`; le quattro card sono piu grandi, centrate e con testi contenuti nei riquadri.
- Nuova finestra prenotazione con menu settimanale da dati reali, formule 5/7 euro e feedback di conferma.
- Nuova sezione `Archivio menù` con schede curate dei menu passati estratti dalla chat.
- Asset originali non modificati: il sito usa copie in `public/assets/`.

## Ricette

- La sezione Ricette e stata trasformata da tre card statiche a una griglia di 5 icone illustrate.
- Le ricette finali sono: `Tofu glassato`, `Schiacciata di lenticchie e pomodorini secchi`, `Stufato veg di soia`, `Schiacciata di ceci con cipolle sotto aceto`, `Datteri ripieni di burro di arachidi`.
- Ogni icona e un vero bottone accessibile e apre un overlay ricetta senza cambiare pagina.
- L'overlay contiene immagine, intro, ingredienti per 2 persone, procedimento e note tecniche.
- L'overlay si chiude da pulsante, clic fuori pannello o tasto `Esc`.
- Le immagini da `ricette/` sono state ottimizzate come WebP coerenti in `public/assets/recipes/`.
- I dati ricetta sono stati separati in `src/data/recipes.json`; una versione leggibile e in `recipes.md`.
- La griglia e responsive: cinque icone su desktop, due/una colonna su schermi piccoli.

## Redesign Manifesto E About Us

Problemi del layout precedente:

- Manifesto e About us usavano una logica troppo simile: hero, griglia/card, testo breve.
- Il logo nel Manifesto sembrava appoggiato sopra come immagine decorativa.
- I testi erano stati sintetizzati troppo e perdevano dettagli concreti del progetto.
- Le due pagine risultavano uniformi, poco memorabili e troppo vicine a un template.

Cosa e stato ridisegnato:

- Manifesto ora e una dichiarazione grafica: headline grande, blocco problema, blocco risposta, formula del pasto e parole-segnale.
- About us ora e una pagina fotografica/editoriale: foto grande di Leila e Alessandro, numero `70`, caption reale e flusso cucina/orto/universita/feedback.
- I testi riprendono i contenuti originali della chat: Politecnico, lucidita dopo pranzo, pasti vegani, orto condiviso, schisce biodegradabili e feedback nel pomeriggio di studio.

Differenziazione:

- Manifesto e piu tipografico, concettuale e bold.
- About us e piu umano, narrativo e fotografico.
- Entrambe le sezioni restano coerenti con bordi, ombre, Tomarik Display e palette Riccio.

Uso del logo:

- `public/assets/branding/solo-logo.png` e stato trasformato in `public/assets/branding/riccio-stamp.png`.
- Il logo viene usato come timbro/pattern leggero nel Manifesto, parzialmente fuori campo, non come immagine separata.

## Iterazione Layout Finale

Manifesto:

- Il logo Riccio e stato ingrandito e spostato a background, con opacita ridotta e posizione parzialmente fuori campo.
- La sezione e stata alleggerita: font, padding, gap e min-height dei blocchi sono stati ridotti.
- La frase finale in basso e stata rimossa.
- La formula e stata asciugata a `carboidrati + verdure + proteine`, senza usare la frase rimossa.
- Le card problema/risposta hanno testi piu brevi e controllati per restare dentro i quadrati.

About us:

- Il layout e stato ripensato come composizione editoriale: foto grande, nota centrale, numero `70` e tre appunti piccoli.
- I testi sono stati ridotti e spezzati in micro-blocchi concreti: casa, orto, feedback.
- La pagina comunica Leila e Alessandro, Politecnico, cucina domestica, orto condiviso, consegna in universita e community senza un unico blocco narrativo.

Archivio menù:

- Le tre parole chiave sotto ogni scheda sono state rimosse dal render.
- Restano solo data, numero menu, titolo e piatti principali.

Prodotti:

- La cartella `prodotti/` e stata riletta e le immagini attuali sono state ricomposte negli asset `*-clean.jpg`.
- Le immagini prodotto sono rese in un frame uniforme, con fondo coerente e fusione visiva sul colore della card.
- Ogni prodotto ha un form minimo di prenotazione con telefono, quantita e feedback locale.

Ricette:

- Le immagini sono dentro frame quadrati con `object-fit: cover`.
- L'hover giallo e applicato a tutte le card ricetta.
- Le label numerate delle ricette sono state rimosse.
- L'overlay ricetta e stato compattato con padding, font e gap piu piccoli.
- Le immagini dell'overlay usano versioni circolari dedicate e maschera `border-radius: 50%`.

## Iterazione Prodotti E About Reference

Prodotti:

- Corretto il problema di centratura delle immagini prodotto: gli asset web `*-clean.jpg` sono stati ricomposti su canvas uniforme e centrati sul soggetto.
- Corretta la gerarchia di scala richiesta: `Spicy Oil` e `Sundried Tomato Oil` hanno la stessa altezza visiva; `Pickled Onions` e leggermente piu piccolo; `Iced Tea` e piu piccolo del jar; `Dattero Ripieno` e il piu piccolo.
- Eliminato lo stacco rettangolare tra immagine e card: il colore dei bordi e stato campionato come `#fbfbf3` e usato come sfondo coerente del contenitore.
- Rimosso il form inline sotto ogni prodotto.
- Aggiunto overlay ordine dedicato con nome prodotto, immagine, formato, prezzo, telefono, stepper quantita, conferma locale e chiusura con `Esc`/click fuori.
- Il test interattivo conferma che non esistono piu `.product-reservation` inline e che il feedback contiene prodotto, quantita e telefono.

About us:

- Il blocco iniziale `About us / Leila, Alessandro e una cucina che arriva in università.` e stato rimosso dal render visibile.
- La nuova composizione riprende la reference `interfaccia/WhatsApp Image 2026-07-05 at 19.22.41.jpeg`: foto grande verticale a sinistra, testo leggero a destra, numero `70` dominante e tre blocchi piccoli sotto.
- La reference non e stata inserita come immagine statica: e stata reinterpretata in HTML/CSS.
- La pagina e ora piu asimmetrica, fotografica e meno basata su un template di titolo/paragrafo/card.

## Iterazione About Icons E Manifesto Narrativo

About us:

- La cartella `interfaccia/icone/` e stata riletta e le tre icone sono state rigenerate dai file aggiornati: mani per `Comunità`, pentola/cucchiaio per `Fatto in casa`, riciclo per `Sostenibile`.
- La scala delle icone e stata ridotta: ora funzionano come segni piccoli con titolo chiaro, non come grandi illustrazioni dominanti.
- E stata aggiunta `IMG_2628.JPG` nella parte bassa della sezione, lato opposto rispetto alla foto principale, per creare un ritmo editoriale alternato.

Manifesto:

- Il layout precedente a griglia/card/formula e stato rimosso dal render della pagina.
- Il Manifesto e stato ripensato come scena unica scroll-driven: animazione a sinistra, testo narrativo a destra su desktop.
- Il testo cambia seguendo la timeline GSAP: prima fase sul problema del pranzo intorno all'universita, seconda fase su `Cibo funzionale per il cervello`.
- Su mobile la scena si impila animazione/testo senza overflow orizzontale.
