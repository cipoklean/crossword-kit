import type { Clue, Grid, Puzzle, Square } from "./types";

/** Throws if the grid isn't a rectangle of letters and blocks. */
export function checkGrid(grid: Grid): void {
  if (!grid.length) throw new Error("The grid has no rows.");
  grid.forEach((line, r) => {
    if (line.length !== grid[0].length) throw new Error(`Grid row ${r + 1} has ${line.length} squares; row 1 has ${grid[0].length}. Every row must be the same length.`);
    const bad = line.match(/[^A-Za-z#]/);
    if (bad) throw new Error(`Grid row ${r + 1} has "${bad[0]}". Use letters for answer squares and # for blocks.`);
  });
}

/** Numbers squares the standard way: a square starts an entry when the square before it is a block or the edge. */
export function numberGrid(grid: Grid): Square[][] {
  checkGrid(grid);
  const isBlock = (r: number, c: number) => r < 0 || c < 0 || r >= grid.length || c >= grid[r].length || grid[r][c] === "#";
  let n = 0;
  return grid.map((line, row) =>
    [...line].map((ch, col) => {
      const block = ch === "#";
      const startsAcross = !block && isBlock(row, col - 1) && !isBlock(row, col + 1);
      const startsDown = !block && isBlock(row - 1, col) && !isBlock(row + 1, col);
      return { row, col, block, letter: block ? "" : ch.toUpperCase(), number: startsAcross || startsDown ? ++n : undefined, startsAcross, startsDown };
    }),
  );
}

/**
 * Reads each entry's answer out of the grid, so the answer key can never disagree with the fill.
 * Throws if an entry has no clue, or a clue sits on a number where no entry in that direction starts.
 */
export function entries(p: Puzzle): { across: Clue[]; down: Clue[] } {
  const sq = numberGrid(p.grid);
  const read = (r: number, c: number, dr: number, dc: number) => {
    let s = "";
    while (sq[r]?.[c] && !sq[r][c].block) { s += sq[r][c].letter; r += dr; c += dc; }
    return s;
  };
  const across: Clue[] = [];
  const down: Clue[] = [];
  const starts = { across: new Set<number>(), down: new Set<number>() };
  for (const row of sq) for (const s of row) {
    if (!s.number) continue;
    if (s.startsAcross) {
      starts.across.add(s.number);
      const clue = p.clues.across[s.number];
      if (!clue) throw new Error(`${s.number} Across (${read(s.row, s.col, 0, 1)}) has no clue.`);
      across.push({ number: s.number, clue, answer: read(s.row, s.col, 0, 1) });
    }
    if (s.startsDown) {
      starts.down.add(s.number);
      const clue = p.clues.down[s.number];
      if (!clue) throw new Error(`${s.number} Down (${read(s.row, s.col, 1, 0)}) has no clue.`);
      down.push({ number: s.number, clue, answer: read(s.row, s.col, 1, 0) });
    }
  }
  for (const dir of ["across", "down"] as const)
    for (const k of Object.keys(p.clues[dir]).map(Number))
      if (!starts[dir].has(k)) throw new Error(`There's a clue for ${k} ${dir === "across" ? "Across" : "Down"}, but no ${dir} entry starts at ${k}.`);
  return { across, down };
}

/** The grid's outer width at a cell size, frame included, so layouts can size around it. */
export function gridWidth(grid: Grid, cell: number): number {
  return cell * grid[0].length + frameWidth(cell) * 2;
}

/** A heavier outer frame, as printed grids have. */
export function frameWidth(cell: number): number {
  return Math.max(2, Math.round(cell / 32));
}
