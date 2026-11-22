import { defineTheme } from "@hyper-elements/react";

// "Sheet and biro" (taste-skill palette white-link-blue): white paper, black type,
// one grey for secondary lines, one pale grey step for cards, and biro blue used once,
// for the one action: solve online.
export const crosswordTheme = defineTheme({
  colors: {
    background: "#ffffff",
    foreground: "#111111",
    primary: "#111111",
    primaryForeground: "#ffffff",
    surface: "#f4f4f4",
    muted: "#5f5f5f", // 6.4:1 on white, 5.9:1 on the surface
    hairline: "#dedede",
    rule: "#111111",
    accent: "#1a4be0",
    field: "#111111",
    fieldInk: "#ffffff",
    fieldMuted: "#b3b3b3",
  },
  fonts: {
    body: "'IBM Plex Sans', Helvetica, Arial, sans-serif",
    heading: "'IBM Plex Sans', Helvetica, Arial, sans-serif",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
  },
  fontSizes: { body: 10.5 },
  lineHeights: { body: 1.45 },
  radii: { card: 6 },
  elements: {
    // Display weights 400/600 with tight tracking, sentence case everywhere.
    Heading: {
      fontWeight: 600,
      by: {
        level: {
          1: { fontSize: 36, lineHeight: 1, letterSpacing: -1.26 },
          2: { fontSize: 15, lineHeight: 1.2, letterSpacing: -0.3 },
        },
      },
    },
    Button: { borderRadius: 6, padding: [12, 20], fontWeight: 600 },
  },
  styles: {
    // The one card recipe.
    card: { backgroundColor: "{colors.surface}", padding: 12, gap: 4, borderRadius: 6 },
  },
});
