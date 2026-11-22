import type { ReactNode } from "react";
import { Column, defineElement, Heading, prop, Span, Table, TableCell, TableRow, Text, token } from "@hyper-elements/react";
import { numberGrid } from "./grid";
import type { Clue, Puzzle } from "./types";

const ink = token("colors.block");
const line = { width: 1, style: "solid", color: ink } as const;

/**
 * The grid as plain table cells, the one layout every email client, the PDF and the card draw the same.
 * A puzzle square holds its number at the top left; an answer-key square holds its letter, centred,
 * and no number (the key's clue list carries the numbers).
 */
export function CrosswordGrid({ puzzle, cell, solved = false }: { puzzle: Puzzle; cell: number; solved?: boolean }) {
  const squares = numberGrid(puzzle.grid);
  const numberSize = Math.round(cell * 0.2);
  const letterSize = Math.round(cell * 0.56);
  const frame = Math.max(2, Math.round(cell / 32)); // a heavier outer frame, as printed grids have
  return (
    <Table style={{ width: cell * squares[0].length + frame * 2, borderCollapse: "collapse", border: { ...line, width: frame } }}>
      {squares.map((row, r) => (
        <TableRow key={r} style={{ height: cell }}>
          {row.map((s) =>
            solved ? (
              <TableCell
                key={s.col}
                style={{ width: cell, padding: [Math.round(cell * 0.2), 0, 0, 0], border: line, verticalAlign: "top", textAlign: "center", backgroundColor: s.block ? ink : token("colors.square"), fontSize: letterSize, lineHeight: 1 }}
              >
                <Span style={{ fontWeight: 500, fontSize: letterSize }}>{s.block ? "\u00a0" : s.letter}</Span>
              </TableCell>
            ) : (
              <TableCell
                key={s.col}
                style={{
                  width: cell,
                  padding: [Math.round(cell * 0.06), 0, 0, Math.round(cell * 0.08)],
                  border: line,
                  verticalAlign: "top",
                  backgroundColor: s.block ? ink : token("colors.square"),
                  fontSize: numberSize,
                  lineHeight: 1,
                }}
              >
                <Span style={{ fontFamily: token("fonts.label"), fontWeight: 600, fontSize: numberSize }}>{s.number ? String(s.number) : "\u00a0"}</Span>
              </TableCell>
            ),
          )}
        </TableRow>
      ))}
    </Table>
  );
}

/** One direction's clues: a small sans title on a rule, then numbered serif clues, with the answers on the key. */
export const ClueList = defineElement({
  type: "crossword.ClueList",
  label: "Clue list",
  description: "Across or Down: a small sans title on a rule, then each clue with its number, and its answer on the key.",
  props: {
    title: prop.text({ label: "Title", required: true, maxLength: 12 }),
    clues: prop.list(
      prop.object(
        {
          number: prop.number({ label: "Number", required: true }),
          clue: prop.text({ label: "Clue", required: true, maxLength: 80 }),
          answer: prop.text({ label: "Answer", required: true, maxLength: 21 }),
        },
        { label: "Clue" },
      ),
      { label: "Clues", required: true },
    ),
    answers: prop.boolean({ label: "Show answers", default: false }),
  },
  render: ({ title, clues, answers }) => (
    <Column style={{ gap: token("spacing.clueGap") }}>
      <Text style={{ apply: ["label"], padding: [0, 0, 6, 0], border: { bottom: { width: 1, style: "solid", color: token("colors.rule") } } }}>{title}</Text>
      {clues.map((c) => (
        <Text key={c.number} style={{ fontSize: token("fontSizes.clue") }}>
          <Span style={{ apply: ["number"] }}>{`${c.number}\u00a0\u00a0`}</Span>
          {answers ? <Span style={{ apply: ["number"] }}>{`${c.answer}\u00a0\u00a0`}</Span> : null}
          {answers ? <Span style={{ apply: ["muted"] }}>{c.clue}</Span> : c.clue}
        </Text>
      ))}
    </Column>
  ),
});

/** The newspaper masthead: a heavy rule over a thin one, the kicker, the title, and an italic standfirst. */
export function Masthead({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <Column style={{ gap: 10, padding: [5, 0, 0, 0], border: { top: { width: 4, style: "solid", color: token("colors.rule") } } }}>
      <Text style={{ apply: ["label"], padding: [8, 0, 0, 0], border: { top: { width: 1, style: "solid", color: token("colors.rule") } } }}>{kicker}</Text>
      <Heading level={1}>{title}</Heading>
      {children ? <Text style={{ apply: ["standfirst"] }}>{children}</Text> : null}
    </Column>
  );
}
