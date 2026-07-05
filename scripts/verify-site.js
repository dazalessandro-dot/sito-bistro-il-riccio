const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "references", "riccio-screens");
const baseUrl = process.env.SITE_URL || "http://localhost:4173";

async function capture(browser, name, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const landingMetrics = await page.evaluate(() => ({
    innerHeight,
    scrollHeight: document.documentElement.scrollHeight,
    bodyClass: document.body.className,
  }));
  await page.screenshot({ path: path.join(outDir, `${name}-landing.png`), fullPage: false });

  await page.locator("[data-open-menu]").last().click();
  await page.screenshot({ path: path.join(outDir, `${name}-menu.png`), fullPage: false });

  for (const hash of ["manifesto", "about", "ricette", "archivio", "prodotti"]) {
    await page.goto(`${baseUrl}/#${hash}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => !document.body.classList.contains("is-landing"));
    await page.locator(`#${hash}:not([hidden]) h2`).waitFor({ state: "visible" });
    await page.screenshot({ path: path.join(outDir, `${name}-${hash}.png`), fullPage: false });
    const heading = await page.locator(`#${hash}:not([hidden]) h2`).first().textContent();
    if (!heading) throw new Error(`Missing heading for ${hash}`);
  }

  await context.close();
  return landingMetrics;
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const desktop = await capture(browser, "desktop", { width: 1440, height: 960 });
  const mobile = await capture(browser, "mobile", { width: 390, height: 844 });
  await browser.close();

  const report = { baseUrl, desktop, mobile };
  fs.writeFileSync(path.join(outDir, "verification.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})();
