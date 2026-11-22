import { readFile } from "node:fs/promises";

const f = (p: string) => readFile(new URL(`../fonts/${p}`, import.meta.url));

/** Font files for renderPdf and renderImage, which load nothing themselves. */
export async function loadFonts() {
  const out: { family: string; src: Buffer; weight: number; style?: "normal" | "italic" }[] = [];
  for (const w of [400, 500, 600]) {
    out.push({ family: "Newsreader", src: await f(`Newsreader-${w}.ttf`), weight: w });
    out.push({ family: "Hanken Grotesk", src: await f(`HankenGrotesk-${w}.ttf`), weight: w });
  }
  out.push({ family: "Newsreader", src: await f("Newsreader-400-italic.ttf"), weight: 400, style: "italic" });
  return out;
}
