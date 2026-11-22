import { Button, Email, MergeTag, Row, Section, Text, token } from "@hyper-elements/react";
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
        <Masthead kicker={`${puzzle.issue} · ${puzzle.date}`} title={puzzle.title}>
          Morning, <MergeTag name="first_name" />. Ten clues, about five minutes.
        </Masthead>
      </Section>
      <Section style={{ padding: [0, 24, 32, 24], gap: 24 }}>
        <CrosswordGrid puzzle={puzzle} cell={56} />
        <Row style={{ gap: 24 }}>
          <ClueList title="Across" clues={across} />
          <ClueList title="Down" clues={down} />
        </Row>
        <Button href={puzzle.solveUrl}>Solve it online</Button>
      </Section>
      <Section tokens={{ colors: { background: token("colors.surface") } }} style={{ padding: [20, 24], gap: 4 }}>
        <Text style={{ apply: ["label"] }}>From the editor</Text>
        <Text>{puzzle.note}</Text>
        <Text style={{ apply: ["muted"], fontSize: 13 }}>{`${puzzle.author}. Answers run in next Monday's issue.`}</Text>
      </Section>
    </Email>
  );
}
