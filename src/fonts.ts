import type { EmailProps } from "@hyper-elements/react";

const CDN = "https://cdn.jsdelivr.net/fontsource/fonts";

/** Web fonts for the email and the print HTML. Clients that can't load them fall back to Georgia and Arial. */
export const webFonts: NonNullable<EmailProps["fonts"]> = [
  ...([400, 500, 600] as const).map((weight) => ({
    family: "Newsreader", src: `${CDN}/newsreader@latest/latin-${weight}-normal.woff2`, format: "woff2" as const, weight,
  })),
  { family: "Newsreader", src: `${CDN}/newsreader@latest/latin-400-italic.woff2`, format: "woff2" as const, weight: 400, style: "italic" as const },
  ...([400, 600] as const).map((weight) => ({
    family: "Hanken Grotesk", src: `${CDN}/hanken-grotesk@latest/latin-${weight}-normal.woff2`, format: "woff2" as const, weight,
  })),
];
