import { mkdir, writeFile } from "node:fs/promises";
import { ElementsError, formatDiagnostics, render, validate } from "@hyper-elements/react";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import { CrosswordEmail } from "../src/email";
import { puzzle } from "../src/data";

const design = <CrosswordEmail puzzle={puzzle} />;
const plugins = [await emailClients()];
await mkdir("out/email/previews", { recursive: true });
const report = validate(design, { plugins });
if (report.diagnostics.length) console.log(formatDiagnostics(report.diagnostics));
try {
  const { html, text } = await render(design, { plugins });
  await writeFile("out/email/crossword.email.html", html);
  await writeFile("out/email/crossword.email.txt", text);
  if (process.argv.includes("--preview")) {
    const { previews, skipped } = await renderInEmailClients(html, {
      emailClients: ["outlook", "gmail-app", "apple-mail"], computers: ["windows"], fonts: "inline",
    });
    for (const p of previews) await writeFile(`out/email/previews/${p.filename}`, p.html);
    console.log("previews:", previews.map((p) => p.filename).join(", "), skipped.length ? skipped : "");
  }
} catch (e) {
  if (!(e instanceof ElementsError)) throw e;
  console.error(formatDiagnostics(e.diagnostics));
  process.exitCode = 1;
}
