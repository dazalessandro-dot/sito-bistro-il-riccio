# Branding Extraction

## File Analizzati

- `branding/Opera_senza_titolo.png`
- `branding/riccio.png`
- `branding/IMG_9878.PNG`
- `branding/loghi vari.pdf`

## PDF Individuato

Il PDF di riferimento e:

```txt
branding/loghi vari.pdf
```

E stato renderizzato a PNG ad alta risoluzione in:

```txt
tmp/branding-extract/loghi-vari-220.png
```

## Reference Principale

`branding/Opera_senza_titolo.png` e stata usata come ancora visiva. Gli elementi chiave ricavati sono:

- cornice riccia/loop;
- verde pieno e tratto spesso;
- interno bianco da etichetta;
- atmosfera da sticker o carta prodotto;
- tratto manuale imperfetto.

## Palette Estratta

Palette principale ricavata dai materiali:

- Verde riccio: `#609632`
- Verde scuro: `#2f4f20`
- Inchiostro marrone: `#432817`
- Crema carta: `#f7ead2`
- Giallo olio/pasta: `#e9cd55`
- Rosso peperoncino: `#b82228`
- Blu iced tea: `#3156a6`
- Rosa cipolla: `#b21865`

## Loghi/Segni Estratti Dal PDF

- `spicy-oil`
- `sundried-tomato-oil`
- `il-riccio-bistro`
- `iced-tea`
- `pickled-onions`

## Uso Nel Sito

- Header: usa `public/assets/branding/riccio-icon.svg`.
- Landing: usa la cornice generata da `Opera_senza_titolo.png` e il segno riccio pulito.
- Prodotti: usa i cinque loghi estratti dal PDF, organizzati in card prodotto.
- Sistema colore: aggiornato in `src/styles.css` tramite variabili CSS.
