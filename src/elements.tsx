import { Column, defineElement, Heading, MergeTag, prop, Span, Table, TableCell, TableRow, Text, token } from "@hyper-elements/react";
import { frameWidth, gridWidth, numberGrid } from "./grid";

const ink = token("colors.block");
const line = { width: 1, style: "solid", color: ink } as const;

/**
 * The grid as plain table cells, the one layout every email client, the PDF and the card draw the same.
 * A puzzle square holds its number at the top left; an answer-key square holds its letter, centred,
 * and no number (the key's clue list carries the numbers).
 */
export const CrosswordGrid = defineElement({
  type: "crossword.CrosswordGrid",
  label: "Crossword grid",
  description: "A crossword grid from rows of letters and # blocks: numbered empty squares, or the filled answer key.",
  props: {
    grid: prop.list(prop.text({ label: "Row", required: true, pattern: "^[A-Za-z#]+$" }), { label: "Grid rows", required: true, min: 1 }),
    cell: prop.number({ label: "Cell size", required: true, min: 16, integer: true }),
    solved: prop.boolean({ label: "Show answers", default: false }),
  },
  render: ({ grid, cell, solved }) => {
    const squares = numberGrid(grid);
    const numberSize = Math.round(cell * 0.2);
    const letterSize = Math.round(cell * 0.56);
    return (
      <Table style={{ width: gridWidth(grid, cell), borderCollapse: "collapse", border: { ...line, width: frameWidth(cell) } }}>
        {squares.map((row, r) => (
          <TableRow key={r} style={{ height: cell }}>
            {row.map((s) => (
              <TableCell
                key={s.col}
                style={
                  solved
                    ? // The PDF's table cells don't take verticalAlign, so the letter is centred with top padding instead.
                      { width: cell, padding: [Math.round(cell * 0.2), 0, 0, 0], border: line, verticalAlign: "top", textAlign: "center", backgroundColor: s.block ? ink : token("colors.square"), fontSize: letterSize, fontWeight: 500, lineHeight: 1 }
                    : { width: cell, padding: [Math.round(cell * 0.06), 0, 0, Math.round(cell * 0.08)], border: line, verticalAlign: "top", backgroundColor: s.block ? ink : token("colors.square"), fontFamily: token("fonts.label"), fontWeight: 600, fontSize: numberSize, lineHeight: 1 }
                }
              >
                {solved ? (s.block ? "\u00a0" : s.letter) : s.number ? String(s.number) : "\u00a0"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    );
  },
});

/**
 * One direction's clues: a small sans heading on a rule, then the clues in a two-column table, so a long
 * clue wraps under its first word rather than under its number, as a printed puzzle sets it.
 */
export const ClueList = defineElement({
  type: "crossword.ClueList",
  label: "Clue list",
  description: "Across or Down: a small sans heading on a rule, then each clue with its number hung in the margin, and its answer on the key.",
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
    numberWidth: prop.number({ label: "Number column", default: 26, min: 12, integer: true }),
  },
  render: ({ title, clues, answers, numberWidth }) => (
    <Column style={{ gap: token("spacing.clueGap") }}>
      <Heading level={2} style={{ padding: [0, 0, 6, 0], border: { bottom: { width: 1, style: "solid", color: token("colors.rule") } } }}>{title}</Heading>
      <Table style={{ width: "100%", borderCollapse: "collapse" }}>
        {clues.map((c, i) => {
          const pad = [0, 0, i === clues.length - 1 ? 0 : token("spacing.clueGap"), 0] as const;
          return (
            <TableRow key={c.number}>
              <TableCell style={{ width: numberWidth, padding: pad, verticalAlign: "top", fontFamily: token("fonts.label"), fontWeight: 600, fontSize: token("fontSizes.clue") }}>{String(c.number)}</TableCell>
              <TableCell style={{ padding: pad, verticalAlign: "top", fontSize: token("fontSizes.clue") }}>
                {answers ? <Span style={{ apply: ["number"] }}>{`${c.answer}\u00a0\u00a0`}</Span> : null}
                {answers ? <Span style={{ apply: ["muted"] }}>{c.clue}</Span> : c.clue}
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </Column>
  ),
});

/**
 * The newspaper masthead: a heavy rule over a thin one, the kicker, the title, and an italic standfirst.
 * With greetingMergeTag the standfirst opens "Morning, {{first_name}}." for the sending service to fill.
 */
export const Masthead = defineElement({
  type: "crossword.Masthead",
  label: "Masthead",
  description: "A heavy rule over a thin one, a small sans kicker, the serif title and an optional italic standfirst, optionally greeting the reader by merge tag.",
  props: {
    kicker: prop.text({ label: "Kicker", required: true, maxLength: 60 }),
    title: prop.text({ label: "Title", required: true, maxLength: 40 }),
    standfirst: prop.text({ label: "Standfirst", maxLength: 140 }),
    greetingMergeTag: prop.text({ label: "Greeting merge tag", maxLength: 40, pattern: "^[A-Za-z_][A-Za-z0-9_]*$" }),
    fitTitle: prop.boolean({ label: "Shrink title to one line", default: false }),
    rule: prop.number({ label: "Top rule weight", default: 4, min: 1, max: 16, integer: true }),
  },
  render: ({ kicker, title, standfirst, greetingMergeTag, fitTitle, rule }) => (
    <Column style={{ gap: 10, padding: [Math.round(rule * 1.25), 0, 0, 0], border: { top: { width: rule, style: "solid", color: token("colors.rule") } } }}>
      <Text style={{ apply: ["label"], padding: [8, 0, 0, 0], border: { top: { width: Math.max(1, Math.round(rule / 4)), style: "solid", color: token("colors.rule") } } }}>{kicker}</Text>
      <Heading level={1} fit={fitTitle ? { sizes: [84, 72, 62, 54], maxLines: 1 } : undefined}>{title}</Heading>
      {standfirst || greetingMergeTag ? (
        <Text style={{ apply: ["standfirst"] }}>
          {greetingMergeTag ? <>Morning, <MergeTag name={greetingMergeTag} />. </> : null}
          {standfirst}
        </Text>
      ) : null}
    </Column>
  ),
});
