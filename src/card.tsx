import { Canvas, Column, Heading, Row, Text, token } from "@hyper-elements/react";
import { CrosswordGrid } from "./elements";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

const muted = { color: token("colors.muted") } as const;
const rule = { width: 3, style: "solid", color: token("colors.foreground") } as const;

/** The square-ish card for a group chat or a story: the empty grid is the hook, the link is the one blue thing. */
export function CrosswordCard({ puzzle }: { puzzle: Puzzle }) {
  return (
    <Canvas
      theme={crosswordTheme}
      width={1080}
      height={1350}
      title={`${puzzle.title} ${puzzle.issue}`}
      style={{ padding: 72, gap: 48, backgroundColor: "#ffffff", fontSize: 30, lineHeight: 1.35 }}
    >
      <Row style={{ gap: 24, alignItems: "end", padding: [0, 0, 28, 0], border: { bottom: rule } }}>
        <Column style={{ flex: 1, gap: 10 }}>
          <Text style={{ ...muted, fontSize: 28 }}>{`${puzzle.issue} · ${puzzle.date.replace(/, \d{4}$/, "")}`}</Text>
          <Heading level={1} style={{ fontSize: 76, letterSpacing: -2.6, lineHeight: 1 }}>{puzzle.title}</Heading>
        </Column>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <CrosswordGrid puzzle={puzzle} cell={160} />
      </Row>
      <Column style={{ gap: 6 }}>
        <Text style={{ fontWeight: 600, fontSize: 34 }}>Ten clues, about five minutes.</Text>
        <Text style={{ fontSize: 30, color: token("colors.accent"), fontFamily: token("fonts.mono") }}>
          {puzzle.solveUrl.replace("https://", "")}
        </Text>
      </Column>
    </Canvas>
  );
}
