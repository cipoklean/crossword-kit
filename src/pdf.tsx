import { Column, Document, PageBreak, PageFooter, Row, Text } from "@hyper-elements/react";
import { ClueList, CrosswordGrid, Masthead } from "./elements";
import { webFonts } from "./fonts";
import { entries } from "./grid";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

/** Page one is the puzzle to print and solve in pen; page two is the answer key, kept apart so it can't be seen by accident. */
export function CrosswordPdf({ puzzle, theme = crosswordTheme }: { puzzle: Puzzle; theme?: typeof crosswordTheme }) {
  const { across, down } = entries(puzzle);
  return (
    <Document theme={theme} size="Letter" margin={48} lang="en" fonts={webFonts} title={`${puzzle.title} ${puzzle.issue}`} style={{ gap: 28 }}>
      <PageFooter>
        <Text style={{ apply: ["muted"], fontSize: 9.5 }}>{`${puzzle.author} · Solve online at ${puzzle.solveUrl.replace("https://", "")}`}</Text>
      </PageFooter>

      <Masthead kicker={`${puzzle.issue} · ${puzzle.date}`} title={puzzle.title}>
        Ten clues, about five minutes. Solve in pen.
      </Masthead>
      <Row style={{ justifyContent: "center" }}>
        <CrosswordGrid puzzle={puzzle} cell={88} />
      </Row>
      <Row style={{ gap: 32 }}>
        <ClueList title="Across" clues={across} style={{ flex: 1 }} />
        <ClueList title="Down" clues={down} style={{ flex: 1 }} />
      </Row>

      <PageBreak />

      <Masthead kicker={`Answer key · ${puzzle.issue}`} title={puzzle.title} />
      <Row style={{ gap: 32, alignItems: "start" }}>
        <Column style={{ width: 248 }}>
          <CrosswordGrid puzzle={puzzle} cell={48} solved />
        </Column>
        <Column style={{ flex: 1, gap: 24 }}>
          <ClueList title="Across" clues={across} answers />
          <ClueList title="Down" clues={down} answers />
        </Column>
      </Row>
      <Column style={{ gap: 4 }}>
        <Text style={{ apply: ["label"] }}>From the editor</Text>
        <Text>{puzzle.note}</Text>
      </Column>
    </Document>
  );
}
