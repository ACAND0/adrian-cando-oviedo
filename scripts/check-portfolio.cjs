const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

async function main() {
  const root = path.resolve(__dirname, "..");
  const url = process.argv[2] || pathToFileURL(path.join(root, "index.html")).href;
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(url);
    if (url.startsWith("http")) assert.equal(response.status(), 200);
    assert.match(await page.title(), /Senior Documentum Consultant/);
    assert.equal(await page.locator(".case-study").count(), 5);
    assert.equal(await page.locator(".case-study").first().getAttribute("id"), "caso-minsait");
    assert.match(await page.locator("#caso-minsait").innerText(), /JavaFX/);
    assert.match(await page.locator("#caso-minsait").innerText(), /DFCs/);
    assert.equal(await page.locator(".career-item").count(), 6);
    assert.equal(await page.locator(".earlier-grid article").count(), 3);
    assert.equal(await page.locator(".project-card").count(), 4);
    assert.match(await page.locator(".illustrative-label").innerText(), /datos ficticios/);
    const ids = await page.locator("[id]").evaluateAll(elements => elements.map(element => element.id));
    assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
    const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash));
    assert.deepEqual(missingTargets, []);

    for (const id of ["migrar", "automatizar", "herramientas", "integrar"]) {
      await page.locator('[data-solution="' + id + '"]').click();
      assert.equal(await page.locator(".map-panel:not([hidden])").getAttribute("id"), "solucion-" + id);
      assert.equal(await page.locator('[data-solution="' + id + '"]').getAttribute("aria-selected"), "true");
      assert.equal(await page.locator(".map-controls [tabindex='0']").count(), 1);
    }
    await page.locator('[data-solution="migrar"]').focus();
    await page.keyboard.press("ArrowDown");
    assert.equal(await page.locator(".map-panel:not([hidden])").getAttribute("id"), "solucion-automatizar");
    await page.keyboard.press("End");
    assert.equal(await page.locator(".map-panel:not([hidden])").getAttribute("id"), "solucion-integrar");
    await page.keyboard.press("Home");
    assert.equal(await page.locator(".map-panel:not([hidden])").getAttribute("id"), "solucion-migrar");
    await page.locator("#solucion-migrar .text-link").click();
    assert.equal(await page.locator("#caso-adif details").evaluate(element => element.open), true);
    await page.goBack();
    assert.equal(await page.locator(".map-panel:not([hidden])").getAttribute("id"), "solucion-migrar");

    await page.goto(url + "#solucion-herramientas");
    await page.locator("#solucion-herramientas .text-link").click();
    assert.equal(await page.locator("#caso-minsait details").evaluate(element => element.open), true);
    await page.locator("#caso-minsait details .text-link").click();
    assert.equal(await page.locator("#trayectoria-minsait details").evaluate(element => element.open), true);
    assert.match(await page.locator("#trayectoria-minsait .details-body").innerText(), /JavaFX/);
    await page.goto(url + "#caso-repsol");
    assert.equal(await page.locator("#caso-repsol details").evaluate(element => element.open), true);
    await page.goto(url + "#solucion-integrar");
    assert.equal(await page.locator(".map-panel:not([hidden])").getAttribute("id"), "solucion-integrar");
    await page.locator("#solucion-integrar .text-link").click();
    assert.equal(await page.locator("#trayectoria-adif-desarrollo details").evaluate(element => element.open), true);
    await page.goto(url + "#caso-ferrovial");
    assert.equal(await page.locator("#caso-ferrovial details").evaluate(element => element.open), true);
    await page.goto(url + "#perfil");
    assert.equal(await page.evaluate(() => location.hash), "#contacto");
    await page.waitForFunction(() => { const rect = document.getElementById("contacto").getBoundingClientRect(); return rect.top < innerHeight - 100 && rect.bottom > 100; });

    await page.locator(".project-preview").first().click();
    assert.equal(await page.locator("dialog").evaluate(element => element.open), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog").evaluate(element => element.open), false);
    assert.equal(await page.evaluate(() => document.activeElement.classList.contains("project-preview")), true);

    for (const width of [320, 360, 390, 600, 768, 800, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "Overflow at " + width);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior), "auto");
    assert.equal(await page.locator(".map-panel:not([hidden])").evaluate(element => getComputedStyle(element).animationName), "none");
    await page.locator("#tecnologias").scrollIntoViewIfNeeded();
    await page.locator(".skill-art img").evaluateAll(images => Promise.all(images.map(image => image.decode())));
    assert.equal(await page.locator(".logo-dfc").count(), 1);
    assert.equal(await page.locator(".skill-config svg").count(), 1);

    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const noJSPage = await noJS.newPage();
    await noJSPage.goto(url);
    assert.equal(await noJSPage.locator(".map-panel:visible").count(), 4);
    assert.equal(await noJSPage.locator("#casos").isVisible(), true);
    assert.equal(await noJSPage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await noJS.close();

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".portrait-frame img").evaluate(image => image.decode());
    await page.screenshot({ path: path.join(root, "outputs/portfolio-desktop.png"), animations: "disabled" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await page.screenshot({ path: path.join(root, "outputs/portfolio-mobile.png"), animations: "disabled" });
    assert.deepEqual(errors, []);
    console.log("PASS: solution map, keyboard, URL/history, case disclosures, dialog, 9 viewport widths, reduced motion, no-JS, unique IDs, internal links, preserved identity assets.");
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
