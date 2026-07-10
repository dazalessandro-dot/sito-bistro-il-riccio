import { gsap } from "../node_modules/gsap/index.js";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const pages = ["manifesto", "about", "ricette", "archivio", "prodotti"];
const overlay = document.querySelector(".menu-overlay");
const bookingOverlay = document.querySelector(".booking-overlay");
const openButtons = document.querySelectorAll("[data-open-menu]");
const openBookingButtons = document.querySelectorAll("[data-open-booking]");
const closeButton = document.querySelector("[data-close-menu]");
const closeBookingButton = document.querySelector("[data-close-booking]");
const closeRecipeButton = document.querySelector("[data-close-recipe]");
const closeProductButton = document.querySelector("[data-close-product]");
const menuLinks = document.querySelectorAll("[data-menu-link]");
const bookingContent = document.querySelector("#booking-content");
const recipeOverlay = document.querySelector(".recipe-overlay");
const recipeContent = document.querySelector("#recipe-content");
const productOverlay = document.querySelector(".product-overlay");
const productOrderContent = document.querySelector("#product-order-content");
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
    id: "spicy-oil",
    name: "Spicy Oil",
    description:
      "Peperoncini dell'orto condiviso del Politecnico, senza pesticidi e raccolti seguendo il ciclo lunare, infusi in olio extravergine da un orto biodinamico in Andalusia.",
    category: "condimento",
    format: "300 ml",
    price: "10 €",
    logo: "public/assets/products/spicy-oil-clean.png",
    type: "oil",
    bg: "#f7f7f9",
  },
  {
    id: "sundried-tomato-oil",
    name: "Sundried Tomato Oil",
    description:
      "Olio spagnolo profumato con pomodorini essiccati da noi ed erbe aromatiche. Rosso, lento, da versare a gocce.",
    category: "condimento",
    format: "300 ml",
    price: "10 €",
    logo: "public/assets/products/sundried-tomato-oil-clean.png",
    type: "oil",
    bg: "#f2f0f3",
  },
  {
    id: "iced-tea",
    name: "Iced Tea",
    description:
      "Una bevanda nata dal viaggio in Assam: tè, zenzero, freschezza e nessuno zucchero aggiunto.",
    category: "drink",
    format: "200 ml",
    price: "3 €",
    logo: "public/assets/products/iced-tea-clean.png",
    type: "tea",
    bg: "#f8f6f7",
  },
  {
    id: "pickled-onions",
    name: "Pickled Onions",
    description:
      "Il condimento signature delle schisce: cipolle con aceto, cannella e chiodi di garofano per acidità, colore e croccantezza.",
    category: "jar",
    format: "400 ml",
    price: "5 €",
    logo: "public/assets/products/pickled-onions-clean.png",
    type: "jar",
    bg: "#f9f9fb",
  },
  {
    id: "dattero-ripieno",
    name: "Dattero Ripieno",
    description:
      "Un dattero con burro di arachidi, fondente e sale grosso. Il finale dolce che basta da solo a rimettere il pomeriggio nel mood giusto.",
    category: "dolce",
    format: "5 pezzi",
    price: "4 €",
    logo: "public/assets/products/dattero-ripieno-clean.png",
    type: "dates",
    bg: "#f7f7f7",
  },
];

let recipes = [];
let activeProduct = null;
let productQuantity = 1;
let manifestoAnimationContext = null;

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
function syncOverlayLock() {
  const isOpen =
    overlay.classList.contains("is-open") ||
    bookingOverlay.classList.contains("is-open") ||
    recipeOverlay.classList.contains("is-open") ||
    productOverlay.classList.contains("is-open");
  document.body.classList.toggle("has-modal-open", isOpen);
}

function openMenu() {
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  closeButton.focus();
  syncOverlayLock();
}

function closeMenu() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  syncOverlayLock();
}

function openBooking() {
  renderBooking();
  bookingOverlay.classList.add("is-open");
  bookingOverlay.setAttribute("aria-hidden", "false");
  bookingOverlay.querySelector(".booking-panel").scrollTop = 0;
  closeBookingButton.focus();
  syncOverlayLock();
}

function closeBooking() {
  bookingOverlay.classList.remove("is-open");
  bookingOverlay.setAttribute("aria-hidden", "true");
  syncOverlayLock();
}

function openRecipe(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;
  renderRecipeOverlay(recipe);
  recipeOverlay.classList.add("is-open");
  recipeOverlay.setAttribute("aria-hidden", "false");
  recipeOverlay.querySelector(".recipe-panel").scrollTop = 0;
  closeRecipeButton.focus();
  syncOverlayLock();
}

function closeRecipe() {
  recipeOverlay.classList.remove("is-open");
  recipeOverlay.setAttribute("aria-hidden", "true");
  syncOverlayLock();
}

function openProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  activeProduct = product;
  productQuantity = 1;
  renderProductOverlay(product);
  productOverlay.classList.add("is-open");
  productOverlay.setAttribute("aria-hidden", "false");
  productOverlay.querySelector(".product-panel").scrollTop = 0;
  closeProductButton.focus();
  syncOverlayLock();
}

function closeProduct() {
  productOverlay.classList.remove("is-open");
  productOverlay.setAttribute("aria-hidden", "true");
  activeProduct = null;
  syncOverlayLock();
}

function updateProductQuantity(nextValue) {
  productQuantity = Math.max(1, Math.min(99, Number(nextValue) || 1));
  const value = productOrderContent.querySelector("[data-product-quantity-value]");
  const input = productOrderContent.querySelector("input[name='quantity']");
  if (value) value.textContent = productQuantity;
  if (input) input.value = productQuantity;
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
  destroyManifestoAnimation();
  setLandingMode(!page);
  if (page) {
    document.title = `${labelFor(page)} - Riccio Bistro`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (page === "manifesto") {
      window.requestAnimationFrame(setupManifestoAnimation);
    }
  } else {
    document.title = "Riccio Bistro";
  }
  closeMenu();
}

function destroyManifestoAnimation() {
  if (!manifestoAnimationContext) return;
  manifestoAnimationContext.revert();
  manifestoAnimationContext = null;
}

function setupManifestoAnimation() {
  const section = document.querySelector("[data-manifesto-animation]");
  if (!section || section.closest("[hidden]")) return;

  destroyManifestoAnimation();

  manifestoAnimationContext = gsap.context(() => {
    const stage = section.querySelector(".manifesto-animation-stage");
    const pinTarget = section.querySelector(".manifesto-narrative-stage") || stage;
    const logo = section.querySelector(".manifesto-logo-full");
    const brain = section.querySelector(".manifesto-brain");
    const head = section.querySelector(".manifesto-head");
    const meal = section.querySelector(".manifesto-meal");
    const firstText = section.querySelector(".manifesto-phase--origin");
    const secondText = section.querySelector(".manifesto-phase--mind");
    const thirdText = section.querySelector(".manifesto-phase--meal");
    if (!stage || !logo || !brain || !head) return;

    const setFinalReducedMotionState = () => {
      gsap.set([logo, head, brain], { opacity: 0 });
      gsap.set(meal, { opacity: 1, xPercent: -50, yPercent: -50, y: 0, scale: 1 });
      gsap.set(firstText, { opacity: 0, y: -10, pointerEvents: "none" });
      gsap.set(secondText, { opacity: 0, y: -10, pointerEvents: "none" });
      gsap.set(thirdText, { opacity: 1, y: 0, pointerEvents: "auto" });
    };

    gsap.set(brain, { opacity: 1 });
    gsap.set(logo, { opacity: 1 });
    gsap.set(head, { opacity: 0 });
    gsap.set(meal, {
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      y: 28,
      scale: 0.96,
      transformOrigin: "50% 50%",
    });
    gsap.set(firstText, { opacity: 1, y: 0, pointerEvents: "auto" });
    gsap.set(secondText, { opacity: 0, y: 16, pointerEvents: "none" });
    gsap.set(thirdText, { opacity: 0, y: 18, pointerEvents: "none" });

    if (reducedMotionQuery.matches) {
      section.classList.add("is-reduced-motion");
      window.requestAnimationFrame(setFinalReducedMotionState);
      return;
    }

    section.classList.remove("is-reduced-motion");

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "manifesto-scroll",
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 4.2)}`,
        scrub: true,
        pin: pinTarget,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to({}, { duration: 0.12 }, 0)
      .to(logo, { opacity: 0, duration: 0.22 }, 0.16)
      .to(firstText, { opacity: 0, y: -16, pointerEvents: "none", duration: 0.18 }, 0.36)
      .to(head, { opacity: 1, duration: 0.38 }, 0.56)
      .to(secondText, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.14 }, 0.98)
      .to({}, { duration: 0.26 }, 1.12)
      .to(secondText, { opacity: 0, y: -14, pointerEvents: "none", duration: 0.14 }, 1.38)
      .to([head, brain], { opacity: 0, duration: 0.16 }, 1.42)
      .to(meal, { opacity: 1, y: 0, scale: 1, duration: 0.2 }, 1.48)
      .to(thirdText, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.18 }, 1.55)
      .to({}, { duration: 0.25 }, 1.75);

    ScrollTrigger.refresh();
  }, section);
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
      <section class="manifesto-animation-section manifesto-narrative" data-manifesto-animation aria-labelledby="manifesto-title">
        <div class="manifesto-narrative-stage">
          <div class="manifesto-animation-stage" aria-hidden="true">
            <img
              class="manifesto-meal"
              src="public/assets/interface/manifesto-complete-meal.png"
              alt=""
              decoding="async"
            />
            <div class="manifesto-logo-system">
              <img
                class="manifesto-head"
                src="public/assets/interface/manifesto-head-transparent.png"
                alt=""
                decoding="async"
              />
              <img
                class="manifesto-brain"
                src="branding/riccio.png"
                alt=""
                decoding="async"
              />
              <img
                class="manifesto-logo-full"
                src="branding/IMG_9878.PNG"
                alt=""
                decoding="async"
              />
            </div>
          </div>

          <div class="manifesto-copy-stage">
            <p class="eyebrow">Manifesto</p>
            <div class="manifesto-phase manifesto-phase--origin">
              <h2 id="manifesto-title">Il pranzo che cercavamo non c’era.</h2>
              <p>Intorno all’università trovavamo pasti costosi, pesanti o poco adatti alle ore di studio successive. Così abbiamo iniziato a progettare e cucinare quello che avremmo voluto mangiare noi.</p>
              <div class="manifesto-micro-list" aria-label="Punto di partenza">
                <span>studenti</span>
                <span>cucina di casa</span>
                <span>accessibile</span>
              </div>
            </div>

            <div class="manifesto-phase manifesto-phase--mind">
              <h2>Cibo funzionale per il cervello.</h2>
              <p>Progettiamo ogni pasto pensando anche alle ore dopo pranzo. Carboidrati, verdure e proteine in ricette vegane, complete e leggere: abbastanza per saziare, senza spegnere la concentrazione.</p>
            </div>

            <div class="manifesto-phase manifesto-phase--meal">
              <h2>Un pasto completo.</h2>
              <p>Carboidrati, proteine e verdure. Ogni schiscia è pensata per essere completa, nutriente e abbastanza leggera da lasciarti energia per le ore dopo pranzo.</p>
              <div class="manifesto-meal-icons" aria-label="Equilibrio del pasto">
                <figure>
                  <img src="public/assets/interface/manifesto-carb-icon.png" alt="" />
                  <figcaption>Carboidrati</figcaption>
                </figure>
                <figure>
                  <img src="public/assets/interface/manifesto-protein-icon.png" alt="" />
                  <figcaption>Proteine</figcaption>
                </figure>
                <figure>
                  <img src="public/assets/interface/manifesto-veg-icon.png" alt="" />
                  <figcaption>Verdure</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderAbout() {
  document.querySelector("#about").innerHTML = `
    <div class="about-redesign about-student-place" aria-labelledby="about-title">
      <h2 id="about-title" class="visually-hidden">About us</h2>
      <section class="about-student-hero">
        <figure class="about-student-photo">
          <img src="public/assets/images/about-leila-alessandro.jpg" alt="Leila e Alessandro, fondatori del Riccio Bistro" />
        </figure>

        <div class="about-student-copy">
          <p class="about-student-lead">Abbiamo creato il posto in cui avremmo voluto mangiare da studenti.</p>
          <p class="about-student-intro">Siamo studenti anche noi. Cercavamo un pranzo buono, leggero, accessibile e fatto con cura — qualcosa che avremmo voluto trovare ogni giorno intorno all’università. Non c’era, così abbiamo iniziato a cucinarlo a casa e a condividerlo con i nostri amici.</p>
        </div>
      </section>

      <section class="about-icon-row" aria-label="Valori">
        <article>
          <img src="public/assets/icons/about-community.png" alt="" />
          <h3>Comunità</h3>
        </article>
        <article>
          <img src="public/assets/icons/about-homemade.png" alt="" />
          <h3>Fatto in casa</h3>
        </article>
        <article>
          <img src="public/assets/icons/about-sustainable.png" alt="" />
          <h3>Sostenibile</h3>
        </article>
      </section>

      <section class="about-student-lower" aria-label="Riccio Bistro in movimento">
        <p class="about-student-lower-lead">Ogni settimana cuciniamo, portiamo, serviamo e ascoltiamo.</p>
        <figure class="about-student-second-photo">
          <img src="public/assets/images/about-leila-alessandro-2628.jpg" alt="Leila e Alessandro in movimento" />
        </figure>
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
        <article class="archive-card product-card product--${product.type}" style="--product-bg: ${product.bg}">
          <button class="product-mark product-open" type="button" data-product-id="${product.id}" aria-label="Apri ordine ${product.name}">
            <img src="${product.logo}" alt="" />
          </button>
          <span class="date-chip">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-info-row" aria-label="Formato e prezzo">
            <span>${product.format}</span>
            <strong>${product.price}</strong>
          </div>
          <button class="page-link product-book-button" type="button" data-product-id="${product.id}">Ordina</button>
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

function renderProductOverlay(product) {
  productOrderContent.innerHTML = `
    <header class="product-order-head">
      <div class="product-order-image product--${product.type}" style="--product-bg: ${product.bg}">
        <img src="${product.logo}" alt="" />
      </div>
      <div>
        <span class="date-chip">${product.category}</span>
        <h2 id="product-order-title">${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-order-meta" aria-label="Formato e prezzo">
          <span>${product.format}</span>
          <strong>${product.price}</strong>
        </div>
      </div>
    </header>

    <form class="product-order-form">
      <label>
        <span>Telefono</span>
        <input type="tel" name="phone" inputmode="tel" autocomplete="tel" placeholder="+39" required />
      </label>
      <label>
        <span>Quantità</span>
        <input type="hidden" name="quantity" value="${productQuantity}" />
        <span class="quantity-stepper" aria-label="Quantità">
          <button type="button" data-quantity-action="decrease" aria-label="Diminuisci quantità">−</button>
          <strong data-product-quantity-value>${productQuantity}</strong>
          <button type="button" data-quantity-action="increase" aria-label="Aumenta quantità">+</button>
        </span>
      </label>
      <button class="primary-cta product-confirm" type="submit">Conferma ordine</button>
      <p class="product-feedback" role="status" aria-live="polite"></p>
    </form>
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
closeProductButton.addEventListener("click", closeProduct);
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector("#ricette").addEventListener("click", (event) => {
  const recipeButton = event.target.closest("[data-recipe-id]");
  if (recipeButton) openRecipe(recipeButton.dataset.recipeId);
});
document.querySelector("#prodotti").addEventListener("click", (event) => {
  const productButton = event.target.closest("[data-product-id]");
  if (productButton) openProduct(productButton.dataset.productId);
});
productOrderContent.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-quantity-action]");
  if (!actionButton) return;
  const delta = actionButton.dataset.quantityAction === "increase" ? 1 : -1;
  updateProductQuantity(productQuantity + delta);
});
productOrderContent.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target.closest(".product-order-form");
  if (!form || !activeProduct) return;
  const productName = activeProduct.name;
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
productOverlay.addEventListener("click", (event) => {
  if (event.target === productOverlay) closeProduct();
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
    closeProduct();
  }
});
window.addEventListener("hashchange", route);

init();
