import { Column, Document, Heading, Link, PageBreak, PageFooter, PageNumber, Row, Text, token } from "@hyper-elements/react";
import { ClueList, CrosswordGrid, Masthead } from "./elements";
import { webFonts } from "./fonts";
import { entries, gridWidth } from "./grid";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

/** Page one is the puzzle to print and solve in pen; page two is the answer key, kept apart so it can't be seen by accident. */
export function CrosswordPdf({ puzzle, theme = crosswordTheme }: { puzzle: Puzzle; theme?: typeof crosswordTheme }) {
  const { across, down } = entries(puzzle);
  const cols = puzzle.grid[0].length;
  // A mini (up to about 12 clues) sets the grid big and centred over two clue columns. A bigger puzzle
  // sets the grid beside its clues, and its answer key drops the editor's note so each stays one page.
  const big = across.length + down.length > 12;
  const cell = big ? Math.min(56, Math.floor(330 / cols)) : Math.min(88, Math.floor(440 / cols));
  const keyCell = big ? Math.min(48, Math.floor(300 / cols)) : Math.min(64, Math.floor(320 / cols));
  const clues = <><ClueList title="Across" clues={across} /><ClueList title="Down" clues={down} /></>;
  return (
    <Document theme={theme} size="Letter" margin={48} lang="en" fonts={webFonts} title={`${puzzle.title} ${puzzle.issue}`} style={{ gap: 28 }}>
      <PageFooter>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ apply: ["caption"] }}>
            {`${puzzle.author} · Solve online at `}
            <Link href={puzzle.solveUrl} style={{ textDecoration: "none" }}>{puzzle.solveUrl.replace("https://", "")}</Link>
          </Text>
          <Text style={{ apply: ["caption"], textAlign: "right" }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>

      <Masthead kicker={`${puzzle.issue} · ${puzzle.date}`} title={puzzle.title} standfirst="Ten clues, about five minutes. Solve in pen." />
      {big ? (
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ width: gridWidth(puzzle.grid, cell), flex: "none" }}>
            <CrosswordGrid grid={puzzle.grid} cell={cell} />
          </Column>
          <Column style={{ gap: 24 }}>{clues}</Column>
        </Row>
      ) : (
        <>
          <Column style={{ alignItems: "center" }}>
            <CrosswordGrid grid={puzzle.grid} cell={cell} />
          </Column>
          <Row style={{ gap: 32 }}>{clues}</Row>
        </>
      )}

      <PageBreak />

      <Masthead kicker={`Answer key · ${puzzle.issue}`} title={puzzle.title} />
      <Row style={{ gap: 32, alignItems: "start" }}>
        <Column style={{ width: gridWidth(puzzle.grid, keyCell), flex: "none" }}>
          <CrosswordGrid grid={puzzle.grid} cell={keyCell} solved />
        </Column>
        <Column style={{ gap: 24 }}>
          <ClueList title="Across" clues={across} answers />
          <ClueList title="Down" clues={down} answers />
        </Column>
      </Row>
      {big ? null : (
      <Column tokens={{ colors: { background: token("colors.surface") } }} style={{ backgroundColor: token("colors.surface"), padding: [18, 22], gap: 6 }}>
        <Heading level={2}>From the editor</Heading>
        <Text>{puzzle.note}</Text>
        <Text style={{ apply: ["caption"] }}>{`${puzzle.author}. Next Monday: a new mini, and this week's answers in the email.`}</Text>
      </Column>
      )}
    </Document>
  );
}
