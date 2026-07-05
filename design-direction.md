# Design Direction

## Nuova Logica Landing

La landing diventa una soglia grafica, non una homepage. Deve stare in `100svh`, non scrollare e mostrare pochissimo testo: icona home, nome, micro-payoff e due azioni chiare.

La composizione aggiornata:

- icona casa piccola in alto a sinistra, come ritorno alla homepage;
- icona casa in nero, per essere piu netta e funzionale;
- menu a tre linee in alto al centro;
- Shop in alto a destra;
- titolo spostato verso sinistra, con `Il Riccio Bistro` senza accento nella landing;
- groviglio verde animato molto grande come sfondo dominante;
- pulsanti `Menù della settimana` e `Join Us` sotto al payoff.

`Menù della settimana` e l'azione principale della homepage: apre una finestra di prenotazione, mostra il menu settimanale e permette di scegliere una formula 5/7 euro. `Join Us` resta un accesso al gruppo.

## Ruolo Dell'Animazione

La sequenza SVG da `video/` non e uno splash screen e non e un popup. Funziona come parte del layout: entra nella stessa scena del logo e si muove dentro la landing. Se non carica, resta un fallback statico del segno Riccio.

## Logo E Header

L'header usa una piccola icona casa disegnata in SVG. Nessun wordmark largo accanto. Il nome completo vive nella landing e nei titoli, dove puo avere scala e funzione identitaria.

## Menu Overlay

L'overlay non mostra piu la scritta visibile `Menu`. Rimane accessibile tramite titolo nascosto, mentre la scena visiva e composta solo da quattro finestre grandi: Manifesto, About us, Ricette, Archivio menù. Le card hanno piu spazio interno e dimensioni maggiori per evitare testi fuori bordo.

## Archivio Menu

`Archivio menù` diventa la prova storica del progetto: non trascrive WhatsApp, ma raccoglie schede curate dei pasti passati con data, primo, secondo e dolce. I tag decorativi sono stati rimossi per lasciare solo informazione utile.

## Tipografia

Tomarik Display e il font display finale:

`Tomarik Display - /Users/alessandrodaz/Desktop/DEV/sito bistro il riccio/tomarik-display.ttf`

Uso previsto:

- titoli principali;
- heading;
- brand;
- CTA;
- label speciali e chip.

Il secondo font e `Inter` con fallback system sans, usato per body text e UI lunga. Non ci sono altri font attivi nel sistema.

## Pagine Interne

Le pagine interne restano leggere e leggibili:

- Manifesto: spiega la vision `cibo funzionale per il cervello`. Il testo chiarisce che le schiscette sono vegane, bilanciate e pensate per restare lucidi dopo pranzo.
- About us: racconta Leila e Alessandro, il lavoro domestico, l'orto condiviso del Politecnico, la community di 70 membri e la consegna in schisce biodegradabili.
- Ricette: appunti brevi.
- Archivio menù: schede dei menu passati estratti dalla chat.
- Prodotti: cinque prodotti organizzati come una piccola famiglia visiva, con immagini su sfondo uniforme, descrizioni brevi, formato e prezzo sempre visibili.

La struttura principale di navigazione e: Manifesto, About us, Ricette, Archivio menù. Prodotti resta nel codice e nello Shop, ma non e piu priorita del menu overlay.

## Direzione Visiva

Il sito deve sembrare un piccolo oggetto grafico del mondo Riccio Bistro: manuale, minimale, riconoscibile, con piu forza data da composizione, segni e immagini che da spiegazioni lunghe.

## Prodotti

La pagina Prodotti non deve sembrare un archivio di immagini diverse. Ogni card usa la stessa logica: prodotto centrato, sfondo chiaro uniforme, descrizione essenziale, formato e prezzo separati in modo leggibile. Il quinto prodotto, `Dattero Ripieno`, completa la linea come dolce signature della community.

## Community

La pagina About us sposta il fuoco dal racconto generico al progetto reale: due designer del Politecnico, una cucina domestica, un orto condiviso e una rete di persone che mangia, commenta e torna a studiare. Il tono resta caldo ma sintetico.

## Redesign Manifesto E About Us

La nuova direzione evita l'effetto template/AI separando nettamente il ruolo delle due pagine.

Manifesto:

- deve sembrare una dichiarazione grafica;
- usa una headline molto grande: `La schiscia che non ti spegne`;
- mette in tensione problema e risposta: pranzo pesante intorno al Politecnico contro schisce vegane, complete e leggere;
- usa una formula visiva piu asciutta: `carboidrati + verdure + proteine`;
- integra il logo come timbro leggero, non come immagine decorativa.

About us:

- deve sembrare piu editoriale e umano;
- parte dalla foto di Leila e Alessandro;
- usa il numero `70` come dato visuale, non come semplice frase;
- racconta il percorso concreto: cucina, orto, universita, feedback;
- chiude con un ritmo quasi operativo: cuciniamo, portiamo, serviamo, ascoltiamo.

## Riferimenti Graza

Sono stati analizzati screenshot da `https://www.graza.co/` salvati in `references/graza-screens/` e sintetizzati in `references/graza-redesign-notes.md`.

Pattern reinterpretati:

- grandi statement con pochissimo testo attorno;
- uso di segni/sticker per creare memoria visiva;
- alternanza tra sezioni molto vuote e sezioni piene;
- composizioni sbilanciate con visual forte e testo specifico.

Pattern evitati:

- copia di palette, copy, e-commerce e illustrazioni Graza;
- popup promozionali;
- layout prodotto commerciale non adatto al racconto Riccio.

## Ultima Direzione Di Sistema

- Manifesto usa il logo come background grande, leggero e integrato: non e piu un'immagine appoggiata, ma un segno che struttura la pagina.
- About us diventa una composizione umana a blocchi diversi: foto, dato numerico, nota, micro-appunti.
- Archivio menù rinuncia ai tag sotto le schede per sembrare piu curato e meno decorativo.
- Ricette usa frame quadrati coerenti, hover giallo uniforme e overlay compatto con immagine circolare.
- Prodotti aggiunge una prenotazione minima per ogni card: telefono, quantita e conferma locale, senza introdurre backend.
