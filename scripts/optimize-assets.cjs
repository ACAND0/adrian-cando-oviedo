const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");

async function main() {
  const root = path.resolve(__dirname, "..");
  const output = path.join(root, "assets/optimized");
  await fs.mkdir(output, { recursive: true });
  const sizes = [];
  async function exportImage(input, name, width, lossless) {
    const target = path.join(output, name + ".webp");
    await sharp(path.join(root, input))
      .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
      .webp(lossless ? { lossless: true, effort: 6 } : { quality: 86, effort: 6 })
      .toFile(target);
    sizes.push({ file: path.relative(root, target), bytes: (await fs.stat(target)).size });
  }
  for (const width of [320, 384, 640]) {
    await exportImage("assets/adrian-cando-cutout.png", "portrait-" + width, width, true);
  }
  const logos = {
    documentum: "documentum-original.png",
    java: "java-original.webp",
    javafx: "javafx-transparent.png",
    d2: "d2-transparent.png",
    rest: "rest-original.webp",
    powershell: "powershell-transparent.png"
  };
  for (const [name, source] of Object.entries(logos)) {
    await exportImage("assets/technologies/" + source, name, 128, true);
  }
  const examples = ["explorador-documental-anonimizado", "observabilidad-almacenamiento-anonimizada", "operaciones-masivas-anonimizadas", "control-migracion-anonimizado"];
  for (const example of examples) {
    for (const width of [480, 960]) {
      await exportImage("assets/app-examples/" + example + ".png", example + "-" + width, width, false);
    }
  }
  console.log(JSON.stringify(sizes, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
