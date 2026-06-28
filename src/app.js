const pages = ["guida", "about", "ricette", "archivio"];
const overlay = document.querySelector(".menu-overlay");
const openButtons = document.querySelectorAll("[data-open-menu]");
const closeButton = document.querySelector("[data-close-menu]");
const menuLinks = document.querySelectorAll("[data-menu-link]");

let menus = [];

const recipes = [
  {
    name: "Bowl di orzo croccante",
    description: "Una base completa da schiscetta: cereale, verdure, tofu e qualcosa che scricchiola.",
    ingredients: ["orzo", "zucchine", "carote", "tofu", "cavolo nero"],
    mood: "studio lungo",
    image: "public/assets/branding/riccio-mark.png",
  },
  {
    name: "Dattero ripieno",
    description: "Il dolce ricorrente del Riccio: piccolo, salato, cioccolatoso, quasi troppo furbo.",
    ingredients: ["dattero", "burro di arachidi", "fondente", "sale"],
    mood: "finale felice",
    image: "public/assets/branding/riccio-mark.png",
  },
  {
    name: "Burger veg farcito",
    description: "Versione festa: patty vegetale, cipolle, salsa e patatine come promessa mantenuta.",
    ingredients: ["patty veg", "pomodoro", "sriracha mayo", "cipolle crispy"],
    mood: "giovedi speciale",
    image: "public/assets/branding/riccio-mark.png",
  },
];

function openMenu() {
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closeMenu() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
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
    guida: "Guida",
    about: "About us",
    ricette: "Ricette",
    archivio: "Archivio",
  }[page];
}

function hero(title, eyebrow, text, card) {
  return `
    <div class="page-hero">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2 id="${title.toLowerCase().replace(/\s+/g, "-")}-title">${title}</h2>
        <p>${text}</p>
      </div>
      <aside class="hero-card">${card}</aside>
    </div>
  `;
}

function renderGuide() {
  document.querySelector("#guida").innerHTML = `
    ${hero("Guida", "come si legge", "Il sito e un piccolo archivio: entra, scegli una sezione, guarda i menu senza dover attraversare tutta la chat.", "1 landing, 4 porte, zero scroll iniziale.")}
    <div class="section-grid">
      <article class="content-card">
        <h3>Menu</h3>
        <p>Ogni menu nasce da un annuncio settimanale. Nel sito trovi data del messaggio, piatti principali e ingredienti quando erano chiari.</p>
      </article>
      <article class="content-card">
        <h3>Ricette</h3>
        <p>Le ricette sono card espandibili in futuro: nome, descrizione, ingredienti, mood e link al dettaglio.</p>
      </article>
      <article class="content-card">
        <h3>Archivio</h3>
        <p>La chat resta privata. Qui compaiono solo i menu ripuliti, senza nomi completi, numeri, prenotazioni o conversazioni laterali.</p>
      </article>
    </div>
  `;
}

function renderAbout() {
  document.querySelector("#about").innerHTML = `
    ${hero("About us", "nato in universita", "Riccio Bistro e un progetto piccolo: cucinare vegetariano, portarlo al Poli, capire cosa funziona, rifarlo meglio la settimana dopo.", "Schiscette, appunti, amici affamati, archivio ordinato.")}
    <div class="section-grid">
      <article class="content-card">
        <h3>Non food blog</h3>
        <p>Niente diario infinito: il sito funziona come una scatola di menu, idee e ricette da consultare rapidamente.</p>
      </article>
      <article class="content-card">
        <h3>Vegetariano pratico</h3>
        <p>Piatti pensati per stare in una schiscetta, reggere il pranzo e non mandare in coma dopo lezione.</p>
      </article>
      <article class="content-card">
        <h3>Identita manuale</h3>
        <p>Il riccio disegnato, i colori da orto e le card-sticker tengono il progetto vicino alla sua origine: fatto a mano, ma con cura.</p>
      </article>
    </div>
  `;
}

function renderRecipes() {
  const cards = recipes
    .map(
      (recipe, index) => `
        <article class="recipe-card">
          <div class="recipe-visual">
            <img src="${recipe.image}" alt="" />
          </div>
          <div class="meta-row">
            <span class="date-chip">ricetta ${String(index + 1).padStart(2, "0")}</span>
            <span class="mood-chip">${recipe.mood}</span>
          </div>
          <h3>${recipe.name}</h3>
          <p>${recipe.description}</p>
          <div class="tag-row">
            ${recipe.ingredients.map((ingredient) => `<span class="tag">${ingredient}</span>`).join("")}
          </div>
          <a class="page-link" href="#archivio">Vedi origine</a>
        </article>
      `
    )
    .join("");

  document.querySelector("#ricette").innerHTML = `
    ${hero("Ricette", "schede pronte", "Una base modificabile per ricette vere: per ora raccoglie piatti ricorrenti e idee emerse dai menu.", "Qui potrai aggiungere procedimento, tempi e porzioni.")}
    <div class="recipe-grid">${cards}</div>
  `;
}

function dishMarkup(menu) {
  return menu.dishes
    .map((dish) => {
      const ingredients = dish.ingredients?.length ? `<br><small>${dish.ingredients.join(", ")}</small>` : "";
      return `<li><strong>${dish.name}</strong> <span>(${dish.type})</span>${ingredients}</li>`;
    })
    .join("");
}

function renderArchive() {
  const archiveCards = menus
    .map(
      (menu, index) => `
        <article class="archive-card ${index === 0 ? "featured" : ""}">
          <div class="meta-row">
            <span class="date-chip">${formatDate(menu.date)}</span>
            ${menu.mood ? `<span class="mood-chip">${menu.mood}</span>` : ""}
          </div>
          <h3>${menu.title}</h3>
          <p>${menu.cleanDescription}</p>
          <ul class="dish-list">${dishMarkup(menu)}</ul>
          <div class="tag-row">
            ${menu.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            <span class="tag">${menu.confidence}</span>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelector("#archivio").innerHTML = `
    ${hero("Archivio", "chat -> raccolta", "I menu vengono dalla chat WhatsApp, ma sono stati filtrati e ripuliti per lasciare solo la parte pubblicabile.", `${menus.length} menu estratti`)}
    <div class="archive-grid">
      <aside class="archive-note">
        <p>Niente nomi completi, numeri, prenotazioni o messaggi privati. Solo menu, piatti e ingredienti quando disponibili.</p>
      </aside>
      ${archiveCards}
    </div>
  `;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

async function loadMenus() {
  try {
    const response = await fetch("src/data/menus.json");
    menus = await response.json();
  } catch {
    menus = [];
  }
}

async function init() {
  await loadMenus();
  renderGuide();
  renderAbout();
  renderRecipes();
  renderArchive();
  route();
}

openButtons.forEach((button) => button.addEventListener("click", openMenu));
closeButton.addEventListener("click", closeMenu);
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeMenu();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.addEventListener("hashchange", route);

init();
