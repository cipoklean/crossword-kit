import { Button, Column, Email, Heading, Row, Section, Text, token } from "@hyper-elements/react";
import { entries } from "./grid";
import { ClueList, CrosswordGrid, Masthead } from "./elements";
import { webFonts } from "./fonts";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

/** The Monday email: masthead, the grid as table cells, both clue lists, one rose button, and the setter's note. */
export function CrosswordEmail({ puzzle, theme = crosswordTheme }: { puzzle: Puzzle; theme?: typeof crosswordTheme }) {
  const { across, down } = entries(puzzle);
  return (
    <Email
      theme={theme}
      width={600}
      lang="en"
      fonts={webFonts}
      title={`${puzzle.title} ${puzzle.issue}`}
      previewText={`Ten clues, about five minutes. ${puzzle.title} ${puzzle.issue} is ready.`}
      style={{ gap: 0 }}
    >
      <Section style={{ padding: [32, 24, 24, 24] }}>
        <Masthead kicker={`${puzzle.issue} · ${puzzle.date}`} title={puzzle.title} greetingMergeTag="first_name" standfirst={"Ten clues, about five\u00a0minutes."} />
      </Section>
      <Section style={{ padding: [0, 24, 32, 24], gap: 24 }}>
        <Column style={{ alignItems: "center" }}>
          <CrosswordGrid grid={puzzle.grid} cell={56} />
        </Column>
        <Row style={{ gap: 24 }}>
          <ClueList title="Across" clues={across} />
          <ClueList title="Down" clues={down} />
        </Row>
        <Button href={puzzle.solveUrl}>Solve it online</Button>
      </Section>
      <Section tokens={{ colors: { background: token("colors.surface") } }} style={{ padding: [20, 24], gap: 4 }}>
        <Heading level={2}>From the editor</Heading>
        <Text>{puzzle.note}</Text>
        <Text style={{ apply: ["caption"] }}>{`${puzzle.author}. Answers run in next Monday's issue.`}</Text>
      </Section>
    </Email>
  );
}
