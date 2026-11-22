import type { Clue, Grid, Puzzle, Square } from "./types";

/** Numbers squares the standard way: a square starts an entry when the square before it is a block or the edge. */
export function numberGrid(grid: Grid): Square[][] {
  const isBlock = (r: number, c: number) => r < 0 || c < 0 || r >= grid.length || c >= grid[r].length || grid[r][c] === "#";
  let n = 0;
  return grid.map((line, row) =>
    [...line].map((ch, col) => {
      const block = ch === "#";
      const startsAcross = !block && isBlock(row, col - 1) && !isBlock(row, col + 1);
      const startsDown = !block && isBlock(row - 1, col) && !isBlock(row + 1, col);
      return { row, col, block, letter: block ? "" : ch, number: startsAcross || startsDown ? ++n : undefined };
    }),
  );
}

/** Reads each entry's answer out of the grid, so a clue can never disagree with the fill. */
export function entries(p: Puzzle): { across: Clue[]; down: Clue[] } {
  const sq = numberGrid(p.grid);
  const read = (r: number, c: number, dr: number, dc: number) => {
    let s = "";
    while (sq[r]?.[c] && !sq[r][c].block) { s += sq[r][c].letter; r += dr; c += dc; }
    return s;
  };
  const across: Clue[] = [];
  const down: Clue[] = [];
  for (const row of sq) for (const s of row) {
    if (!s.number) continue;
    if (p.clues.across[s.number]) across.push({ number: s.number, clue: p.clues.across[s.number], answer: read(s.row, s.col, 0, 1) });
    if (p.clues.down[s.number]) down.push({ number: s.number, clue: p.clues.down[s.number], answer: read(s.row, s.col, 1, 0) });
  }
  return { across, down };
}
