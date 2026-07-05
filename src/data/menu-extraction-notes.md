# Note Estrazione Menu

## Metodo

Lo script separa i messaggi WhatsApp tramite header data/ora/autore, rimuove caratteri invisibili, media omessi, numeri di telefono e metadati. Poi assegna un punteggio a messaggi che contengono parole come menu, menù, principale, primo, side, dolce, schiscia, Riccio e Bistro. I sondaggi, i link di pagamento e i messaggi di sistema vengono penalizzati o esclusi.

## Revisione Manuale

Dopo l'estrazione automatica sono stati controllati i candidati principali. Sono stati tenuti solo messaggi che descrivono effettivamente un menu o una schiscetta completa. Prenotazioni individuali, ringraziamenti, logistica minuta e conversazioni personali sono stati esclusi.

## Limiti

- Alcuni piatti non hanno un titolo esplicito: il nome deriva dalla prima parte della descrizione.
- Le date sono quelle del messaggio pubblicato in chat, non sempre quelle del pranzo effettivo.
- Gli ingredienti sono estratti in modo conservativo dalle parentesi o dalle liste testuali; se non sono chiari restano incompleti.
- Il menu del 27/11 e quello rimandato il 30/11 sono duplicati sostanziali; viene mantenuta una sola occorrenza quando il testo coincide.

## Risultato

Menu pubblicati: 8.

## Uso Nel Sito

- Menù della settimana: usa `menu-07` (`orzo fresco`, messaggio del 2025-11-27) come menu provvisorio per la finestra di prenotazione. E stato scelto perche e un menu reale ad alta confidenza e contiene gia la distinzione fra formula `primo + dolce 5€` e formula completa `primo + side + dolce 7€`.
- Archivio menù: usa gli 8 menu pubblicati in `src/data/menus.json`, trasformati in schede curate con data, titolo, primo, secondo, dolce e tag.
- Privacy: nel sito non vengono mostrati nomi, numeri, conversazioni, risposte, prenotazioni individuali o chat grezza.

## Incertezze

- Il menù della settimana non e collegato a un backend o a una fonte live: e un menu provvisorio basato su un annuncio reale estratto.
- Alcune etichette `secondo` derivano dal campo `side` o `contorno` della chat, per adattarsi alla formula di prenotazione richiesta.
- Le date sono quelle degli annunci in chat, non necessariamente la data effettiva del pranzo.

## Candidati più rilevanti

- 2025-11-10 18:57:01 - score 20: *Questa settimana schiscia il mercoledì!!!*  Menù 🦔🌱:  Settimana con menù orientale !!🎋  - primo: involtino con ripieno abbondante (tofu, carote, cavolo rosso, vermice
- 2025-10-08 17:52:53 - score 19: *MENU*🦔🌱 - Principale: Cous cous con cavolfiore e ceci speziati al forno, melograno, erbe fresche, cetriolo e pomodorini  Side: - grissini speziati homemade  Dolce:  - 
- 2025-10-29 18:41:26 - score 19: Menù di domani🦔🌱☀️  - principale: stufato vegetale con patate al rosmarino fresco (dell’orto poli!!!)  - ⁠side: polenta tostata speziata  - ⁠dolce: datteri ripieni di b
- 2025-11-27 02:17:51 - score 19: Menù 🦔🌱:  - primo: orzo fresco  (scorza di limone, menta, mandorle tostate, peperoni, zucchine, carote, Tofu, ceci, cipolla) - ⁠side: schiacciata di lenticchie rosse, z
- 2025-11-30 15:23:22 - score 19: Menù 🦔🌱:  - primo: orzo fresco  (scorza di limone, menta, mandorle tostate, peperoni, zucchine, carote, Tofu, ceci, cipolla) - ⁠side: schiacciata di lenticchie rosse, z
- 2025-12-08 19:11:03 - score 16: Bistró questa settimana, il *giovedi*! 🦔🌱  Questo giovedì menù speciale *super burger fatti da noi megafarciti con tante patatine!!! 🍔🍟*  - 5€  menu *burguer* farcito
- 2025-10-15 15:52:17 - score 15: *MENU*🦔🌱 GIOVEDÌ 16 OTTOBRE  Principale: Bowl di orzo con zucchine, carote, Tofu mediterraneo e cavolo nero crispy  Side: farinata speziata con patate del Trentino e ce
- 2025-11-27 01:34:55 - score 15: Ciao a tutti! Abbiamo cambiato formato delle schisce e ora sono molto più grandi e con un primo ci si sfama bene, quindi faremo due menu, uno da 5€ con primo e dolce e pe
- 2025-11-05 22:16:40 - score 14: Menú domani🦔🍃  - primo: burrito veg con straccetti di soia e tant'altro  - side: Patate speziate crispy  -dolce: datteri ripieni di burro d'arachidi ricoperto in fonden
- 2025-10-03 23:38:29 - score 13: Menu di oggi era 🦔🌱: - Schiscia di riso basmati con cavolo rosso caramellato e tofu con salsa di soia dolce - ⁠schiacciata di lenticchie rosse con pomodorini secchi e r
- 2025-12-04 15:51:17 - score 11: A chi prende bistro oggi il side e GRATIS💃, quindi menu 5€ invece di 7€ per tutti
- 2025-11-20 14:54:45 - score 8: Ciao! Niente bistro il riccio questa settimana, torniamo settimana prossima con porzioni più grandi e un menu stramegabuono 🌱🦔
- 2025-12-08 19:11:27 - score 8: SONDAGGIO: Quale menu vuoi OPZIONE: Primo + dolce 5€ (6 voti) OPZIONE: Completo 7€ (8 voti)
- 2025-09-25 16:14:56 - score 6: Dobbiamo pensare al menu prima schiscia
- 2025-12-03 23:36:42 - score 6: Domani c’è bistro! Stesso menu di lunedì. Ci si può segnare ancora!!!
