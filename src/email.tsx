import {
  Button, Column, Email, Heading, List, ListItem, Row, Section, Span, Table, TableCell, TableRow, Text, token,
} from "@hyper-elements/react";
import { entries, numberGrid } from "./grid";
import { crosswordTheme } from "./theme";
import type { Puzzle } from "./types";

const PLEX = "https://cdn.jsdelivr.net/fontsource/fonts";
const emailFonts = [400, 600].flatMap((w) => [
  { family: "IBM Plex Sans", src: `${PLEX}/ibm-plex-sans@latest/latin-${w}-normal.woff2`, format: "woff2", weight: w },
  { family: "IBM Plex Mono", src: `${PLEX}/ibm-plex-mono@latest/latin-${w}-normal.woff2`, format: "woff2", weight: w },
]) as never;

const CELL = 56;
const ink = token("colors.foreground");
const line = { width: 1, style: "solid", color: ink } as const;
const muted = { color: token("colors.muted") } as const;

/** The grid as plain table cells: the one layout every email client draws the same. */
export function EmailGrid({ puzzle, solved = false }: { puzzle: Puzzle; solved?: boolean }) {
  const squares = numberGrid(puzzle.grid);
  return (
    <Table style={{ width: CELL * squares[0].length, borderCollapse: "collapse", border: line }}>
      {squares.map((row, r) => (
        <TableRow key={r} style={{ height: CELL }}>
          {row.map((s) => (
            <TableCell
              key={s.col}
              style={{
                width: CELL,
                padding: [3, 0, 0, 4],
                border: line,
                verticalAlign: "top",
                backgroundColor: s.block ? ink : "#ffffff",
                fontSize: 11,
                lineHeight: 1,
              }}
            >
              <Span style={{ fontFamily: token("fonts.mono"), fontSize: 11 }}>{s.number ? String(s.number) : "\u00a0"}</Span>
              {solved && !s.block ? (
                <Span style={{ fontSize: 26, fontWeight: 600 }}>{`\n${s.letter}`}</Span>
              ) : null}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );
}

function ClueList({ title, clues }: { title: string; clues: { number: number; clue: string }[] }) {
  return (
    <Column style={{ gap: 8 }}>
      <Text style={{ fontWeight: 600 }}>{title}</Text>
      {clues.map((c) => (
        <Text key={c.number} style={{ fontSize: 15 }}>
          <Span style={{ fontFamily: token("fonts.mono"), fontWeight: 600 }}>{`${c.number}\u00a0\u00a0`}</Span>
          {c.clue}
        </Text>
      ))}
    </Column>
  );
}

export function CrosswordEmail({ puzzle }: { puzzle: Puzzle }) {
  const { across, down } = entries(puzzle);
  return (
    <Email
      theme={crosswordTheme}
      width={600}
      lang="en"
      fonts={emailFonts}
      title={`${puzzle.title} ${puzzle.issue}`}
      previewText={`Five minutes, ten clues. ${puzzle.title} ${puzzle.issue} is ready.`}
      style={{ fontSize: 16, lineHeight: 1.5, backgroundColor: "#ffffff", gap: 0 }}
    >
      <Section style={{ padding: [32, 24, 20, 24], gap: 6 }}>
        <Text style={{ ...muted, fontSize: 13 }}>{`${puzzle.issue} · ${puzzle.date}`}</Text>
        <Heading level={1} style={{ fontSize: 32, letterSpacing: -0.8 }}>{puzzle.title}</Heading>
        <Text style={muted}>{puzzle.author}</Text>
      </Section>
      <Section style={{ padding: [0, 24, 24, 24], gap: 20 }}>
        <EmailGrid puzzle={puzzle} />
        <Row style={{ gap: 24 }}>
          <ClueList title="Across" clues={across} />
          <ClueList title="Down" clues={down} />
        </Row>
        <Button href={puzzle.solveUrl}>Solve it online</Button>
      </Section>
    </Email>
  );
}
