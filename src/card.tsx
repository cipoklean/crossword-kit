import { Canvas, Column, Text, token } from "@hyper-elements/react";
import { CrosswordGrid, Masthead } from "./elements";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

/** The portrait card for a group chat or a story: the empty grid on a plaster band is the hook, the rose link the one thing to do. */
export function CrosswordCard({ puzzle, theme = crosswordTheme }: { puzzle: Puzzle; theme?: typeof crosswordTheme }) {
  // The grid fills about 750px of the band at any size.
  const cell = Math.min(150, Math.floor(750 / puzzle.grid[0].length));
  return (
    <Canvas theme={theme} lang="en" width={1080} height={1350} title={`${puzzle.title} ${puzzle.issue}`} style={{ padding: 72, gap: 40, justifyContent: "space-between" }}>
      <Masthead kicker={`${puzzle.issue} · ${puzzle.date.replace(/, \d{4}$/, "")}`} title={puzzle.title} fitTitle rule={8} />
      <Column style={{ alignItems: "center", backgroundColor: token("colors.surface"), padding: [36, 0] }}>
        <CrosswordGrid grid={puzzle.grid} cell={cell} />
      </Column>
      <Column style={{ gap: 6 }}>
        <Text style={{ apply: ["standfirst"] }} fit={{ sizes: [44, 40, 36, 32], maxLines: 1 }}>Ten clues, about five minutes.</Text>
        <Text style={{ apply: ["number"], color: token("colors.primary") }} fit={{ sizes: [34, 30, 26], maxLines: 1 }}>
          {puzzle.solveUrl.replace("https://", "")}
        </Text>
      </Column>
    </Canvas>
  );
}
