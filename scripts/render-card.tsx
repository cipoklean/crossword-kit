// Writes the share card as a PNG (2x) and an SVG.
import { mkdir, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, validate } from "@hyper-elements/react";
import { renderImage } from "@hyper-elements/react/image";
import { CrosswordCard } from "../src/card";
import { puzzle } from "../src/data";
import { loadFonts } from "./fonts";

const design = <CrosswordCard puzzle={puzzle} />;
await mkdir("out", { recursive: true });
const report = validate(design);
if (report.diagnostics.length) console.log(formatDiagnostics(report.diagnostics));

try {
  const fonts = await loadFonts();
  const png = await renderImage(design, { fonts, scale: 1 });
  if (png.diagnostics.length) console.log(formatDiagnostics(png.diagnostics));
  await writeFile("out/crossword-card.png", png.image);
  const svg = await renderImage(design, { fonts, format: "svg" });
  await writeFile("out/crossword-card.svg", svg.image);
  console.log(`wrote out/crossword-card.png (${png.width}x${png.height}) and .svg`);
} catch (e) {
  if (!(e instanceof ElementsError)) throw e;
  console.error(formatDiagnostics(e.diagnostics));
  process.exitCode = 1;
}
