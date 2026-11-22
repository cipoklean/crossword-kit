import { Column, Document, Heading, PageBreak, PageFooter, Row, Span, Text, token } from "@hyper-elements/react";
import { CrosswordGrid } from "./elements";
import { entries } from "./grid";
import { crosswordTheme } from "./theme";
import type { Clue, Puzzle } from "./types";

const muted = { color: token("colors.muted") } as const;
const mono = { fontFamily: token("fonts.mono") } as const;
const rule = { width: 1, style: "solid", color: token("colors.foreground") } as const;

function Clues({ title, clues, answers = false, flex }: { title: string; clues: Clue[]; answers?: boolean; flex?: number }) {
  return (
    <Column style={{ gap: 9, ...(flex ? { flex } : {}) }}>
      <Text style={{ fontWeight: 600, fontSize: 13, padding: [0, 0, 6, 0], border: { bottom: rule } }}>{title}</Text>
      {clues.map((c) => (
        <Text key={c.number} style={{ fontSize: 14 }}>
          <Span style={{ ...mono, fontWeight: 600 }}>{`${c.number}\u00a0\u00a0`}</Span>
          {answers ? <Span style={{ fontWeight: 600 }}>{`${c.answer}\u00a0\u00a0`}</Span> : null}
          <Span style={answers ? muted : {}}>{c.clue}</Span>
        </Text>
      ))}
    </Column>
  );
}

function Masthead({ puzzle, kicker }: { puzzle: Puzzle; kicker: string }) {
  return (
    <Row style={{ gap: 24, alignItems: "end", padding: [0, 0, 12, 0], border: { bottom: rule } }}>
      <Column style={{ gap: 6, flex: 1 }}>
        <Text style={{ ...muted, fontSize: 11 }}>{kicker}</Text>
        <Heading level={1}>{puzzle.title}</Heading>
      </Column>
      <Column style={{ width: 180, gap: 2 }}>
        <Text style={{ textAlign: "right", fontWeight: 600 }}>{puzzle.issue}</Text>
        <Text style={{ ...muted, textAlign: "right" }}>{puzzle.date}</Text>
      </Column>
    </Row>
  );
}

/** Page one is the puzzle to print and solve in pen; page two is the answer key, kept apart so it can't be seen by accident. */
export function CrosswordPdf({ puzzle }: { puzzle: Puzzle }) {
  const { across, down } = entries(puzzle);
  return (
    <Document theme={crosswordTheme} size="Letter" margin={48} title={`${puzzle.title} ${puzzle.issue}`} style={{ gap: 28, fontSize: 12 }}>
      <PageFooter>
        <Text style={{ ...muted, fontSize: 9.5 }}>{`${puzzle.author} · Solve online at ${puzzle.solveUrl.replace("https://", "")}`}</Text>
      </PageFooter>

      <Masthead puzzle={puzzle} kicker={`${puzzle.author} · Ten clues, about five minutes`} />
      <Row style={{ justifyContent: "center" }}>
        <CrosswordGrid puzzle={puzzle} cell={88} />
      </Row>
      <Row style={{ gap: 32 }}>
        <Clues title="Across" clues={across} flex={1} />
        <Clues title="Down" clues={down} flex={1} />
      </Row>

      <PageBreak />

      <Masthead puzzle={puzzle} kicker="Answer key" />
      <Row style={{ gap: 32, alignItems: "start" }}>
        <Column style={{ width: 240 }}>
          <CrosswordGrid puzzle={puzzle} cell={48} solved />
        </Column>
        <Column style={{ flex: 1, gap: 24 }}>
          <Clues title="Across" clues={across} answers />
          <Clues title="Down" clues={down} answers />
        </Column>
      </Row>
    </Document>
  );
}
