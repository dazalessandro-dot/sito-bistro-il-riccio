const pages = ["manifesto", "about", "ricette", "archivio", "prodotti"];
const overlay = document.querySelector(".menu-overlay");
const bookingOverlay = document.querySelector(".booking-overlay");
const openButtons = document.querySelectorAll("[data-open-menu]");
const openBookingButtons = document.querySelectorAll("[data-open-booking]");
const closeButton = document.querySelector("[data-close-menu]");
const closeBookingButton = document.querySelector("[data-close-booking]");
const closeRecipeButton = document.querySelector("[data-close-recipe]");
const menuLinks = document.querySelectorAll("[data-menu-link]");
const bookingContent = document.querySelector("#booking-content");
const recipeOverlay = document.querySelector(".recipe-overlay");
const recipeContent = document.querySelector("#recipe-content");
const productReservations = new Map();
const scribbleFrame = document.querySelector("[data-scribble-frame]");
const scribbleFrames = Array.from(
  { length: 63 },
  (_, index) => `public/assets/video/scribble-${String(index + 10).padStart(3, "0")}.svg`
);

const joinLink = "https://chat.whatsapp.com/LRM3pbsy3g77or1O9PIyKy?mode=gi_t";

const weeklyMenu = {
  sourceId: "menu-07",
  sourceDate: "2025-11-27",
  title: "Orzo fresco",
  note: "Menu provvisorio basato su un annuncio reale estratto dalla chat.",
  dishes: {
    primo: "Orzo fresco con limone, menta, mandorle, peperoni, zucchine, carote, tofu, ceci e cipolla.",
    secondo: "Schiacciata di lenticchie rosse, zucca e rosmarino.",
    dolce: "Dattero ripieno di burro di arachidi ricoperto di fondente al sale.",
  },
};

const menuArchive = [
  {
    date: "2025-10-03",
    title: "Schiscia di riso basmati",
    primo: "Riso basmati con cavolo rosso caramellato e tofu.",
    secondo: "Schiacciata di lenticchie rosse.",
    dolce: "Snickers naturale di dattero.",
    tags: ["bowl", "tofu", "dattero"],
  },
  {
    date: "2025-10-08",
    title: "Cous cous",
    primo: "Cous cous con cavolfiore, ceci, melograno, erbe e pomodorini.",
    secondo: "Grissini speziati homemade.",
    dolce: "Datteri ripieni al fondente.",
    tags: ["ceci", "spezie", "dolce"],
  },
  {
    date: "2025-10-15",
    title: "Bowl di orzo",
    primo: "Orzo con zucchine, carote, tofu mediterraneo e cavolo nero crispy.",
    secondo: "Farinata speziata con patate e ceci.",
    dolce: "Datteri ripieni al sale.",
    tags: ["orzo", "farinata", "bowl"],
  },
  {
    date: "2025-10-29",
    title: "Stufato vegetale",
    primo: "Stufato vegetale con patate al rosmarino.",
    secondo: "Polenta tostata speziata.",
    dolce: "Datteri ripieni al fondente.",
    tags: ["stufato", "polenta", "orto"],
  },
  {
    date: "2025-11-05",
    title: "Burrito veg",
    primo: "Burrito veg con straccetti di soia.",
    secondo: "Patate speziate crispy.",
    dolce: "Datteri ripieni al fondente.",
    tags: ["veg", "patate", "soia"],
  },
  {
    date: "2025-11-10",
    title: "Settimana orientale",
    primo: "Involtino con tofu, carote, cavolo rosso e vermicelli.",
    secondo: "Gyoza veg crispy.",
    dolce: "Dattero ripieno al fondente.",
    tags: ["orientale", "tofu", "gyoza"],
  },
  {
    date: "2025-11-27",
    title: "Orzo fresco",
    primo: "Orzo fresco con limone, menta, mandorle, verdure, tofu e ceci.",
    secondo: "Schiacciata di lenticchie rosse e zucca.",
    dolce: "Dattero ripieno al fondente.",
    tags: ["orzo", "lenticchie", "5/7 euro"],
  },
  {
    date: "2025-12-08",
    title: "Burger speciale",
    primo: "Burger veg farcito con pomodoro, cipolle, sriracha mayo e patty veg.",
    secondo: "Patatine speziate.",
    dolce: "Dattero ripieno al fondente.",
    tags: ["burger", "patatine", "festa"],
  },
];

const products = [
  {
    name: "Spicy Oil",
    description:
      "Peperoncini dell'orto condiviso del Politecnico, senza pesticidi e raccolti seguendo il ciclo lunare, infusi in olio extravergine da un orto biodinamico in Andalusia.",
    category: "condimento",
    format: "300 ml",
    price: "10 €",
    logo: "public/assets/products/spicy-oil-clean.jpg",
  },
  {
    name: "Sundried Tomato Oil",
    description:
      "Olio spagnolo profumato con pomodorini essiccati da noi ed erbe aromatiche. Rosso, lento, da versare a gocce.",
    category: "condimento",
    format: "300 ml",
    price: "10 €",
    logo: "public/assets/products/sundried-tomato-oil-clean.jpg",
  },
  {
    name: "Iced Tea",
    description:
      "Una bevanda nata dal viaggio in Assam: tè, zenzero, freschezza e nessuno zucchero aggiunto.",
    category: "drink",
    format: "200 ml",
    price: "3 €",
    logo: "public/assets/products/iced-tea-clean.jpg",
  },
  {
    name: "Pickled Onions",
    description:
      "Il condimento signature delle schisce: cipolle con aceto, cannella e chiodi di garofano per acidità, colore e croccantezza.",
    category: "jar",
    format: "400 ml",
    price: "5 €",
    logo: "public/assets/products/pickled-onions-clean.jpg",
  },
  {
    name: "Dattero Ripieno",
    description:
      "Un dattero con burro di arachidi, fondente e sale grosso. Il finale dolce che basta da solo a rimettere il pomeriggio nel mood giusto.",
    category: "dolce",
    format: "5 pezzi",
    price: "4 €",
    logo: "public/assets/products/dattero-ripieno-clean.jpg",
  },
];

let recipes = [];

function openMenu() {
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closeMenu() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
}

function openBooking() {
  renderBooking();
  bookingOverlay.classList.add("is-open");
  bookingOverlay.setAttribute("aria-hidden", "false");
  bookingOverlay.querySelector(".booking-panel").scrollTop = 0;
  closeBookingButton.focus();
}

function closeBooking() {
  bookingOverlay.classList.remove("is-open");
  bookingOverlay.setAttribute("aria-hidden", "true");
}

function openRecipe(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;
  renderRecipeOverlay(recipe);
  recipeOverlay.classList.add("is-open");
  recipeOverlay.setAttribute("aria-hidden", "false");
  recipeOverlay.querySelector(".recipe-panel").scrollTop = 0;
  closeRecipeButton.focus();
}

function closeRecipe() {
  recipeOverlay.classList.remove("is-open");
  recipeOverlay.setAttribute("aria-hidden", "true");
}

function setLandingMode(isLanding) {
  document.body.classList.toggle("is-landing", isLanding);
  document.querySelector("#landing").hidden = !isLanding;
  for (const page of pages) {
    document.querySelector(`#${page}`).hidden = isLanding || page !== currentPage();
  }
}

function currentPage() {
  const hash = window.location.hash.replace("#", "");
  return pages.includes(hash) ? hash : "";
}

function route() {
  const page = currentPage();
  setLandingMode(!page);
  if (page) {
    document.title = `${labelFor(page)} - Riccio Bistro`;
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    document.title = "Riccio Bistro";
  }
  closeMenu();
}

function labelFor(page) {
  return {
    manifesto: "Manifesto",
    about: "About us",
    ricette: "Ricette",
    archivio: "Archivio menù",
    prodotti: "Prodotti",
  }[page];
}

function hero(title, eyebrow, text, card) {
  return `
    <div class="page-hero">
      <div>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h2 id="${title.toLowerCase().replace(/\s+/g, "-")}-title">${title}</h2>
        ${text ? `<p>${text}</p>` : ""}
      </div>
      ${card ? `<aside class="hero-card">${card}</aside>` : ""}
    </div>
  `;
}

function renderManifesto() {
  document.querySelector("#manifesto").innerHTML = `
    <div class="manifesto-redesign">
      <section class="manifesto-statement" aria-labelledby="manifesto-title">
        <img class="manifesto-stamp" src="public/assets/branding/riccio-stamp.png" alt="" />
        <p class="eyebrow">Manifesto</p>
        <h2 id="manifesto-title">Cibo funzionale per il cervello.</h2>
        <div class="manifesto-vision-wrap">
          <p class="manifesto-vision">Schisce leggere, vegane, complete. Pensate per tornare sui libri lucidi.</p>
        </div>
      </section>

      <section class="manifesto-split" aria-label="Problema e risposta">
        <article class="manifesto-problem">
          <span>Il problema</span>
          <h3>Intorno al Politecnico il pranzo spesso pesa.</h3>
          <p>Costoso, oleoso, poco adatto a chi deve tornare a studiare.</p>
        </article>
        <article class="manifesto-answer">
          <span>La risposta</span>
          <h3>Schisce vegane, complete, leggere.</h3>
          <p>Carboidrati, verdure, proteine. Gusto, energia, cura.</p>
        </article>
      </section>

      <section class="manifesto-formula" aria-label="Formula del pasto">
        <div class="formula-token">carboidrati</div>
        <div class="formula-plus" aria-hidden="true">+</div>
        <div class="formula-token">verdure</div>
        <div class="formula-plus" aria-hidden="true">+</div>
        <div class="formula-token">proteine</div>
      </section>

      <section class="manifesto-signals" aria-label="Segnali">
        <p>energia</p>
        <p>focus</p>
        <p>leggerezza</p>
      </section>
    </div>
  `;
}

function renderAbout() {
  document.querySelector("#about").innerHTML = `
    <div class="about-redesign about-lab" aria-labelledby="about-title">
      <section class="about-lab-intro">
        <p class="eyebrow">About us</p>
        <h2 id="about-title">Leila, Alessandro e una cucina che arriva in università.</h2>
      </section>

      <section class="about-lab-grid">
        <figure class="about-lab-photo">
          <img src="public/assets/images/about-leila-alessandro.jpg" alt="Leila e Alessandro, fondatori del Riccio Bistro" />
          <figcaption>Studenti designer del Politecnico. Cuciniamo a casa, consegniamo in università.</figcaption>
        </figure>

        <article class="about-lab-note about-lab-note-main">
          <h3>Non è solo cucinare.</h3>
          <p>Prepariamo schisce biodegradabili, le portiamo in un punto comune e parliamo con chi le mangia.</p>
        </article>

        <aside class="about-lab-number" aria-label="Community">
          <span>community</span>
          <strong>70</strong>
          <p>membri circa</p>
        </aside>

        <div class="about-lab-stack">
          <article>
            <span>casa</span>
            <p>Una cucina domestica, piccola, concreta.</p>
          </article>
          <article>
            <span>orto</span>
            <p>Ingredienti anche dall'orto condiviso del Politecnico.</p>
          </article>
          <article>
            <span>feedback</span>
            <p>Ascoltiamo gusto, leggerezza e concentrazione nel pomeriggio.</p>
          </article>
        </div>
      </section>
    </div>
  `;
}

function renderRecipes() {
  const cards = recipes
    .map(
      (recipe, index) => `
        <button class="recipe-icon-card" type="button" data-recipe-id="${recipe.id}" aria-label="Apri ricetta ${recipe.title}">
          <div class="recipe-icon-visual">
            <img src="${recipe.image}" alt="" />
          </div>
          <div class="recipe-icon-copy">
            <h3>${recipe.title}</h3>
            <p>${recipe.shortDescription}</p>
          </div>
        </button>
      `
    )
    .join("");

  document.querySelector("#ricette").innerHTML = `
    ${hero("Ricette", "", "Cinque icone da aprire, cucinare, rifare.", "")}
    <div class="recipe-icon-grid">${cards}</div>
  `;
}

function renderRecipeOverlay(recipe) {
  recipeContent.innerHTML = `
    <header class="recipe-detail-head">
      <div class="recipe-detail-icon">
        <img src="${recipe.image.replace(".webp", "-circle.webp")}" alt="" />
      </div>
      <div>
        <span class="date-chip">per ${recipe.servings} persone</span>
        <h2 id="recipe-title">${recipe.title}</h2>
        <p>${recipe.intro}</p>
      </div>
    </header>
    <div class="recipe-detail-grid">
      <section class="recipe-detail-section">
        <h3>Ingredienti</h3>
        <ul>
          ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </section>
      <section class="recipe-detail-section">
        <h3>Procedimento</h3>
        <ol>
          ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </section>
    </div>
    <section class="recipe-detail-section recipe-notes">
      <h3>Note</h3>
      <ul>
        ${recipe.notes.map((note) => `<li>${note}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderArchive() {
  const cards = menuArchive
    .map(
      (menu, index) => `
        <article class="menu-archive-card">
          <div class="meta-row">
            <span class="date-chip">${menu.date}</span>
            <span class="mood-chip">menu ${String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>${menu.title}</h3>
          <dl class="menu-dishes">
            <div>
              <dt>Primo</dt>
              <dd>${menu.primo}</dd>
            </div>
            <div>
              <dt>Secondo</dt>
              <dd>${menu.secondo}</dd>
            </div>
            <div>
              <dt>Dolce</dt>
              <dd>${menu.dolce}</dd>
            </div>
          </dl>
        </article>
      `
    )
    .join("");

  document.querySelector("#archivio").innerHTML = `
    ${hero("Archivio menù", "", "Vecchie schiscette, ripulite bene.", "")}
    <div class="menu-archive-grid">
      ${cards}
    </div>
  `;
}

function renderProducts() {
  const productCards = products
    .map(
      (product) => `
        <article class="archive-card product-card">
          <div class="product-mark">
            <img src="${product.logo}" alt="" />
          </div>
          <span class="date-chip">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-info-row" aria-label="Formato e prezzo">
            <span>${product.format}</span>
            <strong>${product.price}</strong>
          </div>
          <form class="product-reservation" data-product-name="${product.name}">
            <label>
              <span>Telefono</span>
              <input type="tel" name="phone" inputmode="tel" autocomplete="tel" placeholder="+39" required />
            </label>
            <label>
              <span>Quantità</span>
              <input type="number" name="quantity" min="1" value="1" required />
            </label>
            <button class="page-link product-book-button" type="submit">Prenota</button>
            <p class="product-feedback" role="status" aria-live="polite"></p>
          </form>
        </article>
      `
    )
    .join("");

  document.querySelector("#prodotti").innerHTML = `
    ${hero("Prodotti", "", "Menu, schiscette, piccoli classici.", "")}
    <div class="archive-grid">
      ${productCards}
    </div>
  `;
}

async function init() {
  await loadRecipes();
  renderManifesto();
  renderAbout();
  renderRecipes();
  renderArchive();
  renderProducts();
  route();
  startScribbleAnimation();
}

async function loadRecipes() {
  const response = await fetch("src/data/recipes.json");
  recipes = await response.json();
}

function renderBooking() {
  bookingContent.innerHTML = `
    <h2 id="booking-title">Menù della settimana</h2>
    <p class="booking-source">${weeklyMenu.note}</p>
    <div class="weekly-menu-card">
      <h3>${weeklyMenu.title}</h3>
      <dl class="menu-dishes">
        <div>
          <dt>Primo</dt>
          <dd>${weeklyMenu.dishes.primo}</dd>
        </div>
        <div>
          <dt>Secondo</dt>
          <dd>${weeklyMenu.dishes.secondo}</dd>
        </div>
        <div>
          <dt>Dolce</dt>
          <dd>${weeklyMenu.dishes.dolce}</dd>
        </div>
      </dl>
    </div>
    <form class="booking-form">
      <fieldset>
        <legend>Scegli formula</legend>
        <label class="booking-option">
          <input type="radio" name="formula" value="Primo + dolce — 5 €" checked />
          <span>
            <strong>Primo + dolce</strong>
            <em>5 €</em>
          </span>
        </label>
        <label class="booking-option">
          <input type="radio" name="formula" value="Primo + secondo + dolce — 7 €" />
          <span>
            <strong>Primo + secondo + dolce</strong>
            <em>7 €</em>
          </span>
        </label>
      </fieldset>
      <button class="primary-cta booking-submit" type="submit">Conferma</button>
      <p class="booking-feedback" role="status" aria-live="polite"></p>
    </form>
  `;
}

function startScribbleAnimation() {
  if (!scribbleFrame) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scribbleFrame.src = scribbleFrames[scribbleFrames.length - 1];
    return;
  }

  scribbleFrames.forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  let frame = 0;
  let lastTick = 0;
  const frameDuration = 1000 / 18;

  scribbleFrame.addEventListener("error", () => {
    scribbleFrame.classList.add("is-missing");
  });

  function tick(timestamp) {
    if (timestamp - lastTick > frameDuration) {
      frame = (frame + 1) % scribbleFrames.length;
      scribbleFrame.src = scribbleFrames[frame];
      lastTick = timestamp;
    }
    window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
}

openButtons.forEach((button) => button.addEventListener("click", openMenu));
openBookingButtons.forEach((button) => button.addEventListener("click", openBooking));
closeButton.addEventListener("click", closeMenu);
closeBookingButton.addEventListener("click", closeBooking);
closeRecipeButton.addEventListener("click", closeRecipe);
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector("#ricette").addEventListener("click", (event) => {
  const recipeButton = event.target.closest("[data-recipe-id]");
  if (recipeButton) openRecipe(recipeButton.dataset.recipeId);
});
document.querySelector("#prodotti").addEventListener("submit", (event) => {
  const form = event.target.closest(".product-reservation");
  if (!form) return;
  event.preventDefault();
  const productName = form.dataset.productName;
  const phone = form.elements.phone.value.trim();
  const quantity = form.elements.quantity.value;
  const feedback = form.querySelector(".product-feedback");
  if (!phone || !quantity || !feedback) return;
  productReservations.set(productName, { phone, quantity });
  feedback.textContent = `Prenotazione segnata: ${quantity} x ${productName}. Ti ricontattiamo al ${phone}.`;
});
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeMenu();
});
bookingOverlay.addEventListener("click", (event) => {
  if (event.target === bookingOverlay) closeBooking();
});
recipeOverlay.addEventListener("click", (event) => {
  if (event.target === recipeOverlay) closeRecipe();
});
bookingContent.addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = bookingContent.querySelector("input[name='formula']:checked")?.value;
  const feedback = bookingContent.querySelector(".booking-feedback");
  if (!selected || !feedback) return;
  feedback.innerHTML = `Prenotazione segnata: <strong>${selected}</strong>. Per confermarla davvero, passa dal gruppo <a href="${joinLink}" target="_blank" rel="noopener noreferrer">WhatsApp</a>.`;
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeBooking();
    closeRecipe();
  }
});
window.addEventListener("hashchange", route);

init();
