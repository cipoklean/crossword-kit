import { readFile } from "node:fs/promises";
const f = (p: string) => readFile(new URL(`../fonts/${p}`, import.meta.url));
export async function loadFonts() {
  const out = [];
  for (const w of [400, 500, 600] as const) {
    out.push({ family: "IBM Plex Sans", src: await f(`IBMPlexSans-${w}.ttf`), weight: w });
    out.push({ family: "IBM Plex Mono", src: await f(`IBMPlexMono-${w}.ttf`), weight: w });
  }
  return out;
}
