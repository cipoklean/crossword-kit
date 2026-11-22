import { Canvas, Column, Text, token } from "@hyper-elements/react";
import { CrosswordGrid, Masthead } from "./elements";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

/** The portrait card for a group chat or a story: the empty grid is the hook, the rose link the one thing to do. */
export function CrosswordCard({ puzzle, theme = crosswordTheme }: { puzzle: Puzzle; theme?: typeof crosswordTheme }) {
  return (
    <Canvas theme={theme} width={1080} height={1350} title={`${puzzle.title} ${puzzle.issue}`} style={{ padding: 72, gap: 48, justifyContent: "space-between" }}>
      <Masthead kicker={`${puzzle.issue} · ${puzzle.date.replace(/, \d{4}$/, "")}`} title={puzzle.title} />
      <Column style={{ alignItems: "center" }}>
        <CrosswordGrid puzzle={puzzle} cell={160} />
      </Column>
      <Column style={{ gap: 6 }}>
        <Text style={{ apply: ["standfirst"] }} fit={{ sizes: [44, 40, 36, 32], maxLines: 1 }}>Ten clues, about five minutes.</Text>
        <Text style={{ fontFamily: token("fonts.label"), fontWeight: 600, color: token("colors.primary") }} fit={{ sizes: [34, 30, 26], maxLines: 1 }}>
          {puzzle.solveUrl.replace("https://", "")}
        </Text>
      </Column>
    </Canvas>
  );
}
