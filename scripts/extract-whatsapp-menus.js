const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "_chat 2.txt");
const dataDir = path.join(root, "src", "data");

const HEADER = /^\u200e?\[(\d{2})\/(\d{2})\/(\d{2}),\s(\d{2}):(\d{2}):(\d{2})\]\s([^:]+):\s([\s\S]*)$/;
const INVISIBLE = /[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g;
const PHONE = /(?:\+?\d[\d\s()\-]{7,}\d)/g;

function cleanText(text) {
  return text
    .replace(INVISIBLE, "")
    .replace(/<Questo messaggio è stato modificato>/gi, "")
    .replace(/immagine omessa/gi, "")
    .replace(/audio omesso|GIF esclusa|sticker non incluso/gi, "")
    .replace(PHONE, "[numero rimosso]")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseMessages(raw) {
  const lines = raw.split(/\n/);
  const messages = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(HEADER);
    if (match) {
      if (current) messages.push(current);
      const [, dd, mm, yy, hh, min, ss, author, text] = match;
      current = {
        date: `20${yy}-${mm}-${dd}`,
        time: `${hh}:${min}:${ss}`,
        author: cleanText(author),
        text,
      };
    } else if (current) {
      current.text += `\n${line}`;
    }
  }
  if (current) messages.push(current);
  return messages.map((message) => ({ ...message, text: cleanText(message.text) }));
}

function scoreMessage(text) {
  const lower = text.toLowerCase();
  let score = 0;
  const needles = [
    ["menù", 4],
    ["menu", 4],
    ["principale", 3],
    ["primo", 3],
    ["side", 3],
    ["dolce", 3],
    ["schiscia", 2],
    ["bistr", 2],
    ["riccio", 2],
    ["ingredient", 2],
    ["prezzo", 1],
    ["5€", 1],
    ["7€", 1],
  ];
  for (const [needle, weight] of needles) {
    if (lower.includes(needle)) score += weight;
  }
  if ((text.match(/\n-\s|\n-|\n\u2060?-/g) || []).length >= 2) score += 4;
  if (lower.includes("sondaggio")) score -= 4;
  if (lower.includes("paypal")) score -= 6;
  if (lower.includes("ha aggiunto") || lower.includes("ha cambiato")) score -= 8;
  return score;
}

function normalizeLine(line) {
  return line
    .replace(/^[\-•\s]+/, "")
    .replace(/^\u2060/, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitIngredients(text) {
  const hasCon = /\s+con\s+/i.test(text);
  const afterCon = hasCon ? text.split(/\s+con\s+/i).slice(1).join(" con ") : text;
  const afterConNoParens = afterCon.replace(/\([^)]*\)/g, "");
  const inside = [...text.matchAll(/\(([^)]+)\)/g)].flatMap((match) => match[1].split(","));
  const candidate = hasCon
    ? [...afterConNoParens.split(/,|\+/i), ...inside]
    : inside.length
      ? inside
      : afterConNoParens.split(/,|\+/i);
  return candidate
    .map((item) =>
      item
        .replace(/^(scorza di|ripieno abbondante|farcito con)\s+/i, "")
        .replace(/\b(al forno|homemade|crispy|speziati?|fresco|fresche|tostate|dolci|sotto aceto|fatti da noi|megafarciti|dell.orto poli)\b/gi, "")
        .replace(/[!🍔🍟]+/g, "")
        .replace(/[()]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((item) => item.length > 2 && item.length < 36)
    .slice(0, 10);
}

function dishNameFrom(description, fallback) {
  const noParens = description.replace(/\([^)]*\)/g, "").trim();
  const beforeCon = noParens.split(/\s+con\s+/i)[0].trim();
  return (beforeCon || noParens || fallback).replace(/\s+/g, " ").trim();
}

function makeDish(description, type, fallback) {
  const clean = normalizeLine(description.replace(/^(principale|primo|side|dolce)\s*:?\s*/i, ""));
  return {
    name: dishNameFrom(clean, fallback),
    type,
    ingredients: splitIngredients(clean),
    notes: clean !== dishNameFrom(clean, fallback) ? clean : null,
  };
}

function extractDishes(text) {
  if (/burger|burguer/i.test(text)) {
    return [
      {
        name: "Burger veg farcito",
        type: "principale",
        ingredients: [
          "pomodoro fresco",
          "origano",
          "cipolle dolci sotto aceto",
          "salsa sriracha mayo",
          "cipolle crispy",
          "patty veg",
        ],
        notes:
          "Burger farcito con pomodoro fresco con origano, cipolle dolci sotto aceto, salsa sriracha mayo, cipolle crispy e patty veg fatto in casa.",
      },
      {
        name: "Patatine speziate",
        type: "contorno",
        ingredients: ["patatine", "spezie"],
        notes: null,
      },
      {
        name: "Dattero ripieno",
        type: "dolce",
        ingredients: ["dattero", "burro di arachidi", "cioccolato fondente", "sale"],
        notes: "Dattero ripieno di burro di arachidi ricoperto di fondente al sale.",
      },
    ];
  }

  const lines = text
    .split(/\n/)
    .map(normalizeLine)
    .filter(Boolean)
    .filter((line) => !/^(prezzo|5€|7€|include|ci vediamo|da ordinare|segnatevi)/i.test(line));

  const dishes = [];
  let pendingType = null;
  for (const line of lines) {
    if (/^principale:?$/i.test(line)) {
      pendingType = "principale";
      continue;
    }
    if (/^side:?$/i.test(line)) {
      pendingType = "contorno";
      continue;
    }
    if (/^dolce:?$/i.test(line)) {
      pendingType = "dolce";
      continue;
    }
    const typed = line.match(/^(principale|primo|side|dolce)\s*:\s*(.+)$/i);
    if (typed) {
      const rawType = typed[1].toLowerCase();
      const type = rawType === "side" ? "contorno" : rawType === "primo" ? "principale" : rawType;
      dishes.push(makeDish(typed[2], type, typed[1]));
      pendingType = null;
      continue;
    }
    if (/^menu burguer|^menu burger|burger|burguer/i.test(line)) {
      dishes.push(makeDish(line, "principale", "Burger veg"));
      pendingType = null;
      continue;
    }
    if (pendingType && !/men[uù]|schiscia|settimana/i.test(line)) {
      dishes.push(makeDish(line, pendingType, pendingType));
      pendingType = null;
      continue;
    }
    if (/^(schiscia|bowl|cous cous|stufato|burrito|involtino|orzo|datter|snickers)/i.test(line)) {
      const type = /datter|snickers/i.test(line) ? "dolce" : "principale";
      dishes.push(makeDish(line, type, type));
    } else if (/^(schiacciata|grissini|farinata|polenta|patate|gyoza)/i.test(line)) {
      dishes.push(makeDish(line, "contorno", "contorno"));
    }
  }

  const unique = [];
  const seen = new Set();
  for (const dish of dishes) {
    const key = `${dish.type}:${dish.name.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(dish);
    }
  }
  return unique.slice(0, 6);
}

function tagsFor(menu) {
  const lower = menu.rawText.toLowerCase();
  const tags = ["vegetariano"];
  if (/tofu|soia|veg/.test(lower)) tags.push("veg");
  if (/datter/.test(lower)) tags.push("dattero");
  if (/orientale|gyoza|noodles/.test(lower)) tags.push("orientale");
  if (/burger|burguer|patatine/.test(lower)) tags.push("burger");
  if (/orzo|cous cous|riso|bowl/.test(lower)) tags.push("bowl");
  return [...new Set(tags)];
}

function titleFor(text, dishes, date) {
  const firstLine = text.split(/\n/).find((line) => /men[uù]|schiscia|bistr/i.test(line)) || "";
  if (/orientale/i.test(text)) return "Settimana orientale";
  if (/burger|burguer/i.test(text)) return "Menu burger speciale";
  if (dishes[0]?.name) return dishes[0].name;
  return `Menu del ${date}`;
}

function descriptionFor(dishes) {
  if (!dishes.length) return "Menu recuperato dalla chat del Riccio Bistrò, da verificare nei dettagli.";
  const names = dishes.map((dish) => dish.name).slice(0, 3);
  return names.join(", ") + ".";
}

function extractMenus(messages) {
  const candidates = messages
    .map((message) => ({ ...message, score: scoreMessage(message.text) }))
    .filter((message) => message.score >= 8)
    .filter((message) => /men[uù]|principale|primo|side|dolce|schiscia/i.test(message.text))
    .filter((message) => !/sondaggio/i.test(message.text));

  const menus = [];
  const seenTexts = new Set();
  for (const candidate of candidates) {
    const rawText = cleanText(candidate.text);
    const duplicateKey = rawText.toLowerCase().replace(/\s+/g, " ").replace(/ci vediamo[\s\S]+$/i, "");
    if (seenTexts.has(duplicateKey)) continue;
    seenTexts.add(duplicateKey);

    const dishes = extractDishes(rawText);
    if (dishes.length === 0) continue;

    const date = candidate.date;
    menus.push({
      id: `menu-${String(menus.length + 1).padStart(2, "0")}`,
      date,
      title: titleFor(rawText, dishes, date),
      rawText,
      cleanDescription: descriptionFor(dishes),
      dishes,
      tags: tagsFor({ rawText, dishes }),
      mood: /orientale/i.test(rawText)
        ? "orientale"
        : /burger|burguer/i.test(rawText)
          ? "festa"
          : /manifestazione/i.test(rawText)
            ? "primo esperimento"
            : null,
      confidence: dishes.length >= 2 ? "high" : "medium",
    });
  }
  return menus;
}

function writeMarkdown(menus) {
  const body = menus
    .map((menu) => {
      const dishes = menu.dishes
        .map((dish) => {
          const ingredients = dish.ingredients.length ? ` Ingredienti: ${dish.ingredients.join(", ")}.` : "";
          return `- **${dish.name}** (${dish.type}).${ingredients}`;
        })
        .join("\n");
      return `## ${menu.title}\n\n- Data: ${menu.date}\n- Confidence: ${menu.confidence}\n- Tags: ${menu.tags.join(", ")}\n\n${menu.cleanDescription}\n\n${dishes}\n`;
    })
    .join("\n");
  return `# Menu Estratti - Riccio Bistro\n\nFonte: esportazione WhatsApp locale, filtrata per pubblicare solo annunci/menu. Nomi, numeri, reazioni e conversazioni non pertinenti sono esclusi.\n\n${body}`;
}

function writeNotes(messages, menus) {
  const candidates = messages
    .map((message) => ({ ...message, score: scoreMessage(message.text) }))
    .filter((message) => message.score >= 6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  return `# Note Estrazione Menu\n\n## Metodo\n\nLo script separa i messaggi WhatsApp tramite header data/ora/autore, rimuove caratteri invisibili, media omessi, numeri di telefono e metadati. Poi assegna un punteggio a messaggi che contengono parole come menu, menù, principale, primo, side, dolce, schiscia, Riccio e Bistro. I sondaggi, i link di pagamento e i messaggi di sistema vengono penalizzati o esclusi.\n\n## Revisione Manuale\n\nDopo l'estrazione automatica sono stati controllati i candidati principali. Sono stati tenuti solo messaggi che descrivono effettivamente un menu o una schiscetta completa. Prenotazioni individuali, ringraziamenti, logistica minuta e conversazioni personali sono stati esclusi.\n\n## Limiti\n\n- Alcuni piatti non hanno un titolo esplicito: il nome deriva dalla prima parte della descrizione.\n- Le date sono quelle del messaggio pubblicato in chat, non sempre quelle del pranzo effettivo.\n- Gli ingredienti sono estratti in modo conservativo dalle parentesi o dalle liste testuali; se non sono chiari restano incompleti.\n- Il menu del 27/11 e quello rimandato il 30/11 sono duplicati sostanziali; viene mantenuta una sola occorrenza quando il testo coincide.\n\n## Risultato\n\nMenu pubblicati: ${menus.length}.\n\n## Candidati più rilevanti\n\n${candidates
    .map((candidate) => {
      const preview = candidate.text.replace(/\n/g, " ").slice(0, 170);
      return `- ${candidate.date} ${candidate.time} - score ${candidate.score}: ${preview}`;
    })
    .join("\n")}\n`;
}

fs.mkdirSync(dataDir, { recursive: true });
const raw = fs.readFileSync(inputPath, "utf8");
const messages = parseMessages(raw);
const menus = extractMenus(messages);

fs.writeFileSync(path.join(dataDir, "menus.json"), JSON.stringify(menus, null, 2));
fs.writeFileSync(path.join(dataDir, "menus.md"), writeMarkdown(menus));
fs.writeFileSync(path.join(dataDir, "menu-extraction-notes.md"), writeNotes(messages, menus));

console.log(`Parsed ${messages.length} messages.`);
console.log(`Wrote ${menus.length} menus.`);
