import { mkdir, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, outline, render, validate } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { CrosswordPdf } from "../src/pdf";
import { puzzle } from "../src/data";
import { loadFonts } from "./fonts";

const design = <CrosswordPdf puzzle={puzzle} />;
await mkdir("out", { recursive: true });
const report = validate(design);
if (report.diagnostics.length) console.log(formatDiagnostics(report.diagnostics));
if (process.argv.includes("--outline")) console.log(outline(design));
if (!report.valid) process.exit(1);
try {
  const { html } = await render(design);
  await writeFile("out/crossword.print.html", html);
  const { pdf, diagnostics } = await renderPdf(design, { fonts: await loadFonts() });
  if (diagnostics.length) console.log(formatDiagnostics(diagnostics));
  await writeFile("out/crossword.pdf", pdf);
  console.log("wrote out/crossword.pdf");
} catch (e) {
  if (!(e instanceof ElementsError)) throw e;
  console.error(formatDiagnostics(e.diagnostics));
  process.exitCode = 1;
}
