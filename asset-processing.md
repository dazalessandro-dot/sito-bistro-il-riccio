# Asset Processing

## Font

- Copiato `tomarik-display.ttf` in `public/assets/fonts/tomarik-display.ttf`.
- Definito in CSS con `@font-face` come `Tomarik Display`.
- `_chat 2.txt` non e stato usato come font.

## Immagini Usate Da `immagini persone`

Sorgenti selezionate:

- `355c6f4f-d7c1-46f1-847d-39ed20b41e80.jpg`
- `ace1097e-cbbc-4e83-bafe-ecb405312a2d.JPG`
- `f10236aa-c4e3-4f4f-a143-9d54af95f4f8.JPG`

Output ottimizzati:

- `public/assets/images/about-ritratto.jpg` - crop verticale del ritratto con schiscetta.
- `public/assets/images/about-gruppo.jpg` - crop panoramico del pranzo nel prato.
- `public/assets/images/about-schiscetta.jpg` - dettaglio cibo, compresso per web.
- `public/assets/images/about-leila-alessandro.jpg` - nuovo crop verticale dalla foto `a69d2b8c-646a-45a5-a1bc-61cbe87393d8.JPG`, usato nella pagina About us.

Le immagini sono state ritagliate, leggermente normalizzate in colore/contrasto e salvate come JPEG progressivi. Gli HEIC e il MOV sono stati scartati per questa iterazione perche non necessari rispetto alle tre immagini piu forti gia leggibili.

## Animazione Usata Da `video`

- Sorgente: sequenza `Green_abstract_scribble_drawn_202606281912_010.svg` -> `_072.svg`.
- Output: `public/assets/video/scribble-010.svg` -> `scribble-072.svg`.
- Frame usati: 63.
- Trattamento: metadati rimossi, colore nero convertito in verde Riccio `#5f9234`, copie salvate nel progetto.
- Fallback: se un frame non carica, l'immagine animata viene nascosta e resta disponibile il segno statico `public/assets/branding/riccio-mark.png`.

## Reference Usate Da `interfaccia`

- `interfaccia/Opera_senza_titolo.png`
- `interfaccia/Opera_senza_titolo 1.png`

Usate come reference per composizione, proporzioni e linguaggio: pannello disegnato, piccolo punto giallo, logo centrale, groviglio verde laterale. Non sono state incollate come sfondo statico.

## Branding E Prodotti

- PDF esaminato: `branding/loghi vari.pdf`.
- Logo header aggiornato:
  - sorgente: `branding/solo logo.PNG`;
  - output: `public/assets/branding/solo-logo.png`.
- Logo per redesign Manifesto:
  - sorgente: `public/assets/branding/solo-logo.png`;
  - output: `public/assets/branding/riccio-stamp.png`;
  - trattamento: crop su trasparenza, padding su canvas coerente, PNG trasparente ottimizzato;
  - uso: timbro/pattern leggero nel Manifesto, parzialmente fuori campo.
- Immagini prodotto lette da `prodotti/`, rinominate e ottimizzate:
  - `ChatGPT Image 29 giu 2026, 13_43_41.png` -> `public/assets/products/iced-tea-bottle.jpg`;
  - `Gemini_Generated_Image_3j9q933j9q933j9q.png` -> `public/assets/products/pickled-onions-jar.jpg`;
  - `Gemini_Generated_Image_557fd0557fd0557f.png` -> `public/assets/products/sundried-tomato-oil-bottle.jpg`;
  - `Gemini_Generated_Image_quskgiquskgiqusk.png` -> `public/assets/products/spicy-oil-bottle.jpg`.
- Le immagini prodotto sono state copiate, centrate su canvas coerente, compresse come JPEG progressivi e usate al posto dei vecchi loghi prodotto.
- Il prodotto `Il Riccio Bistrò` e stato rimosso perche e brand, non prodotto.

Aggiornamento prodotti:

- `ChatGPT Image 29 giu 2026, 13_43_41.png` -> `public/assets/products/iced-tea-clean.jpg`.
- `Gemini_Generated_Image_aj5ymnaj5ymnaj5y.png` -> `public/assets/products/dattero-ripieno-clean.jpg`.
- `Gemini_Generated_Image_vbhoehvbhoehvbho.png` -> `public/assets/products/pickled-onions-clean.jpg`.
- `Gemini_Generated_Image_y06zrvy06zrvy06z.png` -> `public/assets/products/sundried-tomato-oil-clean.jpg`.
- `Gemini_Generated_Image_bajog9bajog9bajo.png` -> `public/assets/products/spicy-oil-clean.jpg`.
- Tutti i prodotti sono stati ricomposti su canvas web `900x1125` con sfondo uniforme `#fbfaf3`.
- Gli sfondi chiari originali sono stati rimossi o neutralizzati tramite maschera sui bordi; le ombre originali sono state ridotte e sostituite da una piccola ombra coerente.
- Le immagini finali sono JPEG progressivi ottimizzati per web, tutte sotto circa 80 KB.
- Il dattero ripieno usa la scatola prodotto generata dalla sorgente `Gemini_Generated_Image_aj5ymnaj5ymnaj5y.png`.

## Join Us

- File letto: `join us.txt`.
- Link estratto: `https://chat.whatsapp.com/LRM3pbsy3g77or1O9PIyKy?mode=gi_t`.
- Il link e esterno e viene aperto con `target="_blank"` e `rel="noopener noreferrer"`.

## Asset Copiati Nel Progetto

- `public/assets/fonts/tomarik-display.ttf`
- `public/assets/branding/solo-logo.png`
- `public/assets/images/about-ritratto.jpg`
- `public/assets/images/about-gruppo.jpg`
- `public/assets/images/about-schiscetta.jpg`
- `public/assets/images/about-leila-alessandro.jpg`
- `public/assets/products/iced-tea-bottle.jpg`
- `public/assets/products/pickled-onions-jar.jpg`
- `public/assets/products/sundried-tomato-oil-bottle.jpg`
- `public/assets/products/spicy-oil-bottle.jpg`
- `public/assets/products/iced-tea-clean.jpg`
- `public/assets/products/pickled-onions-clean.jpg`
- `public/assets/products/sundried-tomato-oil-clean.jpg`
- `public/assets/products/spicy-oil-clean.jpg`
- `public/assets/products/dattero-ripieno-clean.jpg`
- `public/assets/video/scribble-010.svg` -> `public/assets/video/scribble-072.svg`

## Asset Scartati

- HEIC in `immagini persone`: non usati perche le JPEG selezionate coprono meglio ritratto, gruppo e dettaglio.
- `IMG_0775.MOV`: non usato nella sezione About per mantenere la pagina minima.
- Immagini `interfaccia`: usate come reference, non come asset finale.
- Vecchi loghi prodotto estratti dal PDF: mantenuti nel progetto ma non piu usati nella pagina Prodotti.
- Scansioni o varianti branding non necessarie: lasciate fuori dal layout per evitare rumore.

## Ricette

Immagini lette dalla cartella `ricette/`:

- `ChatGPT_Image_29_giu_2026,_21_32_12.png` -> `public/assets/recipes/tofu-glassato.webp`.
- `ChatGPT_Image_29_giu_2026,_21_39_55 3.png` -> `public/assets/recipes/schiacciata-lenticchie-pomodorini.webp`.
- `ChatGPT_Image_29_giu_2026,_21_39_55 2.png` -> `public/assets/recipes/stufato-veg-soia.webp`.
- `ChatGPT_Image_29_giu_2026,_21_39_55 1.png` -> `public/assets/recipes/schiacciata-ceci-cipolle.webp`.
- `ChatGPT_Image_29_giu_2026,_21_39_55.png` -> `public/assets/recipes/datteri-ripieni.webp`.

Trattamento:

- Le illustrazioni sono state ritagliate in formato quadrato `720x720`.
- Colore e contrasto sono stati normalizzati leggermente per farle leggere come un unico sistema di icone.
- Gli output sono stati salvati in WebP ottimizzato dentro `public/assets/recipes/`.
- Sono state create anche versioni circolari per l'overlay:
  - `public/assets/recipes/tofu-glassato-circle.webp`;
  - `public/assets/recipes/schiacciata-lenticchie-pomodorini-circle.webp`;
  - `public/assets/recipes/stufato-veg-soia-circle.webp`;
  - `public/assets/recipes/schiacciata-ceci-cipolle-circle.webp`;
  - `public/assets/recipes/datteri-ripieni-circle.webp`.
- Le immagini originali in `ricette/` non sono state modificate.

## Redesign About Us

- Immagine principale confermata: `immagini persone/a69d2b8c-646a-45a5-a1bc-61cbe87393d8.JPG`.
- Output usato: `public/assets/images/about-leila-alessandro.jpg`.
- La foto resta il centro narrativo della sezione About us: grande, con caption reale e affiancata dal dato `70`.
- Le altre immagini in `immagini persone/` sono state lasciate fuori dal redesign per non creare una gallery casuale e per mantenere la pagina piu editoriale.
