import { defineTheme } from "@hyper-elements/react";

// "Plaster and rose" (taste-skill palette plaster-rose): the warm off-white of a weekend paper's
// puzzle page, brown-black ink for type and blocks, and deep rose used once per output, for the
// one thing to do next (solve online). Newsreader, a text serif made for news, sets the puzzle;
// Hanken Grotesk sets the small numbers and labels. Contrast on paper: ink 13.5:1, muted 6.2:1, rose 6.0:1.
export const crosswordTheme = defineTheme({
  colors: {
    background: "#f6f0eb",
    foreground: "#2c2325",
    primary: "#9a3c4c",
    primaryForeground: "#fffcf8",
    primaryHover: "#7f2f3e",
    surface: "#ebe0d9",
    muted: "#665557",
    rule: "#2c2325",
    square: "#fffcf8", // answer squares sit a step lighter than the paper
    block: "#2c2325",
  },
  fonts: {
    body: "'Newsreader', Georgia, 'Times New Roman', serif",
    heading: "'Newsreader', Georgia, 'Times New Roman', serif",
    label: "'Hanken Grotesk', Helvetica, Arial, sans-serif",
  },
  fontSizes: { body: 13, label: 10, clue: 14, caption: 10 },
  lineHeights: { body: 1.4 },
  spacing: { clueGap: 8 },
  radii: { button: 2 },
  elements: {
    Heading: {
      fontWeight: 500,
      by: {
        level: {
          1: { fontSize: 40, lineHeight: 1, letterSpacing: -1 },
          // Level 2 is the small sans section heading: Across, Down, From the editor.
          2: { fontFamily: "{fonts.label}", fontSize: "{fontSizes.label}", fontWeight: 600, lineHeight: 1.2 },
        },
      },
    },
    Button: {
      fontFamily: "{fonts.label}",
      fontWeight: 600,
      borderRadius: "{radii.button}",
      padding: [14, 24],
      hover: { backgroundColor: "{colors.primaryHover}" },
    },
  },
  styles: {
    caption: { fontSize: "{fontSizes.caption}", color: "{colors.muted}" },
    // Small sans labels: the kicker.
    label: { fontFamily: "{fonts.label}", fontSize: "{fontSizes.label}", fontWeight: 600 },
    number: { fontFamily: "{fonts.label}", fontWeight: 600 },
    muted: { color: "{colors.muted}" },
    standfirst: { fontStyle: "italic", color: "{colors.muted}" },
  },
  formats: {
    email: {
      fontSizes: { body: 16, label: 12, clue: 16, caption: 13 },
      lineHeights: { body: 1.5 },
      elements: { Heading: { by: { level: { 1: { fontSize: 34, letterSpacing: -0.6, mobile: { fontSize: 28 } } } } } },
    },
    canvas: {
      fontSizes: { body: 30, label: 24, clue: 30, caption: 24 },
      lineHeights: { body: 1.3 },
      elements: { Heading: { by: { level: { 1: { fontSize: 84, letterSpacing: -2 } } } } },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof crosswordTheme;
  }
}
