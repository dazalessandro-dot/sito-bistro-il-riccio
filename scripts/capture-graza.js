const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "references", "graza-screens");

async function safeClick(page, selector, label) {
  const target = page.locator(selector).first();
  if ((await target.count()) === 0) return false;
  try {
    await target.click({ timeout: 2500 });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, `${label}.png`), fullPage: true });
    return true;
  } catch {
    return false;
  }
}

async function captureViewport(browser, name, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();

  await page.goto("https://www.graza.co/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2500);

  await page.screenshot({ path: path.join(outDir, `${name}-home.png`), fullPage: true });

  const observations = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const buttons = [...document.querySelectorAll("a,button")]
      .map((el) => el.textContent.trim().replace(/\s+/g, " "))
      .filter(Boolean)
      .slice(0, 40);
    const headings = [...document.querySelectorAll("h1,h2,h3")]
      .map((el) => el.textContent.trim().replace(/\s+/g, " "))
      .filter(Boolean)
      .slice(0, 30);
    const colors = [...document.querySelectorAll("body,header,main,section,button,a")]
      .map((el) => {
        const cs = getComputedStyle(el);
        return [cs.backgroundColor, cs.color, cs.borderColor];
      })
      .flat()
      .filter(Boolean);
    return {
      title: document.title,
      url: location.href,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      rootFont: styles.fontFamily,
      headings,
      buttons,
      colors: [...new Set(colors)].slice(0, 60),
    };
  });

  fs.writeFileSync(
    path.join(outDir, `${name}-observations.json`),
    JSON.stringify(observations, null, 2)
  );

  for (const y of [600, 1200, 1900, 2700]) {
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: "instant" }), y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `${name}-scroll-${y}.png`), fullPage: false });
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
  await safeClick(page, 'button:has-text("Menu")', `${name}-menu-button`);
  await safeClick(page, 'button[aria-label*="menu" i]', `${name}-menu-aria`);
  await safeClick(page, 'button:has-text("Shop")', `${name}-shop-button`);
  await safeClick(page, 'a:has-text("Shop")', `${name}-shop-link`);

  await context.close();
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  await captureViewport(browser, "desktop", { width: 1440, height: 960 });
  await captureViewport(browser, "mobile", { width: 390, height: 844 });
  await browser.close();
})();
