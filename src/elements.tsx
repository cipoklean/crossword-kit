import { LineBreak, Span, Table, TableCell, TableRow, token } from "@hyper-elements/react";
import { numberGrid } from "./grid";
import type { Puzzle } from "./types";

const ink = token("colors.foreground");
const line = { width: 1, style: "solid", color: ink } as const;

/**
 * The grid as plain table cells, the one layout every email client and the PDF draw the same.
 * Each square is a number at its top left and, on the answer key, its letter.
 */
export function CrosswordGrid({ puzzle, cell, solved = false }: { puzzle: Puzzle; cell: number; solved?: boolean }) {
  const squares = numberGrid(puzzle.grid);
  const numberSize = Math.round(cell * 0.2);
  return (
    <Table style={{ width: cell * squares[0].length, borderCollapse: "collapse", border: line }}>
      {squares.map((row, r) => (
        <TableRow key={r} style={{ height: cell }}>
          {row.map((s) => (
            <TableCell
              key={s.col}
              style={{
                width: cell,
                padding: [Math.round(cell * 0.05), 0, 0, Math.round(cell * 0.07)],
                border: line,
                verticalAlign: "top",
                backgroundColor: s.block ? ink : "#ffffff",
                fontSize: numberSize,
                lineHeight: 1,
              }}
            >
              <Span style={{ fontFamily: token("fonts.mono"), fontSize: numberSize }}>{s.number ? String(s.number) : "\u00a0"}</Span>
              {solved && !s.block ? (
                <>
                  <LineBreak />
                  <Span style={{ fontSize: Math.round(cell * 0.5), fontWeight: 600 }}>{`\u00a0${s.letter}`}</Span>
                </>
              ) : null}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );
}
