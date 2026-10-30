const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

async function build() {
  const root = path.resolve(__dirname, "..");
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(root, "assets/brand/artwork.html")).href);
    await page.evaluate(() => document.fonts.ready);
    if (!await page.evaluate(() => document.fonts.check('500 76px "IBM Plex Sans"'))) {
      throw new Error("IBM Plex Sans must be loaded before exporting.");
    }
    await page.locator("#social-card").screenshot({ path: path.join(root, "assets/og-white.png") });
    const icons = [];
    for (const size of [16, 32, 48, 180, 192, 256, 512, 1024]) {
      await page.locator("#favicon-art").evaluate((element, size) => {
        element.style.width = size + "px";
        element.style.height = size + "px";
        element.classList.toggle("small", size <= 48);
      }, size);
      const png = await page.locator("#favicon-art").screenshot();
      if ([16, 32, 48, 256].includes(size)) icons.push({ size, png });
      const name = size === 180 ? "apple-touch-icon.png" : size === 1024 ? "favicon-master.png" : `favicon-${size}.png`;
      if ([32, 180, 192, 512, 1024].includes(size)) await fs.writeFile(path.join(root, "assets", name), png);
    }
    // ICO entries embed PNG data at several native sizes for browser compatibility.
    const directory = Buffer.alloc(6 + icons.length * 16);
    directory.writeUInt16LE(1, 2);
    directory.writeUInt16LE(icons.length, 4);
    let offset = directory.length;
    icons.forEach(({ size, png }, index) => {
      const entry = 6 + index * 16;
      directory[entry] = size === 256 ? 0 : size;
      directory[entry + 1] = size === 256 ? 0 : size;
      directory.writeUInt16LE(1, entry + 4);
      directory.writeUInt16LE(32, entry + 6);
      directory.writeUInt32LE(png.length, entry + 8);
      directory.writeUInt32LE(offset, entry + 12);
      offset += png.length;
    });
    await fs.writeFile(path.join(root, "favicon.ico"), Buffer.concat([directory, ...icons.map(icon => icon.png)]));
    console.log("Generated white social card (1200x630) and favicon family.");
  } finally {
    await browser.close();
  }
}

build().catch(error => { console.error(error); process.exitCode = 1; });
